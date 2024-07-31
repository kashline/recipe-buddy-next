export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        padding: '1.5rem',
        width: '100%'
      }}>{children}</div>
    </div>
  );
}