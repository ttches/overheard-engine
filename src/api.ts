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

const theatreMessages = [
  [
    {
      header: "Sure thing, Charlene!",
      response:
        "It sounds like you really know what you're looking for. Currently, there are 0 vehicles matching your criteria, but we have plenty of time to find your ideal vehicle! We get new arrivals everyday so we'll keep you updated when we get an exact match, but in the meantime, consider broadening your search.",
    },
    {
      header: "0 Jeep Rubicons",
      pills: ["Jeep", "Rubicon", "4-door", "manual transmission"],
      redirect_url:
        "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XSwib2ZmZXJpbmdzIjpbIk5ldyJdLCJib2R5U3R5bGVzIjpbIlN1diJdLCJmdWVsVHlwZXMiOlsiRGllc2VsIl19fQ",
      response: "",
    },
  ],
  [
    {
      header: "394 Jeep Rubicons",
      pills: ["Jeep", "Rubicon", "4-door", "manual transmission"],
      redirect_url:
        "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7InRyYW5zbWlzc2lvbnMiOlsiTWFudWFsIl0sIm1ha2VzIjpbeyJuYW1lIjoiSmVlcCJ9XX19",
      response: "",
    },
    {
      response: `I've saved your preferences in your profile. I'll send you Jeep Rubicon listings that match everything you asked for. I'll also keep an eye on:
        
        \n\n• Diesel + manual matches
        \n• Gas + manual
        \n• Price drops or new listings that check all your boxes
        
        \n\nWould you like me to notify you via text, email, or both when new matches or price changes pop up?`,
      buttons: [
        {
          display_text: "2024 or newer",
          badge: {
            display_text: "3",
          },
          action: {
            redirect_url:
              "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7InllYXIiOnsibWluIjoyMDI0fSwibWFrZXMiOlt7Im5hbWUiOiJKZWVwIiwicGFyZW50TW9kZWxzIjpbeyJuYW1lIjoiV3JhbmdsZXIiLCJ0cmltcyI6WyJSdWJpY29uIl19XX1dfSwic29ydEJ5IjoiTmV3ZXN0SW52ZW50b3J5In0",
          },
        },
        {
          display_text: "30,000 miles or less",
          badge: {
            display_text: "12",
          },
          action: {
            redirect_url:
              "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1pbGVhZ2UiOnsibWF4IjozMDAwMH0sIm1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XX0sInNvcnRCeSI6Ik5ld2VzdEludmVudG9yeSJ9",
          },
        },
        {
          display_text: "Manual transmission",
          badge: {
            display_text: "5",
          },
          action: {
            redirect_url:
              "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7InRyYW5zbWlzc2lvbnMiOlsiTWFudWFsIl0sIm1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XX0sInNvcnRCeSI6Ik5ld2VzdEludmVudG9yeSJ9",
          },
        },
      ],
    },
  ],
];

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
