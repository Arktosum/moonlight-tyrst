import { useState } from "react";
import { io, Socket } from "socket.io-client";

export default function App() {
  const [password, setPassword] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState<{ user: string; message: string }[]>([]);

  const login = () => {
    const s = io("http://localhost:3000", { auth: { password } });
    s.on("connect_error", (err) => alert(err.message));
    s.on("connect", () => setSocket(s));
    s.on("message", (m) => setChat((c) => [...c, m]));
  };

  const send = (msg: string) => socket?.emit("message", msg);

  if (!socket) {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {chat.map((c, i) => (
          <li key={i}>
            <b>{c.user}:</b> {c.message}
          </li>
        ))}
      </ul>
      <ChatInput onSend={send} />
    </div>
  );
}

function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && (onSend(msg), setMsg(""))}
      />
      <button
        onClick={() => {
          onSend(msg);
          setMsg("");
        }}
      >
        Send
      </button>
    </div>
  );
}
