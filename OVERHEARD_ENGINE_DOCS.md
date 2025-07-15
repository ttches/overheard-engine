# Overheard Engine - Project Documentation

## Project Overview

Overheard Engine is a chat-driven web interface where conversations dynamically control and update web content in real-time. The system features a floating chat panel (400px wide, positioned 60px from top) that overlays a full-width iframe. Chat messages can trigger immediate iframe navigation, display interactive filter components, and present clickable buttons that change the displayed content.

**Core Concept**: Chat responses from the API contain structured data that drives both the conversation display and the iframe content, creating an interactive relationship between conversation and web content.

## Technology Stack

- **React 19 + TypeScript + Vite** - Core framework
- **TanStack React Query** - API mutations and state management
- **Styled Components** - Component styling
- **React Context** - Global chat and iframe state

## API Response → UI Rendering Rules

### Message Structure & Rendering Logic

The API returns arrays of `ChatMessage` objects. Each message's properties determine how it renders in the UI:

```typescript
type ChatMessage = {
  header?: string; // Bold header text above message
  response?: string; // Main message text
  redirect_url?: string; // Immediate iframe navigation
  pills?: string[]; // Filter tags → triggers FilterMessage component
  buttons?: {
    // Interactive buttons → triggers LinkButton components
    display_text?: string; // Button label
    badge?: {
      display_text?: string; // Count badge (e.g., "3", "12")
    };
    action?: {
      redirect_url?: string; // Button click destination
    };
  }[];
};
```

### UI Component Selection Rules

1. **Messages with `pills` array** → Render as **FilterMessage component**

   - Shows collapsible filter tags
   - Displays "View Results" button or "Currently Viewing" badge
   - Requires `redirect_url` for navigation

2. **Messages with `buttons` array** → Render **LinkButton components**

   - Each button becomes a clickable component
   - Shows count badge from `badge.display_text`
   - Requires `action.redirect_url` for navigation
   - 8px spacing between multiple buttons

3. **Messages with `redirect_url`** → **Immediate iframe navigation**

   - Iframe updates to the specified URL
   - Component active states update based on current iframe URL

4. **Standard messages** → Regular chat bubbles
   - Display `header` (if present) and `response` text
   - No special UI components

### API Response Format

```typescript
type ChatResponse = ChatMessage[]; // Array allows multiple messages per response
```

## Theatre Mode - Demo System

### Activation & Flow

Theatre mode demonstrates the system's capabilities through a predefined sequence triggered by mentioning **"Jeep Rubicon"** in any user message.

**Sequence Mechanics:**

- Each user message advances to the next theatre response
- After all sequences complete, returns to normal chat mode
- Maintains sequence position across user interactions

### Theatre Mode Responses

#### **Response 1: Search Results with Filters**

```javascript
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
];
```

**UI Behavior:**

- Both messages render simultaneously
- Second message has `pills` → Renders as FilterMessage component
- `redirect_url` immediately navigates iframe to search results
- FilterMessage shows collapsible filter tags

#### **Response 2: Updated Results with Interactive Buttons**

```javascript
[
  {
    header: "394 Jeep Rubicons",
    pills: ["Jeep", "Rubicon", "4-door", "manual transmission"],
    redirect_url:
      "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7InRyYW5zbWlzc2lvbnMiOlsiTWFudWFsIl0sIm1ha2VzIjpbeyJuYW1lIjoiSmVlcCJ9XX19",
    response: "",
  },
  {
    response:
      "I've saved your preferences in your profile. I'll send you Jeep Rubicon listings that match everything you asked for. I'll also keep an eye on:\n\n• Diesel + manual matches\n• Gas + manual\n• Price drops or new listings that check all your boxes\n\nWould you like me to notify you via text, email, or both when new matches or price changes pop up?",
    buttons: [
      {
        display_text: "2024 or newer",
        badge: { display_text: "3" },
        action: {
          redirect_url:
            "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7InllYXIiOnsibWluIjoyMDI0fSwibWFrZXMiOlt7Im5hbWUiOiJKZWVwIiwicGFyZW50TW9kZWxzIjpbeyJuYW1lIjoiV3JhbmdsZXIiLCJ0cmltcyI6WyJSdWJpY29uIl19XX1dfSwic29ydEJ5IjoiTmV3ZXN0SW52ZW50b3J5In0",
        },
      },
      {
        display_text: "30,000 miles or less",
        badge: { display_text: "12" },
        action: {
          redirect_url:
            "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1pbGVhZ2UiOnsibWF4IjozMDAwMH0sIm1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XX0sInNvcnRCeSI6Ik5ld2VzdEludmVudG9yeSJ9",
        },
      },
      {
        display_text: "Manual transmission",
        badge: { display_text: "5" },
        action: {
          redirect_url:
            "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7InRyYW5zbWlzc2lvbnMiOlsiTWFudWFsIl0sIm1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XX0sInNvcnRCeSI6Ik5ld2VzdEludmVudG9yeSJ9",
        },
      },
    ],
  },
];
```

**UI Behavior:**

- First message updates the filter count (0 → 394) and navigates iframe
- Second message displays LinkButton components with count badges
- Each button click navigates iframe to filtered results
- Buttons show active state when their URL matches current iframe

### Creating Theatre Mode Scripts

To create new theatre mode sequences:

1. **Define trigger phrase** in API logic
2. **Create message arrays** following the structure above
3. **Include required properties**:
   - `pills` messages need `redirect_url`
   - `buttons` need `action.redirect_url` and `badge.display_text`
   - Badge numbers should reflect actual search result counts
4. **Sequence progression**: Each user message advances to next array

## State Management

The system uses React Context to manage:

- **Chat history array** - All messages in conversation
- **Current iframe URL** - Tracks which URL is currently displayed
- **Active states** - Components show active styling when their URL matches current iframe

## Component Communication Flow

```
User Input → API Call → ChatMessage Array → UI Component Selection → Iframe Navigation
```

The key insight is that the API response structure directly drives both the conversation display and the iframe content, creating a seamless integration between chat and web content.

---

_This documentation provides the essential patterns for extending the system with new message types, theatre mode sequences, and API integrations._
