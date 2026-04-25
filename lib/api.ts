const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type ChatRequest = {
  user_id: string;
  session_id: string;
  message: string;
};

export type ChatResponse = {
  response: string;
};

export type PlanTripRequest = {
  user_id: string;
  destination: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;
  budget_min: number;
  budget_max: number;
};

export type Trip = {
  trip_id: string;
  user_id: string;
  session_id: string;
  destination: string | null;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  itinerary: string | null;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export async function sendChatMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  return handle<ChatResponse>(res);
}

export async function planTrip(req: PlanTripRequest): Promise<Trip> {
  const res = await fetch(`${API_BASE_URL}/trips/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  return handle<Trip>(res);
}

export async function getTrip(tripId: string): Promise<Trip> {
  const res = await fetch(`${API_BASE_URL}/trips/${tripId}`);
  return handle<Trip>(res);
}

export type FeedbackCategory = "bug" | "suggestion" | "praise" | "other";

export type FeedbackRequest = {
  rating: number;
  category: FeedbackCategory;
  message: string;
  email?: string;
  page_url?: string;
  user_id?: string;
};

export type FeedbackResponse = { feedback_id: string };

export async function submitFeedback(req: FeedbackRequest): Promise<FeedbackResponse> {
  const res = await fetch(`${API_BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  return handle<FeedbackResponse>(res);
}
