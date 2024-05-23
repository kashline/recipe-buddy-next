import DefaultTopbar from "../ui/defaulttopbar";
import SideNav from "../ui/sidenav";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DefaultTopbar></DefaultTopbar>
      <div className="flex h-screen  md:flex-row ">
        <div className="p-6 w-full">{children}</div>
      </div>
    </div>
  );
}