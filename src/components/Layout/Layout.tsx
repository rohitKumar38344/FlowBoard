import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../AppSidebar/AppSidebar";
import { Toaster } from 'sonner';
export const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <Toaster/>
      </main>
      {/* <div className="grid  h-screen grid-cols-[240px_1fr] grid-rows-[140px_1fr]">{children}
    </div> */}
    </SidebarProvider>
  );
};
