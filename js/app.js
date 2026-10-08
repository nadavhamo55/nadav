(function () {
  'use strict';

  const STORAGE_KEY = 'small-steps-physics-progress-v1';
  const DEFAULT_STATE = {
    theme: 'dark',
    gravity: 9.8,
    timerOn: false,
    unlockAll: false,
    lastPage: '/home',
    streak: 5,
    progress: {
      scores: {},
      attempts: {},
      completedTopics: {},
      flashcards: {} 
    }
  };

  const app = document.getElementById('app');
  const settingsPanel = document.getElementById('settings-panel');
  const breadcrumbsEl = document.getElementById('breadcrumbs');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function safeParse(raw) {
    try {
      return JSON.parse(raw || '{}');
    } catch (error) {
      return {};
    }
  }

  function loadState() {
    const raw = safeParse(localStorage.getItem(STORAGE_KEY));
    return Object.assign({}, DEFAULT_STATE, raw, {
      progress: Object.assign({}, DEFAULT_STATE.progress, raw.progress || {})
    });
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(window.state));
    } catch (error) {
      showToast('Progress could not be saved.');
    }
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('visible'); }, 2200);
  }

  function ensureUnitCatalog() {
    const list = window.UNIT_DATA ? Object.keys(window.UNIT_DATA).map(function (key) { return window.UNIT_DATA[key]; }) : [];
    return list.sort(function (a, b) { return a.number - b.number; });
  }

  function getUnitByNumber(num) {
    return ensureUnitCatalog().find(function (unit) { return unit.number === Number(num); }) || ensureUnitCatalog()[0];
  }

  function getUnitById(id) {
    return ensureUnitCatalog().find(function (unit) { return unit.id === id; }) || ensureUnitCatalog()[0];
  }

  function getTopicForUnit(unitId, topicId) {
    const unit = getUnitById(unitId);
    return unit.topics.find(function (topic) { return topic.id === topicId; }) || unit.topics[0];
  }

  function unitProgress(unit) {
    const completeSet = window.state.progress.completedTopics || {};
    const unitTopics = (unit.topics || []).length;
    const doneCount = (unit.topics || []).filter(function (topic) {
      return completeSet[unit.id + ':' + topic.id] === true;
    }).length;
    return Math.round((doneCount / Math.max(unitTopics, 1)) * 100);
  }

  function pluralize(value, singular, plural) {
    return value === 1 ? singular : plural;
  }

  function setTheme() {
    document.body.dataset.theme = window.state.theme || 'dark';
    const toggleButton = document.querySelector('[data-action="toggle-theme"]');
    if (toggleButton) {
      toggleButton.textContent = window.state.theme === 'light' ? 'Light mode' : 'Dark mode';
    }
  }

  function updateSettingControls() {
    const gravitySelect = document.querySelector('[data-setting="gravity"]');
    if (gravitySelect) {
      gravitySelect.value = String(window.state.gravity || 9.8);
    }
    const timerButton = document.querySelector('[data-action="toggle-timer"]');
    if (timerButton) {
      timerButton.textContent = window.state.timerOn ? 'On' : 'Off';
    }
    const unlockButton = document.querySelector('[data-action="toggle-unlock"]');
    if (unlockButton) {
      unlockButton.textContent = window.state.unlockAll ? 'On' : 'Off';
    }
  }

  function renderBreadcrumbs(path) {
    const crumbs = [
      { label: 'Home', path: '/home' }
    ];

    if (path === '/dashboard') {
      crumbs.push({ label: 'Dashboard', path: '/dashboard' });
    } else if (path === '/exam') {
      crumbs.push({ label: 'AP Exam', path: '/exam' });
    } else if (path.startsWith('/unit/')) {
      const route = window.getRouteInfo();
      const unit = getUnitByNumber(route.unitNumber || 1);
      if (unit) {
        crumbs.push({ label: 'Unit ' + unit.number, path: '/unit/' + unit.number + '/overview' });
      }
      if (route.view === 'lesson') {
        crumbs.push({ label: 'Lessons', path: '/unit/' + route.unitNumber + '/lessons' });
        crumbs.push({ label: route.topic, path: '/unit/' + route.unitNumber + '/lesson/' + route.topic + '/slide/1' });
      } else if (route.view === 'unit') {
        const label = route.tab === 'overview' ? 'Overview' : route.tab === 'howto' ? 'How To' : route.tab === 'lessons' ? 'Lessons' : route.tab === 'practice' ? 'Practice' : route.tab === 'unit-quiz' ? 'Unit Quiz' : route.tab === 'unit-test' ? 'Unit Test' : route.tab === 'flashcards' ? 'Flashcards' : 'Review';
        crumbs.push({ label, path: path });
      }
    }

    breadcrumbsEl.innerHTML = crumbs.map(function (crumb, index) {
      const last = index === crumbs.length - 1;
      return '<button type="button" data-action="crumb" data-path="' + crumb.path + '"' + (last ? ' class="current"' : '') + '>' + crumb.label + '</button>' + (last ? '' : '<span>›</span>');
    }).join('');
  }

  function renderHome() {
    const units = ensureUnitCatalog();
    const total = units.reduce(function (sum, unit) {
      return sum + unitProgress(unit);
    }, 0);
    const average = Math.round(total / Math.max(units.length, 1));
    const progress = Math.min(100, average);

    const weakUnit = units.reduce(function (best, unit) {
      const score = unitProgress(unit);
      return score < (best ? unitProgress(best) : 101) ? unit : best;
    }, null);

    app.innerHTML = `
      <div class="page">
        <section class="home-grid">
          <div class="panel welcome-card">
            <div class="section-header">
              <div>
                <p class="tiny-label">Welcome back</p>
                <h1 class="page-title">AP Physics 1</h1>
              </div>
              <div class="progress-ring" aria-label="Overall progress ${progress}%" style="--progress:${progress}; background: conic-gradient(#5AB0FF 0 ${progress}%, rgba(255,255,255,0.08) ${progress}% 100%);">
                <div class="progress-ring-inner">${progress}%</div>
              </div>
            </div>

            <div class="metric-row">
              <span class="metric-pill">Streak: ${window.state.streak} days</span>
              <span class="metric-pill">Weakest topic: ${weakUnit ? weakUnit.name : 'None yet'}</span>
            </div>

            <div class="action-row">
              <button type="button" class="primary-button" data-action="continue-last">Continue where I left off</button>
              <button type="button" class="secondary-button" data-action="study-weakest">Study my weakest topic</button>
              <button type="button" class="secondary-button" data-action="open-dashboard">Dashboard</button>
            </div>

            <div class="action-row">
              <button type="button" class="secondary-button" data-action="open-daily-10">Daily 10</button>
              <button type="button" class="secondary-button" data-action="open-exam">AP Exam</button>
            </div>
          </div>

          <div class="panel">
            <div class="section-header">
              <h2>Study focus</h2>
            </div>
            <div class="summary-list">
              <div class="topic-item">
                <div>
                  <strong>Today</strong>
                  <span>Review one lesson and solve one practice set.</span>
                </div>
              </div>
              <div class="topic-item">
                <div>
                  <strong>Remember</strong>
                  <span>Start from a simple diagram before writing equations.</span>
                </div>
              </div>
              <div class="topic-item">
                <div>
                  <strong>AP tip</strong>
                  <span>Write units in every substitution and justify each step.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="section-header">
            <h2>All units</h2>
          </div>
          <div class="unit-grid">
            ${units.map(function (unit) {
              const unitPercent = unitProgress(unit);
              return `
                <button type="button" class="unit-card" data-action="open-unit" data-unit="${unit.number}" aria-label="Unit ${unit.number}" style="--unit-color:${unit.color};">
                  <div class="unit-card-head">
                    <span class="unit-icon" aria-hidden="true">${unit.icon}</span>
                    <div class="metric-pill">${unit.weight}</div>
                  </div>
                  <div>
                    <h3>Unit ${unit.number}</h3>
                    <p>${unit.name}</p>
                    <small>${unit.description}</small>
                  </div>
                  <div class="action-row" style="margin-top:12px;">
                    <span class="metric-pill">Progress ${unitPercent}%</span>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      </div>
    `;
  }

  function renderUnitPage(unitNumber, tab) {
    const unit = getUnitByNumber(unitNumber) || getUnitByNumber(1);
    const tabs = ['overview', 'howto', 'lessons', 'practice', 'unit-quiz', 'unit-test', 'flashcards', 'review'];
    const tabLabels = {
      overview: 'Overview',
      howto: 'How To',
      lessons: 'Lessons',
      practice: 'Practice',
      'unit-quiz': 'Unit Quiz',
      'unit-test': 'Unit Test',
      flashcards: 'Flashcards',
      review: 'Review'
    };

    app.innerHTML = `
      <div class="page">
        <header class="panel" style="background: linear-gradient(135deg, rgba(255,255,255,0.02), ${unit.color}26); border-top: 3px solid ${unit.color};">
          <div class="section-header">
            <div>
              <p class="tiny-label">Unit ${unit.number}</p>
              <h1 class="page-title">${unit.name}</h1>
            </div>
            <div class="progress-ring" aria-label="Unit ${unit.number} progress ${unitProgress(unit)}%" style="--progress:${unitProgress(unit)}; background: conic-gradient(${unit.color} 0 ${unitProgress(unit)}%, rgba(255,255,255,0.08) ${unitProgress(unit)}% 100%);">
              <div class="progress-ring-inner">${unitProgress(unit)}%</div>
            </div>
          </div>
        </header>

        <nav class="tab-bar" aria-label="Unit navigation">
          ${tabs.map(function (key) {
            const active = key === tab ? 'active' : '';
            return `<button type="button" class="tab-button ${active}" data-action="open-tab" data-tab="${key}" data-unit="${unit.number}">${tabLabels[key]}</button>`;
          }).join('')}
        </nav>

        <div class="content-card">
          ${renderUnitTabContent(unit, tab)}
        </div>
      </div>
    `;
  }

  function renderUnitTabContent(unit, tab) {
    if (tab === 'overview') return window.renderOverview ? window.renderOverview(unit) : `<p>Overview coming soon.</p>`;
    if (tab === 'howto') return window.renderHowTo ? window.renderHowTo(unit) : `<p>How To coming soon.</p>`;
    if (tab === 'lessons') return window.renderLessons ? window.renderLessons(unit) : `<p>Lessons coming soon.</p>`;
    if (tab === 'practice') return window.renderPractice ? window.renderPractice(unit) : `<p>Practice coming soon.</p>`;
    if (tab === 'unit-quiz') return window.renderQuiz ? window.renderQuiz(unit, 'unit') : `<p>Unit quiz coming soon.</p>`;
    if (tab === 'unit-test') return window.renderUnitTest ? window.renderUnitTest(unit) : `<p>Unit test coming soon.</p>`;
    if (tab === 'flashcards') return window.renderFlashcards ? window.renderFlashcards(unit) : `<p>Flashcards coming soon.</p>`;
    return window.renderReview ? window.renderReview(unit) : `<p>Review coming soon.</p>`;
  }

  function renderDashboard() {
    app.innerHTML = window.renderDashboard ? window.renderDashboard() : '<div class="page"><div class="panel"><h1>Dashboard</h1></div></div>';
  }

  function renderExam() {
    app.innerHTML = `
      <div class="page">
        <div class="panel">
          <h1 class="page-title">AP Exam</h1>
          <p>Section I: 42 multiple-choice questions in 85 minutes. Section II: 4 free-response questions in 95 minutes, with one of each AP type.</p>
          <div class="action-row">
            <button type="button" class="primary-button" data-action="start-exam">Start full practice exam</button>
            <button type="button" class="secondary-button" data-action="open-dashboard">Dashboard</button>
            <button type="button" class="secondary-button" data-action="open-daily-10">Daily 10</button>
            <button type="button" class="secondary-button" data-action="nav-home">Return home</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderNotFound() {
    app.innerHTML = `
      <div class="page">
        <div class="panel">
          <h1 class="page-title">Page not found</h1>
          <p>The page you asked for does not exist yet.</p>
          <div class="action-row">
            <button type="button" class="primary-button" data-action="nav-home">Home</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderLessonPage(unitNumber, topic, slide) {
    const unit = getUnitByNumber(unitNumber) || getUnitByNumber(1);
    const topicInfo = getTopicForUnit(unit.id, topic) || unit.topics[0];
    const slides = topicInfo.slides || [
      { title: 'Learn', content: 'Start with the big idea and then check a worked example.' },
      { title: 'Why it matters', content: 'Use the idea in a real life example.' },
      { title: 'Quick check', content: 'Try a quick self-check.' }
    ];
    const currentSlide = slides[Math.min(Math.max(Number(slide) || 1, 1), slides.length) - 1] || slides[0];
    const nextSlide = Math.min(Number(slide) || 1, slides.length);
    const isLastSlide = Number(slide) >= slides.length;

    app.innerHTML = `
      <div class="page">
        <div class="panel slide-shell">
          <div class="section-header">
            <div>
              <p class="tiny-label">Unit ${unit.number} · ${topicInfo.title}</p>
              <h1 class="page-title">${currentSlide.title}</h1>
            </div>
            <div class="metric-pill">Slide ${slide} / ${slides.length}</div>
          </div>

          <div class="slide-card">
            <h3>${currentSlide.title}</h3>
            ${currentSlide.formula ? '<div class="formula">' + currentSlide.formula + '</div>' : ''}
            <p>${currentSlide.content || currentSlide.summary || 'Keep going.'}</p>
            ${currentSlide.example ? '<p><strong>Example:</strong> ' + currentSlide.example + '</p>' : ''}
          </div>

          <div class="progress-dots" aria-label="Slide navigation">
            ${slides.map(function (_, index) {
              const active = index + 1 === Number(slide) ? 'active' : '';
              return `<button type="button" class="dot-button ${active}" data-action="jump-slide" data-unit="${unit.number}" data-topic="${topic}" data-slide="${index + 1}" aria-label="Go to slide ${index + 1}"></button>`;
            }).join('')}
          </div>

          <div class="slide-controls">
            <button type="button" class="secondary-button" data-action="lesson-back" data-unit="${unit.number}" data-topic="${topic}" data-slide="${slide}">Back</button>
            <button type="button" class="secondary-button" data-action="lesson-next" data-unit="${unit.number}" data-topic="${topic}" data-slide="${slide}">${isLastSlide ? 'Start guided practice' : 'Next'}</button>
            <button type="button" class="secondary-button" data-action="restart-lesson" data-unit="${unit.number}" data-topic="${topic}">Restart lesson</button>
            <button type="button" class="secondary-button" aria-label="Try this topic" data-action="practice-topic" data-unit="${unit.number}" data-topic="${topic}">Practice this topic</button>
          </div>
        </div>
      </div>
    `;
  }

  function routeToPage() {
    const route = window.getRouteInfo();
    const cleanedPath = route.path || '/home';
    window.state.lastPage = cleanedPath;
    window.state.progress.lastPage = cleanedPath;
    saveState();

    renderBreadcrumbs(cleanedPath);

    if (route.view === 'home') return renderHome();
    if (route.view === 'dashboard') return renderDashboard();
    if (route.view === 'exam') return renderExam();
    if (route.view === 'unit') return renderUnitPage(route.unitNumber, route.tab || 'overview');
    if (route.view === 'lesson') return renderLessonPage(route.unitNumber, route.topic, route.slide);
    if (route.view === 'practice') return renderUnitPage(route.unitNumber, 'practice');
    return renderNotFound();
  }

  function handleAction(action, dataset) {
    const route = window.getRouteInfo();

    if (action === 'nav-home') return navigate('/home');
    if (action === 'go-back') {
      if (route.view === 'lesson') {
        const currentSlide = Number(route.slide || 1);
        if (currentSlide > 1) return navigate('/unit/' + route.unitNumber + '/lesson/' + route.topic + '/slide/' + (currentSlide - 1));
      }
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate('/home');
      }
      return;
    }
    if (action === 'crumb') return navigate(dataset.path || '/home');
    if (action === 'toggle-settings') {
      settingsPanel.classList.toggle('open');
      settingsPanel.setAttribute('aria-hidden', settingsPanel.classList.contains('open') ? 'false' : 'true');
      return;
    }
    if (action === 'close-settings') {
      settingsPanel.classList.remove('open');
      settingsPanel.setAttribute('aria-hidden', 'true');
      return;
    }
    if (action === 'toggle-theme') {
      window.state.theme = window.state.theme === 'light' ? 'dark' : 'light';
      setTheme();
      saveState();
      return;
    }
    if (action === 'toggle-timer') {
      window.state.timerOn = !window.state.timerOn;
      updateSettingControls();
      saveState();
      return;
    }
    if (action === 'toggle-unlock') {
      window.state.unlockAll = !window.state.unlockAll;
      updateSettingControls();
      saveState();
      return;
    }
    if (action === 'export-progress') {
      try {
        const blob = new Blob([JSON.stringify(window.state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'physics-progress.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast('Progress exported.');
      } catch (error) {
        showToast('Could not export progress.');
      }
      return;
    }
    if (action === 'import-progress') {
      const input = document.querySelector('[data-action="import-progress"]');
      input.click();
      return;
    }
    if (action === 'reset-progress') {
      const confirmed = window.confirm('Are you sure? This will erase your saved progress.');
      if (confirmed) {
        const doubleCheck = window.confirm('Are you sure you want to reset all progress?');
        if (doubleCheck) {
          window.state = Object.assign({}, DEFAULT_STATE, { theme: window.state.theme, gravity: window.state.gravity });
          saveState();
          routeToPage();
          showToast('Progress reset.');
        }
      }
      return;
    }
    if (action === 'continue-last') {
      const lastPage = window.state.progress.lastPage || '/unit/1/overview';
      const target = lastPage === '/home' ? '/unit/1/overview' : lastPage;
      return navigate(target);
    }
    if (action === 'open-unit') return navigate('/unit/' + dataset.unit + '/overview');
    if (action === 'open-tab') return navigate('/unit/' + dataset.unit + '/' + dataset.tab);
    if (action === 'open-lesson') {
      const unitNumber = Number(dataset.unit || route.unitNumber || 1);
      const topic = dataset.topic || '2.1';
      return navigate('/unit/' + unitNumber + '/lesson/' + topic + '/slide/1');
    }
    if (action === 'open-dashboard') return navigate('/dashboard');
    if (action === 'open-daily-10') return navigate('/dashboard');
    if (action === 'open-exam') return navigate('/exam');
    if (action === 'study-weakest') {
      const units = ensureUnitCatalog();
      const weak = units.reduce(function (best, unit) {
        const score = unitProgress(unit);
        if (!best || score < unitProgress(best)) return unit;
        return best;
      }, null);
      if (weak) return navigate('/unit/' + weak.number + '/lessons');
      return showToast('Take a quiz first to find a weak topic.');
    }
    if (action === 'lesson-next') {
      const unitNumber = Number(dataset.unit);
      const topic = dataset.topic;
      const currentSlide = Number(dataset.slide || 1);
      const next = currentSlide + 1;
      if (currentSlide >= 3) return navigate('/unit/' + unitNumber + '/practice/' + topic);
      return navigate('/unit/' + unitNumber + '/lesson/' + topic + '/slide/' + next);
    }
    if (action === 'lesson-back') {
      const unitNumber = Number(dataset.unit);
      const topic = dataset.topic;
      const currentSlide = Number(dataset.slide || 1);
      return navigate('/unit/' + unitNumber + '/lesson/' + topic + '/slide/' + Math.max(1, currentSlide - 1));
    }
    if (action === 'jump-slide') {
      const unitNumber = Number(dataset.unit);
      const topic = dataset.topic;
      const slide = Number(dataset.slide || 1);
      return navigate('/unit/' + unitNumber + '/lesson/' + topic + '/slide/' + slide);
    }
    if (action === 'restart-lesson') {
      const unitNumber = Number(dataset.unit);
      const topic = dataset.topic;
      if (window.confirm('Restart this lesson?')) {
        navigate('/unit/' + unitNumber + '/lesson/' + topic + '/slide/1');
      }
      return;
    }
    if (action === 'practice-topic') {
      const unitNumber = Number(dataset.unit);
      const topic = dataset.topic;
      return navigate('/unit/' + unitNumber + '/practice/' + topic);
    }
    if (action === 'start-exam') {
      showToast('Full practice exam is ready to build.');
      return navigate('/exam');
    }
  }

  function registerGlobalHandlers() {
    document.body.addEventListener('click', function (event) {
      const target = event.target.closest('[data-action]');
      if (!target) return;
      const action = target.getAttribute('data-action');
      const dataset = target.dataset || {};
      handleAction(action, dataset);
    });

    document.body.addEventListener('change', function (event) {
      const target = event.target;
      if (target.matches('[data-setting="gravity"]')) {
        window.state.gravity = Number(target.value) || 9.8;
        saveState();
      }
      if (target.matches('[data-action="import-progress"]')) {
        const file = target.files && target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const imported = JSON.parse(String(reader.result));
            window.state = Object.assign({}, DEFAULT_STATE, imported, {
              progress: Object.assign({}, DEFAULT_STATE.progress, imported.progress || {})
            });
            saveState();
            routeToPage();
            showToast('Progress was imported.');
          } catch (error) {
            showToast('The file could not be imported.');
          }
        };
        reader.readAsText(file);
      }
    });

    window.addEventListener('hashchange', function () {
      routeToPage();
    });

    window.addEventListener('error', function (event) {
      showToast('App error: ' + (event.message || 'Unknown issue'));
    });

    window.addEventListener('unhandledrejection', function (event) {
      showToast('Unhandled promise rejection: ' + (event.reason || 'unknown reason'));
    });
  }

  function init() {
    window.state = loadState();
    setTheme();
    updateSettingControls();
    registerGlobalHandlers();
    if (!window.location.hash) {
      window.location.hash = '#/home';
    }
    routeToPage();
  }

  window.navigate = function navigate(path) {
    const target = window.normalizeHashRoute(path);
    const nextHash = '#'+target;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      routeToPage();
    }
  };

  init();
})();
