import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: string; // Or change the type based on your user ID format
  }
}
