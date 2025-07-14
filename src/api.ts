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
  await new Promise((resolve) => setTimeout(resolve, 500));

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const hasHeader = Math.random() > 0.5;

  const mockResponse: ChatResponse = {
    response: loremIpsum,
    header: hasHeader ? "Sure thing!" : undefined,
  };

  return mockResponse;
};
