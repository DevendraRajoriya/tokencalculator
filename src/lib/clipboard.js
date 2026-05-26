/**
 * Mobile-safe clipboard write with execCommand fallback.
 * navigator.clipboard requires HTTPS + user gesture; execCommand works everywhere.
 */
export function safeCopyText(text) {
  // Modern Clipboard API (HTTPS only)
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => execCommandCopy(text));
  }
  // Fallback: execCommand (works on HTTP and all mobile browsers)
  return Promise.resolve(execCommandCopy(text));
}

function execCommandCopy(text) {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;";
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand("copy");
  } catch (e) {
    console.warn("execCommand copy failed", e);
  }
  document.body.removeChild(el);
}

/**
 * Mobile-safe clipboard read with fallback prompt.
 * navigator.clipboard.readText() requires permission; falls back to empty string.
 */
export async function safePasteText() {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      return await navigator.clipboard.readText();
    } catch {
      // Permission denied — fall through
    }
  }
  // Fallback: return empty string (user must paste manually)
  return "";
}

/**
 * Share a URL using the native Web Share API on mobile,
 * or copy to clipboard on desktop.
 */
export async function safeShare({ title, text, url }) {
  // Use native share sheet on mobile if available
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { method: "native" };
    } catch (e) {
      if (e.name === "AbortError") return { method: "cancelled" };
      // If share fails, fall through to clipboard
    }
  }
  // Desktop fallback: copy URL to clipboard
  await safeCopyText(url);
  return { method: "clipboard" };
}
