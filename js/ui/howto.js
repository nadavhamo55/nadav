(function () {
  'use strict';

  function renderHowTo(unit) {
    const recipes = [
      { title: 'Draw a free-body diagram', clue: 'forces, diagram, object', steps: ['Pick the object', 'List each force', 'Check direction', 'Use one diagram'] },
      { title: 'Choose a positive direction', clue: 'signs, direction, acceleration', steps: ['Pick positive', 'Assign signs', 'Solve carefully'] },
      { title: 'Break a force into components', clue: 'ramp, angled, components', steps: ['Resolve the force', 'Use sine and cosine', 'Add components'] },
      { title: 'Solve a friction problem', clue: 'friction, sliding, surface', steps: ['Find normal force', 'Calculate friction', 'Apply net force'] }
    ];

    return `
      <div>
        <input type="search" class="recipe-search" data-role="recipe-search" placeholder="Search recipes or clue words..." aria-label="Search recipe list" />
        <div class="recipe-list">
          ${recipes.map(function (recipe) {
            return `
              <div class="recipe-card" data-recipe="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p><strong>Use this when:</strong> ${recipe.clue}</p>
                <ol>${recipe.steps.map(function (step) { return '<li>' + step + '</li>'; }).join('')}</ol>
                <div class="action-row">
                  <button type="button" class="secondary-button" aria-label="Recipe starter" data-action="open-tab" data-unit="${unit.number}" data-tab="practice">Practice this now</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  window.renderHowTo = renderHowTo;
})();
