import About from "./_components/About";
import Headline from "./_components/Headline";
import Link from "next/link";

function Homepage() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/porche911gt3img2.avif')" }}
    >
      <div className="flex flex-col justify-center gap-12 mt-2.5 p-3 md:p-10 lg:p-20 h-full ">
        <Headline />
        <div className="sm:mt-10 flex justify-center">
          <Link
            href="/cars"
            className=" flex items-center justify-center mb-4 sm:mt-5 h-10 sm:h-16 w-64 sm:w-76 md:w-96   rounded-xl bg-red-700 text-2xl text-white hover:text-gray-300"
          >
            Explore cars
          </Link>
        </div>
        <About />
      </div>
    </div>
  );
}

export default Homepage;
