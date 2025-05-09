// src/global.d.ts (or any other .d.ts file included in your project)
import type CookieConsentDefaultExportType from "vanilla-cookieconsent"; // Type of the default export

// 1. Get the return type of the 'run' method (which should be a Promise).
type RunMethodReturnType = ReturnType<CookieConsentDefaultExportType["run"]>;

// 2. Extract the type the Promise resolves to.
// Use Awaited<T> if you're on TypeScript 4.5+, otherwise use the conditional type.
type CookieConsentInstanceType =
  RunMethodReturnType extends Promise<infer U> ? U : RunMethodReturnType;
// Or for TS 4.5+:
// type CookieConsentInstanceType = Awaited<RunMethodReturnType>;

declare global {
  interface Window {
    cookieConsent: CookieConsentInstanceType; // Use the specific derived type
  }
}
