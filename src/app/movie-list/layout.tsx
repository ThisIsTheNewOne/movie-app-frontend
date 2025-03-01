export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Just a simple Side Nav</div>
      <div >{children}</div>
    </div>
  );
}