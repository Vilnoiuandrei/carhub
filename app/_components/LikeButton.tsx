"use client";

import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CarProps1 {
  _id: number;
  likes: string[];
}
interface CarProps {
  car: CarProps1;
}

const fetchGetUserId = async (): Promise<string | null> => {
  const res = await fetch("/api/getUserId");

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data.userId || null;
};

const fetchAddLikeCars = async (carId: number | string): Promise<void> => {
  const res = await fetch("/api/addLikeCar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ carId }),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

const fetchRemoveLikedCars = async (carId: number | string): Promise<void> => {
  const res = await fetch("/api/removeLikeCar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ carId }),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
export default function LikeButton({ car }: CarProps) {
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(car.likes.length);

  const { data: userId } = useQuery({
    queryKey: ["userId"],
    queryFn: fetchGetUserId,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  });

  useEffect(() => {
    if (userId && car.likes.includes(userId)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [userId, car.likes]);

  const addLikeMutation = useMutation({
    mutationFn: fetchAddLikeCars,
    onSuccess: () => {
      setLike(true);
      setLikesCount((c) => c + 1);
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: fetchRemoveLikedCars,
    onSuccess: () => {
      setLike(false);
      setLikesCount((c) => c - 1);
    },
  });

  function handleLike(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    if (!like) {
      addLikeMutation.mutate(car._id);
    } else {
      removeLikeMutation.mutate(car._id);
    }
  }

  return (
    <div
      className="absolute bottom-2 right-2 mb-1 mr-2 flex text-4xl text-red-800"
      onClick={handleLike}
    >
      <p className="mr-2">{likesCount}</p>
      {like ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
}
