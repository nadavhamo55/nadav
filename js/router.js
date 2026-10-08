(function () {
  'use strict';

  function normalizeHashRoute(route) {
    if (!route) return '/home';
    const cleaned = route.startsWith('#') ? route.slice(1) : route;
    return cleaned.startsWith('/') ? cleaned : '/' + cleaned;
  }

  function getHashPath() {
    const hash = window.location.hash || '#/home';
    return normalizeHashRoute(hash);
  }

  function getRouteInfo() {
    const path = getHashPath();
    const unitMatch = path.match(/^\/unit\/(\d+)(?:\/(overview|howto|lessons|practice|unit-quiz|unit-test|flashcards|review))?$/);
    if (unitMatch) {
      const unitNumber = Number(unitMatch[1]);
      const tab = unitMatch[2] || 'overview';
      return { view: 'unit', unitNumber, tab, path };
    }

    const lessonMatch = path.match(/^\/unit\/(\d+)\/lesson\/([^/]+)\/slide\/(\d+)$/);
    if (lessonMatch) {
      return { view: 'lesson', unitNumber: Number(lessonMatch[1]), topic: lessonMatch[2], slide: Number(lessonMatch[3]) || 1, path };
    }

    const topicPracticeMatch = path.match(/^\/unit\/(\d+)\/practice\/(.+)$/);
    if (topicPracticeMatch) {
      return { view: 'practice', unitNumber: Number(topicPracticeMatch[1]), topic: topicPracticeMatch[2], path };
    }

    if (path === '/home') return { view: 'home', path };
    if (path === '/dashboard') return { view: 'dashboard', path };
    if (path === '/exam') return { view: 'exam', path };
    return { view: 'not-found', path };
  }

  window.getRouteInfo = getRouteInfo;
  window.normalizeHashRoute = normalizeHashRoute;
  window.getHashPath = getHashPath;
})();
