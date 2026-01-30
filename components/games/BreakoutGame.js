// Breakout Game - HTML5 Canvas Game
// MIT License - Open Source

import { useEffect, useRef, useState } from 'react';

const BreakoutGame = ({ onGameStart, onGameOver, onGamePause, onGameResume }) => {
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const [gameState, setGameState] = useState('ready'); // ready, playing, paused, gameover
    const [paddle, setPaddle] = useState({ x: 0, y: 0, width: 100 });
    const [ball, setBall] = useState({ x: 0, y: 0, dx: 4, dy: -4, radius: 8 });
    const [bricks, setBricks] = useState([]);
    const [mouseX, setMouseX] = useState(0);

    const BRICK_ROWS = 5;
    const BRICK_COLS = 8;
    const BRICK_WIDTH = 75;
    const BRICK_HEIGHT = 20;
    const BRICK_PADDING = 5;
    const BRICK_OFFSET_TOP = 60;
    const BRICK_OFFSET_LEFT = 35;

    // Initialize game
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = 640;
        const height = canvas.height = 480;

        // Initialize bricks
        const initBricks = () => {
            const newBricks = [];
            for (let r = 0; r < BRICK_ROWS; r++) {
                for (let c = 0; c < BRICK_COLS; c++) {
                    newBricks.push({
                        x: c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT,
                        y: r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP,
                        status: 1,
                        color: `hsl(${r * 60}, 70%, 50%)`
                    });
                }
            }
            return newBricks;
        };

        // Initialize game objects
        const initGame = () => {
            setPaddle({ x: width / 2 - 50, y: height - 30, width: 100 });
            setBall({ x: width / 2, y: height - 50, dx: 4, dy: -4, radius: 8 });
            setBricks(initBricks());
        };

        if (gameState === 'ready') {
            initGame();
        }

        // Draw functions
        const drawPaddle = () => {
            ctx.fillStyle = '#8b5cf6';
            ctx.fillRect(paddle.x, paddle.y, paddle.width, 10);
            ctx.strokeStyle = '#a78bfa';
            ctx.strokeRect(paddle.x, paddle.y, paddle.width, 10);
        };

        const drawBall = () => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e';
            ctx.fill();
            ctx.strokeStyle = '#16a34a';
            ctx.stroke();
            ctx.closePath();
        };

        const drawBricks = () => {
            bricks.forEach(brick => {
                if (brick.status === 1) {
                    ctx.fillStyle = brick.color;
                    ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
                    ctx.strokeStyle = '#ffffff';
                    ctx.strokeRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
                }
            });
        };

        const drawUI = () => {
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Arial';
            ctx.fillText(`Score: ${score}`, 10, 20);
            ctx.fillText(`Lives: ${lives}`, width - 100, 20);

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

        // Collision detection
        const checkCollisions = () => {
            // Ball and paddle collision
            if (
                ball.x + ball.radius > paddle.x &&
                ball.x - ball.radius < paddle.x + paddle.width &&
                ball.y + ball.radius > paddle.y &&
                ball.y - ball.radius < paddle.y + 10
            ) {
                const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
                ball.dx = hitPos * 5;
                ball.dy = -Math.abs(ball.dy);
            }

            // Ball and bricks collision
            bricks.forEach(brick => {
                if (brick.status === 1) {
                    if (
                        ball.x + ball.radius > brick.x &&
                        ball.x - ball.radius < brick.x + BRICK_WIDTH &&
                        ball.y + ball.radius > brick.y &&
                        ball.y - ball.radius < brick.y + BRICK_HEIGHT
                    ) {
                        ball.dy = -ball.dy;
                        brick.status = 0;
                        setScore(prev => prev + 10);
                        setBricks([...bricks]);

                        // Check if all bricks destroyed
                        if (bricks.every(b => b.status === 0)) {
                            handleLevelComplete();
                        }
                    }
                }
            });

            // Ball and walls collision
            if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx;
            }
            if (ball.y - ball.radius < 0) {
                ball.dy = -ball.dy;
            }

            // Ball falls below paddle
            if (ball.y + ball.radius > height) {
                setLives(prev => {
                    const newLives = prev - 1;
                    if (newLives <= 0) {
                        handleGameOver();
                    } else {
                        // Reset ball
                        setBall({ x: width / 2, y: height - 50, dx: 4, dy: -4, radius: 8 });
                    }
                    return newLives;
                });
            }
        };

        // Game update
        const updateGame = () => {
            if (gameState !== 'playing' || isPaused) return;

            // Update paddle position (follow mouse)
            const newPaddleX = mouseX - paddle.width / 2;
            const clampedX = Math.max(0, Math.min(width - paddle.width, newPaddleX));
            setPaddle(prev => ({ ...prev, x: clampedX }));

            // Update ball position
            setBall(prev => ({
                ...prev,
                x: prev.x + prev.dx,
                y: prev.y + prev.dy
            }));

            checkCollisions();
        };

        // Render
        const render = () => {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, width, height);
            drawBricks();
            drawPaddle();
            drawBall();
            drawUI();
        };

        // Game loop
        if (gameState === 'playing' && !isPaused) {
            gameLoopRef.current = requestAnimationFrame(function gameLoop() {
                updateGame();
                render();
                if (gameState === 'playing' && !isPaused) {
                    gameLoopRef.current = requestAnimationFrame(gameLoop);
                }
            });
        } else {
            render();
        }

        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [paddle, ball, bricks, score, lives, gameState, isPaused, mouseX]);

    // Mouse controls
    useEffect(() => {
        const handleMouseMove = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            setMouseX(e.clientX - rect.left);
        };

        if (gameState === 'playing') {
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [gameState]);

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

            if (gameState === 'playing' && (e.key === ' ' || e.key === 'Escape')) {
                togglePause();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameState]);

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

    const handleLevelComplete = () => {
        if (window.showInterstitialAd) window.showInterstitialAd();
        // Reset for next level
        const canvas = canvasRef.current;
        if (canvas) {
            const w = canvas.width;
            const h = canvas.height;
            setBricks(bricks.map(brick => ({ ...brick, status: 1 })));
            setBall({ x: w / 2, y: h - 50, dx: 4, dy: -4, radius: 8 });
        }
    };

    const handleGameOver = () => {
        setGameState('gameover');
        if (onGameOver) onGameOver(score);
        if (window.gameOver) window.gameOver(score);
        if (window.showInterstitialAd) window.showInterstitialAd();
    };

    const resetGame = () => {
        setScore(0);
        setLives(3);
        setGameState('ready');
        setIsPaused(false);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <canvas
                ref={canvasRef}
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

export default BreakoutGame;

