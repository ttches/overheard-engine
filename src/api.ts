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

const theatreMessages = [
  [
    {
      header: "Sure thing, Charlene!",
      response:
        "It sounds like you really know what you're looking for. Currently, there are 0 vehicles matching your criteria, but we have plenty of time to find your ideal vehicle! We get new arrivals everyday so we'll keep you updated when we get an exact match, but in the meantime, consider broadening your search.",
    },
    {
      header: "12 Jeep Rubicons",
      pills: ["Jeep", "Rubicon", "4-door", "manual transmission"],
      redirect_url:
        "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XX19",
      response: "",
    },
  ],
];

const handleTheatreMode = async (message: string): Promise<ChatResponse> => {
  const delay = Math.random() * 3000 + 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (theatreCallCount < theatreMessages.length) {
    const messages = theatreMessages[theatreCallCount];
    theatreCallCount++;
    return messages;
  }

  theatreCallCount = 0;
  return mockFetch(message);
};

const mockFetch = async (message: string): Promise<ChatResponse> => {
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
  const isTheatreMode = message.toLowerCase().includes("jeep");

  if (isTheatreMode) {
    return handleTheatreMode(message);
  }

  return mockFetch(message);
};
