let storageTheme = localStorage.getItem('theme');
export const defaultTheme = storageTheme ? storageTheme : 'light';

const baseCss = {
  color_1: 'rgba(0, 0, 0, 1)',
  color_2: 'rgba(33, 33, 0, 1)',
  color_3: 'rgba(33, 33, 33, 1)',
  color_4: 'rgba(51, 51, 51, 1)',
  color_5: 'rgba(66, 66, 66, 1)',
  color_6: 'rgba(99, 99, 99, 1)',
  color_7: 'rgba(102, 102, 102, 1)',
  color_8: 'rgba(153, 153, 153, 1)',
  color_9: 'rgba(204, 204, 204, 1)',
  color_10: 'rgba(212, 212, 212, 1)',
  color_11: 'rgba(227, 227, 227, 1)',
  color_12: 'rgba(240, 240, 240, 1)',
  color_13: 'rgba(245, 245, 245, 1)',
  color_14: 'rgba(255, 255, 255, 1)',
  fontFamily_1: 'Ping-Fang',
};

export const THEME = {
  light: {
    // global variable
    '--font-family': baseCss.fontFamily_1,
    // main

    // main latest
    '--latest-follow-nav-normal-color': baseCss.color_6,
  },
  dark: {
    // global variable
    '--font-family': baseCss.color_1,
    // main

    // main latest
    '--latest-follow-nav-normal-color': baseCss.color_10,
  },
};