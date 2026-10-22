# YouTube UI Clone — Frontend Prototype

A responsive YouTube-style interface built with React, Vite, and Tailwind CSS. This is a **frontend-only UI prototype**: no videos are embedded or streamed, no YouTube APIs are called — the feed is mock data and the watch-page player is a mock interface.

## Features

- YouTube-style header: logo, search bar with live filtering, mic button, create/notifications/account dropdown menus
- Guide sidebar: full 240px guide, 72px collapsed rail (hamburger toggle), mobile drawer with backdrop
- Category chips (HTML, CSS, JavaScript, React, Python) that filter the feed
- Responsive video grid (1 / 2 / 3 / 4 columns by screen size)
- Watch page (`/watch/:id`) with a **mock player**: working play/pause, seekable progress bar, mute toggle, playback-speed menu (0.5x–2x), and fullscreen — no actual video playback
- Roboto typography, YouTube light-theme color palette
- Empty state for no search results

## Tech Stack

- React.js (components, state, derived filtering)
- React Router (client-side routing)
- Tailwind CSS v4 (via @tailwindcss/vite)
- Vite

## Getting Started

```bash
npm install
npm run dev
```

## Notes

- Feed entries (titles, channels, thumbnails via YouTube's public thumbnail service) reference real public programming courses; view counts and durations are approximate mock values.
- Logo and icons are original hand-drawn approximations — this is an educational prototype, not affiliated with YouTube/Google.
