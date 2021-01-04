import React from "react";
import RoomSelector from "./RoomSelector";
import ActivityTable from "./ActivityTable";

class ActivityMain extends React.Component {
  state = {
    rooms: [],
    activities: Array(45).fill(null),
    activeRoom: null,
  };

  componentDidMount() {
    // Fetch list of rooms and activities
    fetch(process.env.REACT_APP_API_HOST + "room")
      .then((response) => response.json())
      .then((data) => {
        if (
          typeof localStorage.activeRoom !== "undefined" &&
          data.includes(localStorage.activeRoom)
        ) {
          this.setState({ rooms: data, activeRoom: localStorage.activeRoom });
          this.getActivities(localStorage.activeRoom);
        } else {
          this.setState({ rooms: data, activeRoom: data[0] });
          this.getActivities(data[0]);
        }
      });
  }

  handleRoomChange(event) {
    let room = event.target.value;
    this.setState({
      activeRoom: room,
    });
    localStorage.setItem("activeRoom", room);
    this.getActivities(room);
  }

  getActivities(room = null) {
    // Gets activity list from API
    if (!room) room = this.state.activeRoom;
    if (room) {
      fetch(process.env.REACT_APP_API_HOST + "activity?room=" + room)
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
    if (this.state.rooms.length > 0) {
      return (
        <main className="pb-3" role="main">
          <RoomSelector
            activeRoom={this.state.activeRoom}
            rooms={this.state.rooms}
            handleRoomChange={this.handleRoomChange.bind(this)}
          />
          <ActivityTable
            activeRoom={this.state.activeRoom}
            activities={this.state.activities}
          />
        </main>
      );
    } else {
      return <div>No API connection</div>;
    }
  }
}

export default ActivityMain;
