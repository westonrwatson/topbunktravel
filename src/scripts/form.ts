import { site } from "../content/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function clearField(field: Field): void {
	field.removeAttribute("aria-invalid");
	const error = document.getElementById(`${field.id}-error`);
	if (error) {
		error.hidden = true;
		error.textContent = "";
	}
}

function showFieldError(field: Field, message: string): void {
	field.setAttribute("aria-invalid", "true");
	const error = document.getElementById(`${field.id}-error`);
	if (!error) return;
	error.hidden = false;
	error.textContent = message;
}

function validate(form: HTMLFormElement): Field | null {
	const fields = [...form.querySelectorAll<Field>("input, select, textarea")].filter(
		(field) => field.name !== "_gotcha" && field.type !== "radio",
	);

	let firstInvalid: Field | null = null;

	for (const field of fields) {
		clearField(field);
		const value = field.value.trim();
		let message = "";

		if (field instanceof HTMLInputElement && field.type === "checkbox") {
			if (field.required && !field.checked) message = field.dataset.error || site.forms.consent;
		} else if (field.required && !value) {
			message = site.forms.required;
		} else if (value && field.type === "email" && !emailPattern.test(value)) {
			message = site.forms.email;
		} else if (value && field.dataset.kind === "url") {
			const bare = value.replace(/^https?:\/\//i, "");
			if (!/^[^\s]+\.[^\s]{2,}$/.test(bare)) message = site.forms.url;
		}

		if (message) {
			showFieldError(field, message);
			firstInvalid ??= field;
		}
	}

	return firstInvalid;
}

function setAlert(form: HTMLFormElement, message: string): void {
	const alert = form.querySelector<HTMLElement>("[data-alert]");
	if (!alert) return;
	alert.hidden = false;
	alert.textContent = message;
}

function clearAlert(form: HTMLFormElement): void {
	const alert = form.querySelector<HTMLElement>("[data-alert]");
	if (!alert) return;
	alert.hidden = true;
	alert.textContent = "";
}

function showSuccess(form: HTMLFormElement): void {
	const fields = form.querySelector<HTMLElement>("[data-fields]");
	const success = form.querySelector<HTMLElement>("[data-success]");
	if (fields) fields.hidden = true;
	if (!success) return;
	success.hidden = false;
	success.tabIndex = -1;
	success.focus();
}

function payload(form: HTMLFormElement): Record<string, string> {
	const data = new FormData(form);
	const body: Record<string, string> = {};
	for (const [key, value] of data.entries()) {
		if (key === "_gotcha" || typeof value !== "string") continue;
		const trimmed = value.trim();
		if (!trimmed) continue;
		if (key === "website" && !/^https?:\/\//i.test(trimmed)) {
			body[key] = `https://${trimmed}`;
			continue;
		}
		body[key] = trimmed;
	}
	return body;
}

function finish(form: HTMLFormElement, onSuccess?: (form: HTMLFormElement) => void): void {
	if (onSuccess) onSuccess(form);
	else showSuccess(form);
}

export function bindForm(
	form: HTMLFormElement | null,
	options?: { onSuccess?: (form: HTMLFormElement) => void },
): void {
	if (!form) return;

	const endpoint = form.dataset.endpoint?.trim() ?? "";
	const button = form.querySelector<HTMLButtonElement>("[type='submit']");
	const label = button?.querySelector<HTMLElement>("[data-label]");
	const original = label?.textContent ?? button?.textContent ?? "Send";

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		clearAlert(form);

		const honeypot = form.querySelector<HTMLInputElement>("[name='_gotcha']");
		if (honeypot?.value) {
			finish(form, options?.onSuccess);
			return;
		}

		const invalid = validate(form);
		if (invalid) {
			invalid.focus();
			return;
		}

		if (!endpoint) {
			if (import.meta.env.DEV) {
				finish(form, options?.onSuccess);
				return;
			}
			setAlert(form, site.forms.missingEndpoint);
			return;
		}

		if (button) button.disabled = true;
		if (label) label.textContent = site.forms.sending;
		form.setAttribute("aria-busy", "true");

		try {
			const usesGoogleScript = endpoint.includes("script.google.com");
			const response = await fetch(endpoint, {
				method: "POST",
				redirect: "follow",
				headers: usesGoogleScript
					? {
							"Content-Type": "text/plain;charset=utf-8",
							Accept: "application/json",
						}
					: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
				body: JSON.stringify(payload(form)),
			});

			const text = await response.text();
			let accepted = response.ok;
			if (!accepted) {
				try {
					const data = JSON.parse(text) as { ok?: boolean };
					accepted = data.ok === true;
				} catch {
					accepted = text.includes('"ok":true');
				}
			}

			if (!accepted) throw new Error(String(response.status));
			finish(form, options?.onSuccess);
		} catch {
			setAlert(form, site.forms.genericError);
			if (button) button.disabled = false;
			if (label) label.textContent = original;
		} finally {
			form.removeAttribute("aria-busy");
		}
	});
}
