/**
 * All visitor-facing copy lives here.
 */

export const site = {
	name: "Top Bunk Travel",
	legalName: "Top Bunk Travel",
	title: "Top Bunk Travel | One pass. Vetted hostels. Your people.",
	description:
		"A prepaid pass for vetted hostels in Spain and Portugal. Credits last a year. Join the founding members, or list your hostel.",
	contactEmail: "topbunktravel@gmail.com",
	instagramUrl: "https://www.instagram.com/topbunktravel/",
	tiktokUrl: "https://www.tiktok.com/@topbunktravel",
	nav: [
		{ label: "How It Works", href: "/#how-it-works" },
		{ label: "Locations", href: "/#locations" },
		{ label: "For Hostels", href: "/#hostels" },
		{ label: "FAQ", href: "/#faq" },
	],
	hero: {
		imageAlt: "From the top bunk, a traveler lies on the bed below in warm evening light.",
	},
	microLabels: ["One Pass", "Curated Hostels", "Budget Friendly", "See the World"],
	how: {
		title: "How It Works",
		steps: [
			"Get your WanderPass, loaded with credits that last 12 months.",
			"Spend them at any partner hostel. Standard stays cost 1 credit, popular ones up to 3.",
			"Meet fellow travelers in the cities you stay, and keep those relationships going after you check out.",
		],
	},
	why: {
		title: "Why Top Bunk",
		items: [
			{
				title: "Personally vetted",
				body: "Every hostel is visited and chosen by us. If we wouldn’t stay, it isn’t on the pass.",
				shape: "circle",
			},
			{
				title: "A rebooking guarantee",
				body: "If a stay falls through, we’ll help you book another partner bed in the city.",
				shape: "square",
			},
			{
				title: "Credits for a full year",
				body: "Credits last 12 months. Use them on one long trip, or across a few.",
				shape: "pill",
			},
			{
				title: "A community, not a booking",
				body: "You get more than a confirmation email. The people you meet on the trip are part of the stay.",
				shape: "arch",
			},
		],
	},
	route: {
		title: "Locations",
		subline: "The cities you can stay in",
		badge: "More coming soon",
		captionNote: "Where you can stay",
		cities: [
			{
				name: "Lisbon",
				photo: "lisbon" as const,
				alt: "Red-tiled rooftops spread across Lisbon in soft evening light.",
			},
			{
				name: "Porto",
				photo: "porto" as const,
				alt: "The iron arch of the Dom Luís I Bridge crosses the Douro in warm light, with Porto’s hillside behind it.",
			},
			{
				name: "Seville",
				photo: "seville" as const,
				alt: "A long tiled arcade of arches at Plaza de España in Seville, lit by late sun.",
			},
			{
				name: "Granada",
				photo: "granada" as const,
				alt: "The stone towers of the Alhambra in Granada, with mountains behind them.",
			},
			{
				name: "Madrid",
				photo: "madrid" as const,
				alt: "Ornate buildings along Gran Vía in Madrid, including the dark dome of the Metropolis building.",
			},
			{
				name: "Valencia",
				photo: "valencia" as const,
				alt: "People walking a narrow old-town street in Valencia, between a stone wall and yellow balconied houses.",
			},
		],
	},
	founding: {
		title: "The first 500 to join our waitlist will get a bonus credit, a free t-shirt, and first access to the WanderPass.",
		note: "We’ll share the price before anything goes on sale.",
	},
	travelerForm: {
		title: "Join the Waitlist",
		email: "Email",
		city: "Where would you go first?",
		cityPlaceholder: "Choose a city",
		cities: ["Lisbon", "Porto", "Seville", "Granada", "Madrid", "Valencia", "Not sure yet"],
		timing: "When are you planning to travel?",
		timingPlaceholder: "Choose a window",
		timings: [
			{ value: "next-3-months", label: "Next 3 months" },
			{ value: "3-6-months", label: "3–6 months" },
			{ value: "6-12-months", label: "6–12 months" },
			{ value: "dreaming", label: "Just dreaming" },
		],
		intentLegend: "Would you buy a WanderPass when it goes on sale?",
		intentOptional: "Optional",
		intentOptions: [
			{ value: "yes", label: "Yes" },
			{ value: "maybe", label: "Maybe" },
			{ value: "no", label: "No" },
		],
		consentLead: "I agree to the",
		consentLink: "privacy policy",
		consentTail: "and to hear from Top Bunk about the pass.",
		submit: "Join the Waitlist",
		success: "You’re on the list. We’ll save you a top bunk.",
	},
	hostels: {
		title: "For Hostels",
		intro: "Become a founding partner. Here’s what you get:",
		benefits: [
			"Free professional photos and video.",
			"Featured in our city guides and social channels.",
			"Zero commission. Hostelworld takes around 17–18%.",
			"Prepaid guests, so you never chase payment.",
			"You choose which beds and nights go to members.",
		],
		hostelName: "Hostel name",
		city: "City",
		website: "Website",
		websiteHint: "Optional",
		contactName: "Contact name",
		email: "Email",
		consentLead: "I agree to the",
		consentLink: "privacy policy",
		consentTail: "and to be contacted about becoming a partner.",
		submit: "Send",
		success: "Thanks. We’ll write to you about founding partner hostels.",
	},
	faq: {
		title: "You’ve Got Questions?",
		items: [
			{
				q: "When does it launch?",
				a: "We’re opening in Spain and Portugal, and we haven’t set a public date. Founding members hear first.",
			},
			{
				q: "Where can I use it first?",
				a: "You can book stays in Lisbon, Porto, Seville, Granada, Madrid, and Valencia, at hostels we’ve visited and vetted ourselves.",
			},
			{
				q: "How much will it cost?",
				a: "We haven’t set the final price yet. Founding members hear it first, before anything goes on sale.",
			},
			{
				q: "What’s a credit?",
				a: "Standard stays are 1 credit a night. Popular ones can be up to 3. Credits last 12 months from the day you get your pass.",
			},
			{
				q: "What if a hostel is full?",
				a: "If a stay falls through, the rebooking guarantee kicks in. We’ll help you book another partner bed in one of our cities.",
			},
			{
				q: "Is my email safe?",
				a: "We use it to write to you about the pass, and not for anything else.",
			},
		],
	},
	footer: {
		privacy: "Privacy policy",
		rights: "Top Bunk Travel",
	},
	forms: {
		sending: "Sending…",
		missingEndpoint: "We can’t take this just yet. Please try again soon.",
		genericError: "Something went wrong on our side. Please try again in a moment.",
		required: "This field is required.",
		email: "Enter an email address like name@email.com.",
		consent: "Please agree so we can write to you.",
		url: "Enter a website, like yourhostel.com.",
		requiredNote: "Fields marked * are required.",
	},
	privacy: {
		title: "Privacy policy",
		description: "How Top Bunk Travel handles the email addresses collected on this site.",
		sections: [
			{
				heading: "What we collect",
				body: "If you join the traveler waitlist, we collect your email and the answers you choose about where and when you’d like to travel. If you run a hostel, we collect your hostel’s name, city, website, a contact name, and email.",
			},
			{
				heading: "How we use it",
				body: "We use this only to write to you about Top Bunk: the pass, founding member access, or a conversation about becoming a partner hostel. We don’t sell the list.",
			},
			{
				heading: "How long we keep it",
				body: "We keep waitlist details until you ask us to delete them, or until they’re no longer needed to launch the pass. Email us and we’ll remove you.",
			},
			{
				heading: "Contact",
				body: "Questions about your information can go to topbunktravel@gmail.com.",
			},
		],
	},
} as const;

export type Site = typeof site;
