import { useState } from "react";
import { io, Socket } from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

type Msg = { user: string; message: string; time: number };

// https://moonlight-tyrst.onrender.com
// http://localhost:3000
export default function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user, setUser] = useState("");
  const [chat, setChat] = useState<Msg[]>([]);

  const handleLogin = (password: string) => {
    const s = io("https://moonlight-tyrst.onrender.com", {
      auth: { password },
    });
    s.on("history", (msgs: Msg[]) => setChat(msgs));
    s.on("connect_error", (err) => alert(err.message));
    s.on("user", (data: { user: string }) => setUser(data.user));
    s.on("message", (m: Msg) => setChat((c) => [...c, m]));
    s.on("connect", () => {
      setSocket(s);
      s.emit("user");
    });
  };
  const sendMsg = (msg: string) => socket?.emit("message", msg);
  return socket ? (
    <div className="flex flex-col min-h-screen bg-black">
      <Header user={user} />
      <ChatWindow chat={chat} currentUser={user} />
      <footer className="fixed bottom-0 inset-x-0 bg-black border-t p-2">
        <ChatInput onSend={sendMsg} />
      </footer>
    </div>
  ) : (
    <Login onLogin={handleLogin} />
  );
}
