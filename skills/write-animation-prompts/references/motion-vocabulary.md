# Motion Vocabulary

Use this reference to choose accurate motion language. Load only the sections needed for the current prompt, then convert the chosen terms into concrete object-level direction.

## Entrances And Exits

- **Fade in / fade out**: Change opacity to introduce or remove an element without shifting layout.
- **Slide in / slide out**: Move an element from a clear direction; name the direction and distance when possible.
- **Scale in / scale out**: Grow or shrink around a chosen transform origin; often paired with opacity.
- **Pop in**: Scale in with a small overshoot. Use sparingly for playful moments, badges, and confirmations.
- **Reveal**: Uncover content through a mask, clip, wipe, or cropping boundary.
- **Mask reveal**: Reveal with a hard or soft mask edge, useful for image, text, and product-surface motion.
- **Exit animation**: Describe how the element leaves before it is removed, especially for toasts, modals, and route changes.

## Sequencing And Timing

- **Keyframes**: Named moments in the motion: start, anticipation, peak, settle, finish.
- **Tween / interpolation**: The generated in-between frames between two values.
- **Stagger**: Animate repeated items one after another with a small interval.
- **Cascade**: A more expressive stagger where motion travels across a grid, list, or scene.
- **Orchestration**: Coordinated timing across multiple objects so the animation reads as one event.
- **Delay**: Wait before an animation starts. Use intentionally, not as filler.
- **Duration**: Total run time. UI feedback is usually short; page transitions and hero reveals can breathe longer.
- **Stepped animation**: Movement in discrete increments, useful for timers, counters, sprite sheets, and mechanical effects.
- **Hold / settle**: A brief pause after motion completes so the viewer can register the final state.

## Movement And Transforms

- **Translate**: Move along X, Y, or Z. Good for GPU-friendly UI motion.
- **Scale**: Resize uniformly or by axis. Name the anchor point when it matters.
- **Rotate**: Turn around a point. Keep UI rotation subtle unless the object is physical or illustrative.
- **Skew**: Shear a shape. Useful for energetic graphic effects, risky for readable UI.
- **3D tilt / flip**: Rotate in 3D space. Include perspective and keep text readable.
- **Perspective**: Controls depth strength. Lower values feel more dramatic and closer to camera.
- **Transform origin**: The anchor point for scale or rotation.
- **Origin-aware animation**: Motion grows from the trigger location, such as a menu opening from its button.
- **Path motion**: Follow a curve or line rather than a straight translation.

## State And Page Transitions

- **Crossfade**: One element fades out as another fades in in the same area.
- **Continuity transition**: Connect before and after states so the viewer understands identity and position.
- **Morph**: Smoothly transform one shape or surface into another.
- **Shared element transition**: Move and resize a persistent element between layouts, such as thumbnail to hero.
- **Layout animation**: Animate size and position changes caused by layout instead of snapping.
- **Accordion / collapse**: Expand or contract a region while preserving context around it.
- **Directional transition**: Move forward and backward states in opposite directions to reinforce navigation.
- **View transition**: Browser or app-level transition connecting two routes or DOM states.

## Interaction Feedback

- **Hover effect**: Cursor-state response. Keep it quick and non-disruptive.
- **Press / tap feedback**: Brief scale, shadow, or color response that confirms input.
- **Hold to confirm**: Progress fills while the user holds, then resolves when complete.
- **Drag**: User-controlled translation; include constraints and release behavior.
- **Drag to reorder**: One item moves while surrounding items shift to create a drop target.
- **Swipe to dismiss**: Drag an element offscreen, often with opacity and momentum.
- **Rubber-banding**: Resistance and snap-back when dragged past a boundary.
- **Shake / wiggle**: Short lateral motion for rejected input. Use gently and with accessible alternatives.
- **Ripple**: Expanding circle from the touch or click point.

## Easing And Physics

