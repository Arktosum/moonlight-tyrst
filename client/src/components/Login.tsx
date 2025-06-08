import { useState } from "react";

type Props = { onLogin: (pwd: string) => void };

export default function Login({ onLogin }: Props) {
  const [pwd, setPwd] = useState("");
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black p-4">
      <h2 className="text-xl text-white font-semibold mb-4">Enter Password</h2>
      <input
        type="password"
        className="w-full max-w-xs p-3 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => onLogin(pwd)}
      >
        Login
      </button>
    </div>
  );
}
