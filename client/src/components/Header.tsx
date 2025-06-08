type Props = { user: string };

export default function Header({ user }: Props) {
  return (
    <header className="bg-blue-500 text-white p-4 text-center text-lg font-medium">
      Logged in as: <span className="font-semibold">{user}</span>
    </header>
  );
}
