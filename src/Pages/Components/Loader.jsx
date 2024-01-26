import { Circles } from "react-loader-spinner";

const Loader = () => {
  const circlesStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={{ position: "relative", height: "200px" }}>
      <Circles
        height="80"
        width="80"
        color="#ADD8E6"
        ariaLabel="circles-loading"
        wrapperStyle={circlesStyle}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
