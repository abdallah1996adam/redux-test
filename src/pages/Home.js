import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { v4 as uuidv4 } from "uuid";
//importing all actioncreators as one object
import * as actionCreators from "../redux/actions-creators/index";
//components
import Box from "../components/Box";

//scss
import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();
  //using destruction to extract actioncreators and bind them
  const { createBox, deleteAll } = bindActionCreators(actionCreators, dispatch);

  //getting the box reducer
  const boxArray = useSelector((store) => store.boxReducer);

  const handleAddBox = () => {
    //generate random color
    const red = ~~(255 * Math.random());
    //~~ === math.floor to create random colors
    const green = ~~(250 * Math.random() + 5);
    const blue = ~~(150 * Math.random() + 100);
    //for box opacity
    const alpha = 0.5 * Math.random() + 0.5;

    const boxValue = {
      id: uuidv4(),
      text: "",
      color: { red, green, blue, alpha },
      subBox: [],
    };
    createBox(boxValue);
  };

  //on loading page fill boxArray with local storage content
  useEffect(() => {
    const boxes = JSON.parse(localStorage.getItem("boxes"));
    /**checks if   boxes not null before setting up boxArray */
    boxes && createBox(boxes);
  }, []);

  //delete all boxes when clicking on reset
  const clearLocalStorage = () => {
    deleteAll();
    localStorage.setItem("boxes", JSON.stringify(boxArray));
  };

  //set the local storage everytime boxArray changes
  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(boxArray));
  }, [boxArray]);

  return (
    <div className="root">
      <div className="container">
        <div>
          <button className="addbox" onClick={handleAddBox}>
            addbox
          </button>
        </div>

        <div className="generator">
          <h2>generate boxes</h2>
          <label>number of boxes</label>
          <input type="number"></input>

          <label>number of boxes in a box</label>
          <input type="number"></input>

          <button className="btn">generate</button>
          <button className="reset" onClick={clearLocalStorage}>
            reset
          </button>
        </div>
      </div>

      {boxArray.map((box, index) => (
        <Box color={box.color} index={index} text={box.text}>
          {box.subBox.map((sub, subIndex) => {
            return (
              <Box
                color={sub.color}
                index={subIndex}
                text={sub.text}
                indexParent={index}
              />
            );
          })}
        </Box>
      ))}
    </div>
  );
};

export default Home;
