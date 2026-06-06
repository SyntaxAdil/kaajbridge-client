export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <main className="flex-1  mx-4 md:mx-0 ">{children}</main>
    </section>
  );
}
