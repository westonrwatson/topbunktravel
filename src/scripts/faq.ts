export function initFaq(): void {
	const root = document.querySelector<HTMLElement>("[data-faq]");
	if (!root) return;

	root.addEventListener("click", (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;
		const button = target.closest<HTMLButtonElement>(".faq-trigger");
		if (!button) return;

		const panelId = button.getAttribute("aria-controls");
		if (!panelId) return;
		const panel = document.getElementById(panelId);
		if (!panel) return;

		const open = button.getAttribute("aria-expanded") === "true";
		button.setAttribute("aria-expanded", String(!open));
		panel.hidden = open;
	});
}
