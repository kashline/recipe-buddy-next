import SideNav from "../ui/sidenav";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen  md:flex-row ">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="p-6 w-full">{children}</div>
    </div>
  );
}