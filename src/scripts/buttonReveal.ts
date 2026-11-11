export function bindButtonReveal(button: HTMLElement | null): void {
	if (!button) return;

	const fill = button.querySelector<HTMLElement>(".btn-reveal-fill");
	if (!fill) return;

	const place = (clientX: number, clientY: number) => {
		const rect = button.getBoundingClientRect();
		const x = clientX - rect.left;
		const y = clientY - rect.top;
		const reach = Math.hypot(
			Math.max(x, rect.width - x),
			Math.max(y, rect.height - y),
		);
		const size = reach * 2;
		fill.style.left = `${x}px`;
		fill.style.top = `${y}px`;
		fill.style.width = `${size}px`;
		fill.style.height = `${size}px`;
	};

	const play = (clientX: number, clientY: number) => {
		button.classList.remove("is-reveal-active");
		place(clientX, clientY);
		void button.offsetWidth;
		window.requestAnimationFrame(() => {
			button.classList.add("is-reveal-active");
		});
	};

	button.addEventListener("pointerenter", (event) => {
		if (!(event instanceof PointerEvent)) return;
		play(event.clientX, event.clientY);
	});

	button.addEventListener("pointerleave", (event) => {
		if (!(event instanceof PointerEvent)) return;
		if (!button.classList.contains("is-reveal-active")) return;

		fill.style.transition = "none";
		place(event.clientX, event.clientY);
		void fill.offsetWidth;
		fill.style.transition = "";
		button.classList.remove("is-reveal-active");
	});
}
