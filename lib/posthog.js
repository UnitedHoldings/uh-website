import posthog from "posthog-js";

if (typeof window !== "undefined") {
  posthog.init("phc_JpfY4jHCcqDqX9ELwzdqFg4ngpMQNWoFW7PUw8cAMKu", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    loaded: (posthog) => {},
  });
}

export default posthog;

// import posthog from 'posthog-js'

// posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
//   api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
//   defaults: '2025-05-24'
// });