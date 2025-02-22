import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const HomeLayout = ({ children }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex-1 min-h-screen flex flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 ">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
