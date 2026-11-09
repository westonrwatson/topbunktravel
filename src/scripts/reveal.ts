export function initReveal(): void {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
	if (!nodes.length) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-in");
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
	);

	nodes.forEach((node) => observer.observe(node));
}
