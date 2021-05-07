# Features
 - Change controls
 - Crouch goes down in scaffold
 - Add back and forth level for debug

# Blocks
 - Shadow (Negative light source)
 - Elevator (Makes everything go upwards)
 - Ice (Slippery)
 - Checkpoint

# Levels
 - Add Levels

# Small stuff
 - Change background colour
 - Change player death rotation to stay the same for flip
 - Add animate offset for rats only?
 - Fix camera misalignment on load
 - Change level gen string parsing

# Bugs
 - Crouching while moving stops movement until uncrouch
 - Completing level 0 restarts to 0
 - Debug movement not aligned to player
 - Super jump occurs when jumping in scaffolding (One piece even)
 - Completion key not valid
 - - Add fill for each number
 - Death causes level completion
 - Game completion happens twice
 - Jumping into overhead block does not collide

# Technical
 - Image smoothing?

 - Overhaul
 - - ALL CSS!
 - - Frame

 - Change player death animation to calculate on render
 
 - Parse nbt values
 - Decollision moves player to nearest exit
 - Add line numbers to level gen errors

# Optimisations
 - Floor and ceil all renders

<!-- # CSS / HTML -->

# Textures
 - Add 1 pixel of height to player crouch texture 
 - Fix shadow of spike block

---

## Completed
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




---

# Do when finished
 - Remove levels
 - Rewrite text





<br>
<br>
<p style="color:#555">
Depression levels are directly proportional to the length of this list
</p>