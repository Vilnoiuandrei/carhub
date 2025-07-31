import Link from "next/link";
import { FaCar, FaHome, FaSignInAlt } from "react-icons/fa";
function PageNav() {
  return (
    <nav className="w-ws fixed  bottom-0 z-40 flex h-20 w-svw items-center  justify-center bg-red-800 text-lg md:h-20 md:text-3xl">
      <ul
        className="flex justify-center
       space-x-12 md:space-x-36"
      >
        <li className=" text-white hover:text-gray-400">
          <Link className="flex items-center" href="/cars">
            <FaCar className="mb-2 mr-2 h-8 w-8" />
            Cars
          </Link>
        </li>
        <li className="text-white hover:text-gray-400">
          <Link className="flex items-center" href="/">
            <FaHome className="mb-2 mr-2 h-8 w-8" />
            Home
          </Link>
        </li>
        <li className="text-white hover:text-gray-400">
          <Link className="flex items-center" href="/login">
            <FaSignInAlt className="mb-2 mr-2 h-8 w-8" />
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default PageNav;