- **Easing**: How speed changes during an animation.
- **Ease-out**: Starts fast and ends slow. Strong default for user-triggered UI feedback.
- **Ease-in**: Starts slow and exits fast. Use for objects leaving the screen, avoid for most entrances.
- **Ease-in-out**: Slow, fast, slow. Good for objects moving between two stable states.
- **Linear**: Constant speed. Use for loaders, spinners, marquees, and mechanical loops.
- **Cubic-bezier**: Custom speed curve; useful when the exact feel matters.
- **Asymmetric easing**: Different acceleration and deceleration rates for livelier motion.
- **Spring**: Physics-based movement that can carry velocity and settle naturally.
- **Stiffness / tension**: How strongly the spring moves toward its target.
- **Damping**: How quickly a spring stops oscillating.
- **Mass**: How heavy the object feels.
- **Bounce / overshoot**: Travel past the final state and return. Limit it for serious UI.
- **Momentum**: Carry motion after a drag, flick, or interruption.
- **Velocity**: Speed and direction at a moment in time.
- **Interruptible animation**: A motion can redirect mid-flight without snapping or restarting.

## Loops And Ambient Motion

- **Loop**: Repeats a set number of times or infinitely.
- **Seamless loop**: The end state reconnects cleanly to the start state.
- **Alternate / yoyo**: Plays forward, then backward, preventing a hard reset.
- **Marquee**: Continuously moving text or content.
- **Orbit**: Circling around a point or object.
- **Pulse**: Repeating scale, opacity, color, or glow change.
- **Float**: Gentle vertical or depth drift.
- **Idle animation**: Low-energy motion while waiting for interaction.
- **Breathing motion**: Very subtle scale or opacity rhythm, often for meditative or premium surfaces.

## Visual Effects And Detail

- **Blur**: Softens motion, depth, or transitions. Avoid blurring readable text.
- **Motion blur**: Directional blur implying speed.
- **Clip-path / clip reveal**: Hard-edged reveal based on a geometric shape.
- **Soft mask**: Gradient-edged reveal for smoother transitions.
- **Before / after wipe**: Draggable or animated divider comparing two layers.
- **Line drawing**: SVG path appears as if drawn by a pen.
- **Kinetic typography**: Text moves according to rhythm, meaning, or voice.
- **Text morph**: Characters or words transform into new content.
- **Typewriter**: Characters appear sequentially. Use only when the typing metaphor fits.
- **Skeleton / shimmer**: Loading placeholder with moving sheen.
- **Number ticker**: Digits roll or count toward a value.
- **Tabular numbers**: Fixed-width digits that prevent metric values from shifting.

## Camera And Scene Language

- **Push in / pull out**: Camera moves closer or farther from the subject.
- **Pan**: Camera moves horizontally.
- **Tilt**: Camera moves vertically.
- **Dolly**: Physical camera move through space.
- **Truck**: Camera slides left or right while maintaining orientation.
- **Orbit camera**: Camera circles the subject.
- **Parallax**: Foreground and background move at different speeds.
- **Rack focus**: Focus shifts between depth planes.
- **Match cut**: Two shots connect through similar shape, motion, or composition.
- **Whip pan**: Fast pan that bridges two views. High energy, easy to overuse.

## Smoothness, Performance, And Accessibility

- **Frame rate / FPS**: Frames per second. Match the product and delivery target; 60fps is common for interactive UI, while video workflows often use 24, 25, or 30fps.
- **Jank**: Visible stutter from missed frames or heavy work.
- **Dropped frame**: A frame that misses its render deadline.
- **Compositing**: GPU handles transform or opacity without recalculating layout.
- **will-change**: CSS hint for upcoming animation. Use carefully and remove when not needed.
- **Layout thrashing**: Repeated layout recalculation from animating costly properties.
- **Reduced motion**: Tone down, shorten, or replace motion for users who prefer less animation.
- **Spatial consistency**: Objects keep identity and direction across state changes.
- **Perceived performance**: Motion makes waiting feel faster by showing progress or continuity.

## Prompt Verbs

Use these verbs to make prompts more directional:

- Reveal, uncover, wipe, draw, trace, bloom, settle, snap, glide, drift, pulse, cascade, expand, collapse, morph, crossfade, tick, roll, count, orbit, follow, anchor, stretch, compress, overshoot, rebound, decelerate, absorb, dissolve, lock, release.

## Prompt Adjectives With Limits

Pair adjectives with mechanics:

- **Calm**: short fade, gentle translate, no bounce, low contrast.
- **Premium**: restrained timing, precise stagger, subtle mask reveal, minimal effects.
- **Playful**: spring, small overshoot, squash and stretch, bright feedback.
- **Technical**: stepped timing, line drawing, data ticker, mechanical loop.
- **Cinematic**: camera push, parallax layers, rack focus, motivated reveal.
- **Energetic**: fast cascade, sharper easing, directional wipes, stronger contrast.
