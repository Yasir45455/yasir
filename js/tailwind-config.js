/* Shared Tailwind (CDN) config + theme bootstrap. Loaded in <head> right after the Tailwind CDN script. */
(() => {
  // Apply the saved (or OS) colour scheme before first paint to avoid a flash.
  let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  try {
    const saved = localStorage.getItem('theme');
    if (saved) dark = saved === 'dark';
  } catch (e) { /* storage unavailable: fall back to OS preference */ }
  document.documentElement.classList.toggle('dark', dark);

  // Colours point at CSS variables (see css/custom.css) so one class works in both themes.
  const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
        },
        colors: {
          bg: token('bg'),
          subtle: token('subtle'),
          surface: token('surface'),
          fg: token('fg'),
          muted: token('muted'),
          faint: token('faint'),
          line: token('line'),
          accent: token('accent'),
          ink: '#0b0b0a',
          paper: '#f4f1ea'
        }
      }
    }
  };
})();
