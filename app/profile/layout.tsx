export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        height: '100vh'
      }}>
        <div style={{ padding: '1.5rem', width: '100%' }}>{children}</div>
      </div>
    </div>
  );
}