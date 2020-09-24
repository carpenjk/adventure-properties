// Media.tsx

import { createMedia } from '@artsy/fresnel';

//export for theme
export const breakpoints = {
  sm: 0,
  md: 880,
  lg: 1000,
  xl: 1200,
  xxl: 1400,
};

const ExampleAppMedia = createMedia({
  breakpoints: breakpoints,
});

// Generate CSS to be injected into the head
export const mediaStyles = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;
