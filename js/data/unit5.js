window.UNIT_DATA = window.UNIT_DATA || {};
window.UNIT_DATA['unit-5'] = {
  id: 'unit-5',
  number: 5,
  name: 'Torque and Rotational Dynamics',
  color: '#2EC4B6',
  icon: '⟳',
  weight: '10–15%',
  description: 'Rotation, torque, and rotational motion.',
  topics: [
    { id: '5.1', title: 'Rotational kinematics', slides: [{ title: 'Idea', content: 'Angular motion is the rotation version of linear motion.' }, { title: 'Formula', formula: 'ω = Δθ / Δt', content: 'Angular velocity is rate of rotation.' }, { title: 'Quick check', content: 'A full circle is 2π radians.' }] },
    { id: '5.2', title: 'Connecting linear and rotational motion', slides: [{ title: 'Relation', content: 'For a wheel or disk, linear distance along the edge is related to angular displacement.' }, { title: 'Formula', formula: 's = rθ', content: 'Arc length uses radius and angle.' }, { title: 'Check', content: 'v = rω and a = rα for rolling without slipping.' }] },
    { id: '5.3', title: 'Torque', slides: [{ title: 'Torque', content: 'Torque is a twisting effect caused by a force at a distance from the pivot.' }, { title: 'Formula', formula: 'τ = rF sinθ', content: 'The perpendicular distance matters.' }, { title: 'Tip', content: 'A longer lever arm gives more torque.' }] },
    { id: '5.4', title: 'Rotational inertia', slides: [{ title: 'Moment of inertia', content: 'Rotational inertia depends on mass distribution.' }, { title: 'Idea', content: 'Objects with mass farther from the axis resist rotation more.' }, { title: 'Quick check', content: 'A hoop is harder to spin than a solid disk with the same mass and radius.' }] },
    { id: '5.5', title: 'Rotational equilibrium', slides: [{ title: 'Balance', content: 'For equilibrium, the net torque and net force are zero.' }, { title: 'Example', content: 'A seesaw balances when clockwise and counterclockwise torques are equal.' }, { title: 'Check', content: 'Torque direction depends on which way the force would rotate the object.' }] },
    { id: '5.6', title: 'Newton\'s second law in rotational form', slides: [{ title: 'Equation', formula: 'Στ = Iα', content: 'Net torque equals rotational inertia times angular acceleration.' }, { title: 'Example', content: 'A larger torque gives larger angular acceleration.' }, { title: 'Check', content: 'Use the same sign convention for positive and negative torque.' }] }
  ]
};
