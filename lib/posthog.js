import posthog from "posthog-js";

if (typeof window !== "undefined") {
  posthog.init("phc_JpfY4jHCcqDqX9ELwzdqFg4ngpMQNWoFW7PUw8cAMKu", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    enable_recording_console_log: true, // Enable console log recording
    loaded: (posthog) => {
      console.log("PostHog loaded successfully");
    },
  });
}

// Tracking helper function
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== "undefined") {
    try {
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        ...properties,
      });
      console.log(`Event captured: ${eventName}`, properties);
    } catch (error) {
      console.error(`Failed to capture event: ${eventName}`, error);
    }
  }
};

// Track page duration
export const trackPageDuration = (pageName) => {
  if (typeof window !== "undefined") {
    const startTime = Date.now();

    return () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      try {
        posthog.capture(`${pageName}_duration`, {
          duration_seconds: duration,
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
        });
        console.log(`Page duration tracked: ${pageName}`, {
          duration_seconds: duration,
        });
      } catch (error) {
        console.error(`Failed to track page duration: ${pageName}`, error);
      }
    };
  }
  return () => {};
};

export default posthog;
