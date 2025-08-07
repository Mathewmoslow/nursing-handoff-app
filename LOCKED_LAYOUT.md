# Locked Layout Configuration

## Commit Hash: dee69eb
## Date: 2025-08-07

This document locks the current UI layout configuration. Do not modify the following components without approval:

## Protected Components (DO NOT MODIFY)

### Core Layout System
- `/src/components/UnifiedGrid/` - Main grid container system
- `/src/components/FormLayout/` - Overall form structure
- `/src/components/AssessmentBox/` - Individual assessment boxes
- `/src/components/AssessmentGrid/` - Grid arrangement logic

### Vitals & Labs (Horizontal Table Layout)
- `/src/components/VitalsSection/` - Time as rows, parameters as columns
- `/src/components/LabsSection/` - Time as rows, parameters as columns

### Responsive Breakpoints
- Desktop: 1440px+ (6 columns)
- Laptop: 1024-1439px (4 columns)
- iPad: 768-1023px (3 columns)
- iPhone landscape: 568-767px (3 columns)
- iPhone portrait: < 568px (2 columns)

## Safe to Modify

### Add New Features To:
- New assessment categories in `/src/constants/formSections.ts`
- Additional vital signs or lab values
- New modal components
- Additional functionality that doesn't change layout

### Styling Updates (with caution):
- Colors and themes
- Fonts (maintain size ratios)
- Shadows and borders
- Icons

## How to Add Features Without Breaking Layout

1. **Adding new assessment boxes:**
   - Add to formSections.ts
   - They will automatically integrate into the grid

2. **Adding new functionality:**
   - Create new components in separate folders
   - Import into existing components without modifying structure

3. **Adding data fields:**
   - Extend types in `/src/types/index.ts`
   - Add to existing components' logic

## Reverting if Something Breaks

```bash
# View this stable commit
git show dee69eb

# Revert to this stable state
git checkout dee69eb -- src/components/

# Or reset everything
git reset --hard dee69eb
```

## Testing Checklist Before Changes
- [ ] iPhone portrait mode (no overlapping)
- [ ] iPad (all boxes visible)
- [ ] Desktop (6-column grid working)
- [ ] Vitals/Labs tables horizontal
- [ ] No horizontal scrolling on mobile