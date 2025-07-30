import Car from "./Car";

interface Car {
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
interface CarListPropos {
  cars: Car[];
}
export default function CarList({ cars }: CarListPropos) {
  return (
    <div className="flex  items-center justify-center ">
      <ul className="list mb-20 grid-cols-2  justify-center lg:grid lg:w-full xl:grid-cols-3 2xl:grid-cols-4">
        {cars?.map((car) => (
          <Car key={car._id} car={car} />
        ))}
      </ul>
    </div>
  );
}
