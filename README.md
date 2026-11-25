# Dhun 🎵

A simple music streaming app built with **React Native**, **Expo** and **TypeScript**. It fetches free, legally licensed music from the **Jamendo API**, lets you browse trending songs, search by song or artist, and play music with a mini player and a full-screen Now Playing page.

## Features

- Trending songs on the Home screen
- Search songs or artists
- Play, pause, next and previous
- Mini player that stays visible while you switch tabs
- Full-screen Now Playing page (opens as a modal)
- Dark theme
- Runs on Android, iOS (via Expo Go) and web

## Tech stack

| Tool | Purpose |
|---|---|
| Expo (React Native) | App framework |
| Expo Router | File-based navigation |
| TypeScript | Type safety |
| expo-audio | Audio playback |
| Jamendo API | Free music source |
| React Context | Global player state |

## Project structure

```
Dhun/
├── app.json                 Expo config (name, icon, splash, web settings)
├── package.json             Dependencies and scripts
├── tsconfig.json            TypeScript settings
├── .gitignore               Files Git should skip
├── .env                     API key (not committed)
├── README.md                This file
├── assets/                  Images and icons
├── scripts/                 Starter helper scripts (reset-project.js)
└── src/
    ├── app/                 SCREENS (each file is a page)
    │   ├── _layout.tsx          Root layout, wraps app in PlayerProvider
    │   ├── player.tsx           Full-screen Now Playing page
    │   └── (tabs)/
    │       ├── _layout.tsx      Bottom tab bar + MiniPlayer
    │       ├── index.tsx        Home: trending songs
    │       └── search.tsx       Search page
    ├── components/          REUSABLE UI
    │   ├── SongRow.tsx          One song in a list
    │   ├── MiniPlayer.tsx       Small player bar at the bottom
    │   ├── themed-text.tsx      Starter helper (light/dark text)
    │   └── themed-view.tsx      Starter helper (light/dark background)
    ├── context/
    │   └── PlayerContext.tsx    Global audio state and controls
    ├── services/
    │   └── musicApi.ts          All API calls (Jamendo)
    ├── types/
    │   └── music.ts             The Song type
    ├── constants/
    │   └── theme.ts             Starter theme colors
    └── hooks/
        ├── use-color-scheme.ts       Starter helpers
        ├── use-color-scheme.web.ts
        └── use-theme.ts
```

## File details

### Root files

| File | What it does |
|---|---|
| `app.json` | App name, icon, splash screen and platform settings. For web, `"output": "single"` is set so the page renders only in the browser (the audio player does not work in server rendering). |
| `package.json` | Lists dependencies (`expo`, `expo-router`, `expo-audio`, `react-native`, ...) and scripts such as `npm start`. |
| `tsconfig.json` | TypeScript configuration. |
| `.gitignore` | Tells Git to skip `node_modules`, `.expo` and `.env`. |
| `.env` | Holds `EXPO_PUBLIC_JAMENDO_ID`. Never commit this file. |

### Screens: `src/app/`

Every file here becomes a route. Each one **must** have an `export default` component, or Expo Router shows an "Element type is invalid" error.

| File | Route | What it does |
|---|---|---|
| `_layout.tsx` | root | Wraps the whole app in `PlayerProvider` and sets up a `Stack` navigator. The `player` screen opens as a modal. |
| `(tabs)/_layout.tsx` | tabs | Creates the bottom tab bar (Home and Search) and shows `MiniPlayer` above it. The folder name in brackets means it does not appear in the URL. |
| `(tabs)/index.tsx` | `/` | Home screen. Calls `getTrending()` on load, shows a loading spinner, then lists songs with `FlatList` and `SongRow`. Tapping a song calls `playSong`. |
| `(tabs)/search.tsx` | `/search` | Search screen. A text input calls `searchSongs()` when you press Enter and lists the results. |
| `player.tsx` | `/player` | Now Playing page. Shows big cover art, title, artist and the prev / play-pause / next buttons. A down arrow closes it. |

### Components: `src/components/`

