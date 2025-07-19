#!/usr/bin/env python3
"""
GitHub Issues Generator for BuildFit Project

This script parses task markdown files and generates comprehensive GitHub issues
in the correct sequence based on dependencies and priorities.
"""

import os
import re
import json
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Task:
    id: str
    title: str
    category: str
    priority: str
    estimate: str
    dependencies: List[str]
    acceptance_criteria: str
    deliverables: str
    description: str = ""

class GitHubIssueGenerator:
    def __init__(self, docs_path: str):
        self.docs_path = docs_path
        self.tasks: List[Task] = []
        self.categories = {
            'CORE_FEATURES': {'priority': 1, 'color': 'ff6b6b', 'milestone': 'Core Features Development'},
            'BACKEND_TASKS': {'priority': 2, 'color': '4ecdc4', 'milestone': 'Backend Infrastructure'},
            'UI_UX_TASKS': {'priority': 3, 'color': 'ffe66d', 'milestone': 'UI/UX Design'},
            'TESTING_TASKS': {'priority': 4, 'color': '95a5a6', 'milestone': 'Testing & QA'},
            'DEPLOYMENT_TASKS': {'priority': 5, 'color': '6c5ce7', 'milestone': 'Deployment & Launch'}
        }
        
    def parse_task_files(self):
        """Parse all task markdown files to extract task information"""
        task_files = [
            'CORE_FEATURES.md',
            'BACKEND_TASKS.md', 
            'UI_UX_TASKS.md',
            'TESTING_TASKS.md',
            'DEPLOYMENT_TASKS.md'
        ]
        
        for filename in task_files:
            filepath = os.path.join(self.docs_path, 'tasks', filename)
            if os.path.exists(filepath):
                category = filename.replace('.md', '')
                self._parse_file(filepath, category)
    
    def _parse_file(self, filepath: str, category: str):
        """Parse individual task file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split content into task sections
        tasks = re.findall(r'- \[ \] \*\*(.*?)\*\*:(.*?)(?=- \[ \]|\Z)', content, re.DOTALL)
        
        for task_match in tasks:
            task_id = task_match[0]
            task_content = task_match[1].strip()
            
            # Extract task details
            title = self._extract_title(task_content)
            priority = self._extract_field(task_content, 'Priority')
            estimate = self._extract_field(task_content, 'Estimate')
            dependencies = self._extract_dependencies(task_content)
            acceptance_criteria = self._extract_field(task_content, 'Acceptance Criteria')
            deliverables = self._extract_field(task_content, 'Deliverables')
            
            task = Task(
                id=task_id,
                title=title,
                category=category,
                priority=priority or 'Medium',
                estimate=estimate or '1 day',
                dependencies=dependencies,
                acceptance_criteria=acceptance_criteria or '',
                deliverables=deliverables or '',
                description=task_content
            )
            
            self.tasks.append(task)
    
    def _extract_title(self, content: str) -> str:
        """Extract task title from content"""
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            if line and not line.startswith('-') and not line.startswith('**'):
                return line
        return "Task"
    
    def _extract_field(self, content: str, field_name: str) -> Optional[str]:
        """Extract specific field from task content"""
        pattern = rf'\*\*{field_name}\*\*:\s*(.+?)(?=\n|$)'
        match = re.search(pattern, content, re.IGNORECASE)
        return match.group(1).strip() if match else None
    
    def _extract_dependencies(self, content: str) -> List[str]:
        """Extract dependencies from task content"""
        deps_match = re.search(r'\*\*Dependencies\*\*:\s*(.+?)(?=\n|\*\*|$)', content, re.IGNORECASE)
        if deps_match:
            deps_text = deps_match.group(1).strip()
            # Split by comma and clean up
            deps = [dep.strip() for dep in deps_text.split(',')]
            return [dep for dep in deps if dep and dep != 'None']
        return []
    
    def prioritize_tasks(self) -> List[Task]:
        """Sort tasks by priority and dependencies"""
        # Create priority mapping
        priority_order = {'High': 1, 'Medium': 2, 'Low': 3}
        category_order = {cat: info['priority'] for cat, info in self.categories.items()}
        
        def sort_key(task: Task) -> Tuple[int, int, str]:
            return (
                category_order.get(task.category, 999),
                priority_order.get(task.priority, 999),
                task.id
            )
        
        return sorted(self.tasks, key=sort_key)
    
    def generate_issue_template(self, task: Task) -> Dict:
        """Generate GitHub issue template for a task"""
        # Create labels based on category and priority
        labels = [
            task.category.lower().replace('_', '-'),
            f"priority-{task.priority.lower()}",
            f"estimate-{task.estimate.split()[0]}d" if 'day' in task.estimate else 'estimate-unknown'
        ]
        
        # Generate issue body
        body = self._generate_issue_body(task)
        
        return {
            'title': f"[{task.id}] {task.title}",
            'body': body,
            'labels': labels,
            'milestone': self.categories.get(task.category, {}).get('milestone', ''),
            'assignees': [],
            'category': task.category,
            'priority': task.priority,
            'estimate': task.estimate,
            'dependencies': task.dependencies
        }
    
    def _generate_issue_body(self, task: Task) -> str:
        """Generate detailed issue body"""
        body = f"""## Task Description
{task.title}

