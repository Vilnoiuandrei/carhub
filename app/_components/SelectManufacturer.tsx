interface ManufacturerProps {
  manufacturer: string;
  setManufacturer: (value: string) => void;
}
function SelectManufacturer({
  manufacturer,
  setManufacturer,
}: ManufacturerProps) {
  return (
    <div>
      <select
        className="h-12 w-40 rounded-lg border-2 bg-gray-200  md:h-14 md:w-96"
        id="select"
        value={manufacturer}
        onChange={(e) => {
          setManufacturer(e.target.value);
        }}
      >
        <option value="">Manufacturer</option>
        <option value="Audi">Audi</option>
        <option value="BMW">BMW</option>
        <option value="Mercedes-Benz">Mercedes-Benz</option>
        <option value="Ferrari">Ferrari</option>
        <option value="Porsche">Porsche</option>
        <option value="Volkswagen">Volkswagen</option>
        <option value="Toyota">Toyota</option>
      </select>
    </div>
  );
}
export default SelectManufacturer;
