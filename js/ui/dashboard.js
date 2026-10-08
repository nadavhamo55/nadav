(function () {
  'use strict';

  function renderDashboard() {
    const units = Object.values(window.UNIT_DATA || {}).sort(function (a, b) { return a.number - b.number; });
    return `
      <div class="page">
        <div class="panel">
          <h1 class="page-title">Dashboard</h1>
          <div class="dashboard-grid">
            ${units.map(function (unit) {
              return `
                <div class="card" style="border-top: 3px solid ${unit.color};">
                  <div class="section-header">
                    <h3>Unit ${unit.number}</h3>
                    <span>${unit.name}</span>
                  </div>
                  <button type="button" class="secondary-button" data-action="open-unit" data-unit="${unit.number}">Open unit</button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  window.renderDashboard = renderDashboard;
})();
