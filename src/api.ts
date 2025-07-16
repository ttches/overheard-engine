import finalTheatreMessages from "../scripts/final";

export type ChatMessage = {
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

export type ChatResponse = ChatMessage[];

let theatreCallCount = 0;
let isInTheatreMode = false;

const theatreMessages = finalTheatreMessages;

const handleTheatreMode = async (message: string): Promise<ChatResponse> => {
  const delay = Math.random() * 3000 + 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (theatreCallCount < theatreMessages.length) {
    const nextMessage = theatreMessages[theatreCallCount];
    console.log(JSON.stringify(nextMessage, null, "\t"));

    theatreCallCount++;
    return nextMessage;
  }

  isInTheatreMode = false;
  theatreCallCount = 0;
  return mockFetch(message);
};

const mockFetch = async (_message: string): Promise<ChatResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const hasHeader = Math.random() > 0.5;

  return [
    {
      response: loremIpsum,
      header: hasHeader ? "Sure thing!" : undefined,
    },
  ];
};

export const postMessage = async (message: string): Promise<ChatResponse> => {
  const startsTheatreMode = message.toLowerCase().includes("jeep rubicon");

  if (startsTheatreMode && !isInTheatreMode) {
    isInTheatreMode = true;
    theatreCallCount = 0;
  }

  if (isInTheatreMode) {
    return handleTheatreMode(message);
  }

  return mockFetch(message);
};
