(function () {
  'use strict';

  const FLASHCARD_BANK = {
    'unit-1': [
      { front: 'What is displacement?', back: 'Displacement is the change in position from start to finish, including direction.' },
      { front: 'How do you get average velocity?', back: 'Average velocity = displacement / time.' },
      { front: 'What does the slope of a position-time graph tell you?', back: 'The slope tells you velocity.' },
      { front: 'Why do we split projectile motion into horizontal and vertical parts?', back: 'Because the motion is independent in each direction when air resistance is ignored.' }
    ],
    'unit-2': [
      { front: 'What is the equation for weight?', back: 'Weight = mg, where m is mass and g is gravitational field strength.' },
      { front: 'What does a free-body diagram show?', back: 'Only the forces acting on one object, drawn as arrows.' },
      { front: 'What is F_net = ma?', back: 'The net force on an object equals its mass times its acceleration.' },
      { front: 'What is the direction of centripetal acceleration?', back: 'Toward the center of the circular path.' }
    ],
    'unit-3': [
      { front: 'What is kinetic energy?', back: 'Kinetic energy is the energy of motion: K = 1/2 mv².' },
      { front: 'What is work?', back: 'Work is force times displacement in the direction of motion, W = Fd cosθ.' },
      { front: 'What does conservation of energy say?', back: 'Total mechanical energy stays constant unless nonconservative work adds or removes energy.' },
      { front: 'What does power measure?', back: 'Power is how quickly work is done: P = W / t.' }
    ],
    'unit-4': [
      { front: 'What is momentum?', back: 'Momentum is mass times velocity: p = mv.' },
      { front: 'What is impulse?', back: 'Impulse is the change in momentum, J = Δp = FΔt.' },
      { front: 'When is momentum conserved?', back: 'When the net external force on the system is zero.' },
      { front: 'How do elastic and inelastic collisions differ?', back: 'Elastic collisions conserve kinetic energy; inelastic collisions do not.' }
    ],
    'unit-5': [
      { front: 'What is torque?', back: 'Torque is a twisting effect: τ = rF sinθ.' },
      { front: 'What does rotational inertia depend on?', back: 'It depends on how mass is distributed relative to the rotation axis.' },
      { front: 'What does Στ = Iα mean?', back: 'Net torque equals rotational inertia times angular acceleration.' },
      { front: 'When is a seesaw in rotational equilibrium?', back: 'When the clockwise and counterclockwise torques are equal.' }
    ],
    'unit-6': [
      { front: 'What is rotational kinetic energy?', back: 'Rotational kinetic energy is K_rot = 1/2 Iω².' },
      { front: 'What is angular momentum?', back: 'Angular momentum is L = Iω for a rigid body.' },
      { front: 'When is angular momentum conserved?', back: 'When the net external torque on the system is zero.' },
      { front: 'What does rolling without slipping mean?', back: 'The point of contact has zero instantaneous velocity relative to the surface.' }
    ],
    'unit-7': [
      { front: 'What is simple harmonic motion?', back: 'It is periodic motion about equilibrium with a restoring force toward the center.' },
      { front: 'What is the period?', back: 'The time for one full cycle.' },
      { front: 'Where is speed greatest in SHM?', back: 'At equilibrium, where the restoring force is zero.' },
      { front: 'Where is potential energy greatest in SHM?', back: 'At the turning points, where displacement is greatest.' }
    ],
    'unit-8': [
      { front: 'What is density?', back: 'Density is mass per unit volume: ρ = m/V.' },
      { front: 'What is pressure?', back: 'Pressure is force per unit area: P = F/A.' },
      { front: 'Why does buoyant force act upward?', back: 'Because pressure is greater at greater depth, so the fluid pushes upward more strongly.' },
      { front: 'What does continuity tell us in fluid flow?', back: 'For steady flow, the volume flow rate stays constant: A₁v₁ = A₂v₂.' }
    ]
  };

  function renderFlashcards(unit) {
    const cards = FLASHCARD_BANK[unit.id] || FLASHCARD_BANK['unit-1'];

    return `
      <div class="flashcard-list">
        ${cards.map(function (card, index) {
          return `
            <div class="flashcard">
              <h3>${unit.name} card ${index + 1}</h3>
              <p>${card.front}</p>
              <div class="action-row">
                <button type="button" class="secondary-button">Flip</button>
                <button type="button" class="secondary-button">Got it</button>
                <button type="button" class="secondary-button">Almost</button>
                <button type="button" class="secondary-button">Didn't know</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  window.renderFlashcards = renderFlashcards;
})();
