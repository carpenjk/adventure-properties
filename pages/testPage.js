import { Media, MediaContextProvider } from '../Media';

export default function HomePage() {
  return (
    <MediaContextProvider>
      <Media at="xs">
        <div>Hello mobile!</div>
      </Media>
      <Media greaterThan="xs">
        <div>Hello desktop!</div>
      </Media>
    </MediaContextProvider>
  );
}
