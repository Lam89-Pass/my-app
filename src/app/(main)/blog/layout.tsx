export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-[100] bg-black min-h-screen">{children}</div>
  );
}
