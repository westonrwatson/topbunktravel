export function initMenu(): void {
	const header = document.querySelector<HTMLElement>(".site-header");
	const button = header?.querySelector<HTMLButtonElement>(".burger");
	const nav = document.querySelector<HTMLElement>("#site-nav");
	if (!header || !button || !nav) return;

	const label = button.querySelector<HTMLElement>("[data-menu-label]");
	const desktop = window.matchMedia("(min-width: 960px)");

	const items = (): HTMLElement[] => [
		button,
		...nav.querySelectorAll<HTMLElement>("a:not(.wordmark-desktop)"),
	];

	function setOpen(open: boolean): void {
		button.setAttribute("aria-expanded", String(open));
		nav.classList.toggle("is-open", open);
		document.body.classList.toggle("menu-open", open);
		if (label) label.textContent = open ? "Close menu" : "Menu";
		if (open) nav.querySelector<HTMLAnchorElement>("a:not(.wordmark-desktop)")?.focus();
	}

	button.addEventListener("click", () => {
		setOpen(button.getAttribute("aria-expanded") !== "true");
	});

	nav.addEventListener("click", (event) => {
		const target = event.target;
		if (target instanceof Element && target.closest("a")) setOpen(false);
	});

	document.addEventListener("click", (event) => {
		if (button.getAttribute("aria-expanded") !== "true") return;
		if (event.target instanceof Node && !header.contains(event.target)) setOpen(false);
	});

	document.addEventListener("keydown", (event) => {
		const open = button.getAttribute("aria-expanded") === "true";
		if (!open) return;

		if (event.key === "Escape") {
			setOpen(false);
			button.focus();
			return;
		}

		if (event.key !== "Tab" || desktop.matches) return;
		const focusable = items();
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (!first || !last) return;
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	});

	desktop.addEventListener("change", (event) => {
		if (event.matches) setOpen(false);
	});
}
