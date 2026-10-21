import SunIcon from '../assets/icons/sun.svg?raw';
import MoonIcon from '../assets/icons/moon.svg?raw';

export const loadThemeAndRegisterSwitchHandlers = () => {
  // Theme class is applied by the inline script in Layout.astro before first paint
  const isDark = document.documentElement.classList.contains('dark');

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
