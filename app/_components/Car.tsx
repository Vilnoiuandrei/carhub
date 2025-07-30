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
    <li key={car._id} className="relative">
      <Link
        href={`/cars/${car._id}`}
        className="flex h-96  w-screen cursor-pointer flex-col  items-center justify-center border-4 border-black bg-black text-white  lg:w-full"
      >
        <Image
          className="h-5/6 w-full object-cover"
          src={`/${car.imageCover}`}
          alt={`${car.manufacturer}${car.model}poster`}
          width={500}
          height={500}
        />

        <h3 className=" flex justify-center text-2xl md:text-3xl">
          {`${car.manufacturer} ${car.model} ${car.variant} ${car.year}`}
        </h3>

        {session?.user && <LikeButton car={car} />}
      </Link>
    </li>
  );
}
