# Eventyay design system

## Direction

Playful conference posters sit beside a restrained community workspace. Bright daylight informs the white default theme. Orange remains the identity color. Visitors discover gatherings, reserve demonstration tickets, then explore the organizer workspace.

## Tokens

- Font: self-hosted Manrope, 200–800 variable weight.
- Ground: #fcfcfa. Panels: #ffffff. Text: #242521. Secondary text: #646660.
- Accent: #f56632. Accent text: #873018. Soft orange: #fff0e9.
- Dividers: #e3e4de. Quiet regions: #f1f2ed.
- Corners: 20px artwork, 16px organizer panels, 11px buttons.
- Display: fluid 42–78px. Workspace headings: 38px. Section headings: 34px. Body: 14–16px.
- Spacing: 8px base. Page gutter: 5%. Card gaps: 24px. Workspace padding: 40px.

## Motion

Poster fans assemble on first entry and spread on precise-pointer hover. Event artwork rotates on pointer hover. Organizer navigation is instant. Dialogs and first public page entries take 220ms with exponential ease-out. Previously visited public routes skip entry animation. Keyboard input, system reduced motion, and the visible Pause control disable animation and transitions. Coarse-pointer inputs use at least 16px text to avoid mobile focus zoom.

## Accessibility

Use semantic navigation, visible focus, labeled forms, native dialogs, 44px primary controls, and polite status announcements. Accent changes automatically select contrasting button text. Dark mode changes the full token set. Do not use color as the only indicator of saved, accepted, or checked-in state.

## Responsive behavior

Below 760px the navigation becomes a second header row. The poster fan follows the headline, discovery uses two columns, organizer navigation becomes a horizontal strip, and detail pages stack ticket selection above information.

## Scope

The implementation is an interactive design preview under app/eventyay/webapp/redesign. Demo transactions persist locally. Production authentication, payments, inventory, email, and video need backend integration.
