import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="container mx-auto max-w-6xl p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
