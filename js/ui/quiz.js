(function () {
  'use strict';

  function renderQuiz(unit, type) {
    const questions = [
      { prompt: 'Which quantity is a vector?', choices: ['Speed', 'Distance', 'Force', 'Mass'] },
      { prompt: 'If net force is zero, what is acceleration?', choices: ['Positive', 'Negative', 'Zero', 'Depends on mass'] }
    ];

    return `
      <div class="question-list">
        ${questions.map(function (question, index) {
          return `
            <div class="question-card">
              <h3>${type === 'unit' ? 'Unit quiz' : 'Topic quiz'} question ${index + 1}</h3>
              <p>${question.prompt}</p>
              <div class="answer-list">
                ${question.choices.map(function (choice) {
                  return `<button type="button" class="answer-option" data-action="answer-quiz">${choice}</button>`;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
        <div class="action-row">
          <button type="button" class="primary-button">Submit ${type === 'unit' ? 'unit quiz' : 'quiz'}</button>
        </div>
      </div>
    `;
  }

  window.renderQuiz = renderQuiz;
})();
