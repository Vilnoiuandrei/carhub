"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CarList from "../_components/CarList";
import Search from "../_components/Search";
import Loader from "../_components/Loader";
import SelectManufacturer from "../_components/SelectManufacturer";
import Sort from "../_components/Sort";

async function fetchCars(
  query: string,

  manufacturer: string,
  sort: string
) {
  let url = `/api/cars/`;
  if (manufacturer) {
    url += `?manufacturer=${manufacturer}&`;
  }
  if (query && !manufacturer) {
    url += `?model=${query}&`;
  }
  if (query && manufacturer) {
    url += `model=${query}&`;
  }
  if (sort && !query && !manufacturer) {
    url += `?sort=${sort}`;
  }
  if ((sort && manufacturer) || query) {
    url += `sort=${sort}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
}

function CarPage() {
  const [query, setQuery] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [sort, setSort] = useState("");

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars(query, manufacturer, sort),
    enabled: true,
    refetchOnWindowFocus: "always",
    staleTime: 60000,
  });
  useEffect(() => {
    refetch();
  }, [query, manufacturer, sort, refetch]);

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

  return (
    <div>
      <Search query={query} setQuery={setQuery}>
        <Sort sort={sort} setSort={setSort} />
        <SelectManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </Search>
      <CarList cars={data.data.cars} />
    </div>
  );
}
export default CarPage;
