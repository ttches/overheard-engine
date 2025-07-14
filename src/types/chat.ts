export type ChatMessage = {
  id: string;
  userMessage: string;
  timestamp: Date;
  header?: string;
  response?: string;
  redirectUrl?: string;
  pills?: string[];
  buttons?: {
    badge?: {
      displayText?: string;
    };
    action?: {
      redirectUrl?: string;
      quickReplyText?: string;
    };
    displayText?: string;
  }[];
};
