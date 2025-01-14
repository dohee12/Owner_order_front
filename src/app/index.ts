import App from "./App";
import { withProviders } from "./providers";

const AppWithProviders = withProviders(App);

export { AppWithProviders as App };

export type { AppProps } from "./types";
