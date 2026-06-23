/** Real call log sample — callId 206, agent "new 93" */

export const sampleCallLog = [
  {
    id: 3271,
    callId: 206,
    agentId: 5,
    ts: "2026-06-22T03:56:46.187Z",
    component: "Agent",
    provider: null,
    direction: "system",
    status: "info",
    latencyMs: null,
    requestPayload: {
      agentId: 5,
      agentName: "new 93",
      asrProvider: "azure",
      llmProvider: "google",
      ttsProvider: "cartesia",
      ttsVoice: "32d5092c-0fff-406e-941c-9c44e907018b",
    },
    responsePayload: null,
    metadata: null,
  },
  {
    id: 3272,
    callId: 206,
    agentId: 5,
    ts: "2026-06-22T03:56:46.487Z",
    component: "Memory",
    provider: null,
    direction: "response",
    status: "success",
    latencyMs: null,
    requestPayload: null,
    responsePayload: {
      profile: { name: "Karthik", callCount: 52 },
      factCount: 17,
      facts: {
        interested_in_plots_in_other_locations: "Red Hills, Madhavaram, Thiruninravur",
        budget_for_villa: "75 lakhs",
        interested_in_location: "Tambaram",
        area_of_interest: "Vadapalani",
        interested_in_other_locations: "Red Hills, Madhavaram, Thiruninravur",
        budget_range: "7.5 lakh",
        location: "Vadapalani",
        property_type: "plot",
        location_of_interest: "Chennai",
        looking_for_property_in_chennai: "yes",
        budget: "75 lakhs",
        property_type_of_interest: "villa",
        looking_for_property: "yes",
        interested_in_property_in_chennai: "true",
        interested_in: "plot",
        name: "Karthik",
        policy_interest: "வீடு",
      },
      recentCallsCount: 5,
    },
    metadata: null,
  },
  {
    id: 3273,
    callId: 206,
    agentId: 5,
    ts: "2026-06-22T03:56:46.488Z",
    component: "VariableResolver",
    provider: null,
    direction: "system",
    status: "info",
    latencyMs: null,
    requestPayload: {
      variables: {
        agent_name: "new 93",
        date: "Monday, June 22, 2026",
        caller_number: "browser",
      },
    },
    responsePayload: {
      resolvedPromptPreview:
        "=== CALLER MEMORY — NEVER FORGETS ===\nName: Karthik  |  Calls: 52  |  Last: today\n\n🎯 PREDICTED REASON FOR THIS CALL: Karthik will likely call to continue his property search in Chennai, reiterating his specific interests in villas in Tambaram or plots in Red Hills, Madhavaram, and Thiruninravur.\n📊 SENTIMENT ARC: 😐 → 😐 → 😐 → 😐 → 😐 (↕ mixed)\n\nKNOWN FACTS:\n• interested_in_plots_in_other_locations: Red Hills, Madhavaram, Thiruninravur  [today]\n• budget_for_villa: 75 lakhs  [today]\n• interested_in_location: Tambaram  [today]\n• area_of_interest: Vadapalani  [today]\n• interested_in_other_locat",
    },
    metadata: null,
  },
  {
    id: 3274,
    callId: 206,
    agentId: 5,
    ts: "2026-06-22T03:57:05.901Z",
    component: "Agent",
    provider: null,
    direction: "system",
    status: "info",
    latencyMs: null,
    requestPayload: {
      event: "call.end",
      reason: "disconnected",
      durationSeconds: 19,
      turns: 1,
    },
    responsePayload: null,
    metadata: null,
  },
];

export const memoryEntry = sampleCallLog.find((e) => e.component === "Memory");
export const callerProfile = memoryEntry?.responsePayload?.profile ?? { name: "Karthik", callCount: 52 };
export const factCount = memoryEntry?.responsePayload?.factCount ?? 17;

const factIcons = {
  budget: "💰",
  budget_for_villa: "💰",
  budget_range: "💰",
  property_type: "🏠",
  property_type_of_interest: "🏠",
  location: "📍",
  area_of_interest: "📍",
  interested_in_location: "📍",
  location_of_interest: "📍",
  name: "👤",
  policy_interest: "🌐",
};

function labelFromKey(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Top facts for CRM cards — deduped, human labels */
export const displayFacts = [
  { icon: "👤", label: "Name", value: "Karthik" },
  { icon: "🏠", label: "Property type", value: "Plot & villa" },
  { icon: "💰", label: "Budget", value: "75 lakhs" },
  { icon: "📍", label: "Locations", value: "Tambaram, Vadapalani" },
  { icon: "📍", label: "Other areas", value: "Red Hills, Madhavaram" },
  { icon: "🌐", label: "Interest (Tamil)", value: "வீடு" },
];

export const episodeSummary =
  "Karthik continued his property search in Chennai — villas in Tambaram, plots in Red Hills and Madhavaram. Budget 75 lakhs. Memory injected in 300ms before the agent spoke.";

export const callHistory = [
  { id: 206, date: "22 Jun 2026", channel: "Browser", duration: "19s", status: "disconnected" },
  { id: 205, date: "21 Jun 2026", channel: "Outbound", duration: "4m 12s", status: "completed" },
  { id: 204, date: "19 Jun 2026", channel: "Inbound", duration: "2m 48s", status: "completed" },
];

export function factsFromLog() {
  const raw = memoryEntry?.responsePayload?.facts ?? {};
  return Object.entries(raw).map(([key, value]) => ({
    icon: factIcons[key] ?? "•",
    label: labelFromKey(key),
    value: String(value),
  }));
}