## Category
{task.category.replace('_', ' ').title()}

## Priority & Estimation
- **Priority**: {task.priority}
- **Estimated Effort**: {task.estimate}

## Dependencies
"""
        if task.dependencies:
            for dep in task.dependencies:
                body += f"- {dep}\n"
        else:
            body += "- None\n"
        
        body += f"""
## Deliverables
{task.deliverables or 'To be defined'}

## Acceptance Criteria
{task.acceptance_criteria or 'To be defined'}

## Additional Details
{task.description}

---
**Task ID**: `{task.id}`  
**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Source**: BuildFit Project Documentation
"""
        return body
    
    def generate_issues_json(self, output_path: str):
        """Generate JSON file with all issues"""
        prioritized_tasks = self.prioritize_tasks()
        issues = []
        
        for task in prioritized_tasks:
            issue = self.generate_issue_template(task)
            issues.append(issue)
        
        # Generate summary
        summary = {
            'total_tasks': len(issues),
            'categories': {},
            'priorities': {},
            'estimated_total_days': 0
        }
        
        for issue in issues:
            # Count by category
            cat = issue['category']
            if cat not in summary['categories']:
                summary['categories'][cat] = 0
            summary['categories'][cat] += 1
            
            # Count by priority
            priority = issue['priority']
            if priority not in summary['priorities']:
                summary['priorities'][priority] = 0
            summary['priorities'][priority] += 1
            
            # Sum estimates
            try:
                estimate_days = int(issue['estimate'].split()[0])
                summary['estimated_total_days'] += estimate_days
            except:
                pass
        
        output = {
            'summary': summary,
            'milestones': [info['milestone'] for info in self.categories.values()],
            'issues': issues
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        
        print(f"Generated {len(issues)} GitHub issues")
        print(f"Total estimated effort: {summary['estimated_total_days']} days")
        print(f"Issues saved to: {output_path}")
        
        return output

def main():
    # Initialize generator
    docs_path = os.path.join(os.path.dirname(__file__), '..', 'docs')
    generator = GitHubIssueGenerator(docs_path)
    
    # Parse task files
    print("Parsing task files...")
    generator.parse_task_files()
    
    # Generate issues
    output_path = os.path.join(os.path.dirname(__file__), 'github_issues.json')
    issues_data = generator.generate_issues_json(output_path)
    
    # Generate summary report
    print("\n=== SUMMARY REPORT ===")
    print(f"Total Tasks: {issues_data['summary']['total_tasks']}")
    print(f"Total Estimated Days: {issues_data['summary']['estimated_total_days']}")
    print("\nTasks by Category:")
    for cat, count in issues_data['summary']['categories'].items():
        print(f"  {cat.replace('_', ' ').title()}: {count}")
    print("\nTasks by Priority:")
    for priority, count in issues_data['summary']['priorities'].items():
        print(f"  {priority}: {count}")

if __name__ == "__main__":
    main()