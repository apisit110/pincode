import React, { useState } from "react";
import Pin, { ShowPin } from "./Pin";

// import styles from "./App.module.css";

function App() {
  const [value, setValue] = useState();
  const handleChangeValue = (val) => {
    setValue({ value: val });
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <Pin keypad="dot" onChangeValue={handleChangeValue} />
        <button
          style={{
            width: "200px",
            height: "60px",
            borderRadius: "4px",
            border: "1px solid #00a1ff",
            color: "#00a1ff",
          }}
          onClick={() => {
            ShowPin();
          }}
        >
          OPTEN, MY MODAL!
        </button>
      </div>
    </React.Fragment>
  );
}

export default App;
