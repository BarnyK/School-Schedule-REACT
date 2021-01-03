import React from "react";

function RoomSelector(props) {
  return (
    <div className="form-group room-selector">
      <form>
        <label class="room-selector-label" htmlFor="room-selector">Room:</label>
        <select
          name="room-selector"
          className="form-control"
          onChange={props.handleRoomChange}
          value={props.activeRoom}
        >
          {props.rooms.map((val, key) => {
            return <option key={key}>{val}</option>;
          })}
        </select>
      </form>
    </div>
  );
}

export default RoomSelector;
