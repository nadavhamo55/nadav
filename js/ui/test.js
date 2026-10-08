(function () {
  'use strict';

  function renderUnitTest(unit) {
    return `
      <div class="question-card">
        <h3>Unit test preview</h3>
        <p>AP-style unit test with multiple-choice questions and 2 FRQs.</p>
        <div class="action-row">
          <button type="button" class="primary-button" data-action="open-tab" data-unit="${unit.number}" data-tab="unit-quiz">Review Unit Quiz</button>
          <button type="button" class="secondary-button" data-action="nav-home">Back to home</button>
        </div>
      </div>
    `;
  }

  window.renderUnitTest = renderUnitTest;
})();
