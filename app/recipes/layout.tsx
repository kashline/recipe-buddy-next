export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
