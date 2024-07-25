export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="p-6 w-full">{children}</div>
    </div>
  );
}