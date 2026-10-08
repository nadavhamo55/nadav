(function () {
  'use strict';

  function renderFbdTool() {
    return `
      <div class="question-card">
        <h3>Free-body diagram tool</h3>
        <p>Drag or choose arrows for gravity, normal, friction, tension, and applied forces.</p>
        <div class="action-row">
          <button type="button" class="secondary-button">Undo</button>
          <button type="button" class="secondary-button">Redo</button>
          <button type="button" class="secondary-button">Clear</button>
          <button type="button" class="primary-button">Check diagram</button>
        </div>
      </div>
    `;
  }

  window.renderFbdTool = renderFbdTool;
})();
