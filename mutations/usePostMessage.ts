import { useMutation } from "@tanstack/react-query";
import { postMessage } from "../src/api";
import type { ChatResponse } from "../src/api";

export const usePostMessage = () => {
  return useMutation<ChatResponse, Error, string>({
    mutationFn: postMessage,
  });
};
