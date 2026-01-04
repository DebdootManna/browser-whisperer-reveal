# Color Theme Documentation

## Current Color Palette

Based on: https://coolors.co/palette/001524-15616d-ffecd1-ff7d00-78290f

### Color Breakdown

| Color Name | Hex Code | HSL | Usage |
|------------|----------|-----|-------|
| Dark Blue Navy | `#001524` | `hsl(201, 100%, 7%)` | Background, Primary BG |
| Teal | `#15616D` | `hsl(186, 65%, 26%)` | Cards, Secondary elements |
| Cream | `#FFECD1` | `hsl(39, 100%, 92%)` | Text, Foreground |
| Bright Orange | `#FF7D00` | `hsl(24, 100%, 50%)` | Primary actions, Accents |
| Dark Brown | `#78290F` | `hsl(18, 78%, 26%)` | Destructive actions, Warnings |

## CSS Variables Mapping

```css
--background: hsl(201, 100%, 7%)       /* #001524 - Dark Blue Navy */
--foreground: hsl(39, 100%, 92%)       /* #FFECD1 - Cream */

--card: hsl(186, 65%, 26%)             /* #15616D - Teal */
--card-foreground: hsl(39, 100%, 92%)  /* #FFECD1 - Cream */

--popover: hsl(201, 100%, 10%)         /* Slightly lighter navy */
--popover-foreground: hsl(39, 100%, 92%) /* #FFECD1 - Cream */

--primary: hsl(24, 100%, 50%)          /* #FF7D00 - Bright Orange */
--primary-foreground: hsl(201, 100%, 7%) /* Dark for contrast */

--secondary: hsl(186, 65%, 26%)        /* #15616D - Teal */
--secondary-foreground: hsl(39, 100%, 92%) /* #FFECD1 - Cream */

--muted: hsl(186, 45%, 22%)            /* Darker Teal */
--muted-foreground: hsl(39, 60%, 75%)  /* Muted Cream */

--accent: hsl(24, 100%, 50%)           /* #FF7D00 - Orange */
--accent-foreground: hsl(201, 100%, 7%) /* Dark for contrast */

--destructive: hsl(18, 78%, 26%)       /* #78290F - Dark Brown */
--destructive-foreground: hsl(39, 100%, 92%) /* #FFECD1 - Cream */

--border: hsl(186, 50%, 35%)           /* Lighter Teal border */
--input: hsl(186, 65%, 20%)            /* Darker Teal input */
--ring: hsl(24, 100%, 50%)             /* #FF7D00 - Orange focus ring */
```

## Typography

### Font Family

- **Headings (h1-h6):** Jersey 25 (Google Fonts)
  - Display font for impact
  - Letter spacing: 0.05em for readability
  
- **Body Text:** System font stack
  - system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
  - Better readability for longer text

### Google Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap" rel="stylesheet" />
```

## Color Usage Guidelines

### Backgrounds
- **Main Background:** Dark Blue Navy (`#001524`)
- **Cards/Panels:** Teal (`#15616D`)
- **Overlays:** Slightly lighter navy

### Text
- **Primary Text:** Cream (`#FFECD1`)
- **Muted Text:** Muted Cream (75% lightness)
- **Links:** Orange (`#FF7D00`)

### Interactive Elements
- **Primary Buttons:** Orange background (`#FF7D00`) with dark text
- **Secondary Buttons:** Teal background (`#15616D`) with cream text
- **Hover States:** 90% opacity or 80% saturation
- **Focus Rings:** Orange (`#FF7D00`)

### Status Colors
- **Success:** Teal variations
- **Warning:** Orange (`#FF7D00`)
- **Error/Destructive:** Dark Brown (`#78290F`)
- **Info:** Lighter Teal

### Borders & Dividers
- **Default Borders:** Lighter Teal (35% lightness)
- **Focus Borders:** Orange (`#FF7D00`)
- **Subtle Dividers:** Dark Teal (22% lightness)

## Accessibility Considerations

### Contrast Ratios

- **Cream on Dark Blue:** ~14:1 (AAA compliant)
- **Cream on Teal:** ~6:1 (AA compliant)
- **Dark on Orange:** ~8:1 (AAA compliant)
- **Cream on Dark Brown:** ~5:1 (AA compliant)

### Guidelines

1. Always use Cream text on dark backgrounds
2. Use Dark Blue or Navy text on Orange buttons for maximum contrast
3. Avoid Cream on Orange (poor contrast)
4. Test all color combinations for WCAG AA compliance minimum

## Dark Mode

This theme IS the dark mode. For potential light mode:

### Light Mode Suggestions (Future)
- **Background:** Cream (`#FFECD1`)
- **Foreground:** Dark Blue Navy (`#001524`)
- **Primary:** Orange (`#FF7D00`)
- **Secondary:** Teal (lighter shade)
- **Accents:** Darker variants of current colors

## Implementation Examples

### Tailwind Classes

```tsx
// Primary Button
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click Me
</Button>

// Card
<Card className="bg-card text-card-foreground border-border">
  <CardContent>Content</CardContent>
</Card>

// Text
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
<a className="text-primary hover:text-primary/90">Link</a>
```

### Direct CSS

```css
.custom-element {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

.custom-button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

## Color Psychology

- **Dark Blue Navy:** Trust, stability, professionalism
- **Teal:** Balance, calmness, clarity
- **Cream:** Warmth, elegance, sophistication
- **Orange:** Energy, enthusiasm, call-to-action
- **Dark Brown:** Reliability, grounding, seriousness

Perfect for a privacy/security tool - combines trust (blue), clarity (teal), and urgency (orange).

## Browser Support

All colors use HSL format which is supported in:
- Chrome/Edge 1+
- Firefox 1+
- Safari 3.1+
- All modern browsers

CSS custom properties supported in:
- Chrome/Edge 49+
- Firefox 31+
- Safari 9.1+
- All modern browsers

---

**Last Updated:** 2024
**Theme Version:** 2.0.0