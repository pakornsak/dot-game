# Dot Game

The goal of this exercise is to create a game. In the game, dots move from the top to the bottom of the screen. A player tries to click on the dots, and receives points when they are successful.

![mockup](https://cdn.glitch.com/5637e272-75b8-4d60-af04-8b0adc1b8093%2Fdot-game-scoreboard.png)

## Building the Game

- The game starts when the page loads.
- When the game starts, a new dot should appear on the playing area.
- Dots fall smoothly at a constant rate. A player should be able to use a slider to control the speed at which dots fall. When the slider is changed, all dots including currently falling dots and newly created dots should change speed.
- At the slider's left-most position, dots should fall at a speed of 10px per second, and at the slider's right-most position, should fall at a speed of 100px per second.
- New dots appear at a random horizontal position at the top of the box. A dot should not "hang" off the left or right edge of the screen. Dots should vary randomly in size from 10px in diameter to 100px in diameter.
- When a player touches or clicks a dot, the dot should disappear from the box and a new dot should appear at the top of the page 1000ms later. The score should be incremented by a value inversely proportional to the size of the dot, with 10px dots worth 10 points, and 100px dots worth 1 point.
- A new dot should also appear every 1000ms.

## Score Evaluation
