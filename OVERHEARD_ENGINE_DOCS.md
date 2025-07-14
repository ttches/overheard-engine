# Overheard Engine - Project Outline

## Project Goal

Overheard Engine is a chat-driven web interface where conversations can dynamically control and update web content. The core idea is that chat interactions can influence what's displayed in an iframe, creating an interactive relationship between conversation and content.

## Core Components

### Chat Panel

- 400px wide, positioned from 60px from top to bottom of page
- Floats on the left side (fixed position)
- Standard chat UI pattern (responses left, questions right)
- Will eventually host a complete chat interface

### Iframe Container

- Full width underneath the chat panel
- Renders websites based on conversation
- Chat panel floats on top of this content
- URL can change based on chat interactions

## Technology Stack

- **React 19 + TypeScript + Vite**
- **TanStack React Query** - For managing chat mutations and API calls
- **Styled Components** - For component styling
- **Custom State Management** - For chat history persistence

## Key Integration Points

### State Management Approach

- **TanStack Query**: Handles API mutations, server interactions, and async operations
- **Custom State**: Manages chat history array that persists between render cycles
- **Hybrid Pattern**: Combine both approaches for optimal chat experience

### Communication Requirements

- Chat mutations need to trigger potential iframe URL changes
- Chat history must persist across component re-renders
- Some chat responses will drive changes in the iframe component
- Integration between TanStack Query responses and iframe state

## Component Communication

```
Chat Input → TanStack Mutation → API Response → Chat History Update
                                              ↓
                                         Iframe URL Change (sometimes)
```

## Implementation Notes

- Chat history will be maintained as an array structure
- TanStack Query mutations will handle API calls
- Custom hook pattern for managing chat state
- Mutation success callbacks can trigger iframe updates

---

_This is a living document that will evolve as we build and discover more about the implementation._
