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
├── app.json                 Expo config (name, icon, splash)
├── package.json             Dependencies and scripts
├── tsconfig.json            TypeScript settings
├── assets/                  Images and icons
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
    │   └── MiniPlayer.tsx       Small player bar at the bottom
    ├── context/
    │   └── PlayerContext.tsx    Global audio state and controls
    ├── services/
    │   └── musicApi.ts          All API calls (Jamendo)
    ├── types/
    │   └── music.ts             The Song type
    ├── constants/ and hooks/    Theme helpers from the Expo starter
```

## How it works

1. **Screens** (`src/app`) display data and handle taps. Each file becomes a route through Expo Router.
2. **`musicApi.ts`** is the only file that talks to the internet. It converts Jamendo's response into the app's own `Song` type. To switch to another API later, only this file needs to change.
3. **`PlayerContext.tsx`** owns the single audio player for the whole app. It stores the current song, the queue, and the `playSong`, `toggle`, `next` and `prev` functions. Because it wraps the whole app, music keeps playing when you change tabs.
4. **`SongRow`** and **`MiniPlayer`** are reusable pieces. `SongRow` is used on both Home and Search.

### Data flow

```
Jamendo API → musicApi.ts → Home / Search screen → SongRow
                                      │ tap
                                      ▼
                             PlayerContext.playSong()
                                      │
                      MiniPlayer  ◄───┴───►  Player screen
```

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

# 3. Add your Jamendo client_id in src/services/musicApi.ts
#    const CLIENT_ID = 'YOUR_JAMENDO_CLIENT_ID';

# 4. Start the app
npm start
```

Then press `w` to open in the browser, or scan the QR code with Expo Go (phone and PC must be on the same Wi-Fi). If the QR code does not connect, try `npx expo start --tunnel`.

### Scripts

| Command | What it does |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` | Open on an Android device or emulator |
| `npm run ios` | Open on an iOS simulator (macOS only) |
| `npm run web` | Open in the browser |

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
- [ ] Move the API key into an `.env` file

## Security note

Do not commit your Jamendo `client_id` to a public repository. Move it into an `.env` file (for example `EXPO_PUBLIC_JAMENDO_ID`) and add that file to `.gitignore` before pushing to GitHub.

## Credits

- Music and metadata provided by [Jamendo](https://www.jamendo.com)
- Built with [Expo](https://expo.dev)

## License

See the `LICENSE` file.