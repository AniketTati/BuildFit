#!/usr/bin/env python3
"""
GitHub Issues Creation Guide Generator

This script generates a step-by-step guide for creating GitHub issues
from the parsed task data, organized by priority and sequence.
"""

import json
import os
from datetime import datetime

def load_issues_data(json_path: str):
    """Load the generated issues data"""
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_creation_guide(issues_data: dict, output_path: str):
    """Generate a markdown guide for creating GitHub issues"""
    
    guide_content = f"""# GitHub Issues Creation Guide for BuildFit Project

**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Total Issues**: {issues_data['summary']['total_tasks']}  
**Estimated Effort**: {issues_data['summary']['estimated_total_days']} days  

## Overview

This guide provides a systematic approach to creating {issues_data['summary']['total_tasks']} GitHub issues for the BuildFit project, organized by priority and dependencies.

## Project Milestones

Create these milestones first in your GitHub repository:

"""
    
    # Add milestones
    for i, milestone in enumerate(issues_data['milestones'], 1):
        guide_content += f"{i}. **{milestone}**\n"
    
    guide_content += f"""
## Labels to Create

Create these labels in your GitHub repository for proper categorization:

### Category Labels
- `core-features` (Color: #ff6b6b) - Core functionality tasks
- `backend-tasks` (Color: #4ecdc4) - Backend infrastructure and APIs
- `ui-ux-tasks` (Color: #ffe66d) - Design and user experience
- `testing-tasks` (Color: #95a5a6) - Quality assurance and testing
- `deployment-tasks` (Color: #6c5ce7) - Deployment and launch preparation

### Priority Labels
- `priority-high` (Color: #e74c3c) - High priority tasks
- `priority-medium` (Color: #f39c12) - Medium priority tasks
- `priority-low` (Color: #27ae60) - Low priority tasks
- `priority-critical` (Color: #8e44ad) - Critical priority tasks

### Estimation Labels
- `estimate-1d` (Color: #3498db) - 1 day effort
- `estimate-2d` (Color: #3498db) - 2 days effort
- `estimate-3d` (Color: #3498db) - 3 days effort
- `estimate-4d` (Color: #3498db) - 4 days effort
- `estimate-5d` (Color: #3498db) - 5+ days effort

## Issue Creation Sequence

Issues are organized by priority and dependencies. Create them in this sequence:

"""
    
    # Group issues by priority and category
    critical_issues = []
    high_priority_issues = []
    medium_priority_issues = []
    low_priority_issues = []
    
    for issue in issues_data['issues']:
        if issue['priority'] == 'Critical':
            critical_issues.append(issue)
        elif issue['priority'] == 'High':
            high_priority_issues.append(issue)
        elif issue['priority'] == 'Medium':
            medium_priority_issues.append(issue)
        else:
            low_priority_issues.append(issue)
    
    # Create sections for each priority
    if critical_issues:
        guide_content += f"### Phase 1: Critical Priority ({len(critical_issues)} issues)\n\n"
        guide_content += "These issues must be created and resolved first:\n\n"
        for i, issue in enumerate(critical_issues, 1):
            guide_content += f"**Issue {i}:**\n"
            guide_content += f"- **Title**: {issue['title']}\n"
            guide_content += f"- **Labels**: {', '.join(issue['labels'])}\n"
            guide_content += f"- **Milestone**: {issue['milestone']}\n"
            guide_content += f"- **Dependencies**: {', '.join(issue['dependencies']) if issue['dependencies'] else 'None'}\n\n"
    
    guide_content += f"### Phase 2: High Priority ({len(high_priority_issues)} issues)\n\n"
    guide_content += "Create these foundational issues next:\n\n"
    
    # Group high priority by category for better organization
    categories = {}
    for issue in high_priority_issues:
        cat = issue['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(issue)
    
    for category, issues in categories.items():
        guide_content += f"#### {category.replace('_', ' ').title()} ({len(issues)} issues)\n\n"
        for i, issue in enumerate(issues, 1):
            guide_content += f"**{category[:4].upper()}-{i:02d}:**\n"
            guide_content += f"- **Title**: {issue['title']}\n"
            guide_content += f"- **Estimate**: {issue['estimate']}\n"
            guide_content += f"- **Dependencies**: {', '.join(issue['dependencies']) if issue['dependencies'] else 'None'}\n\n"
    
    guide_content += f"""
### Phase 3: Medium Priority ({len(medium_priority_issues)} issues)

These issues can be created in parallel as team capacity allows.

### Phase 4: Low Priority ({len(low_priority_issues)} issues)

These issues are nice-to-have features and can be deferred.

## Sample Issue Template

Use this template when creating each issue:

```markdown
## Task Description
[Brief description of the task]

## Category
[Category name from the guide]

## Priority & Estimation
- **Priority**: [High/Medium/Low/Critical]
- **Estimated Effort**: [X days]

## Dependencies
- [List dependencies or "None"]

## Deliverables
[What will be delivered when complete]

## Acceptance Criteria
[Clear criteria for completion]

## Additional Details
[Any additional context or requirements]

---
**Task ID**: `[TASK-ID]`  
**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Source**: BuildFit Project Documentation
```

## Creation Process

1. **Setup Repository**:
   - Create milestones listed above
   - Create labels with specified colors
   - Set up project boards if desired

2. **Phase 1 - Critical Issues**:
   - Create critical priority issues first
   - Assign to appropriate team members
   - Begin work immediately

3. **Phase 2 - High Priority Foundation**:
   - Create high priority issues in category order:
     1. Core Features (authentication, basic functionality)
     2. Backend Tasks (infrastructure, APIs)
     3. UI/UX Tasks (design system, wireframes)
     4. Testing Tasks (testing infrastructure)
     5. Deployment Tasks (environment setup)

4. **Phase 3 & 4**:
   - Create medium and low priority issues as team capacity allows
   - Use for planning future sprints

## Project Timeline

Based on the task estimates:
- **Total Estimated Effort**: {issues_data['summary']['estimated_total_days']} days
- **With Team of 6-8 people**: ~12-16 weeks
- **Critical Path**: Core Features → Backend → UI/UX → Testing → Deployment

## Next Steps

1. Review this guide with your development team
2. Set up GitHub repository with milestones and labels
3. Begin creating issues starting with Critical and High priority
4. Assign team members and start development
5. Use project boards to track progress

---

**Important Notes**:
- Dependencies should be tracked carefully - some tasks cannot start until others are complete
- Estimates are guidelines - adjust based on team experience and complexity
- Regular sprint planning should reassess priorities based on progress
- Some issues may need to be broken down further during implementation

**Total Tasks Summary**:
"""
    
    # Add final summary
    for category, count in issues_data['summary']['categories'].items():
        guide_content += f"- {category.replace('_', ' ').title()}: {count} tasks\n"
    
    guide_content += f"\n**Grand Total**: {issues_data['summary']['total_tasks']} GitHub issues ready for creation"
    
    # Write the guide
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(guide_content)
    
    return guide_content

def generate_detailed_issues_list(issues_data: dict, output_path: str):
    """Generate a detailed list of all issues for reference"""
    
    content = f"""# Complete GitHub Issues List for BuildFit Project

**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Total Issues**: {issues_data['summary']['total_tasks']}

This document contains the complete list of all GitHub issues to be created, with full details.

---

"""
    
    # Sort by priority order
    priority_order = {'Critical': 1, 'High': 2, 'Medium': 3, 'Low': 4}
    sorted_issues = sorted(issues_data['issues'], 
                          key=lambda x: (priority_order.get(x['priority'], 5), x['title']))
    
    current_priority = None
    issue_number = 1
    
    for issue in sorted_issues:
        if issue['priority'] != current_priority:
            current_priority = issue['priority']
            content += f"## {current_priority} Priority Issues\n\n"
        
        content += f"### Issue #{issue_number:03d}: {issue['title']}\n\n"
        content += f"**Category**: {issue['category'].replace('_', ' ').title()}  \n"
        content += f"**Priority**: {issue['priority']}  \n"
        content += f"**Estimate**: {issue['estimate']}  \n"
        content += f"**Milestone**: {issue['milestone']}  \n"
        content += f"**Labels**: {', '.join(issue['labels'])}  \n\n"
        
        if issue['dependencies']:
            content += f"**Dependencies**: {', '.join(issue['dependencies'])}  \n\n"
        
        content += "**Issue Body:**\n"
        content += "```markdown\n"
        content += issue['body']
        content += "\n```\n\n"
        content += "---\n\n"
        
        issue_number += 1
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return content

def main():
    # Load the generated issues data
    json_path = os.path.join(os.path.dirname(__file__), 'github_issues.json')
    issues_data = load_issues_data(json_path)
    
    # Generate creation guide
    guide_path = os.path.join(os.path.dirname(__file__), 'GITHUB_ISSUES_CREATION_GUIDE.md')
    guide = generate_creation_guide(issues_data, guide_path)
    print(f"Generated GitHub Issues Creation Guide: {guide_path}")
    
    # Generate detailed issues list
    detailed_path = os.path.join(os.path.dirname(__file__), 'COMPLETE_ISSUES_LIST.md')
    detailed = generate_detailed_issues_list(issues_data, detailed_path)
    print(f"Generated Complete Issues List: {detailed_path}")
    
    # Print summary
    print(f"\n=== GENERATION COMPLETE ===")
    print(f"Created comprehensive guide for {issues_data['summary']['total_tasks']} GitHub issues")
    print(f"Total estimated effort: {issues_data['summary']['estimated_total_days']} days")
    print(f"Files created:")
    print(f"  1. Creation Guide: {guide_path}")
    print(f"  2. Complete Issues List: {detailed_path}")
    print(f"  3. Issues JSON Data: {json_path}")

if __name__ == "__main__":
    main()