import { setupWorker } from "msw/browser";
import { handlers as authHandlers } from "./auth-handlers";
import { handlers as menuHandlers } from "./menu-handlers";

// Combine all handlers into one array
const handlers = [...authHandlers, ...menuHandlers];

// Set up the MSW worker with all handlers
export const worker = setupWorker(...handlers);
