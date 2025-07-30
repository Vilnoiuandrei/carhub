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
  engineDisplacement: number;
  horsePower: number;
  engineType: string;
}
interface CarProps {
  car: CarProps1;
}

function Specifications({ car }: CarProps) {
  return (
    <div className="col-start-1 col-end-3 row-start-3 mt-10 px-4 lg:col-end-2">
      <h2 className=" h-10  border-b border-black text-center text-2xl md:h-14 md:text-4xl lg:text-5xl ">
        Specifications
      </h2>
      <ul className="ml-6 list-disc text-2xl md:text-4xl lg:text-5xl">
        <li>{`Manufacturer: ${car.manufacturer}`}</li>
        <li>{`Model: ${car.model}`}</li>
        <li>{`Variant: ${car.variant}`}</li>
        <li>{`Year: ${car.year}`}</li>
        <li>{`Power: ${car.horsePower}hp`}</li>
        <li>{`Engine displacement: ${car.engineDisplacement}l`}</li>
        <li>{`Engine type: ${car.engineType}`}</li>
        <li>{`Top Speed: ${car.topSpeed}kph`}</li>
        <li>{`0-100: ${car.zeroToHundred}s`}</li>
        <li>{`Price: ${car.price}€`}</li>
      </ul>
    </div>
  );
}

export default Specifications;
