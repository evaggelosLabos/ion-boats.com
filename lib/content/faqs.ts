export type FaqItem = {
  id: string;
  q: string;
  a: string;
  tags: string[];
};

export const faqs: FaqItem[] = [
  {
    id: "license",
    q: "Do I need a license to rent a boat?",
    a: "In many cases, no license is needed. If a license is required for a specific boat, it will be clearly mentioned on that boat’s page. You can also choose a skippered option if available.",
    tags: ["license", "requirements", "boat"],
  },
  {
    id: "weather",
    q: "What happens if the weather is bad?",
    a: "If weather conditions are unsafe, we’ll reschedule your trip or handle a refund depending on the situation and policy. Safety always comes first.",
    tags: ["weather", "cancellation", "policy"],
  },
  {
    id: "payment",
    q: "Can I pay online or on arrival?",
    a: "Yes. We support secure online payments. In some cases you can also pay on arrival (depending on the trip and availability rules).",
    tags: ["payment", "deposit", "arrival", "online"],
  },
  {
    id: "duration",
    q: "How long are the trips?",
    a: "Trip duration depends on the route. Each trip page shows the estimated duration and what’s included.",
    tags: ["duration", "trips"],
  },
];
