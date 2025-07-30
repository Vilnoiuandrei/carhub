import About from "./_components/About";
import Headline from "./_components/Headline";
import Link from "next/link";

function Homepage() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/porche911gt3img2.avif')" }}
    >
      <div>
        <Headline />
        <About />
        <div className="mt-40 flex justify-center">
          <Link
            href="/cars"
            className=" flex items-center justify-center mb-4 mt-5 h-16  w-96   rounded-xl bg-red-700 text-2xl text-white hover:text-gray-300"
          >
            Explore cars
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
