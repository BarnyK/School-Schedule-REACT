import React from "react";
import RoomSelector from "./RoomSelector";
import ActivityTable from "./ActivityTable";
import { Redirect, useHistory } from "react-router-dom";

class ActivityMain extends React.Component {
  state = {
    rooms: [],
    activities: Array(45).fill(null),
    activeRoom: null,
  };

  componentDidMount() {
    // Fetching static lists
    const apiUrl = "http://localhost:3001/";
    fetch(apiUrl + "room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ rooms: data, activeRoom: data[0] });
        this.getActivities();
      });
    this.getActivities();
  }

  handleRoomChange(event) {
    let room = event.target.value;
    this.setState({
      activeRoom: room,
    });
    this.getActivities(room);
  }


  removeActivity(actIndex) {
    let act = this.state.activities[actIndex];
    if (act != null) {
      fetch("http://localhost:3001/activity", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(act),
      });
      // Fetch request
      let newActivities = this.state.activities.slice();
      newActivities[actIndex] = null;
      this.setState({
        activities: newActivities,
      });
    }
  }

  getActivities(room = null) {
    if (!room) room = this.state.activeRoom;
    if (room) {
      fetch("http://localhost:3001/activity?room=" + room)
        .then((response) => response.json())
        .then((data) => {
          let newActivities = Array(45).fill(null);
          for (let i = 0; i < data.length; i++) {
            let act = data[i];
            newActivities[act.slot * 5 + act.day * 1] = act;
          }
          this.setState({ activities: newActivities });
        });
    }
  }

  render() {
    return (
      <div className="ActivityMain">
        <RoomSelector
          activeRoom={this.state.activeRoom}
          rooms={this.state.rooms}
          handleRoomChange={this.handleRoomChange.bind(this)}
        />
        <ActivityTable
          activities={this.state.activities}
        />
      </div>
    );
  }
}

export default ActivityMain;
