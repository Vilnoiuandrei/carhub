import Link from "next/link";
import LikeButton from "./LikeButton";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface CarProps1 {
  _id: number;
  manufacturer: string;
  model: string;
  variant: string;
  year: number;
  imageCover: string;
  price: number;
  topSpeed: number;
  zeroToHundred: number;
  likes: [string];
}
interface CarProps {
  car: CarProps1;
}

export default function Car({ car }: CarProps) {
  const { data: session } = useSession();

  return (
    <li key={car._id} className=" w-full max-w-md mx-auto">
      <Link
        href={`/cars/${car._id}`}
        className="group relative flex h-[28rem] w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white shadow-xl transition duration-300 hover:scale-[1.02] hover:shadow-red-700/40 border border-gray-800"
      >
        <div className="relative h-4/5 w-full">
          <Image
            src={`/${car.imageCover}`}
            alt={`${car.manufacturer} ${car.model} poster`}
            fill
            className="object-cover brightness-[0.85] transition duration-300 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        </div>

        <div className=" mt-auto p-4 text-center flex flex-row items-center justify-between gap-1">
          <h3 className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-md">
            {`${car.manufacturer} ${car.model} ${car.variant} ${car.year}`}
          </h3>
          {session?.user && (
            <div className="">
              <LikeButton car={car} />
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}
