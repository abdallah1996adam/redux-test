import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { v4 as uuidv4 } from "uuid";
//importing all actioncreators as one object
import * as actionCreators from "../redux/actions-creators/index";

//scss
import "./box.scss";

const Box = ({ children, color, index, text }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  //using destruction to extract actioncreators and bind them
  const { addText, deleteBox, addSubBox } = bindActionCreators(
    actionCreators,
    dispatch
  );

  //getting the boxReducer from the store
  const boxArray = useSelector((store) => store.boxReducer);

  const handleChangeText = (e) => {
    addText({ index, text: e.target.value });
    //to update local storage each time text changes
    localStorage.setItem("boxes", JSON.stringify(boxArray));
  };

  //to get the text value
  useEffect(() => {
    inputRef.current.value = text;
  }, []);

  const handleDeleteBox = () => {
    deleteBox(index);
    localStorage.setItem("boxes", JSON.stringify(boxArray));
  };

  const handleAddSubBox = () => {
    const red = ~~(255 * Math.random());
    //~~ === math.floor to create random colors
    const green = ~~(250 * Math.random() + 5);
    const blue = ~~(150 * Math.random() + 100);
    //for box opacity
    const alpha = 0.5 * Math.random() + 0.5;

    const subBox = {
      id: uuidv4(),
      text: "",
      color: { red, green, blue, alpha },
      subBox: [],
    };

    addSubBox({ ...subBox, index });
    localStorage.setItem("boxes", JSON.stringify(boxArray));
  };

  return (
    <div
      className="box"
      key={index}
      style={{
        background: `rgba(${color.red},${color.green},${color.blue},${color.alpha})`,
      }}
    >
      <div className="box-header">
        <input type="text" ref={inputRef} onChange={handleChangeText} />
        <button onClick={handleDeleteBox}>delete box</button>
        <button onClick={handleAddSubBox}>add box</button>
      </div>
      <div className="space"></div>
      {children}
    </div>
  );
};

export default Box;
