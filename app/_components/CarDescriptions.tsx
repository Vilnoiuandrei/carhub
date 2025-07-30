interface CarProps1 {
  description: string;
}
interface CarProps {
  car: CarProps1;
}
export default function CarDescription({ car }: CarProps) {
  return (
    <div className="col-start-1  col-end-3 row-start-2 mt-10 px-4 lg:col-start-2">
      <h3 className="border-b  border-black text-center text-2xl  md:text-4xl lg:text-5xl">
        Descriptions
      </h3>
      <p className="mt-4 text-2xl md:text-4xl lg:text-5xl">{car.description}</p>
    </div>
  );
}
