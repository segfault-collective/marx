import SunIcon from '../assets/icons/sun.svg?raw';
import MoonIcon from '../assets/icons/moon.svg?raw';

export const loadThemeAndRegisterSwitchHandlers = () => {
  // Get stored theme (or system default)
  const stored = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const isDark = stored === 'dark' || (!stored && systemPrefersDark);

  // Update document element class and theme icon
  document.documentElement.classList.toggle('dark', isDark);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.innerHTML = isDark ? MoonIcon : SunIcon;
  }

  // Theme button toggle and its handler
  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');

    if (themeIcon) {
      themeIcon.innerHTML = isDark ? MoonIcon : SunIcon;
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
};
