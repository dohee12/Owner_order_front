import { ReactNode } from "react";

export interface AppProps {
  children?: ReactNode;
}

export interface WithProvidersProps {
  component: React.ComponentType;
}
