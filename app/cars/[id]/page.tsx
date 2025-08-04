"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../_components/Loader";
import Specifications from "../../_components/Specifications";
import CarDesciption from "../../_components/CarDescriptions";
import Image from "next/image";

async function fetchCar(id: string) {
  const res = await fetch(`/api/cars/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data = await res.json();
  return data;
}

function CarDetailPage() {
  const { id } = useParams();
  let carId: string | undefined;
  if (typeof id === "string") {
    carId = id;
  } else if (Array.isArray(id) && id.length > 0) {
    carId = id[0];
  }

  if (!carId) {
    throw new Error("No car id");
  }

  const { data, error, isPending } = useQuery({
    queryKey: ["cars", carId],
    queryFn: () => fetchCar(carId as string),
    enabled: true,
    refetchOnWindowFocus: "always",
    staleTime: 60000,
  });
  const car = data?.data.car;

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error.message}</p>;
      </div>
    );
  }
  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white ">
      {/* Title Header */}
      <div className="flex items-center justify-center bg-red-700 h-16 md:h-24 shadow-md">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold tracking-wider">
          {`${car.manufacturer} ${car.model} ${car.variant}`}
        </h1>
      </div>

      {/* Content Grid */}
      <div className="flex justify-center px-4 py-10">
        <div className="grid w-full  grid-cols-1  gap-6">
          {/* Main Image */}
          <div className="w-full rounded-lg overflow-hidden border-2 border-red-700 shadow-lg">
            <Image
              className="w-full h-auto object-cover"
              src={`/${car.imageCover}`}
              alt={`${car.manufacturer}${car.model}poster`}
              width={1000}
              height={1000}
            />
          </div>

          {/* Car Description & Specs */}
          <div className="flex flex-col gap-6">
            <CarDesciption car={car} />
            <Specifications car={car} />
          </div>

          {/* Additional Images (Full width grid) */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-5">
            {car.images.map((image: string, index: number) => (
              <div
                key={index}
                className="rounded-md overflow-hidden border border-gray-800 bg-gray-900 shadow-md"
              >
                <Image
                  src={`/${image}`}
                  width={600}
                  height={400}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;
