// Snake Game - HTML5 Canvas Game
// MIT License - Open Source

import { useEffect, useRef, useState } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame = ({ onGameStart, onGameOver, onGamePause, onGameResume }) => {
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [gameState, setGameState] = useState('ready'); // ready, playing, paused, gameover
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [speed, setSpeed] = useState(INITIAL_SPEED);

    // Initialize game
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Generate random food position
        const generateFood = () => {
            let newFood;
            do {
                newFood = {
                    x: Math.floor(Math.random() * GRID_SIZE),
                    y: Math.floor(Math.random() * GRID_SIZE)
                };
            } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
            return newFood;
        };

        // Draw functions
        const drawCell = (x, y, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
        };

        const drawSnake = () => {
            snake.forEach((segment, index) => {
                const color = index === 0 ? '#22c55e' : '#16a34a';
                drawCell(segment.x, segment.y, color);
            });
        };

        const drawFood = () => {
            drawCell(food.x, food.y, '#ef4444');
        };

        const drawGrid = () => {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, width, height);
        };

        const drawUI = () => {
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Arial';
            ctx.fillText(`Score: ${score}`, 10, 20);
            if (gameState === 'paused') {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = '#ffffff';
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('PAUSED', width / 2, height / 2);
                ctx.textAlign = 'left';
            }
            if (gameState === 'gameover') {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = '#ffffff';
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER', width / 2, height / 2 - 20);
                ctx.font = '16px Arial';
                ctx.fillText(`Final Score: ${score}`, width / 2, height / 2 + 10);
                ctx.textAlign = 'left';
            }
        };

        // Game logic
        const updateGame = () => {
            if (gameState !== 'playing' || isPaused) return;

            const head = { ...snake[0] };
            head.x += direction.x;
            head.y += direction.y;

            // Check wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                handleGameOver();
                return;
            }

            // Check self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                handleGameOver();
                return;
            }

            const newSnake = [head, ...snake];

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(prev => {
                    const newScore = prev + 10;
                    if (newScore % 50 === 0 && newScore > 0) {
                        setSpeed(prev => Math.max(80, prev - 10));
                    }
                    return newScore;
                });
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        // Render loop
        const render = () => {
            drawGrid();
            drawSnake();
            drawFood();
            drawUI();
        };

        // Game loop
        if (gameState === 'playing' && !isPaused) {
            gameLoopRef.current = setInterval(() => {
                updateGame();
                render();
            }, speed);
        } else {
            render();
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [snake, direction, food, score, gameState, isPaused, speed]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameState === 'ready' && (e.key === ' ' || e.key === 'Enter')) {
                startGame();
                return;
            }

            if (gameState === 'gameover' && (e.key === ' ' || e.key === 'Enter')) {
                resetGame();
                return;
            }

            if (gameState === 'playing') {
                if (e.key === ' ' || e.key === 'Escape') {
                    togglePause();
                    return;
                }

                const key = e.key.toLowerCase();
                if (key === 'arrowup' || key === 'w') {
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                } else if (key === 'arrowdown' || key === 's') {
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                } else if (key === 'arrowleft' || key === 'a') {
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                } else if (key === 'arrowright' || key === 'd') {
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameState, direction]);

    const startGame = () => {
        setGameState('playing');
        setIsPaused(false);
        if (onGameStart) onGameStart();
        if (window.gameStart) window.gameStart();
    };

    const togglePause = () => {
        if (isPaused) {
            setIsPaused(false);
            if (onGameResume) onGameResume();
            if (window.gameResume) window.gameResume();
        } else {
            setIsPaused(true);
            if (onGamePause) onGamePause();
            if (window.gamePause) window.gamePause();
        }
    };

    const handleGameOver = () => {
        setGameState('gameover');
        if (onGameOver) onGameOver(score);
        if (window.gameOver) window.gameOver(score);
        if (window.showInterstitialAd) window.showInterstitialAd();
    };

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection({ x: 1, y: 0 });
        setFood({ x: 15, y: 15 });
        setScore(0);
        setSpeed(INITIAL_SPEED);
        setGameState('ready');
        setIsPaused(false);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <canvas
                ref={canvasRef}
                width={GRID_SIZE * CELL_SIZE}
                height={GRID_SIZE * CELL_SIZE}
                className="bg-slate-900 rounded-lg border-2 border-purple-600"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div className="flex gap-2">
                {gameState === 'ready' && (
                    <button
                        onClick={startGame}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        Start Game
                    </button>
                )}
                {gameState === 'playing' && (
                    <button
                        onClick={togglePause}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                )}
                {gameState === 'gameover' && (
                    <button
                        onClick={resetGame}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        Play Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default SnakeGame;

