# Dot Game

The goal of this exercise is to create a game. In the game, dots move from the top to the bottom of the screen. A player tries to click on the dots, and receives points when they are successful.

![dot-game](https://cdn.glitch.com/e874e279-3a76-4f32-aae0-288b2def7d0d%2Fdot-game-scoreboard_315x556.jpg?v=1629037628872)

## Building the Game

- The game starts when the page loads.
- When the game starts, a new dot should appear on the playing area.
- Dots fall smoothly at a constant rate. A player should be able to use a slider to control the speed at which dots fall. When the slider is changed, all dots including currently falling dots and newly created dots should change speed.
- At the slider's left-most position, dots should fall at a speed of 10px per second, and at the slider's right-most position, should fall at a speed of 100px per second.
- New dots appear at a random horizontal position at the top of the box. A dot should not "hang" off the left or right edge of the screen. Dots should vary randomly in size from 10px in diameter to 100px in diameter.
- A new dot should also appear every 1000ms.

# My assumption

- allow dots to be overlaped each other
- when overlapping, a dot which is created first is in the front, and a dot which is created later is in the back
- when user clicks on overlapping dots, the front dot is picked
- dot size as follows, `10`,`20`,`30`,`40`,`50`,`60`,`70`,`80`,`90`,`100` px, to be easy for calcualting score
- if browser window is resized, the game will be automatically restarted

## Score (Assumption)

When a player touches or clicks a dot, the dot should disappear from the box and a new dot should appear at the top of the page 1000ms later. The score should be incremented by a value inversely proportional to the size of the dot, with 10px dots worth 10 points, and 100px dots worth 1 point.

| Diameter    | Points |
| ----------- | ------ |
| 10 px       | 10     |
| 11 - 20 px  | 9      |
| 21 - 30 px  | 8      |
| 31 - 40 px  | 7      |
| 41 - 50 px  | 6      |
| 51 - 60 px  | 5      |
| 61 - 70 px  | 4      |
| 71 - 80 px  | 3      |
| 81 - 90 px  | 2      |
| 91 - 100 px | 1      |