| File | What it does |
|---|---|
| `SongRow.tsx` | One row in a song list: cover image, title and artist. Takes `song` and `onPress` props. Used on Home and Search. |
| `MiniPlayer.tsx` | Small bar at the bottom showing the current song and a play/pause button. Tapping it opens the full player. Returns nothing when no song is playing. |
| `themed-text.tsx`, `themed-view.tsx` | Starter helpers for light and dark mode. Not used by Dhun. Safe to delete together with `hooks/` and `constants/`. |

### Logic

| File | What it does |
|---|---|
| `context/PlayerContext.tsx` | The brain of the app. Creates one audio player with `useAudioPlayer`, stores the current song and queue, and exposes `playSong`, `toggle`, `next` and `prev` through the `usePlayer()` hook. Because it wraps the whole app, music keeps playing when you change tabs. |
| `services/musicApi.ts` | The only file that talks to the internet. `getTrending()` and `searchSongs()` call Jamendo and convert each result into the app's `Song` type. To switch to another music API, only this file changes. |
| `types/music.ts` | Defines the `Song` type used everywhere. |

### The Song type

```ts
type Song = {
  id: string;
  title: string;
  artist: string;
  cover: string;     // album art URL
  url: string;       // audio stream URL
  duration: number;  // seconds
};
```

## How it works

```
Jamendo API → musicApi.ts → Home / Search screen → SongRow
                                      │ tap
                                      ▼
                             PlayerContext.playSong()
                                      │
                      MiniPlayer  ◄───┴───►  Player screen
```

1. A screen calls a function in `musicApi.ts` and gets a list of `Song` objects.
2. The list is shown with `SongRow` components.
3. Tapping a row calls `playSong(song, list)`. The context loads the audio URL, starts playback and remembers the list as the queue.
4. `MiniPlayer` and the `player` screen read the same state through `usePlayer()`, so they always stay in sync.

## Getting started

### Requirements

- Node.js (LTS version)
- A phone with the **Expo Go** app, or a browser
- A free Jamendo `client_id` from https://devportal.jamendo.com

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Install the audio package
npx expo install expo-audio

# 3. Create a .env file in the project root
EXPO_PUBLIC_JAMENDO_ID=your_client_id

# 4. Start the app (clear cache)
npx expo start -c
```

In `src/services/musicApi.ts`, read the key with:

```ts
const CLIENT_ID = process.env.EXPO_PUBLIC_JAMENDO_ID;
```

Then press `w` to open in the browser, or scan the QR code with Expo Go (phone and PC must be on the same Wi-Fi). If the QR code does not connect, try `npx expo start --tunnel`.

### Scripts

| Command | What it does |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` | Open on an Android device or emulator |
| `npm run ios` | Open on an iOS simulator (macOS only) |
| `npm run web` | Open in the browser |

Always use `npx expo ...` instead of a global `expo` command.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Missing script: "dev"` | This is an Expo project. Use `npm start`. |
| `Element type is invalid` or `missing the required default export` | A file in `src/app` is empty or has no `export default`. Check file sizes with `dir src\app /s`. |
| Red line on an import | The imported file is empty or in the wrong folder. Save it, then run **TypeScript: Restart TS Server**. |
| `Audio is not defined` | Set `"output": "single"` under `"web"` in `app.json`. |
| Empty Home screen | Missing or wrong Jamendo `client_id`. |
| Legacy `expo-cli` warning | Run `npm uninstall -g expo-cli` and use `npx expo`. |

## Known limitations

- Background playback (music continuing with the screen locked) does not work properly in Expo Go. It needs a development build.
- There is no progress bar or seek control yet.
- The next song does not start automatically when a track ends.
- Jamendo mainly hosts independent artists, so you will not find mainstream or Bollywood hits.

## Roadmap

- [ ] Progress bar and seek
- [ ] Auto-play next song
- [ ] Favorites / library saved on the device
- [ ] Playlists
- [ ] Shuffle and repeat
- [ ] Background playback and lock-screen controls

## Security note

Do not commit your Jamendo `client_id` to a public repository. Keep it in `.env` and make sure `.env` is listed in `.gitignore` before pushing to GitHub.

## Credits

- Music and metadata provided by [Jamendo](https://www.jamendo.com)
- Built with [Expo](https://expo.dev)

## License

See the `LICENSE` file.