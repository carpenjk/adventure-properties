// Media.tsx

import { createMedia } from '@artsy/fresnel';

// export for theme
export const breakpoints = {
  0: 0,
  1: 880,
  2: 1050,
  3: 1200,
  4: 1400,
};

const ExampleAppMedia = createMedia({
  breakpoints,
});

// Generate CSS to be injected into the head
export const mediaStyles = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;
