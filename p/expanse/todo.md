# To Do list for Expanse of Darkness

## Features
 - Change controls
 - Crouch goes down in scaffold

## Levels
 - Add Levels

## Small stuff
 - Change player death rotation to stay the same for flip
 - Fix camera misalignment on load
 - Redo all low graphics colours

## Bugs
 - Crouching while moving stops movement until uncrouch
 - Debug centre of movement not aligned to player
 - Super jump occurs when jumping in scaffolding (One piece even)
 - Death causes level completion
 - Crouching in scaffold stop all movement

 - Completing level 0 restarts to 0 (Fixed??)

## Technical
 - Change player death animation to calculate on render
 - Parse nbt values
 - Add line numbers to level gen errors
 - Redo all collisions
 - Change level gen string parsing

## Optimisations
 - Floor and ceil all renders

## CSS / HTML
 - Redo all text

## Textures
 - Fix ice block tiling

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

</details>

---

### Do when finished
 - Remove levels
 - Rewrite text



<br>
<p style="color:#555">
Depression levels are directly proportional to the length of this list
</p>