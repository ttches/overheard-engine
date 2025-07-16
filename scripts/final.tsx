import { ChatMessage } from "../src/api";

const finalTheatreMessages: ChatMessage[][] = [
  [
    {
      header: "Sure thing, Charlene!",
      response:
        "It sounds like you really know what you're looking for. Currently, there are 0 vehicles matching your criteria, but we have plenty of time to find your ideal vehicle! We get new arrivals everyday so we'll keep you updated when we get an exact match, but in the meantime, consider broadening your search.",
    },
    {
      header: "0 Jeep Rubicons",
      pills: [
        "Jeep",
        "Rubicon",
        "4-door",
        "Diesel",
        "Under 50,000 miles",
        "Apple Car Play",
        "White Exterior",
        "Black Exterior",
        "Blue Exterior",
        "Brown Exterior",
        "Gray Exterior",
      ],
      redirect_url:
        "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XSwib2ZmZXJpbmdzIjpbIk5ldyJdLCJib2R5U3R5bGVzIjpbIlN1diJdLCJmdWVsVHlwZXMiOlsiRGllc2VsIl19fQ",
      response: "",
    },
    {
      response: "Here's some suggestions to help you find a better search:",
      buttons: [
        {
          display_text: "Any fuel type",
          badge: {
            display_text: "59",
          },
          action: {
            redirect_url:
              "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XSwiY3ZuYUZlYXR1cmVzIjpbIkFwcGxlIENhclBsYXkiXX19",
          },
        },
        {
          display_text: "Remove Apple Car Play",
          badge: {
            display_text: "71",
          },
          action: {
            redirect_url:
              "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XX19",
          },
        },
        {
          display_text: "Increase mileage",
          badge: {
            display_text: "122",
          },
          action: {
            redirect_url:
              "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1ha2VzIjpbeyJuYW1lIjoiSmVlcCJ9XSwibWlsZWFnZSI6eyJtaW4iOjkxNzAwfX19",
          },
        },
      ],
    },
  ],
  [
    {
      header: "You got it.",
      response: `I've saved your preferences in your profile. I'll send you Jeep Rubicon listings that match everything you asked for. I'll also keep an eye on:

• Diesel + manual matches 
• Gas + manual 
• Price drops or new listings that check all your boxes

Would you like me to notify you via text, email, or both when new matches or price changes pop up?`,
    },
  ],
  [
    {
      header: "My pleasure!",
      response: `I'll keep scanning and ping you when something fits just right.
And if nothing shows up today, don't worry—I've got your wishlist saved and I'll keep working in the background.
Excited to find your next Jeep, Charlene.`,
    },
  ],
];

export default finalTheatreMessages;
