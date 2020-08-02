// Media.tsx

import { createMedia } from '@artsy/fresnel';

const ExampleAppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: 800,
    lg: 850,
    xl: 1192,
  },
});

// Generate CSS to be injected into the head
export const mediaStyles = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;
