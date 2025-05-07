import { setupWorker } from "msw/browser";
import { authHandlers } from "./auth-handlers";
import { menuHandlers } from "./menu-handlers";
import { orderHandlers } from "./order-handlers";
import { optionHandlers } from "./option-handlers";
import { dashboardHandlers } from "../features/dashboard/api/mocks";

// Combine all handlers into one array
const handlers = [
  ...authHandlers,
  ...menuHandlers,
  ...orderHandlers,
  ...optionHandlers,
  ...dashboardHandlers
];

// Set up the MSW worker with all handlers
export const worker = setupWorker(...handlers);
