import React from "react";

class RoomSelector extends React.Component {
  render() {
    return (
      <select onChange={this.props.handleChange}>
        {this.props.rooms.map((val, key) => {
          return <option key={key}>{val}</option>;
        })}
      </select>
    );
  }
}

export default RoomSelector;