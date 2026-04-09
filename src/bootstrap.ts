const bootStatus = document.getElementById("boot-status");
const bootMessage = document.getElementById("boot-message");

function setBootState(state: "loading" | "error" | "ready", message?: string) {
  if (bootStatus) {
    bootStatus.setAttribute("data-state", state);
  }
  if (bootMessage && typeof message === "string") {
    bootMessage.textContent = message;
  }
}

function formatError(error: unknown) {
  if (error instanceof Error) {
    return error.stack ? `${error.message}\n${error.stack}` : error.message;
  }
  return String(error);
}

window.addEventListener("error", (event) => {
  setBootState("error", `window error: ${event.message}`);
});

window.addEventListener("unhandledrejection", (event) => {
  setBootState("error", `unhandled rejection: ${formatError(event.reason)}`);
});

setBootState("loading", "Importing React app...");

import("./main")
  .then(() => {
    setBootState("ready");
  })
  .catch((error) => {
    console.error("bootstrap import failed", error);
    setBootState("error", `bootstrap import failed:\n${formatError(error)}`);
  });
