window.UNIT_DATA = window.UNIT_DATA || {};
window.UNIT_DATA['unit-8'] = {
  id: 'unit-8',
  number: 8,
  name: 'Fluids',
  color: '#F5D04C',
  icon: '≈',
  weight: '10–15%',
  description: 'Density, pressure, buoyancy, and fluid motion.',
  topics: [
    { id: '8.1', title: 'Internal structure and density', slides: [{ title: 'Density', content: 'Density tells how much mass fits in a volume.' }, { title: 'Formula', formula: 'ρ = m/V', content: 'Units are kg/m³ or g/cm³.' }, { title: 'Tip', content: 'A denser fluid pushes harder on a submerged object.' }] },
    { id: '8.2', title: 'Pressure and buoyancy', slides: [{ title: 'Pressure', content: 'Pressure is force spread over an area.' }, { title: 'Equation', formula: 'P = F/A', content: 'Pressure increases with depth in a fluid.' }, { title: 'Check', content: 'Buoyant force is upward because the fluid pushes up more than down.' }] },
    { id: '8.3', title: 'Fluid flow', slides: [{ title: 'Continuity', content: 'For steady flow, the volume flow rate stays constant.' }, { title: 'Equation', formula: 'A₁v₁ = A₂v₂', content: 'Narrower sections have faster flow if the area decreases.' }, { title: 'Quick check', content: 'Pressure drops where the fluid speeds up.' }] }
  ]
};
