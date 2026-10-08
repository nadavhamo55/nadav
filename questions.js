/* Lesson text, question bank, and same-skill retry templates. */
(function () {
  'use strict';

  const topics = [
    {
      id: 'forces', title: 'Forces & free body diagrams', short: 'Name every push and pull', color: '#9B7FD1',
      lesson: {
        plain: 'A force is a push or a pull. A free body diagram is a simple picture of all the forces on one object.',
        steps: ['Choose one object to study.', 'Draw a dot or a small box for that object.', 'Draw one arrow for each force acting on it.', 'Label each arrow. Gravity points down. A surface can push with a normal force.'],
        example: ['A 2 kg book rests on a table.', 'Gravity pulls down with W = mg = 2 x 9.8 = 19.6 N.', 'The table pushes up with a normal force of 19.6 N.', 'The arrows balance, so the net force is 0 N.'],
        watch: 'Do not draw forces that the object exerts on something else. Only draw forces acting on your chosen object.'
      },
      questions: [
        mc('fbd-normal', 'A book rests on a table. Which force from the table acts on the book?', ['Gravity', 'Normal force', 'Tension', 'Applied force'], 1, 'The table touches the book and pushes straight out of its surface.', ['Choose the book as the object.', 'The table is touching it.', 'A surface push is the normal force.']),
        mc('force-gravity', 'Which statement about gravity near Earth is right?', ['It points up from the ground.', 'It points toward Earth.', 'It only acts on moving objects.', 'It is the same force as a normal force.'], 1, 'Gravity pulls an object toward Earth, whether or not the object moves.', ['Pick the object.', 'Earth pulls the object.', 'The pull points toward Earth.']),
        mc('force-applied', 'A student pushes a box. What kind of force is the student\'s push?', ['Applied force', 'Normal force', 'Weight', 'Tension'], 0, 'A direct push from a person is an applied force.', ['Find the source of the force.', 'The student pushes the box.', 'That push is an applied force.']),
        mc('fbd-hanging', 'A lamp hangs still from one vertical cord. Which forces act on the lamp?', ['Only tension', 'Only gravity', 'Tension up and gravity down', 'Normal force up and gravity down'], 2, 'The cord pulls up. Earth pulls down.', ['Choose the lamp.', 'The cord pulls on it with tension.', 'Earth pulls on it with gravity.']),
        num('resultant', 'A box is pushed right with 12 N. Friction is 5 N left. What is the net horizontal force?', 7, 'N', 'The opposite forces subtract. The larger force points right.', ['Choose right as positive.', 'Net force = 12 - 5.', 'The net force is 7 N to the right.']),
        num('weight', 'What is the weight of a 3 kg object near Earth?', 29.4, 'N', 'Weight is the gravitational force: mass times 9.8.', ['Write W = mg.', 'Use m = 3 kg and g = 9.8 m/s^2.', 'W = 3 x 9.8 = 29.4 N.']),
        mc('fbd-push', 'A box is pushed right across a rough floor. Which way does friction on the box point?', ['Right', 'Left', 'Up', 'Down'], 1, 'Friction opposes sliding or the tendency to slide between the touching surfaces.', ['The box tends to slide right.', 'The floor resists that sliding.', 'Friction on the box points left.']),
        num('normalflat', 'A 4 kg box rests on a level floor. No other vertical forces act. What is the normal force?', 39.2, 'N', 'The box has no vertical acceleration, so the upward normal balances its weight.', ['Weight = 4 x 9.8 = 39.2 N down.', 'The vertical net force is zero.', 'The normal force is 39.2 N up.'])
      ]
    },
    {
      id: 'newton', title: "Newton's laws", short: 'Connect force to motion', color: '#2EC4B6',
      lesson: {
        plain: 'Forces change motion. If the forces balance, velocity stays the same, even when that velocity is zero.',
        steps: ['Draw all forces on the object.', 'Add forces with signs to find the net force.', 'Use F_net = ma to connect net force and acceleration.', 'For a force pair, name both objects: the forces act on different objects.'],
        example: ['A 2 kg cart has a net force of 6 N to the right.', 'Choose right as positive.', 'a = F_net / m = 6 / 2.', 'The cart accelerates at 3 m/s^2 to the right.'],
        watch: 'Zero velocity does not always mean zero net force. A stopped object can be speeding up from rest.'
      },
      questions: [
        mc('first-rest', 'A lamp sits still on a table. What is its net force?', ['Zero', 'Upward', 'Downward', 'It cannot be known'], 0, 'It is at rest and not starting to move, so the forces balance.', ['The lamp has no acceleration.', 'Newton\'s second law says net force = mass x acceleration.', 'Its net force is zero.']),
        mc('zero-velocity', 'A ball is released from rest. At that instant, its velocity is zero. What is the net force on it?', ['Zero', 'Downward, because of gravity', 'Upward, because it starts to fall', 'It cannot have a force until it moves'], 1, 'Zero velocity does not mean zero acceleration. Gravity already pulls down.', ['At the instant it is released, velocity is zero.', 'Earth still pulls on it.', 'Its net force points down, so it begins to speed up downward.']),
        mc('first-constant', 'A car travels east at a steady 20 m/s. What is its net force?', ['East', 'West', 'Zero', 'It must be its weight'], 2, 'Steady velocity means zero acceleration, so the net force is zero.', ['The speed and direction stay the same.', 'So acceleration is zero.', 'F_net = ma = 0.']),
        num('force-from-ma', 'A 5 kg cart accelerates right at 2 m/s^2. What is its net force?', 10, 'N', 'Newton\'s second law gives F_net = ma.', ['Use F_net = ma.', 'Multiply 5 kg by 2 m/s^2.', 'The net force is 10 N right.']),
        num('net', 'A 4 kg object has a net force of 12 N left. What is its acceleration magnitude?', 3, 'm/s^2', 'Acceleration points with the net force. Its magnitude is F_net / m.', ['Use a = F_net / m.', 'Divide 12 N by 4 kg.', 'The acceleration is 3 m/s^2 left.']),
        mc('signs', 'Choose right as positive. A 7 N force points left and a 3 N force points right. What is the net force?', ['-4 N', '4 N', '10 N', '-10 N'], 0, 'Left is negative here. Add the signed forces: -7 + 3 = -4 N.', ['Write left as negative and right as positive.', 'Add: -7 + 3 = -4.', 'The net force is 4 N left.']),
        mc('thirdlaw', 'A swimmer pushes water backward. What is the reaction force?', ['The water pushes the swimmer forward.', 'The swimmer pushes the water forward.', 'Gravity on the swimmer.', 'The water stops moving.'], 0, 'The water pushes the swimmer forward with an equal-size force.', ['The swimmer exerts a force on the water.', 'Newton\'s third law makes a matching force.', 'The water pushes back on the swimmer.']),
        mc('thirdlaw', 'A bat hits a ball. Which is true about the force pair?', ['Both forces act on the ball.', 'The ball pushes the bat with equal force.', 'The bat pushes harder because it is bigger.', 'The forces cancel on the ball.'], 1, 'The ball pushes back on the bat with equal size and opposite direction.', ['The bat pushes on the ball.', 'The ball pushes on the bat.', 'The forces act on different objects, so they do not cancel on one object.']),
        num('weight', 'What is the weight of a 6 kg backpack near Earth?', 58.8, 'N', 'Mass is in kilograms. Weight is the force in newtons: mg.', ['Use W = mg.', 'W = 6 x 9.8.', 'The weight is 58.8 N.']),
        mc('inertia', 'Which object has more inertia?', ['A 2 kg ball', 'A 10 kg box', 'They have the same inertia', 'The faster one always has more'], 1, 'More mass means more inertia. Inertia describes resistance to changing motion.', ['Compare the masses.', 'The box has more mass.', 'So the box has more inertia.'])
      ]
    },
    {
      id: 'friction', title: 'Friction', short: 'Surfaces resist sliding', color: '#FF7A59',
      lesson: {
        plain: 'Friction is a contact force that resists sliding between surfaces.',
        steps: ['Decide if the surfaces are sliding.', 'If they slide, use kinetic friction: f_k = mu_k N.', 'If they do not slide, static friction adjusts to what is needed, up to mu_s N.', 'Point friction opposite the sliding or the way sliding would start.'],
        example: ['A sliding 5 kg crate has mu_k = 0.20 on level ground.', 'N = mg = 5 x 9.8 = 49 N.', 'f_k = mu_k N = 0.20 x 49.', 'The kinetic friction is 9.8 N.'],
        watch: 'Static friction is not always mu_s N. That value is only its maximum.'
      },
      questions: [
        mc('static-kinetic', 'A box is sliding across a floor. Which friction acts on it?', ['Static friction', 'Kinetic friction', 'No friction', 'Normal friction'], 1, 'Sliding surfaces have kinetic friction.', ['Check whether surfaces slide.', 'They are sliding.', 'Use kinetic friction.']),
        mc('static-kinetic', 'A book rests on a shelf. A small horizontal push does not move it. Which friction acts?', ['Kinetic friction', 'Static friction', 'Air resistance only', 'No possible friction'], 1, 'The book is not sliding. Static friction prevents it from starting to slide.', ['The book stays still.', 'The push tends to make it slide.', 'Static friction balances the push.']),
        num('friction-kinetic', 'A sliding block has mu_k = 0.25 and N = 40 N. Find its kinetic friction.', 10, 'N', 'Kinetic friction is mu_k times the normal force.', ['Write f_k = mu_k N.', 'Multiply 0.25 x 40 N.', 'f_k = 10 N.']),
        num('friction-static', 'A box has mu_s = 0.40 and N = 50 N. What is the maximum static friction?', 20, 'N', 'The maximum static friction is mu_s N.', ['Write f_s,max = mu_s N.', 'Multiply 0.40 x 50 N.', 'The maximum is 20 N.']),
        mc('friction-direction', 'A crate slides left across a flat floor. Which way does friction on it point?', ['Left', 'Right', 'Up', 'Down'], 1, 'Friction opposes the sliding direction.', ['The crate moves left.', 'Friction resists that sliding.', 'Friction points right.']),
        mc('static-adjust', 'A 4 N push does not move a crate. The maximum static friction is 15 N. How large is static friction?', ['15 N', '4 N', '19 N', '0 N'], 1, 'Static friction matches the 4 N push because 4 N is below its 15 N maximum.', ['The push is 4 N.', 'Static friction can reach 15 N.', 'It only needs 4 N to balance the push.']),
        num('friction-kinetic', 'A 10 kg box slides on level ground with mu_k = 0.10. Find the friction force.', 9.8, 'N', 'On level ground N = mg = 98 N, then f_k = mu_k N.', ['N = 10 x 9.8 = 98 N.', 'f_k = 0.10 x 98.', 'The friction force is 9.8 N.']),
        num('friction-kinetic', 'A block slides with f_k = 12 N and N = 60 N. What is mu_k?', 0.2, '', 'Divide kinetic friction by the normal force.', ['Use f_k = mu_k N.', 'Rearrange: mu_k = f_k / N.', '12 / 60 = 0.20.'])
      ]
    },
    {
      id: 'ramps', title: 'Ramps & components', short: 'Split forces into directions', color: '#FFB547',
      lesson: {
        plain: 'On a ramp, gravity can be split into one part down the ramp and one part into the ramp.',
        steps: ['Choose x along the ramp and y perpendicular to it.', 'For an angle theta measured from horizontal, gravity along the ramp is mg sin(theta).', 'Gravity into the ramp is mg cos(theta).', 'If the angle is measured from vertical, swap which part uses sine and cosine.'],
        example: ['A 2 kg box rests on a 30 degree ramp.', 'Weight = 2 x 9.8 = 19.6 N.', 'Down-ramp part = mg sin(30) = 19.6 x 0.5 = 9.8 N.', 'Normal force = mg cos(30) = 19.6 x 0.866 = 16.97 N.'],
        watch: 'For a ramp angle measured from horizontal, the normal force uses cos(theta), not sin(theta).' 
      },
      questions: [
        mc('component-horizontal', 'A 10 N force is 60 degrees above horizontal. What is its horizontal component?', ['5.0 N', '8.66 N', '10 N', '0 N'], 0, 'The horizontal side is next to the angle, so use cosine: 10 cos(60) = 5 N.', ['The angle is measured from horizontal.', 'Horizontal is the adjacent side.', 'Use F_x = F cos(theta).']),
        num('component-vertical', 'A 20 N force points 30 degrees above horizontal. What is its upward component?', 10, 'N', 'The vertical side is opposite the angle: F_y = F sin(theta).', ['The angle is from horizontal.', 'Vertical is opposite that angle.', 'F_y = 20 sin(30) = 10 N.']),
        num('ramp-parallel', 'A 2 kg block is on a 30 degree ramp. How large is gravity\'s down-ramp component?', 9.8, 'N', 'For an angle from horizontal, the parallel component is mg sin(theta).', ['Weight = 2 x 9.8 = 19.6 N.', 'Use the parallel part: 19.6 sin(30).', 'The down-ramp part is 9.8 N.']),
        num('ramp-normal', 'A 5 kg block rests on a 60 degree ramp. Find the normal force.', 24.5, 'N', 'The normal force is mg cos(theta) when no other perpendicular forces act.', ['Weight = 5 x 9.8 = 49 N.', 'Use the perpendicular part: 49 cos(60).', 'N = 24.5 N.']),
        mc('ramp-angle', 'The ramp angle is 30 degrees from horizontal. Which is gravity\'s down-ramp component?', ['mg cos(30)', 'mg sin(30)', 'mg tan(30)', 'mg'], 1, 'For an angle from horizontal, the down-ramp component uses sine.', ['Draw the weight straight down.', 'Split it into parallel and perpendicular parts.', 'The parallel part is mg sin(theta).']),
        num('normal-push', 'A 10 kg box is pushed down on level ground by an extra 20 N. Find N.', 118, 'N', 'The downward push adds to the weight, so N = mg + 20 N.', ['Weight = 10 x 9.8 = 98 N.', 'Both weight and push point down.', 'N = 98 + 20 = 118 N.']),
        num('normal-pull', 'A 10 kg box is pulled up by a rope with 30 N on level ground. Find N.', 68, 'N', 'The upward pull supports part of the weight, so N = mg - 30 N.', ['Weight = 98 N down.', 'The rope pulls up with 30 N.', 'N = 98 - 30 = 68 N.']),
        num('components-vertical-angle', 'A 10 N force is 60 degrees from vertical. What is its vertical component magnitude?', 5, 'N', 'An angle from vertical makes the vertical component adjacent: F cos(theta).', ['The angle is measured from vertical.', 'Vertical is adjacent to that angle.', '10 cos(60) = 5 N.']),
        mc('fbd-ramp', 'A box rests on a smooth ramp. Which forces act on the box?', ['Gravity and the normal force', 'Gravity, normal force, and friction', 'Tension and weight', 'Only gravity'], 0, 'A smooth ramp has no friction, but its surface pushes on the box.', ['Choose the box as the object.', 'Earth pulls down with gravity.', 'The ramp pushes perpendicular to itself with a normal force.']),
        num('normal-slant-down', 'A 10 kg box rests on level ground. A 10 N push points 30 degrees below horizontal. Find the normal force.', 103, 'N', 'The push has a 5 N downward part. That adds to the 98 N weight.', ['Weight = 10 x 9.8 = 98 N.', 'Downward part of push = 10 sin(30) = 5 N.', 'N = 98 + 5 = 103 N.']),
        num('normal-slant-up', 'A 10 kg box rests on level ground. A rope pulls with 10 N at 30 degrees above horizontal. Find the normal force.', 93, 'N', 'The rope has a 5 N upward part. That reduces the 98 N weight.', ['Weight = 10 x 9.8 = 98 N.', 'Upward part of pull = 10 sin(30) = 5 N.', 'N = 98 - 5 = 93 N.'])
      ]
    },
    {
      id: 'systems', title: 'Tension & connected systems', short: 'Follow the connected objects', color: '#4EA8DE',
      lesson: {
        plain: 'Tension is a cord\'s pull. Connected objects share a linked motion, so it helps to draw each object and then the whole system.',
        steps: ['Choose a positive direction for each object.', 'Draw a separate free body diagram for each object.', 'Use the same tension in an ideal light cord over a frictionless pulley.', 'For a whole-system equation, internal tension forces cancel.'],
        example: ['A 2 kg cart is pulled by a 10 N horizontal force. It is connected to a 3 kg cart.', 'Treat both carts as one system: total mass = 2 + 3 = 5 kg.', 'The cord tension is internal, so the outside force is 10 N.', 'a = 10 / 5 = 2 m/s^2.'],
        watch: 'Newton\'s third-law pairs act on different objects. Tension on two connected objects is not a force pair.'
      },
      questions: [
        num('atwood', 'An ideal Atwood machine has masses 3 kg and 1 kg. What is the acceleration magnitude?', 4.9, 'm/s^2', 'The heavier mass moves down. For an ideal Atwood machine, a = (m_heavy - m_light)g / (total mass).', ['Net driving force = (3 - 1) x 9.8 = 19.6 N.', 'Total mass = 3 + 1 = 4 kg.', 'a = 19.6 / 4 = 4.9 m/s^2.']),
        num('tension-atwood', 'An ideal Atwood machine has a 2 kg mass and a 4 kg mass. Find the cord tension.', 26.13, 'N', 'First find a = (4 - 2)g / 6 = 3.27 m/s^2. Then use the lighter mass: T = m(g + a).', ['The 4 kg mass accelerates down at 3.27 m/s^2.', 'The 2 kg mass accelerates up.', 'For the 2 kg mass, T - mg = ma, so T = 2(9.8 + 3.27) = 26.13 N.']),
        num('system', 'Two carts of 2 kg and 3 kg are pulled together by 20 N on a frictionless track. Find their acceleration.', 4, 'm/s^2', 'Treat both carts as one system. Total mass is 5 kg.', ['Add the masses: 2 + 3 = 5 kg.', 'Use a = F_net / m_total.', 'a = 20 / 5 = 4 m/s^2.']),
        mc('tension-rope', 'A light rope pulls a box to the right. What direction is the rope\'s tension force on the box?', ['Right, along the rope', 'Left, opposite the rope', 'Down', 'Tension is not a force'], 0, 'A taut rope pulls along its length, away from the object.', ['Find the rope direction.', 'A rope can pull, not push.', 'The tension points along the rope toward the rope.']),
        num('tension-up', 'A 2 kg bucket accelerates upward at 1 m/s^2. What is the tension in its cord?', 21.6, 'N', 'Tension must support the weight and provide upward acceleration: T - mg = ma.', ['Weight = 2 x 9.8 = 19.6 N.', 'Use T - 19.6 = 2 x 1.', 'T = 21.6 N.']),
        num('atwood', 'An ideal Atwood machine has masses 5 kg and 3 kg. Find the acceleration magnitude.', 2.45, 'm/s^2', 'The net driving force is the difference in weights.', ['Difference in masses = 2 kg.', 'Driving force = 2 x 9.8 = 19.6 N.', 'Total mass = 8 kg, so a = 19.6 / 8 = 2.45 m/s^2.']),
        mc('system-internal', 'For two connected carts treated as one system, why does rope tension not appear in the system equation?', ['It is zero.', 'It is an internal force and cancels.', 'It points upward.', 'The rope has no force.'], 1, 'The rope pulls the carts in opposite directions. Those internal forces cancel for the whole system.', ['Draw the two cart diagrams.', 'Tension pulls one cart one way and the other cart the opposite way.', 'For the whole system, the two tensions cancel.']),
        num('system', 'A 1 kg and 2 kg object are tied together. A 9 N outside force pulls them on a smooth surface. Find a.', 3, 'm/s^2', 'The total system mass is 3 kg. Divide the outside force by that mass.', ['Total mass = 1 + 2 = 3 kg.', 'Use F_net = m_total a.', 'a = 9 / 3 = 3 m/s^2.'])
      ]
    },
    {
      id: 'elevators', title: 'Elevators & apparent weight', short: 'What the scale actually reads', color: '#F472B6',
      lesson: {
        plain: 'A scale reads the normal force from the scale, not gravity directly.',
        steps: ['Draw weight downward and the scale\'s normal force upward.', 'Choose up as positive if the elevator accelerates up.', 'Use N - mg = ma.', 'At constant velocity, a = 0. In free fall, the scale force can be zero.'],
        example: ['A 60 kg rider accelerates upward at 2 m/s^2.', 'Weight = 60 x 9.8 = 588 N.', 'Use N - 588 = 60 x 2.', 'N = 708 N. The scale reads 708 N.'],
        watch: 'An elevator moving up does not always accelerate up. Use acceleration, not velocity, to decide the scale reading.'
      },
      questions: [
        num('elevator-up', 'A 50 kg rider accelerates upward at 2 m/s^2. What does the scale read?', 590, 'N', 'For upward acceleration, N = m(g + a).', ['Weight = 50 x 9.8 = 490 N.', 'The rider needs 50 x 2 = 100 N net upward.', 'N = 490 + 100 = 590 N.']),
        num('elevator-down', 'A 60 kg rider accelerates downward at 1 m/s^2. What does the scale read?', 528, 'N', 'With up positive, N - mg = -ma, so N = m(g - a).', ['Weight = 60 x 9.8 = 588 N.', 'The acceleration points down.', 'N = 60(9.8 - 1) = 528 N.']),
        mc('elevator-scale', 'What force does a bathroom scale measure when you stand on it in an elevator?', ['Weight only', 'The normal force on you', 'The tension in the cable', 'Your mass'], 1, 'The scale measures how hard it pushes up on you: the normal force.', ['A scale pushes on your feet.', 'That push is a normal force.', 'Its reading is the normal force magnitude.']),
        num('elevator-constant', 'A 70 kg person rides an elevator at constant velocity. What does the scale read?', 686, 'N', 'Constant velocity means zero acceleration, so N = mg.', ['a = 0.', 'N - mg = ma = 0.', 'N = 70 x 9.8 = 686 N.']),
        num('elevator-freefall', 'A 40 kg rider and elevator are in free fall. What is the scale reading?', 0, 'N', 'In free fall, the rider and scale accelerate downward together at g, so the scale does not push on the rider.', ['The rider accelerates down at 9.8 m/s^2.', 'Gravity alone provides that acceleration.', 'The normal force and scale reading are 0 N.']),
        mc('elevator-direction', 'An elevator moves upward but slows down. Which way is its acceleration?', ['Up', 'Down', 'Zero', 'It is not possible to know'], 1, 'When an object slows down, acceleration points opposite its velocity.', ['Velocity points up.', 'The elevator is slowing down.', 'Acceleration points down.']),
        num('elevator-up', 'A 40 kg passenger accelerates upward at 0.5 m/s^2. Find the normal force.', 412, 'N', 'The normal force must be greater than weight for upward acceleration.', ['Weight = 40 x 9.8 = 392 N.', 'Add ma = 40 x 0.5 = 20 N.', 'N = 392 + 20 = 412 N.']),
        mc('elevator-weight', 'A person stands on a scale in an elevator moving down at steady speed. Is the scale reading less than their weight?', ['Yes, because it moves down.', 'No. It equals their weight.', 'Yes, it is zero.', 'It is greater than their weight.'], 1, 'Steady speed means zero acceleration. The normal force equals the weight.', ['The elevator moves at steady speed.', 'So acceleration is zero.', 'The scale reads N = mg.'])
      ]
    },
    {
      id: 'springs', title: 'Springs', short: 'Measure the extra stretch', color: '#7BD389',
      lesson: {
        plain: 'A spring pushes or pulls back. For a spring that follows Hooke\'s law, force equals stiffness times extra stretch.',
        steps: ['Measure the spring\'s relaxed length.', 'Find extra stretch: x = stretched length - relaxed length.', 'Use F = kx. The force from the spring points back toward its relaxed length.', 'Side-by-side springs add stiffness. Springs in a chain become less stiff.'],
        example: ['A spring has k = 100 N/m and relaxed length 0.20 m.', 'Its new length is 0.25 m, so extra stretch x = 0.05 m.', 'F = kx = 100 x 0.05.', 'The spring force magnitude is 5 N.'],
        watch: 'Use the extra stretch, not the spring\'s full length, in F = kx.'
      },
      questions: [
        num('spring', 'A spring has k = 200 N/m and stretches an extra 0.03 m. What force magnitude does it exert?', 6, 'N', 'Hooke\'s law gives F = kx.', ['Use the extra stretch x = 0.03 m.', 'F = 200 x 0.03.', 'The force magnitude is 6 N.']),
        num('spring-stretch', 'A spring has relaxed length 0.20 m and final length 0.26 m. What is its extra stretch?', 0.06, 'm', 'Extra stretch is final length minus relaxed length.', ['Start with the final length: 0.26 m.', 'Subtract the relaxed length: 0.20 m.', 'Extra stretch = 0.06 m.']),
        mc('spring-stretch', 'A spring is 0.30 m long when relaxed. It is now 0.38 m long. Which x belongs in F = kx?', ['0.38 m', '0.30 m', '0.08 m', '0.68 m'], 2, 'Hooke\'s law uses the extra stretch: 0.38 - 0.30 = 0.08 m.', ['Find the relaxed length.', 'Subtract it from the new length.', 'Use x = 0.08 m.']),
        num('spring-parallel', 'Two springs with k = 20 N/m and 30 N/m are side by side. Find their combined k.', 50, 'N/m', 'Parallel spring stiffnesses add.', ['The springs share the load side by side.', 'For parallel springs, add the stiffnesses.', 'k_eq = 20 + 30 = 50 N/m.']),
        num('spring-series', 'Two springs with k = 30 N/m and 60 N/m are in a chain. Find their combined k.', 20, 'N/m', 'For springs in series, 1/k_eq = 1/k_1 + 1/k_2.', ['Add reciprocals: 1/30 + 1/60 = 3/60.', 'That is 1/20.', 'So k_eq = 20 N/m.']),
        mc('spring-graph', 'A straight force-versus-stretch graph gets twice as steep. What happens to k?', ['It doubles.', 'It halves.', 'It becomes zero.', 'It does not change.'], 0, 'The slope of a force-versus-stretch graph is k.', ['Hooke\'s law is F = kx.', 'On an F versus x graph, slope is F/x.', 'That slope is k, so twice the slope means twice k.']),
        num('spring', 'A spring has k = 50 N/m and is stretched 0.12 m. Find the force magnitude.', 6, 'N', 'Multiply the spring stiffness by its extra stretch.', ['Use F = kx.', 'F = 50 x 0.12.', 'The force magnitude is 6 N.']),
        mc('spring-direction', 'A spring is stretched to the right. Which way does its force on the attached block point?', ['Right, farther from rest', 'Left, toward its relaxed length', 'Up', 'It has no force'], 1, 'A stretched spring pulls back toward its relaxed length.', ['The spring is stretched right.', 'It resists the stretch.', 'Its force on the block points left.'])
      ]
    },
    {
      id: 'circular', title: 'Circular motion', short: 'Acceleration points inward', color: '#F5D04C',
      lesson: {
        plain: 'An object going around a circle accelerates toward the center, even when its speed stays the same.',
        steps: ['Find the circle radius r and speed v.', 'Use a_c = v^2/r for inward acceleration.', 'Use F_net,in = mv^2/r for inward net force.', 'Name the real force that points inward, such as tension, friction, or gravity.'],
        example: ['A 2 kg ball moves at 4 m/s in a circle of radius 2 m.', 'a_c = v^2/r = 16/2 = 8 m/s^2 inward.', 'F_net,in = ma = 2 x 8.', 'The inward net force is 16 N.'],
        watch: 'Centripetal force is not a new kind of force. It is the name for the net inward force.'
      },
      questions: [
        num('circular-a', 'A ball moves at 6 m/s in a circle with radius 3 m. Find its centripetal acceleration.', 12, 'm/s^2', 'Use a_c = v^2/r and point the acceleration toward the center.', ['Square the speed: 6^2 = 36.', 'Divide by the radius: 36 / 3.', 'a_c = 12 m/s^2 inward.']),
        num('circular-f', 'A 2 kg object moves at 4 m/s in a circle of radius 2 m. Find the inward net force.', 16, 'N', 'Use F_net,in = mv^2/r.', ['Square the speed: 4^2 = 16.', 'Multiply by mass and divide by radius: 2 x 16 / 2.', 'The inward net force is 16 N.']),
        mc('centripetal-real', 'A car turns on a flat road. What can provide its inward net force?', ['A separate centripetal force', 'Static friction from the road', 'Its velocity', 'The outward normal force'], 1, 'Static friction between tires and road can point toward the center of the turn.', ['The car needs inward acceleration.', 'A real force must point inward.', 'Tire-road friction can supply that force.']),
        mc('circular-direction', 'A ball moves clockwise in a circle. At the top of its path, which way does its centripetal acceleration point?', ['Up', 'Down', 'Left', 'Right'], 1, 'Centripetal acceleration always points toward the center. At the top, the center is below the ball.', ['Mark the circle center.', 'Find the direction from the ball to the center.', 'That direction is down.']),
        num('circular-a', 'A runner moves at 8 m/s around a track curve of radius 16 m. Find a_c.', 4, 'm/s^2', 'Centripetal acceleration is speed squared divided by radius.', ['Square 8 m/s to get 64.', 'Divide by 16 m.', 'a_c = 4 m/s^2 inward.']),
        mc('circular-speed', 'If an object doubles its speed on the same circular path, what happens to its centripetal acceleration?', ['It doubles.', 'It triples.', 'It becomes four times as large.', 'It is cut in half.'], 2, 'Acceleration depends on speed squared: (2v)^2/r = 4v^2/r.', ['Use a_c = v^2/r.', 'Replace v with 2v.', 'The square makes acceleration four times larger.']),
        num('circular-f', 'A 3 kg object travels at 5 m/s around a circle of radius 5 m. Find the inward net force.', 15, 'N', 'The inward net force is mv^2/r.', ['Square speed: 5^2 = 25.', 'Multiply: 3 x 25 / 5.', 'F_net,in = 15 N.']),
        mc('circular-velocity', 'An object moves in a circle at steady speed. Is its velocity constant?', ['Yes, speed is constant.', 'No, its direction keeps changing.', 'Yes, it has no acceleration.', 'No, it must slow down.'], 1, 'Velocity includes direction. The direction changes as the object moves around the circle.', ['Steady speed means the size stays the same.', 'Velocity also includes direction.', 'The direction changes, so velocity changes.'])
      ]
    }
  ];

  function mc(skill, prompt, options, answer, why, steps) {
    return { skill, type: 'choice', prompt, options, answer, why, steps };
  }
  function num(skill, prompt, answer, unit, why, steps) {
    return { skill, type: 'number', prompt, answer, unit, why, steps };
  }
  topics.forEach(function (topic) {
    topic.questions.forEach(function (question, index) {
      question.id = topic.id + '-' + (index + 1);
      question.topic = topic.id;
      question.topicTitle = topic.title;
      question.color = topic.color;
    });
  });

  function retryFor(question, round) {
    const step = round + 1;
    const templates = {
                    'zero-velocity': function () { return mc('zero-velocity', 'A stone is released from rest. What is its net force just as it begins to fall?', ['Zero', 'Downward, due to gravity', 'Upward', 'It has no acceleration'], 1, 'Its speed is zero at that instant, but gravity still pulls downward.', ['Rest means velocity is zero.', 'Velocity does not decide whether a force acts.', 'Gravity gives it a downward net force.']); },
          normalflat: function () { const m = 2 + step, answer = +(m * 9.8).toFixed(2); return num('normalflat', 'A ' + m + ' kg box rests on level ground with no other vertical forces. Find N.', answer, 'N', 'With no other vertical forces, N balances mg.', ['Weight = ' + m + ' x 9.8 = ' + answer + ' N.', 'The vertical forces balance.', 'The normal force is ' + answer + ' N.']); },
          'normal-push': function () { const m = 5 + step, push = 10 + step * 2, answer = +(m * 9.8 + push).toFixed(2); return num('normal-push', 'A ' + m + ' kg box rests on level ground. A ' + push + ' N force pushes down. Find N.', answer, 'N', 'A downward push adds to the box\'s weight.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'Add the downward push.', 'N = ' + answer + ' N.']); },
          'normal-pull': function () { const m = 5 + step, pull = 10 + step * 2, answer = +(m * 9.8 - pull).toFixed(2); return num('normal-pull', 'A ' + m + ' kg box rests on level ground. A rope pulls up with ' + pull + ' N. Find N.', answer, 'N', 'An upward pull reduces the normal force.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'Subtract the upward pull.', 'N = ' + answer + ' N.']); },
          'static-kinetic': function () { const isStatic = /rests|does not move|stays still/i.test(question.prompt); return isStatic ? mc('static-kinetic', 'A book stays still when pushed gently. Which friction keeps it from sliding?', ['Static friction', 'Kinetic friction', 'Air resistance', 'No force'], 0, 'Static friction acts when the surfaces do not slide.', ['The book stays still.', 'The push could make it slide.', 'Static friction resists the start of sliding.']) : mc('static-kinetic', 'A block slides across a floor. Which kind of friction acts?', ['Kinetic friction', 'Static friction', 'Normal friction', 'No friction'], 0, 'Kinetic friction acts while surfaces slide.', ['The block is sliding.', 'Sliding surfaces have kinetic friction.', 'That is the friction type.']); },
          system: function () { const first = 2 + step, second = 1 + (step % 4), force = 6 + step * 3, answer = +(force / (first + second)).toFixed(2); return num('system', 'Two connected carts of ' + first + ' kg and ' + second + ' kg are pulled by ' + force + ' N on a smooth track. Find their acceleration.', answer, 'm/s^2', 'Treat both carts as one system and divide by total mass.', ['Total mass = ' + first + ' + ' + second + ' = ' + (first + second) + ' kg.', 'Use a = F_net / m_total.', 'a = ' + force + ' / ' + (first + second) + ' = ' + answer + ' m/s^2.']); },
          'tension-up': function () { const m = 2 + step, a = 1 + (step % 3), answer = +(m * (9.8 + a)).toFixed(2); return num('tension-up', 'A ' + m + ' kg bucket accelerates upward at ' + a + ' m/s^2. Find its cord tension.', answer, 'N', 'For upward acceleration, T - mg = ma.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'Use T - mg = ma.', 'T = m(g + a) = ' + answer + ' N.']); },
        signs: function () { const left = 8 + step, right = 3 + (step % 3), net = right - left; return num('signs', 'Choose right as positive. A ' + left + ' N force points left and a ' + right + ' N force points right. Find the signed net force.', net, 'N', 'Left is negative. Add the signed forces.', ['Write the forces with signs: -' + left + ' + ' + right + '.', 'The result is ' + net + '.', 'The net force is ' + Math.abs(net) + ' N left.']); },
        'fbd-ramp': function () { return mc('fbd-ramp', 'A box rests on a smooth ramp. Which forces act on it?', ['Gravity and normal force', 'Gravity, normal force, and friction', 'Only gravity', 'Tension and friction'], 0, 'A smooth ramp pushes normally but has no friction.', ['Earth pulls down.', 'The ramp pushes perpendicular to its surface.', 'There is no friction on a smooth ramp.']); },
        'normal-slant-down': function () { const m = 5 + step, force = 10 + step * 2, vertical = +(force * 0.5).toFixed(2), answer = +(m * 9.8 + vertical).toFixed(2); return num('normal-slant-down', 'A ' + m + ' kg box rests on level ground. A ' + force + ' N push points 30 degrees below horizontal. Find N.', answer, 'N', 'The vertical part of a downward-angled push adds to the weight.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'Downward push part = ' + force + ' sin(30) = ' + vertical + ' N.', 'N = ' + answer + ' N.']); },
        'normal-slant-up': function () { const m = 5 + step, force = 10 + step * 2, vertical = +(force * 0.5).toFixed(2), answer = +(m * 9.8 - vertical).toFixed(2); return num('normal-slant-up', 'A ' + m + ' kg box rests on level ground. A rope pulls at ' + force + ' N, 30 degrees above horizontal. Find N.', answer, 'N', 'The vertical part of an upward-angled pull reduces the normal force.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'Upward pull part = ' + force + ' sin(30) = ' + vertical + ' N.', 'N = ' + answer + ' N.']); },
        'tension-atwood': function () { const light = 1 + (step % 3), heavy = light + 2 + (step % 3), answer = +(2 * light * heavy * 9.8 / (light + heavy)).toFixed(2); return num('tension-atwood', 'An ideal Atwood machine has masses ' + light + ' kg and ' + heavy + ' kg. Find the cord tension.', answer, 'N', 'Use the Atwood acceleration, then apply Newton\'s second law to one mass.', ['Find a = (' + heavy + ' - ' + light + ') x 9.8 / (' + heavy + ' + ' + light + ').', 'For the lighter mass, T = m(g + a).', 'The cord tension is ' + answer + ' N.']); },
      weight: function () { const m = 2 + (step % 6); return num('weight', 'A ' + m + ' kg object is near Earth. What is its weight?', +(m * 9.8).toFixed(2), 'N', 'Weight is mass times 9.8.', ['Use W = mg.', 'Multiply ' + m + ' by 9.8.', 'The weight is ' + (m * 9.8).toFixed(2) + ' N.']); },
      resultant: function () { const big = 10 + step * 2, small = 3 + step; return num('resultant', 'A box is pushed right with ' + big + ' N. Friction is ' + small + ' N left. What is the net force magnitude?', big - small, 'N', 'The forces point in opposite directions, so subtract.', ['Choose right as positive.', 'Net force = ' + big + ' - ' + small + '.', 'The net force is ' + (big - small) + ' N right.']); },
      'force-from-ma': function () { const m = 2 + step, a = 1 + (step % 4); return num('force-from-ma', 'A ' + m + ' kg object accelerates at ' + a + ' m/s^2. Find its net force magnitude.', m * a, 'N', 'Newton\'s second law says F_net = ma.', ['Use F_net = ma.', 'Multiply ' + m + ' by ' + a + '.', 'The net force is ' + m * a + ' N.']); },
      net: function () { const m = 2 + step, a = 1 + (step % 3); return num('net', 'A ' + m + ' kg object has a net force of ' + (m * a) + ' N. Find its acceleration magnitude.', a, 'm/s^2', 'Acceleration magnitude is net force divided by mass.', ['Use a = F_net / m.', 'Divide ' + (m * a) + ' by ' + m + '.', 'a = ' + a + ' m/s^2.']); },
      thirdlaw: function () { const force = 8 + 2 * step; return num('thirdlaw', 'A hand pushes a wall with ' + force + ' N. How hard does the wall push back?', force, 'N', 'Newton\'s third-law forces have equal magnitude.', ['The hand pushes on the wall.', 'The wall pushes on the hand.', 'The force magnitude is ' + force + ' N.']); },
      inertia: function () { const m = 3 + step; return num('inertia', 'Which has more inertia: a ' + m + ' kg object or a 2 kg object? Enter the larger mass.', m, 'kg', 'The larger mass has more inertia.', ['Compare the two masses.', m + ' kg is larger than 2 kg.', 'So ' + m + ' kg has more inertia.']); },
      'fbd-normal': function () { const m = 2 + step; return num('normalflat', 'A ' + m + ' kg book rests on a level table. Find the table\'s normal force.', +(m * 9.8).toFixed(2), 'N', 'The book is at rest vertically, so the normal force balances its weight.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'The vertical forces balance.', 'The normal force is ' + (m * 9.8).toFixed(2) + ' N.']); },
      'force-gravity': function () { return mc('force-gravity', 'Which way does gravity pull a dropped object near Earth?', ['Toward Earth', 'Away from Earth', 'Along its velocity only', 'Sideways'], 0, 'Gravity points toward Earth.', ['Earth pulls on the object.', 'That pull is gravity.', 'It points toward Earth.']); },
      'force-applied': function () { return mc('force-applied', 'A student pulls a sled with a rope. What kind of force does the student provide?', ['Applied force', 'Normal force', 'Weight', 'Kinetic friction'], 0, 'A person\'s direct pull is an applied force.', ['Find the source.', 'The student pulls the sled.', 'That is an applied force.']); },
      'fbd-hanging': function () { const m = 2 + step; return num('tension-up', 'A ' + m + ' kg lamp hangs at rest from one cord. Find the cord tension.', +(m * 9.8).toFixed(2), 'N', 'At rest, tension balances weight.', ['Weight = ' + m + ' x 9.8.', 'The lamp has zero acceleration.', 'Tension = ' + (m * 9.8).toFixed(2) + ' N.']); },
      'fbd-push': function () { return mc('fbd-push', 'A box slides right over a rough floor. Which way is friction on the box?', ['Left', 'Right', 'Up', 'Down'], 0, 'Friction opposes sliding.', ['The box slides right.', 'The floor resists that motion.', 'Friction points left.']); },
      'first-rest': function () { return mc('first-rest', 'A stopped cart remains stopped. What is the net force on it?', ['Zero', 'Forward', 'Backward', 'Its weight'], 0, 'No change in velocity means zero acceleration and zero net force.', ['The cart stays at rest.', 'Its velocity is not changing.', 'Its net force is zero.']); },
      'first-constant': function () { return mc('first-constant', 'A bike rolls north at a steady 5 m/s. What is its net force?', ['North', 'South', 'Zero', 'Up'], 2, 'Constant velocity means zero acceleration.', ['The bike keeps the same speed and direction.', 'Acceleration is zero.', 'Net force is zero.']); },
      'friction-kinetic': function () { const mu = 0.1 * (1 + (step % 4)), normal = 20 + 10 * step, answer = +(mu * normal).toFixed(2); return num('friction-kinetic', 'A sliding block has mu_k = ' + mu.toFixed(1) + ' and N = ' + normal + ' N. Find f_k.', answer, 'N', 'Kinetic friction is mu_k times N.', ['Write f_k = mu_k N.', 'Multiply ' + mu.toFixed(1) + ' by ' + normal + '.', 'f_k = ' + answer + ' N.']); },
      'friction-static': function () { const mu = 0.2 * (1 + (step % 3)), normal = 20 + step * 10, answer = +(mu * normal).toFixed(2); return num('friction-static', 'A box has mu_s = ' + mu.toFixed(1) + ' and N = ' + normal + ' N. Find maximum static friction.', answer, 'N', 'Maximum static friction is mu_s N.', ['Use f_s,max = mu_s N.', 'Multiply ' + mu.toFixed(1) + ' by ' + normal + '.', 'The maximum is ' + answer + ' N.']); },
      'friction-direction': function () { return mc('friction-direction', 'A crate slides right on a rough floor. Which way is friction?', ['Left', 'Right', 'Up', 'Down'], 0, 'Friction points against sliding.', ['The crate slides right.', 'Friction resists that sliding.', 'It points left.']); },
      'static-adjust': function () { const push = 2 + step * 2; return num('static-adjust', 'A box does not move when pushed with ' + push + ' N. What is the static friction force magnitude?', push, 'N', 'Static friction matches the push while the box remains still.', ['The box does not move.', 'The push is below the maximum static friction.', 'Static friction matches it: ' + push + ' N.']); },
      'component-horizontal': function () { const force = 20 + step * 10; return num('component-horizontal', 'A ' + force + ' N force points 60 degrees above horizontal. Find its horizontal component.', +(force * 0.5).toFixed(2), 'N', 'The horizontal part is adjacent to the angle: F cos(theta).', ['Use F_x = F cos(60).', 'cos(60) = 0.5.', 'F_x = ' + (force * 0.5).toFixed(2) + ' N.']); },
      'component-vertical': function () { const force = 20 + step * 10; return num('component-vertical', 'A ' + force + ' N force points 30 degrees above horizontal. Find its vertical component.', +(force * 0.5).toFixed(2), 'N', 'The vertical part is opposite the angle: F sin(theta).', ['Use F_y = F sin(30).', 'sin(30) = 0.5.', 'F_y = ' + (force * 0.5).toFixed(2) + ' N.']); },
      'components-vertical-angle': function () { const force = 20 + step * 10; return num('components-vertical-angle', 'A ' + force + ' N force points 60 degrees from vertical. Find its vertical component.', +(force * 0.5).toFixed(2), 'N', 'When the angle is from vertical, use cosine for the vertical part.', ['The angle is measured from vertical.', 'Vertical is adjacent, so use cosine.', force + ' cos(60) = ' + (force * 0.5).toFixed(2) + ' N.']); },
      'ramp-parallel': function () { const m = 2 + step; return num('ramp-parallel', 'A ' + m + ' kg block sits on a 30 degree ramp. Find gravity\'s down-ramp part.', +(m * 9.8 * 0.5).toFixed(2), 'N', 'For a ramp angle from horizontal, the parallel part is mg sin(theta).', ['Weight = ' + m + ' x 9.8.', 'Use sine for the parallel part.', 'mg sin(30) = ' + (m * 9.8 * 0.5).toFixed(2) + ' N.']); },
      'ramp-normal': function () { const m = 2 + step; return num('ramp-normal', 'A ' + m + ' kg block rests on a 60 degree ramp. Find the normal force.', +(m * 9.8 * 0.5).toFixed(2), 'N', 'The perpendicular part is mg cos(theta).', ['Weight = ' + m + ' x 9.8.', 'Use cosine for the perpendicular part.', 'N = mg cos(60) = ' + (m * 9.8 * 0.5).toFixed(2) + ' N.']); },
      'ramp-angle': function () { return mc('ramp-angle', 'For a 60 degree ramp angle measured from horizontal, which part of gravity points down the ramp?', ['mg cos(60)', 'mg sin(60)', 'mg', 'mg tan(60)'], 1, 'The parallel part of gravity is mg sin(theta).', ['The angle is from horizontal.', 'The down-ramp part is opposite the angle.', 'Use mg sin(theta).']); },
      'normal-push': function () { const m = 5 + step, push = 10 + 2 * step, answer = +(m * 9.8 + push).toFixed(2); return num('normalflat', 'A ' + m + ' kg box rests on level ground. A ' + push + ' N force pushes down. Find N.', answer, 'N', 'A downward push adds to the weight.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'Add the downward push.', 'N = ' + answer + ' N.']); },
      'normal-pull': function () { const m = 5 + step, pull = 10 + 2 * step, answer = +(m * 9.8 - pull).toFixed(2); return num('normalflat', 'A ' + m + ' kg box rests on level ground. A rope pulls up with ' + pull + ' N. Find N.', answer, 'N', 'An upward pull reduces the normal force.', ['Weight = ' + m + ' x 9.8 = ' + (m * 9.8).toFixed(2) + ' N.', 'Subtract the upward pull.', 'N = ' + answer + ' N.']); },
      atwood: function () { const light = 1 + (step % 3), heavy = light + 2 + (step % 3); return num('atwood', 'An ideal Atwood machine has masses ' + heavy + ' kg and ' + light + ' kg. Find the acceleration magnitude.', +(((heavy - light) * 9.8) / (heavy + light)).toFixed(2), 'm/s^2', 'Acceleration equals the difference in weights divided by total mass.', ['Driving force = (' + heavy + ' - ' + light + ') x 9.8.', 'Total mass = ' + (heavy + light) + ' kg.', 'a = ' + (((heavy - light) * 9.8) / (heavy + light)).toFixed(2) + ' m/s^2.']); },
      'tension-atwood': function () { const m = 2 + (step % 3), a = 1 + step / 10, answer = +(m * (9.8 + a)).toFixed(2); return num('tension-up', 'A ' + m + ' kg mass accelerates upward at ' + a.toFixed(1) + ' m/s^2 on a cord. Find tension.', answer, 'N', 'For upward acceleration, T = m(g + a).', ['Write T - mg = ma.', 'Rearrange: T = m(g + a).', 'T = ' + m + '(9.8 + ' + a.toFixed(1) + ') = ' + answer + ' N.']); },
      'system-internal': function () { return mc('system-internal', 'When two tied boxes are treated as one system, what happens to the cord tension forces?', ['They cancel as internal forces.', 'They become the net force.', 'They point the same way.', 'They disappear because the cord is loose.'], 0, 'The two internal pulls are equal and opposite for the whole system.', ['Consider both boxes together.', 'The cord pulls each box in opposite directions.', 'Those internal forces cancel.']); },
      'tension-rope': function () { return mc('tension-rope', 'A cord pulls a box to the left. Which direction is its tension on the box?', ['Left, along the cord', 'Right', 'Down', 'Tension is zero'], 0, 'A cord pulls along its length.', ['A taut cord pulls, not pushes.', 'Follow the cord direction from the box.', 'Tension points left.']); },
      'elevator-up': function () { const m = 30 + 10 * (step % 4), a = 1 + step % 3, answer = m * (9.8 + a); return num('elevator-up', 'A ' + m + ' kg rider accelerates upward at ' + a + ' m/s^2. What does the scale read?', answer, 'N', 'Upward acceleration means N = m(g + a).', ['Use N = m(g + a).', 'N = ' + m + '(9.8 + ' + a + ').', 'The scale reads ' + answer + ' N.']); },
      'elevator-down': function () { const m = 40 + 10 * (step % 4), a = 1 + step % 3, answer = m * (9.8 - a); return num('elevator-down', 'A ' + m + ' kg rider accelerates down at ' + a + ' m/s^2. What does the scale read?', answer, 'N', 'Downward acceleration means N = m(g - a).', ['Use N = m(g - a).', 'N = ' + m + '(9.8 - ' + a + ').', 'The scale reads ' + answer + ' N.']); },
      'elevator-scale': function () { return mc('elevator-scale', 'A scale is under your feet. What force does it read?', ['Normal force', 'Gravity only', 'Tension', 'Acceleration'], 0, 'The scale reads the normal force it exerts on you.', ['The scale pushes up on you.', 'That is the normal force.', 'The scale reading is its magnitude.']); },
      'elevator-constant': function () { const m = 40 + 10 * step, answer = +(m * 9.8).toFixed(2); return num('elevator-constant', 'A ' + m + ' kg rider moves at constant velocity in an elevator. Find the scale reading.', answer, 'N', 'Constant velocity means zero acceleration, so N = mg.', ['Acceleration is zero.', 'The vertical forces balance.', 'N = ' + m + ' x 9.8 = ' + answer + ' N.']); },
      'elevator-freefall': function () { return num('elevator-freefall', 'A person is in free fall with a scale. What is the scale reading?', 0, 'N', 'In free fall, there is no normal force from the scale.', ['The person and scale fall together.', 'Gravity provides the acceleration.', 'The scale does not push on the person: 0 N.']); },
      'elevator-direction': function () { return mc('elevator-direction', 'An elevator moves down but slows. Which way does acceleration point?', ['Up', 'Down', 'Zero', 'Sideways'], 0, 'Slowing means acceleration opposes velocity.', ['Velocity points down.', 'The elevator slows down.', 'Acceleration points up.']); },
      'elevator-weight': function () { return mc('elevator-weight', 'A rider moves up at constant speed. How does the scale reading compare to weight?', ['It equals weight.', 'It is greater than weight.', 'It is zero.', 'It is less than weight.'], 0, 'Constant speed means zero acceleration, so N = mg.', ['The speed is constant.', 'Acceleration is zero.', 'The scale force equals weight.']); },
      spring: function () { const k = 100 + step * 20, x = +(0.02 + (step % 4) * 0.01).toFixed(2), answer = +(k * x).toFixed(2); return num('spring', 'A spring has k = ' + k + ' N/m and extra stretch ' + x.toFixed(2) + ' m. Find the force magnitude.', answer, 'N', 'Hooke\'s law is F = kx.', ['Use extra stretch x = ' + x.toFixed(2) + ' m.', 'F = ' + k + ' x ' + x.toFixed(2) + '.', 'The force is ' + answer + ' N.']); },
      'spring-stretch': function () { const rest = +(0.2 + step * 0.05).toFixed(2), extra = +(0.03 + (step % 4) * 0.01).toFixed(2), length = +(rest + extra).toFixed(2); return num('spring-stretch', 'A spring has relaxed length ' + rest.toFixed(2) + ' m and final length ' + length.toFixed(2) + ' m. Find its extra stretch.', extra, 'm', 'Extra stretch is final length minus relaxed length.', ['Subtract the relaxed length from the final length.', length.toFixed(2) + ' - ' + rest.toFixed(2) + ' = ' + extra.toFixed(2) + '.', 'The extra stretch is ' + extra.toFixed(2) + ' m.']); },
      'spring-parallel': function () { const k1 = 10 + step * 5, k2 = 20 + step * 5; return num('spring-parallel', 'Two springs with k = ' + k1 + ' N/m and ' + k2 + ' N/m are side by side. Find their combined k.', k1 + k2, 'N/m', 'For springs in parallel, add stiffnesses.', ['Use k_eq = k1 + k2.', k1 + ' + ' + k2 + ' = ' + (k1 + k2) + '.', 'The combined stiffness is ' + (k1 + k2) + ' N/m.']); },
      'spring-series': function () { const k1 = 20 + step * 10, k2 = 2 * k1; return num('spring-series', 'Two springs with k = ' + k1 + ' N/m and ' + k2 + ' N/m are in a chain. Find their combined k.', +(k1 * k2 / (k1 + k2)).toFixed(2), 'N/m', 'For two springs in series, k_eq = k1 k2 / (k1 + k2).', ['Use k_eq = k1 k2 / (k1 + k2).', 'Substitute the two stiffnesses.', 'The combined stiffness is ' + (k1 * k2 / (k1 + k2)).toFixed(2) + ' N/m.']); },
      'spring-graph': function () { return mc('spring-graph', 'On a force-versus-stretch graph, what does the slope show?', ['Spring stiffness k', 'Mass', 'Weight', 'Relaxed length'], 0, 'From F = kx, the graph slope is k.', ['Compare F = kx with y = mx.', 'The slope is F/x.', 'That is the spring stiffness k.']); },
      'spring-direction': function () { return mc('spring-direction', 'A spring is compressed. Which way does its force on the block point?', ['Away from its compressed position', 'Farther into compression', 'Down', 'It has no force'], 0, 'A spring pushes back toward its relaxed length.', ['The spring is compressed.', 'It pushes back against the compression.', 'Its force points toward the relaxed length.']); },
      'circular-a': function () { const v = 4 + step, r = 2 + step, answer = +(v * v / r).toFixed(2); return num('circular-a', 'An object moves at ' + v + ' m/s in a circle of radius ' + r + ' m. Find its inward acceleration.', answer, 'm/s^2', 'Use a_c = v^2/r.', ['Square the speed: ' + v + '^2 = ' + v * v + '.', 'Divide by radius ' + r + '.', 'a_c = ' + answer + ' m/s^2 inward.']); },
      'circular-f': function () { const m = 2 + step, v = 3 + step, r = 2 + (step % 4), answer = +(m * v * v / r).toFixed(2); return num('circular-f', 'A ' + m + ' kg object moves at ' + v + ' m/s in a circle of radius ' + r + ' m. Find the inward net force.', answer, 'N', 'Use F_net,in = mv^2/r.', ['Square the speed: ' + v + '^2 = ' + v * v + '.', 'Multiply by mass and divide by radius.', 'F_net,in = ' + answer + ' N.']); },
      'centripetal-real': function () { return mc('centripetal-real', 'A car turns on a level road. What real force can point toward the turn center?', ['Static friction', 'Velocity', 'Centripetal force by itself', 'Air pressure upward'], 0, 'Tire-road friction can provide the inward net force.', ['A turn needs inward acceleration.', 'That needs an inward real force.', 'Static friction can point inward.']); },
      'circular-direction': function () { return mc('circular-direction', 'At the bottom of a circular path, which way does centripetal acceleration point?', ['Up, toward the center', 'Down', 'Left', 'Along the velocity'], 0, 'Centripetal acceleration always points toward the center.', ['At the bottom, locate the center above the object.', 'Point from the object to the center.', 'Acceleration points up.']); },
      'circular-speed': function () { return mc('circular-speed', 'If speed triples on the same circle, how does centripetal acceleration change?', ['It triples.', 'It becomes nine times as large.', 'It stays the same.', 'It is one third as large.'], 1, 'Centripetal acceleration depends on speed squared.', ['Use a_c = v^2/r.', 'Replace v with 3v.', '(3v)^2 = 9v^2, so acceleration is nine times larger.']); },
      'circular-velocity': function () { return mc('circular-velocity', 'An object moves around a circle at steady speed. Does its velocity change?', ['Yes, its direction changes.', 'No, steady speed means steady velocity.', 'No, it has no acceleration.', 'Yes, its mass changes.'], 0, 'Velocity includes direction, and direction changes around a circle.', ['The speed stays the same.', 'The direction keeps turning.', 'So velocity changes.']); }
    };
    const build = templates[question.skill] || templates.resultant;
    const retry = build();
    retry.id = question.id + '-retry-' + round;
    retry.topic = question.topic;
    retry.topicTitle = question.topicTitle;
    retry.color = question.color;
    return retry;
  }

  const formulas = [
    { title: 'Forces & motion', color: '#9B7FD1', entries: [
      ['F_net = sum of forces', 'N', 'Add forces as vectors.'],
      ['F_net = ma', 'N = kg m/s^2', 'Net force and acceleration point in the same direction.'],
      ['sum F_x = 0; sum F_y = 0', 'N', 'Equilibrium: at rest or moving at constant velocity.'],
      ['W = mg', 'N; kg; m/s^2', 'Weight W is a force. Near Earth, g = 9.8 m/s^2 downward.'],
      ['F_x = F cos(theta); F_y = F sin(theta)', 'N', 'For theta measured from horizontal. From vertical, swap sine and cosine.']
    ] },
    { title: 'Surfaces & ramps', color: '#FFB547', entries: [
      ['f_k = mu_k N', 'N', 'Kinetic friction while surfaces slide.'],
      ['f_s <= mu_s N', 'N', 'Static friction adjusts up to its maximum.'],
      ['N = mg cos(theta)', 'N', 'On a ramp at angle theta from horizontal, if there are no other perpendicular forces.'],
      ['F_parallel = mg sin(theta)', 'N', 'Gravity component down a ramp at angle theta from horizontal.'],
      ['N = mg +/- F_y', 'N', 'On level ground: subtract an upward applied component; add a downward one.']
    ] },
    { title: 'Connected objects', color: '#4EA8DE', entries: [
      ['a = (m_heavy - m_light)g / (m_heavy + m_light)', 'm/s^2', 'Ideal Atwood machine: light cord and frictionless pulley.'],
      ['F_net,system = m_total a', 'N = kg m/s^2', 'Internal forces like tension cancel for the whole system.'],
      ['T - mg = ma', 'N', 'One object accelerating upward.'],
      ['mg - T = ma', 'N', 'One object accelerating downward.']
    ] },
    { title: 'Elevators', color: '#F472B6', entries: [
      ['N = m(g + a)', 'N', 'Elevator accelerating upward. The scale reads N.'],
      ['N = m(g - a)', 'N', 'Elevator accelerating downward, with a less than g.'],
      ['N = mg', 'N', 'At rest or constant velocity: acceleration is zero.']
    ] },
    { title: 'Springs', color: '#7BD389', entries: [
      ['F_spring = kx', 'N; N/m; m', 'x is extra stretch or compression from relaxed length. Spring force points back toward rest.'],
      ['k_parallel = k_1 + k_2', 'N/m', 'Springs side by side.'],
      ['1/k_series = 1/k_1 + 1/k_2', 'N/m', 'Springs in a chain.'],
      ['slope of F vs. x = k', 'N/m', 'For a straight Hooke\'s law graph.']
    ] },
    { title: 'Circular motion', color: '#F5D04C', entries: [
      ['a_c = v^2/r', 'm/s^2', 'Acceleration points toward the center.'],
      ['F_net,in = mv^2/r', 'N', 'The real inward forces add to make this net force.'],
      ['v = distance / time', 'm/s', 'For one full lap: distance is 2 pi r.']
    ] }
  ];

  window.PHYSICS_DATA = { topics, formulas, retryFor };
})();
