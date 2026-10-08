# AP Physics 1 — Small Steps Physics

A static, GitHub Pages-friendly AP Physics 1 study site. Open `index.html` locally or publish the repository with GitHub Pages; no build step or backend is required.

## Course content

Each course unit has a separate data file in `data/` (`unit-1.js` through `unit-8.js`). These files define the unit title, color, topic outline, and availability for the dashboard. Detailed lesson and practice content is added to those unit files as each course phase is built. The existing Unit 2 lesson and question bank remains in `questions.js`.

## Progress and settings

Study progress and preferences are saved in browser `localStorage`. Use **Export progress** to download a JSON backup and **Import progress** to restore one. The gravity selector and light/dark theme preference are included in that backup.