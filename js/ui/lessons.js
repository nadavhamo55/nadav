(function () {
  'use strict';

  function renderLessons(unit) {
    const nodes = unit.topics.map(function (topic) {
      return `
        <button type="button" class="lesson-node" data-action="open-lesson" data-unit="${unit.number}" data-topic="${topic.id}" style="--unit-color:${unit.color};">
          <span class="dot"></span>
          <span>${topic.id}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="lesson-map">
        ${nodes}
      </div>
      <div class="action-row">
        <button type="button" class="primary-button" data-action="open-lesson" data-unit="${unit.number}" data-topic="${unit.topics[0].id}">Start first lesson</button>
      </div>
    `;
  }

  window.renderLessons = renderLessons;
})();
