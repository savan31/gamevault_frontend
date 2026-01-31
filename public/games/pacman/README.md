# PAC MAN Game Files

## Folder Structure

```
pacman/
├── index.html          # Your main game HTML file (replace the existing one)
├── assets/
│   ├── audio/         # Place all your audio files here
│   ├── images/        # Place image files here (if needed)
│   ├── css/           # Place CSS files here (if needed)
│   └── fonts/         # Place font files here (if needed)
└── js/                # Place JavaScript files here (if needed)
```

## Instructions

1. **Replace `index.html`**: Copy your PAC MAN game's `index.html` file and replace the existing one in this folder.

2. **Add Audio Files**: Place all your audio files (`.mp3`, `.wav`, `.ogg`, etc.) in the `assets/audio/` folder.

3. **Update Asset Paths**: Make sure your `index.html` uses relative paths to reference audio files:
   ```html
   <!-- Good -->
   <audio src="assets/audio/pacman-eat.mp3"></audio>
   <audio src="assets/audio/pacman-die.mp3"></audio>
   
   <!-- Bad (won't work) -->
   <audio src="/assets/audio/pacman-eat.mp3"></audio>
   ```

4. **Add Other Assets**: 
   - Images → `assets/images/`
   - CSS files → `assets/css/`
   - Fonts → `assets/fonts/`
   - JavaScript files → `js/`

## Example Audio Usage in HTML

```html
<audio id="eatSound" src="assets/audio/pacman-eat.mp3" preload="auto"></audio>
<audio id="dieSound" src="assets/audio/pacman-die.mp3" preload="auto"></audio>

<script>
  const eatSound = document.getElementById('eatSound');
  const dieSound = document.getElementById('dieSound');
  
  // Play sound when pacman eats a dot
  function playEatSound() {
    eatSound.currentTime = 0;
    eatSound.play();
  }
</script>
```

## After Adding Your Files

Once you've added your game files, you'll need to add the game to the database. Run this command from the project root:

```bash
node backend/scripts/add-game.js pacman "PAC MAN" "arcade" --description "Classic PAC MAN arcade game" --game-url "/games/pacman/index.html" --game-type "local-html" --featured --trending
```

## Testing

After adding your files and registering the game:
1. Restart your backend server
2. Visit `http://localhost:3000/game/pacman` to test your game

