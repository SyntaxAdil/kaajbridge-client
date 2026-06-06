import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <section className=" min-h-screen flex flex-col ">
      {/* navbar */}
      <Navbar></Navbar>
      {/* main */}
      <main className="flex-1 mx-4 md:mx-0  ">{children}</main>
      {/* footer */}
      <Footer></Footer>
    </section>
  );
}
