import { BREAKPOINT } from '@angular/flex-layout';

const MOBILE_PORTRAIT = 'screen and (orientation: portrait) and (max-width: 599px)';
const TABLET_PORTRAIT = 'screen and (orientation: portrait) and (min-width: 600px) and (max-width: 839px)';
const WEB_PORTRAIT = 'screen and (orientation: portrait) and (min-width: 840px)';

const MOBILE_LANDSCAPE = 'screen and (orientation: landscape) and (max-width: 959px)';
const TABLET_LANDSCAPE = 'screen and (orientation: landscape) and (min-width: 960px)  and (max-width: 1279px)';
const WEB_LANDSCAPE = 'screen and (orientation: landscape) and (min-width: 1280px)';

const SCREEN_TYPES = {
  MOBILE: `${MOBILE_PORTRAIT}, ${MOBILE_LANDSCAPE}`,
  TABLET: `${TABLET_PORTRAIT}, ${TABLET_LANDSCAPE}`,
  WEB: `${WEB_PORTRAIT}, ${WEB_LANDSCAPE}`,

  MOBILE_PORTRAIT: `${MOBILE_PORTRAIT}`,
  TABLET_PORTRAIT: `${TABLET_PORTRAIT}`,
  WEB_PORTRAIT: `${WEB_PORTRAIT}`,

  MOBILE_LANDSCAPE: `${MOBILE_LANDSCAPE}`,
  TABLET_LANDSCAPE: `${TABLET_LANDSCAPE}`,
  WEB_LANDSCAPE: `${WEB_LANDSCAPE}`
};

export const CUSTOM_BREAKPOINTS = [
  { alias: 'mobile.portrait', mediaQuery: SCREEN_TYPES.MOBILE_PORTRAIT },
  { alias: 'mobile.landscape', mediaQuery: SCREEN_TYPES.MOBILE_LANDSCAPE },
  { alias: 'mobile', mediaQuery: SCREEN_TYPES.MOBILE },

  { alias: 'tablet.portrait', mediaQuery: SCREEN_TYPES.TABLET_PORTRAIT },
  { alias: 'tablet.landscape', mediaQuery: SCREEN_TYPES.TABLET_LANDSCAPE },
  { alias: 'tablet', mediaQuery: SCREEN_TYPES.TABLET },

  { alias: 'web.portrait', mediaQuery: SCREEN_TYPES.WEB_PORTRAIT },
  { alias: 'web.landscape', mediaQuery: SCREEN_TYPES.WEB_LANDSCAPE },
  { alias: 'web', mediaQuery: SCREEN_TYPES.WEB }
];
