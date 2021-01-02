import React from "react";

function RoomSelector(props){
    return (
      <select onChange={props.handleRoomChange} defaultValue={props.activeRoom}>
        {props.rooms.map((val, key) => {
          return <option key={key}>{val}</option>;
        })}
      </select>
    );
}

export default RoomSelector;