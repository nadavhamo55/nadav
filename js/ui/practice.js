(function () {
  'use strict';

  function renderPractice(unit) {
    const firstTopic = unit.topics[0];
    const problems = [
      {
        question: 'A 2 kg box is pushed with a net force of 8 N. What is the acceleration?',
        answer: '4 m/s²',
        hint: 'Use F_net = ma.'
      },
      {
        question: 'The weight of a 5 kg object is closest to:',
        answer: '49 N',
        hint: 'Weight equals mg.'
      }
    ];

    return `
      <div class="practice-list">
        ${problems.map(function (problem, index) {
          return `
            <div class="practice-card">
              <h3>Problem ${index + 1}</h3>
              <p>${problem.question}</p>
              <div class="action-row">
                <button type="button" class="secondary-button" data-action="lesson-next" data-unit="${unit.number}" data-topic="${firstTopic.id}" data-slide="1">Show solution</button>
                <button type="button" class="secondary-button">Check</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  window.renderPractice = renderPractice;
})();
