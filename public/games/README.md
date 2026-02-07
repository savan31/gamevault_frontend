# Games Directory Structure

This directory contains all locally hosted HTML5 games.

## Directory Structure

```
games/
├── pacman/
│   └── index.html          # Main game file
│   ├── assets/             # (Optional) Game assets
│   │   ├── images/
│   │   ├── audio/
│   │   ├── fonts/
│   │   └── css/
│   └── js/                 # (Optional) JavaScript files
│
└── [game-slug]/            # Add more games here
    └── index.html
```

## Adding a New Game

### Step 1: Create Game Directory
Create a new folder with your game's slug (URL-friendly name):
```
games/your-game-name/
```

### Step 2: Add index.html
Place your game's HTML file as `index.html` in the game directory.

### Step 3: Add Game to Database
Run the add-game script from the project root:
```bash
node backend/scripts/add-game.js <slug> <title> <category> [options]
```

**Example:**
```bash
node backend/scripts/add-game.js pacman "Pacman" "arcade" \
  --description "Classic arcade game" \
  --game-url "/games/pacman/index.html" \
  --game-type "local-html" \
  --featured \
  --trending
```

### Available Options:
- `--description <text>` - Game description
- `--instructions <text>` - How to play instructions
- `--game-url <url>` - Game URL (default: `/games/<slug>/index.html`)
- `--game-type <type>` - `local-html`, `local`, or `external` (default: `local-html`)
- `--thumbnail-url <url>` - Thumbnail image URL
- `--featured` - Mark as featured
- `--trending` - Mark as trending
- `--multiplayer` - Mark as multiplayer
- `--mobile-friendly` - Mark as mobile friendly

### Available Categories:
- `arcade`
- `action`
- `puzzle`
- `racing`
- `shooting`
- `sport`
- `multiplayer`
- `casual`

## Game Requirements

### HTML Structure
Your `index.html` should be a standalone HTML file that:
- Works in an iframe
- Doesn't rely on external dependencies (or includes them)
- Is responsive and mobile-friendly
- Implements game lifecycle hooks (optional, for ads integration)

### Game Lifecycle Hooks (Optional)
For H5 Games Ads integration, you can call these global functions:
```javascript
// When game starts
if (window.gameStart) window.gameStart();

// When game pauses
if (window.gamePause) window.gamePause();

// When game resumes
if (window.gameResume) window.gameResume();

// When game ends
if (window.gameOver) window.gameOver(score);
```

### Asset Paths
Use relative paths for assets:
```html
<!-- Good -->
<img src="images/player.png" />
<script src="js/game.js"></script>
<link rel="stylesheet" href="css/style.css" />

<!-- Bad (absolute paths won't work) -->
<img src="/images/player.png" />
```

## Testing Your Game

1. Place your game files in `frontend/public/games/[game-slug]/`
2. Add the game to the database using the script
3. Restart your backend server
4. Visit `http://localhost:3000/game/[game-slug]` to test

## Notes

- Games are served as static files from the `public` folder
- Next.js will serve files from `/games/*` automatically
- Make sure your game works in an iframe
- Test on mobile devices for mobile-friendly games



