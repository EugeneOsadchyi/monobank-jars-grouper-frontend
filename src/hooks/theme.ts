import { useLayoutEffect, useState } from 'react';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export default function useTheme(): Theme {
  const [theme, setTheme] = useState(Theme.LIGHT);

  const themeChangedListener = (event: any) => {
    setTheme(event.matches ? Theme.DARK : Theme.LIGHT);
  }

  useLayoutEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = '(prefers-color-scheme: dark)';

    themeChangedListener(window.matchMedia(mediaQuery));

    window.matchMedia(mediaQuery).addEventListener('change', themeChangedListener);

    return () => window.matchMedia(mediaQuery).removeEventListener('change', themeChangedListener);
  }, [])

  return theme;
}
