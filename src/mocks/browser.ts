import { setupWorker } from "msw/browser";
import { authHandlers } from "./auth-handlers";
import { menuHandlers } from "./menu-handlers";
import { orderHandlers } from "./order-handlers";
import { optionHandlers } from "./option-handlers";

// Combine all handlers into one array
const handlers = [...authHandlers, ...menuHandlers, ...orderHandlers, ...optionHandlers];

// Set up the MSW worker with all handlers
export const worker = setupWorker(...handlers);
