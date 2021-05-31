# To Do list for Expanse of Darkness

## Features
 - Add noises
 - Fix tiles amount
 - Add seperate acceleration / decceleration for midair
 - Fix debug / secret / disabled level loading
 - - Disabled: all
 - - Debug: only debug
 - - Secret: only secret
 - Add commands
 - Slow jump in scaffold
 - Add fullscreen mode
 - Add sign text to lang
 - - Add option to not

## Levels
 - Add Levels
 - Refine level names

## Small stuff
 - Fix camera misalignment on load
 - Redo all low graphics colours

## Bugs
 - Debug centre of movement not aligned to player
 - Super jump occurs when jumping in scaffolding (One piece even)
 - Hitting head in elevator stops all movement
 - Going down in scaffold glitches on floor
 - Player gets stuck on edge of block when jump crouching
 - Entire screen shakes

## Technical
 - Change player death animation to calculate on render
 - Calculate frames on render
 - Add line numbers to level gen errors

## Optimisations
 - Floor and ceil all renders

## CSS / HTML
 - Redo all text
 - Add all text to lang

## Textures
 - Fix ice block tiling
 - Update elevator block
 - Update rat animation

<!-- ## Blocks -->

---

<details>
<summary>
Completed
</summary>

 - Jump mechanics ALL broken
 - Lags stops full jump potential
 - Shadows not aligned to blocks or player
 - Shadow stops rendering if block off screen, even if shadow is not
 - - Canvas creation
 - - - Size
 - Remove canvas from html, generate in game.js
 - Move sections to seperate canvases
 - Lower shadow render resolution
 - Overlay still renders on non-play states
 - Hide player hold in transition
 - Change background (Red?)
 - Overhaul Image files
 - Add ignore disabled levels property for debug mode
 - Shadow (Negative light source)
 - Ice (Slippery)
 - Elevator (Makes everything go upwards)
 - Checkpoint
 - Add back and forth level for debug
 - Change background colour
 - Add animate offset for rats only?
 - Completion key not valid
 - Game completion happens twice
 - Jumping into overhead block does not collide
 - Overhaul Frame
 - Decollision moves player to nearest exit
 - Removed all keysDown on tab / window change
 - Light scattering around screen
 - ADD PARTICLES
 - Make checkpoint flag change when checkpoint set
 - Restart moves player to checkpoint
 - - SHIFT restart to restart whole level
 - Move min max particle values to individual arrays
 - Checkpoint goes up after death
 - Set checkpoint on initial key
 - Change last level name
 - Add unlockSecret()
 - Stop timer on pause
 - Remove extra jump
 - Pause screen
 - Change controls
 - Add rat attribute to enemies
 - Add jetrat
 - Encrypt keycode
 - Crouching while moving stops movement until uncrouch
 - Change player death rotation to stay the same for flip
 - Add digits for restart value in keycode
 - Render blocks that are in frame
 - Overhaul level reader
 - Add issue template to github
 - Add mouse enemy
 - Add door block
 - Crouch goes down in scaffold
 - Crouching in scaffold stops all movement
 - Redo all collisions
 - - Add global player min/max collision checks
 - Add alt font
 - Translate all text

 ## Possibly?
 - Death causes level completion
 - Completing level 0 restarts to 0
 - Fix keycode
 - Player goes into block when uncrouching at same time as moving into 1 block high hole

</details>

---

### Do when finished
 - Remove levels
 - Rewrite text



<br>
<p style="color:#555">
Depression levels are directly proportional to the length of this list
</p>