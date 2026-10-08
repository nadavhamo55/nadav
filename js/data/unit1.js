window.UNIT_DATA = window.UNIT_DATA || {};
window.UNIT_DATA['unit-1'] = {
  id: 'unit-1',
  number: 1,
  name: 'Kinematics',
  color: '#5AB0FF',
  icon: '↗',
  weight: '10–15%',
  description: 'Motion in one and two dimensions.',
  topics: [
    { id: '1.1', title: 'Scalars and vectors in one dimension', slides: [{ title: 'Vector basics', content: 'A scalar has size only. A vector has size and direction. In AP Physics, direction matters.' }, { title: 'Example', formula: 'v = Δx / Δt', content: 'Average velocity uses displacement, not total distance.' }, { title: 'Quick check', content: 'If you walk 3 m east and then 3 m west, your displacement is zero.' }] },
    { id: '1.2', title: 'Displacement, velocity, and acceleration', slides: [{ title: 'Start here', content: 'Displacement asks where you end relative to where you started.' }, { title: 'Formula', formula: 'a = Δv / Δt', content: 'Acceleration tells how velocity changes each second.' }, { title: 'Watch out', content: 'A larger speed does not always mean a larger acceleration.' }] },
    { id: '1.3', title: 'Representing motion', slides: [{ title: 'Graphs', content: 'Slope of a position-time graph gives velocity. Slope of a velocity-time graph gives acceleration.' }, { title: 'Equation', formula: 'x = x₀ + v₀t + ½at²', content: 'Use this when motion is constant acceleration.' }, { title: 'Quick check', content: 'On a speed-time graph, the area under the curve is distance.' }] },
    { id: '1.4', title: 'Reference frames and relative motion', slides: [{ title: 'Reference frames', content: 'Velocity depends on the frame you choose.' }, { title: 'Example', content: 'A person walking on a moving train has different velocity relative to the ground and the train.' }, { title: 'Quick check', content: 'You must name the frame before comparing motion.' }] },
    { id: '1.5', title: 'Vectors and motion in two dimensions', slides: [{ title: 'Projectile idea', content: 'Separate horizontal and vertical motion. The horizontal motion is independent of the vertical motion.' }, { title: 'Formula', formula: 'x = x₀ + v₀x t', content: 'The horizontal component stays constant if air resistance is ignored.' }, { title: 'Check', content: 'The vertical motion still speeds up downward because gravity acts downward.' }] }
  ]
};
