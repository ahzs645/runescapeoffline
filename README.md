# RuneScape Classic - Offline Browser Edition

A 100% browser-based, offline singleplayer RuneScape Classic experience. No server required - everything runs in your browser using Web Workers and IndexedDB.

## Quick Start

### Option 1: Use Pre-built Files
Just serve the `dist/` folder on any web server:

```bash
cd dist
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 2: Build from Source

```bash
# Initialize submodules
git submodule update --init --recursive

# Install dependencies
cd rsc-client && npm install && cd ..
cd rsc-server && npm install && cd ..

# Build client with offline support
cd rsc-client
npx browserify -t bulkify -t brfs ../index-offline.js > ../dist/offline.bundle.js
cd ..

# Server bundle is pre-built in rsc-server/dist/
cp rsc-server/dist/browser.bundle.min.js dist/server.bundle.min.js
```

## How It Works

| Component | Technology | Location |
|-----------|------------|----------|
| Game Client | JavaScript | Browser (main thread) |
| Game Server | JavaScript | Browser (Web Worker) |
| Save Data | IndexedDB | Browser storage |
| Game Assets | JAG archives | `data204/` |

## Features

- 100% offline - no internet required after initial load
- Persistent saves via IndexedDB
- 8x XP rate for singleplayer fun
- All free-to-play quests included
- ~7.5 MB total size

## File Structure

```
runescapeoffline/
├── dist/                    # Ready-to-deploy files
│   ├── index.html
│   ├── offline.bundle.js    # Client (2 MB)
│   ├── server.bundle.min.js # Server (4.2 MB)
│   └── data204/             # Game assets (1.3 MB)
├── rsc-client/              # Client submodule
├── rsc-server/              # Server submodule
└── index-offline.js         # Custom offline entry point
```

## Credits

Built on top of the [2003scape](https://github.com/2003scape) project:
- [rsc-client](https://github.com/2003scape/rsc-client) - JavaScript port of mudclient204
- [rsc-server](https://github.com/2003scape/rsc-server) - JavaScript game server

## License

This project uses code from 2003scape which is licensed under AGPL-3.0.
