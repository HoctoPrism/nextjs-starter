import React from 'react';

export const ColorContext = React.createContext({ toggleColorMode: () => {} });

export function setThemeToStorage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  localStorage.getItem('theme') === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark');
}
