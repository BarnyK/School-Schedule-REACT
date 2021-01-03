import React from "react";
import { useHistory } from "react-router-dom";

function RemoveActivityButton(props) {
    const history = useHistory();
    const handleClick = () => {
      if(props.activity){
        fetch("http://localhost:3001/activity", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(props.activity),
          }).then((response) => {
            if (response.status === 200) {
              history.push("/");
            }
          });
      }
    }
    return (
      <button
        type="button"
        className="btn btn-danger"
        disabled={props.disabled}
        onClick={handleClick}
      >
        Remove
      </button>
    );
  }
  
  export default RemoveActivityButton;