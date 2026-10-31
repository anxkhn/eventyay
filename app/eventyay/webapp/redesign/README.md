# Eventyay redesign preview

Interactive attendee and organizer redesign. All events, prices, orders, speakers, and attendees are demonstration data. Preferences, saved events, tickets, event edits, review decisions, and check-ins persist in browser storage. Checkout does not charge money or contact Eventyay services.

Serve this directory with any static HTTP server. No frontend build or runtime dependency is needed.

```sh
caddy file-server --root app/eventyay/webapp/redesign --listen 127.0.0.1:3785
```

Routes use URL fragments. Discovery, event details, tickets, dashboard, event management, schedule, speakers, submissions, attendees, check-in, video-room preview, and theme settings are included. CSS respects reduced-motion preferences. User-controlled colors select contrasting button text automatically.

This preview is not yet connected to Django authentication, inventory, payments, email, or video. Production integration should replace sample data with existing scoped Eventyay APIs and preserve backend authorization.

The bundled Manrope font is sourced from Google Fonts, under the SIL Open Font License. Event artwork consists of original typographic layouts and SVG forms.

## Browser checks

With Playwright installed and this directory served, run `node check.cjs`. Set `PLAYWRIGHT_PATH` to the Playwright module path if it is installed elsewhere, `CHROME_PATH` to use an existing Chromium executable, and `AXE_PATH` to the axe-core browser script to include WCAG checks. `PREVIEW_URL` overrides the server URL. Screenshots and check results go to a temporary directory unless `SCREENSHOT_DIR` is set.
