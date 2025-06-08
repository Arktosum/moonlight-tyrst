import { useChatScroll } from "../hooks/useChatScroll";
import { formatTime } from "../utils/formatTime";

type Msg = { user: string; message: string; time: number };
type Props = { chat: Msg[]; currentUser: string };

export default function ChatWindow({ chat, currentUser }: Props) {
  const chatRef = useChatScroll(chat);

  return (
    <main ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2">
      {chat.map((c, i) => (
        <div
          key={i}
          className={`flex ${
            c.user === currentUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              c.user === currentUser
                ? "bg-blue-200 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            <div className="flex justify-between items-end">
              <span className="font-semibold">{c.user}</span>
              <span className="text-xs text-gray-600 ml-2">
                {formatTime(c.time)}
              </span>
            </div>
            <div>{c.message}</div>
          </div>
        </div>
      ))}
    </main>
  );
}
