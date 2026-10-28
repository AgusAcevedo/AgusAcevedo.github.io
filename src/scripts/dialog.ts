/** Native dialogs provide modal focus containment and make the background inert. */
export function bindDialog(dialog: HTMLDialogElement) {
  let opener: HTMLElement | null = null;
  let previousRootOverflow = "";
  let previousBodyOverflow = "";

  const close = () => dialog.close();

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(element => !element.closest('[inert], [hidden]') && element.getClientRects().length > 0);
    const first = focusable[0];
    const active = document.activeElement;
    if (!first) {
      event.preventDefault();
      dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]')?.focus();
    } else {
      event.preventDefault();
      const index = focusable.indexOf(active as HTMLElement);
      const next = index < 0
        ? (event.shiftKey ? focusable.length - 1 : 0)
        : (index + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
      focusable[next].focus();
    }
  });

  dialog.querySelectorAll<HTMLButtonElement>("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  });

  // Covers the close button, backdrop, and the browser's native Escape behavior.
  dialog.addEventListener("close", () => {
    document.documentElement.style.overflow = previousRootOverflow;
    document.body.style.overflow = previousBodyOverflow;
    if (opener?.isConnected && !opener.closest("[inert]")) opener.focus({ preventScroll: true });
  });

  return {
    open(trigger: HTMLElement) {
      if (dialog.open) return;
      opener = trigger;
      previousRootOverflow = document.documentElement.style.overflow;
      previousBodyOverflow = document.body.style.overflow;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      dialog.querySelector<HTMLElement>("[data-dialog-initial-focus]")?.focus({ preventScroll: true });
    },
    close,
  };
}
