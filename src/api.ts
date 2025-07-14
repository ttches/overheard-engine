export type ChatResponse = {
  header?: string;
  response?: string;
  redirect_url?: string;
  pills?: string[];
  buttons?: {
    badge?: {
      display_text?: string;
    };
    action?: {
      redirect_url?: string;
      quick_reply_text?: string;
    };
    display_text?: string;
  }[];
};

export const postMessage = async (message: string): Promise<ChatResponse> => {
  // TODO: Replace with actual API endpoint
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};
