import React, { useEffect, useState } from "react";
import styles from "./Pin.module.css";

function Pin(props) {
  let initialSetting = {
    max: 6,
    keypad: "number", // number | dot
    random: false, // true | false
    onChangeValue: () => {},
  };
  const [setting, setSetting] = useState(initialSetting);

  useEffect(() => {
    // props.max && setSetting({ ...setting, max: props.max });
    // props.keypad && setSetting({ ...setting, keypad: props.keypad });
    // props.random && setSetting({ ...setting, random: props.random });
    // props.onChangeValue && setSetting({ ...setting, onChangeValue: props.onChangeValue });

    let data = {
      max: props.max ? props.max : setting.max,
      keypad: props.keypad ? props.keypad : setting.keypad,
      random: props.random ? props.random : setting.random,
      onChangeValue: props.onChangeValue ? props.onChangeValue : setting.onChangeValue,
    }
    setSetting(data);

    // setSetting({ ...props });
  }, [props]);

  const [setup, setSetup] = useState({
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    // algorithm: "md5",
  });
  useEffect(() => {
    if (setting.random) {
      setSetup({ arr: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]) });
    }
  }, []);

  const [input, setInput] = useState([]);

  return (
    <React.Fragment>
      <div
        id="modal-pin"
        className={styles.wrapper__size}
        style={{ display: "none" }}
      >
        <div className={styles.pin_blur}></div>
        <div className={styles.pin}>
          {/* <div className={styles.pin__header}></div> */}
          <div className={styles.pin__body}>
            <div className={styles.pin__body__message}>
              <div className={styles.pin__body__message__title}>
                <span>Enter PIN for trezor</span>
              </div>
              <div className={styles.pin__body__message__description}>
                <span>The PIN layout is displayed on your Trezor.</span>
              </div>
            </div>
            <div className={styles.pin__body__input}>
              <div className={styles.pin__body__input__box}>
                <div className={styles.pin__body__input__box__flex}>
                  <input
                    type="password"
                    autoComplete="off"
                    readOnly={true}
                    value={input
                      .toString()
                      .replaceAll(",", "")
                      .split("")
                      .reverse()
                      .join("")}
                  />
                  <span
                    className={styles.noselect}
                    onClick={() => {
                      if (input.length > 0) {
                        setInput(input.slice(1));
                      }
                    }}
                  ></span>
                </div>
              </div>
            </div>
            <div className={styles.pin__body__button}>
              <div className={styles.pin__body__button__flex}>
                {setup.arr.map((item) => {
                  return (
                    <div
                      key={item}
                      className={`${styles.pin__body__button__flex__item} ${styles.noselect} ${
                        setting.keypad === "dot" && styles.dot
                      }`}
                      onClick={() => {
                        if (input.length > 0) {
                          if (input.length < setting.max) {
                            let data = [];
                            data.push(item);
                            data = data.concat(input);
                            setInput(data);
                          }
                        } else {
                          let data = [];
                          data.push(item);
                          setInput(data);
                        }
                      }}
                    >
                      {setting.keypad === "number" ? item : null}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.pin__body__submit}>
              <button
                onClick={() => {
                  if (input.length > 0) {
                    setting.onChangeValue(
                      input
                        .toString()
                        .replaceAll(",", "")
                        .split("")
                        .reverse()
                        .join("")
                    );
                  }

                  setInput([]);
                  window.document.getElementById("modal-pin").style.display =
                    "none";
                }}
              >
                Confirm
              </button>
            </div>
            <div className={styles.pin__body__help}>
              <span>
                Not sure how PIN work?{" "}
                <a href="#">
                  <u>Learn more</u>
                </a>
              </span>
            </div>
          </div>
          {/* <div className={styles.pin__footer}></div> */}
        </div>
      </div>
    </React.Fragment>
  );
}

function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export default Pin;

function ShowPin() {
  window.document.getElementById("modal-pin").style.display = "block";
}

export { ShowPin };
