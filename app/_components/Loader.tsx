import { BarLoader } from "react-spinners";

function Loader() {
  return (
    <div>
      <BarLoader color="red" width={250} height={7} loading={true} />
    </div>
  );
}

export default Loader;
