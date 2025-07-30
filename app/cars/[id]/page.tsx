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
    <div>
      <div className=" align flex h-12 items-center justify-center bg-red-700 md:h-20">
        <h1 className="text-b    text-center text-2xl font-bold md:text-5xl">{`${car.manufacturer} ${car.model} ${car.variant}`}</h1>
      </div>

      <div className="flex justify-center">
        <div className="grid max-w-1500px  grid-cols-2">
          <div className="w-ws col-start-1 col-end-3 row-start-1 flex justify-center">
            <Image
              className="border-2"
              src={`/${car.imageCover}`}
              alt={`${car.manufacturer}${car.model}poster`}
              width={1000}
              height={1000}
            />
          </div>
          {car.images.map((image: string, index: number) => (
            <Image
              key={index}
              src={`/${image}`}
              width={500}
              height={500}
              alt={`Photo ${index + 1}`}
              className="col-start-1  col-end-3  mt-4 w-full border border-gray-800 shadow-lg lg:col-auto"
            />
          ))}
          <CarDesciption car={car} />
          <Specifications car={car} />
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;
