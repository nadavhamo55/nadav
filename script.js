(function () {
  'use strict';

  const data = window.PHYSICS_DATA;
  const topics = data.topics;
  const topicById = Object.fromEntries(topics.map(function (topic) { return [topic.id, topic]; }));
  const storageKey = 'force-motion-unit-2-progress-v1';
  const blankState = function () { return { answered: 0, correct: 0, streak: 0, byTopic: {}, review: {} }; };
  let saved = loadState();
  let selectedLesson = topics[0].id;
  let session = null;
  let toastTimer = null;

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey));
      return Object.assign(blankState(), parsed || {});
    } catch (error) {
      return blankState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
      document.querySelector('.topbar-meta span:last-child').textContent = 'Progress saved';
    } catch (error) {
      document.querySelector('.topbar-meta span:last-child').textContent = 'Saving unavailable';
    }
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const current = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = current;
    }
    return copy;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove('visible'); }, 2300);
  }

  function navigate(viewName) {
    const view = document.getElementById('view-' + viewName);
    if (!view) return;
    document.querySelectorAll('.view').forEach(function (section) { section.classList.remove('active'); });
    view.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const isActive = link.dataset.view === viewName;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (viewName === 'review') renderReview();
    if (viewName === 'home') renderHome();
  }

  function topicStats(id) {
    return saved.byTopic[id] || { answered: 0, correct: 0 };
  }

  function renderHome() {
    const grid = document.getElementById('topic-grid');
    grid.innerHTML = topics.map(function (topic, index) {
      const stats = topicStats(topic.id);
      const percent = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
      return '<article class="topic-card" style="--topic:' + topic.color + '">' +
        '<div class="card-topline"><span class="topic-index">TOPIC ' + String(index + 1).padStart(2, '0') + '</span><span class="score-ring" style="--progress:' + (percent * 3.6) + 'deg" aria-label="' + percent + '% accuracy"><span>' + percent + '%</span></span></div>' +
        '<h3>' + escapeHtml(topic.title) + '</h3><p>' + escapeHtml(topic.short) + '</p>' +
        '<div class="topic-card-bottom"><strong>' + (stats.answered ? stats.correct + ' / ' + stats.answered + ' right' : 'Not started') + '</strong><button class="topic-action" data-learn="' + topic.id + '" aria-label="Learn ' + escapeHtml(topic.title) + '">Learn <span aria-hidden="true">↗</span></button></div></article>';
    }).join('');
    const totalAnswered = saved.answered || 0;
    const totalCorrect = saved.correct || 0;
    document.getElementById('home-score').textContent = totalAnswered ? Math.round(totalCorrect / totalAnswered * 100) + '%' : '0%';
    document.getElementById('home-streak').textContent = saved.streak || 0;
    document.getElementById('home-answered').textContent = totalAnswered;
    document.getElementById('review-count').textContent = Object.keys(saved.review || {}).length;
  }

  function renderLearn() {
    const nav = document.getElementById('learn-topic-list');
    nav.innerHTML = topics.map(function (topic, index) {
      return '<button class="lesson-nav' + (topic.id === selectedLesson ? ' active' : '') + '" style="--topic:' + topic.color + '" data-lesson="' + topic.id + '"><span class="lesson-nav-dot"></span><span>' + String(index + 1).padStart(2, '0') + ' &nbsp;' + escapeHtml(topic.title) + '</span></button>';
    }).join('');
    const topic = topicById[selectedLesson] || topics[0];
    const lesson = topic.lesson;
    document.getElementById('lesson-content').style.setProperty('--topic', topic.color);
    document.getElementById('lesson-content').innerHTML = '<p class="lesson-kicker">UNIT 02 / ' + escapeHtml(topic.title.toUpperCase()) + '</p><h2>' + escapeHtml(topic.title) + '</h2>' +
      '<section class="lesson-block"><h3>In plain words</h3><div class="plain-idea"><p>' + escapeHtml(lesson.plain) + '</p></div></section>' +
      '<section class="lesson-block"><h3>Try these steps</h3><ol class="lesson-steps">' + lesson.steps.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join('') + '</ol></section>' +
      '<section class="lesson-block"><h3>Worked example</h3><div class="example-box">' + lesson.example.map(function (line, index) { return '<p>' + (index === lesson.example.length - 1 ? '<strong>' + escapeHtml(line) + '</strong>' : escapeHtml(line)) + '</p>'; }).join('') + '</div></section>' +
      '<section class="lesson-block"><h3>Watch out</h3><div class="watchout"><span class="watchout-mark" aria-hidden="true">!</span><p>' + escapeHtml(lesson.watch) + '</p></div></section>' +
      '<button class="primary-button lesson-practice" data-practice-topic="' + topic.id + '"><span aria-hidden="true">▶</span> Practice this topic</button>';
  }

  function renderFormulas() {
    document.getElementById('formula-grid').innerHTML = data.formulas.map(function (group) {
      return '<section class="formula-group" style="--topic:' + group.color + '"><h2>' + escapeHtml(group.title) + '</h2>' + group.entries.map(function (entry) {
        return '<div class="formula-entry"><span class="formula-expression">' + escapeHtml(entry[0]) + '</span><span class="formula-units">' + escapeHtml(entry[1]) + '</span><span class="formula-note">' + escapeHtml(entry[2]) + '</span></div>';
      }).join('') + '</section>';
    }).join('');
  }

  function renderReview() {
    const entries = Object.values(saved.review || {}).sort(function (a, b) { return b.timestamp - a.timestamp; });
    document.getElementById('review-count').textContent = entries.length;
    document.getElementById('review-summary').innerHTML = entries.length ? '<strong>' + entries.length + '</strong> question' + (entries.length === 1 ? '' : 's') + ' to revisit' : '';
    const list = document.getElementById('review-list');
    if (!entries.length) {
      list.innerHTML = '<div class="review-empty"><strong>Your review list is clear.</strong>Missed questions will collect here as you practice.</div>';
      return;
    }
    list.innerHTML = entries.map(function (entry) {
      const question = entry.question;
      const topic = topicById[question.topic] || topics[0];
      return '<article class="review-item" style="--topic:' + topic.color + '"><div><span class="review-item-meta">' + escapeHtml(topic.title) + '</span><h3>' + escapeHtml(question.prompt) + '</h3><p>Missed ' + entry.missedCount + ' ' + (entry.missedCount === 1 ? 'time' : 'times') + (entry.lastAnswer ? ' · Your last answer: ' + escapeHtml(entry.lastAnswer) : '') + '</p></div><button class="small-button" data-redo="' + escapeHtml(entry.id) + '">Redo <span aria-hidden="true">↗</span></button></article>';
    }).join('');
  }

  function startPractice(topicId, questionId) {
    let pool;
    let mode = 'practice';
    if (questionId && saved.review[questionId]) {
      pool = [saved.review[questionId].question];
      mode = 'review';
    } else if (topicId && topicById[topicId]) {
      pool = shuffle(topicById[topicId].questions);
    } else {
      pool = shuffle(topics.flatMap(function (topic) { return topic.questions; }));
    }
    session = { mode: mode, queue: pool, index: 0, current: null, baseQuestion: pool[0], retryRound: 0, phase: 'answer', selected: null, totalCorrect: 0, totalAnswered: 0, testResults: [] };
    setPracticeHeading(mode === 'review' ? 'REVIEW, THEN RETRY' : 'A LITTLE PRACTICE GOES A LONG WAY', mode === 'review' ? 'A question from your review list.' : topicId ? 'Practice one topic, one question at a time.' : 'A mixed set, one question at a time.');
    navigate('practice');
    renderQuestion();
  }

  function startTest() {
    const pool = shuffle(topics.flatMap(function (topic) { return topic.questions; })).slice(0, 15);
    session = { mode: 'test', queue: pool, index: 0, current: null, baseQuestion: pool[0], retryRound: 0, phase: 'answer', selected: null, totalCorrect: 0, totalAnswered: 0, testResults: [] };
    setPracticeHeading('TEST MODE / 15 QUESTIONS', 'No hints or answer feedback until all 15 are finished.');
    navigate('practice');
    renderQuestion();
  }

  function setPracticeHeading(eyebrow, subtitle) {
    document.getElementById('practice-eyebrow').textContent = eyebrow;
    document.getElementById('practice-subtitle').textContent = subtitle;
  }

  function getCurrentQuestion() {
    if (!session) return null;
    if (!session.current) session.current = session.queue[session.index];
    return session.current;
  }

  function renderQuestion() {
    const shell = document.getElementById('quiz-shell');
    if (!session) {
      shell.innerHTML = '<div class="review-empty"><strong>Ready when you are.</strong>Pick a topic or start a practice set from Home.</div>';
      return;
    }
    if (session.mode === 'test' && session.index >= session.queue.length) {
      renderTestResults();
      return;
    }
    if (session.index >= session.queue.length) {
      renderPracticeComplete();
      return;
    }
    const question = getCurrentQuestion();
    const topic = topicById[question.topic] || topics[0];
    const total = session.queue.length;
    const answeredCount = session.index + (session.phase === 'advance' ? 1 : 0);
    const correctCount = session.mode === 'test' ? session.totalCorrect : session.totalCorrect;
    let feedback = '';
    let actions = '';
    let quietNote = '';
    let cardState = '';
    const disabled = session.phase !== 'answer';

    if (session.phase === 'correct') {
      cardState = ' state-correct';
      feedback = '<div class="feedback-box correct-feedback"><h3 class="feedback-title"><span aria-hidden="true">✓</span> That is right.</h3><p>' + escapeHtml(question.why) + '</p></div>';
      actions = '<button class="next-button" data-next>Next <span class="button-arrow" aria-hidden="true">→</span></button>';
    } else if (session.phase === 'wrong') {
      cardState = ' state-wrong';
      feedback = '<div class="feedback-box wrong-feedback"><h3 class="feedback-title"><span aria-hidden="true">↺</span> Not quite. Let us work it out.</h3><p>' + escapeHtml(question.why) + '</p><ol class="solution-steps">' + question.steps.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join('') + '</ol><p class="feedback-answer">Right answer: ' + escapeHtml(answerLabel(question)) + '</p></div>' +
        '<div class="explain-panel"><label for="explain-input">In your own words, why was the right answer right?</label><p>A short full sentence is enough. This step helps it stick.</p><textarea class="explain-input" id="explain-input" rows="3" placeholder="I think the right answer is..." maxlength="500"></textarea><div class="explain-actions"><button class="retry-button" data-explain>Save &amp; try a similar question <span aria-hidden="true">→</span></button><span class="explain-hint" id="explain-hint">Write at least one sentence.</span></div></div>';
    } else if (session.phase === 'retryIntro') {
      feedback = '<div class="feedback-box wrong-feedback"><h3 class="feedback-title"><span aria-hidden="true">↺</span> Good reflection. Try a similar one.</h3><p>Your answer is saved. Use the same steps on a fresh example.</p></div>';
    }

    if (session.mode === 'test' && session.phase !== 'answer') {
      feedback = '<div class="feedback-box"><h3 class="feedback-title">Response recorded</h3><p>Keep going. Your results and explanations will show after question 15.</p></div>';
      actions = '<button class="next-button" data-next>Next <span class="button-arrow" aria-hidden="true">→</span></button>';
    }

    const questionContent = question.type === 'choice' ? '<div class="answer-list" role="radiogroup" aria-label="Answer choices">' + question.options.map(function (option, index) {
      const isSelected = session.selected === index;
      return '<button class="answer-option' + (isSelected ? ' selected' : '') + '" type="button" role="radio" aria-checked="' + isSelected + '" data-option="' + index + '" ' + (disabled ? 'disabled' : '') + '><span class="option-letter">' + String.fromCharCode(65 + index) + '</span><span class="option-text">' + escapeHtml(option) + '</span></button>';
    }).join('') + '</div>' : '<div class="number-entry-wrap"><label class="number-entry-label" for="number-answer">Your answer' + (question.unit ? ' in ' + escapeHtml(question.unit) : '') + '</label><div class="number-entry-row"><input class="number-entry" id="number-answer" type="number" inputmode="decimal" step="any" placeholder="Type a number" ' + (disabled ? 'disabled' : '') + '><span class="unit-label">' + escapeHtml(question.unit || 'number') + '</span></div></div>';

    if (session.mode === 'test') quietNote = '<p class="test-quiet-note">No hints in test mode. The answer key comes at the end.</p>';
    const scoreLabel = session.mode === 'test' ? 'Score hidden' : session.mode === 'review' ? 'Review question · Streak ' + saved.streak : session.totalCorrect + ' right this set · Streak ' + saved.streak;
    shell.innerHTML = '<div class="quiz-topline"><strong>' + escapeHtml(topic.title) + '</strong><span>Question ' + Math.min(session.index + 1, total) + ' of ' + total + '</span><span class="quiz-score">' + escapeHtml(scoreLabel) + '</span></div><div class="quiz-progress" aria-label="Set progress"><span style="--topic:' + topic.color + ';width:' + (answeredCount / total * 100) + '%"></span></div>' +
      '<article class="question-card' + cardState + '" style="--topic:' + topic.color + '"><div class="question-meta"><span>' + escapeHtml(topic.title) + '</span><span class="question-tag">' + (question.type === 'choice' ? 'MULTIPLE CHOICE' : 'NUMBER ENTRY') + (session.retryRound ? ' / RETRY ' + session.retryRound : '') + '</span></div><h2 class="question-prompt">' + escapeHtml(question.prompt) + '</h2>' + questionContent + quietNote + '<div class="inline-error" id="answer-error" aria-live="polite"></div>' + feedback + '<div class="quiz-actions">' + (session.phase === 'answer' ? '<button class="check-button" data-check><span aria-hidden="true">✓</span> Check answer</button>' : '') + actions + '</div></article>';

    if (question.type === 'number' && session.phase === 'answer') {
      const input = document.getElementById('number-answer');
      input.addEventListener('keydown', function (event) { if (event.key === 'Enter') submitAnswer(); });
    }
  }

  function answerLabel(question) {
    if (question.type === 'choice') return question.options[question.answer];
    return String(question.answer) + (question.unit ? ' ' + question.unit : '');
  }

  function chosenAnswer(question) {
    if (question.type === 'choice') {
      if (session.selected === null) return null;
      return { value: session.selected, label: question.options[session.selected], correct: session.selected === question.answer };
    }
    const input = document.getElementById('number-answer');
    if (!input || input.value.trim() === '') return null;
    const value = Number(input.value);
    if (!Number.isFinite(value)) return null;
    const tolerance = Math.abs(question.answer) * 0.02;
    return { value: value, label: String(value) + (question.unit ? ' ' + question.unit : ''), correct: Math.abs(value - question.answer) <= tolerance };
  }

  function updateStats(question, isCorrect) {
    saved.answered = (saved.answered || 0) + 1;
    if (isCorrect) {
      saved.correct = (saved.correct || 0) + 1;
      saved.streak = (saved.streak || 0) + 1;
    } else {
      saved.streak = 0;
    }
    if (!saved.byTopic[question.topic]) saved.byTopic[question.topic] = { answered: 0, correct: 0 };
    saved.byTopic[question.topic].answered += 1;
    if (isCorrect) saved.byTopic[question.topic].correct += 1;
    saveState();
    renderHome();
  }

  function reviewKey(question) {
    return question.originId || question.id;
  }

  function addToReview(question, answer) {
    const key = reviewKey(question);
    const original = topics.flatMap(function (topic) { return topic.questions; }).find(function (item) { return item.id === key; }) || question;
    const existing = saved.review[key];
    saved.review[key] = { id: key, question: original, lastAnswer: answer, missedCount: existing ? existing.missedCount + 1 : 1, timestamp: Date.now() };
    saveState();
    renderHome();
  }

  function removeFromReview(question) {
    const key = reviewKey(question);
    if (saved.review[key]) {
      delete saved.review[key];
      saveState();
      renderHome();
    }
  }

  function submitAnswer() {
    if (!session || session.phase !== 'answer') return;
    const question = getCurrentQuestion();
    const selected = chosenAnswer(question);
    const error = document.getElementById('answer-error');
    if (!selected) {
      error.textContent = question.type === 'choice' ? 'Choose one answer first.' : 'Enter a number first.';
      return;
    }
    session.selectedAnswer = selected;
    session.totalAnswered += 1;
    updateStats(question, selected.correct);

    if (session.mode === 'test') {
      if (selected.correct) {
        session.totalCorrect += 1;
        removeFromReview(question);
      }
      if (!selected.correct) addToReview(question, selected.label);
      session.testResults.push({ question: question, selected: selected, correct: selected.correct });
      session.phase = 'testRecorded';
      renderQuestion();
      return;
    }

    if (selected.correct) {
      session.totalCorrect += 1;
      session.phase = 'correct';
      removeFromReview(question);
    } else {
      session.phase = 'wrong';
      addToReview(question, selected.label);
    }
    renderQuestion();
  }

  function saveExplanation() {
    if (!session || session.phase !== 'wrong') return;
    const field = document.getElementById('explain-input');
    const response = field.value.trim();
    const words = response.split(/\s+/).filter(Boolean);
    const hint = document.getElementById('explain-hint');
    if (words.length < 3 || response.length < 12) {
      hint.textContent = 'Please write at least one full sentence.';
      hint.style.color = '#f1a2a2';
      field.focus();
      return;
    }
    session.retryRound += 1;
    const retry = data.retryFor(session.current, session.retryRound);
    retry.originId = reviewKey(session.current);
    session.current = retry;
    session.selected = null;
    session.selectedAnswer = null;
    session.phase = 'answer';
    renderQuestion();
    const input = document.getElementById('number-answer');
    if (input) input.focus();
  }

  function goNext() {
    if (!session) return;
    if (session.mode === 'test') {
      session.index += 1;
      session.current = null;
      session.selected = null;
      session.phase = 'answer';
      renderQuestion();
      return;
    }
    session.index += 1;
    session.current = null;
    session.baseQuestion = session.queue[session.index];
    session.retryRound = 0;
    session.selected = null;
    session.selectedAnswer = null;
    session.phase = 'answer';
    renderQuestion();
  }

  function renderPracticeComplete() {
    const total = session.totalAnswered;
    const score = session.totalCorrect;
    document.getElementById('quiz-shell').innerHTML = '<div class="test-results"><p class="eyebrow">PRACTICE SET COMPLETE</p><h2>Good work showing up.</h2><p>You got ' + score + ' right across ' + total + ' answers, including retry questions.</p><div class="test-result-score"><strong>' + (total ? Math.round(score / total * 100) : 0) + '%</strong><span>set accuracy</span></div><button class="primary-button" data-back-home>Back to topics <span aria-hidden="true">↗</span></button></div>';
  }

  function renderTestResults() {
    const byTopic = {};
    session.testResults.forEach(function (result) {
      if (!byTopic[result.question.topic]) byTopic[result.question.topic] = { correct: 0, total: 0 };
      byTopic[result.question.topic].total += 1;
      if (result.correct) byTopic[result.question.topic].correct += 1;
    });
    const percentage = Math.round(session.totalCorrect / session.queue.length * 100);
    const rows = topics.filter(function (topic) { return byTopic[topic.id]; }).map(function (topic) {
      const stats = byTopic[topic.id];
      return '<div class="topic-score-row" style="--topic:' + topic.color + '"><span>' + escapeHtml(topic.title) + '</span><div class="topic-score-track"><span style="width:' + (stats.correct / stats.total * 100) + '%"></span></div><span class="topic-score-number">' + stats.correct + '/' + stats.total + '</span></div>';
    }).join('');
    const explanations = session.testResults.map(function (result, index) {
      const status = result.correct ? 'Correct' : 'Review this one';
      return '<details class="test-answer-detail"><summary>' + (index + 1) + '. ' + status + ' / ' + escapeHtml(result.question.prompt) + '</summary><p>Your answer: ' + escapeHtml(result.selected.label) + '</p><p>Right answer: <strong>' + escapeHtml(answerLabel(result.question)) + '</strong></p><p>' + escapeHtml(result.question.why) + '</p><ol class="solution-steps">' + result.question.steps.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join('') + '</ol></details>';
    }).join('');
    document.getElementById('quiz-shell').innerHTML = '<div class="test-results"><p class="eyebrow">TEST MODE / COMPLETE</p><h2>Your results</h2><p>Here is your score and a topic-by-topic check-in.</p><div class="test-result-score"><strong>' + session.totalCorrect + '/' + session.queue.length + '</strong><span>' + percentage + '% correct</span></div><h3 class="result-subheading">By topic</h3><div class="topic-score-list">' + rows + '</div><h3 class="result-subheading">Answer notes</h3>' + explanations + '<button class="primary-button" data-back-home>Back to topics <span aria-hidden="true">↗</span></button></div>';
  }

  document.addEventListener('click', function (event) {
    const navButton = event.target.closest('[data-view]');
    if (navButton) {
      navigate(navButton.dataset.view);
      return;
    }
    const learnButton = event.target.closest('[data-learn]');
    if (learnButton) {
      selectedLesson = learnButton.dataset.learn;
      renderLearn();
      navigate('learn');
      return;
    }
    const lessonButton = event.target.closest('[data-lesson]');
    if (lessonButton) {
      selectedLesson = lessonButton.dataset.lesson;
      renderLearn();
      return;
    }
    const topicPractice = event.target.closest('[data-practice-topic]');
    if (topicPractice) {
      startPractice(topicPractice.dataset.practiceTopic);
      return;
    }
    const option = event.target.closest('[data-option]');
    if (option && session && session.phase === 'answer') {
      session.selected = Number(option.dataset.option);
      renderQuestion();
      return;
    }
    if (event.target.closest('[data-check]')) { submitAnswer(); return; }
    if (event.target.closest('[data-next]')) { goNext(); return; }
    if (event.target.closest('[data-explain]')) { saveExplanation(); return; }
    if (event.target.closest('[data-back-home]')) { navigate('home'); return; }
    const redo = event.target.closest('[data-redo]');
    if (redo) { startPractice(null, redo.dataset.redo); return; }
  });

  document.getElementById('start-practice').addEventListener('click', function () { startPractice(); });
  document.getElementById('start-test').addEventListener('click', startTest);
  document.getElementById('exit-practice').addEventListener('click', function () { navigate('home'); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && document.getElementById('view-practice').classList.contains('active')) navigate('home');
  });

  renderHome();
  renderLearn();
  renderFormulas();
  renderReview();
  renderQuestion();
})();
