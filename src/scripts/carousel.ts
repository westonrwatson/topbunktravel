export function initCarousel(): void {
	const root = document.querySelector<HTMLElement>("[data-carousel]");
	if (!root) return;

	const track = root.querySelector<HTMLElement>("[data-track]");
	const prev = root.querySelector<HTMLButtonElement>("[data-dir='-1']");
	const next = root.querySelector<HTMLButtonElement>("[data-dir='1']");
	if (!track || !prev || !next) return;

	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function step(): number {
		const card = track.querySelector<HTMLElement>(".city-card");
		if (!card) return track.clientWidth;
		const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");
		return card.getBoundingClientRect().width + (Number.isNaN(gap) ? 0 : gap);
	}

	function update(): void {
		const max = track.scrollWidth - track.clientWidth - 2;
		prev.disabled = track.scrollLeft <= 2;
		next.disabled = track.scrollLeft >= max;
	}

	function scrollByDir(dir: number): void {
		track.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
	}

	prev.addEventListener("click", () => scrollByDir(-1));
	next.addEventListener("click", () => scrollByDir(1));
	track.addEventListener("scroll", update, { passive: true });
	window.addEventListener("resize", update);

	track.addEventListener("keydown", (event) => {
		if (event.key === "ArrowRight") {
			event.preventDefault();
			scrollByDir(1);
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			scrollByDir(-1);
		}
	});

	update();
}
