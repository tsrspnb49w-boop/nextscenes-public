export type PublicFeedbackReply = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  parentId: string;
  replyToId?: string;
  source?: string;
};
export type PublicFeedbackReplyNode = PublicFeedbackReply & {
  children: PublicFeedbackReplyNode[];
  repliedTo: string;
};
export function buildFeedbackReplyTree(thread: {
  id: string;
  author: string;
  replies: PublicFeedbackReply[];
}): PublicFeedbackReplyNode[];
