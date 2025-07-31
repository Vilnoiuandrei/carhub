interface SortProps {
  sort: string;
  setSort: (value: string) => void;
}

function Sort({ sort, setSort }: SortProps) {
  return (
    <div>
      <select
        className="mr-4 h-8 w-8 rounded-lg border-2 bg-gray-200  md:h-14 md:w-8"
        id="sort"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value="">Default</option>
        <option value="-likes">Popular</option>
        <option value="-horsePower">Power(High to low)</option>
        <option value="horsePower">Power(Low to high)</option>
        <option value="-price">Price(High to low)</option>
        <option value="price">Price(Low to high)</option>
        <option value="-year">Year(New to old)</option>
        <option value="year">Year(Old to new)</option>
      </select>
    </div>
  );
}

export default Sort;
