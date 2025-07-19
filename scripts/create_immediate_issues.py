#!/usr/bin/env python3
"""
Priority Issue Sequence Generator

Creates the exact sequence of GitHub issues to create first,
with immediate action items.
"""

import json
import os
from datetime import datetime

def create_priority_sequence():
    """Create the first 20 critical and high-priority issues in dependency order"""
    
    # Load issues data
    json_path = os.path.join(os.path.dirname(__file__), 'github_issues.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        issues_data = json.load(f)
    
    # Filter and sort high-priority foundational issues
    critical_high_issues = []
    for issue in issues_data['issues']:
        if issue['priority'] in ['Critical', 'High']:
            critical_high_issues.append(issue)
    
    # Define dependency order for key foundational tasks
    foundation_order = [
        'INFRA-001',  # Environment setup
        'DB-001',     # Database schema
        'API-001',    # API framework
        'BRAND-001',  # Brand identity
        'AUTH-001',   # Authentication
        'PROFILE-001', # User profiles
        'EXERCISE-001', # Exercise database
        'WORKOUT-001', # Workout plans
        'LOG-001',    # Workout logging
        'DS-001',     # Design system
    ]
    
    # Create priority sequence
    sequence = []
    sequence_ids = set()
    
    # Add foundation issues first
    for task_id in foundation_order:
        for issue in critical_high_issues:
            if task_id in issue['title'] and issue['title'] not in sequence_ids:
                sequence.append(issue)
                sequence_ids.add(issue['title'])
                break
    
    # Add remaining critical issues
    for issue in critical_high_issues:
        if issue['priority'] == 'Critical' and issue['title'] not in sequence_ids:
            sequence.append(issue)
            sequence_ids.add(issue['title'])
    
    # Add remaining high-priority issues by category priority
    category_priority = ['CORE_FEATURES', 'BACKEND_TASKS', 'UI_UX_TASKS', 'TESTING_TASKS', 'DEPLOYMENT_TASKS']
    
    for category in category_priority:
        for issue in critical_high_issues:
            if (issue['category'] == category and 
                issue['priority'] == 'High' and 
                issue['title'] not in sequence_ids and
                len(sequence) < 30):  # Limit to first 30 issues
                sequence.append(issue)
                sequence_ids.add(issue['title'])
    
    return sequence

def generate_immediate_action_guide():
    """Generate a guide for immediate GitHub issue creation"""
    
    priority_sequence = create_priority_sequence()
    
    content = f"""# IMMEDIATE ACTION: First 30 GitHub Issues to Create

**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Priority**: Critical and High-priority foundation issues  
**Recommended Timeline**: Create these issues in the next 2-3 days  

## Quick Setup Checklist

Before creating issues, set up your GitHub repository:

- [ ] Create milestones:
  - [ ] Core Features Development
  - [ ] Backend Infrastructure  
  - [ ] UI/UX Design
  - [ ] Testing & QA
  - [ ] Deployment & Launch

- [ ] Create priority labels:
  - [ ] `priority-critical` (Color: #8e44ad)
  - [ ] `priority-high` (Color: #e74c3c)
  - [ ] `priority-medium` (Color: #f39c12)
  - [ ] `priority-low` (Color: #27ae60)

- [ ] Create category labels:
  - [ ] `core-features` (Color: #ff6b6b)
  - [ ] `backend-tasks` (Color: #4ecdc4)
  - [ ] `ui-ux-tasks` (Color: #ffe66d)
  - [ ] `testing-tasks` (Color: #95a5a6)
  - [ ] `deployment-tasks` (Color: #6c5ce7)

## Issues to Create IMMEDIATELY

Create these {len(priority_sequence)} issues in this exact order:

"""
    
    for i, issue in enumerate(priority_sequence, 1):
        content += f"""
### Issue #{i:02d}: {issue['title']}

**Create this issue with:**
- **Title**: `{issue['title']}`
- **Labels**: {', '.join(issue['labels'])}
- **Milestone**: {issue['milestone']}
- **Priority**: {issue['priority']}
- **Estimate**: {issue['estimate']}

**Issue Body:**
```markdown
{issue['body']}
```

---
"""
    
    content += f"""
## Why These Issues First?

This sequence follows critical dependency paths:

1. **Infrastructure First** (Issues #1-5): Set up basic development environment
2. **Core Foundation** (Issues #6-15): Database, authentication, basic functionality
3. **Key Features** (Issues #16-25): Essential user-facing features
4. **Supporting Systems** (Issues #26-30): Design system, testing setup

## Next Steps After Creating These Issues

1. **Assign team members** to issues based on expertise
2. **Start work on foundation issues** (#1-5) immediately
3. **Plan first sprint** around issues #1-10
4. **Create remaining issues** using the complete guide
5. **Set up project board** to track progress

## Estimated Timeline

- **Issues #1-10**: Week 1-2 (Foundation)
- **Issues #11-20**: Week 3-4 (Core Features)
- **Issues #21-30**: Week 5-6 (Feature Development)

## Team Assignment Suggestions

- **DevOps Engineer**: Issues related to INFRA, deployment
- **Backend Developer**: Issues related to API, database
- **Frontend Developer**: Issues related to UI, authentication flows
- **Designer**: Issues related to brand, design system
- **QA Engineer**: Issues related to testing infrastructure

---

**IMPORTANT**: Start with issues #1-5 as they are prerequisites for most other work. Don't wait to create all issues before starting development on the foundation items.

**Total Effort for These 30 Issues**: ~{sum(int(issue['estimate'].split()[0]) for issue in priority_sequence if issue['estimate'].split()[0].isdigit())} days
"""
    
    return content

def create_quick_reference():
    """Create a quick reference table of the first issues"""
    
    priority_sequence = create_priority_sequence()
    
    content = f"""# Quick Reference: First 30 Issues

| # | Task ID | Title | Priority | Category | Estimate | Dependencies |
|---|---------|-------|----------|----------|----------|--------------|
"""
    
    for i, issue in enumerate(priority_sequence, 1):
        task_id = issue['title'].split(']')[0].replace('[', '')
        title = issue['title'].split('] ', 1)[1] if '] ' in issue['title'] else issue['title']
        deps = ', '.join(issue['dependencies'][:2]) if issue['dependencies'] else 'None'
        if len(deps) > 30:
            deps = deps[:27] + '...'
        
        content += f"| {i:02d} | {task_id} | {title[:30]}... | {issue['priority']} | {issue['category'].replace('_', ' ')[:10]} | {issue['estimate']} | {deps} |\n"
    
    return content

def main():
    # Generate immediate action guide
    action_guide = generate_immediate_action_guide()
    action_path = os.path.join(os.path.dirname(__file__), 'IMMEDIATE_ISSUES_TO_CREATE.md')
    
    with open(action_path, 'w', encoding='utf-8') as f:
        f.write(action_guide)
    
    # Generate quick reference
    quick_ref = create_quick_reference()
    ref_path = os.path.join(os.path.dirname(__file__), 'QUICK_REFERENCE.md')
    
    with open(ref_path, 'w', encoding='utf-8') as f:
        f.write(quick_ref)
    
    print("✅ IMMEDIATE ACTION FILES CREATED")
    print(f"📋 Immediate Issues Guide: {action_path}")
    print(f"📊 Quick Reference Table: {ref_path}")
    print(f"\n🚀 NEXT STEPS:")
    print(f"1. Review the immediate action guide")
    print(f"2. Set up GitHub repository labels and milestones")
    print(f"3. Create the first 10 issues TODAY")
    print(f"4. Assign team members and start development")

if __name__ == "__main__":
    main()