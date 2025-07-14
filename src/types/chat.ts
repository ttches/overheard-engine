export type ChatMessage = {
  message: string;
  isUser: boolean;
  header?: string;
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
