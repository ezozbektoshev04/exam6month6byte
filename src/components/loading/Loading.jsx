import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "180px auto",
  borderColor: "red",
};

const Loading = () => {
  return (
    <ClipLoader
      color={"blue"}
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
