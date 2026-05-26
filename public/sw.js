// Minimal no-op service worker — stops 404 errors
// No caching or offline logic is implemented here.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("fetch", () => {});
