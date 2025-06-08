import { useState } from "react";

type Props = { onSend: (msg: string) => void };

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const submit = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };
  return (
    <div className="flex gap-2 text-white">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className="flex-1 text-white p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
      />
      <button
        onClick={submit}
        className="px-4 py-3 bg-blue-600 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
