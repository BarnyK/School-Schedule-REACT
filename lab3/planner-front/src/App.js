import React from "react";
import "./App.css";
import RoomSelector from "./components/RoomSelector";
import ActivityTable from "./components/ActivityTable";

function emptyActivity() {
  return {
    room: null,
    teacher: null,
    group: null,
    class: null,
    day: null,
    slot: null,
  };
}
class App extends React.Component {
  state = {
    rooms: [],
    teachers: [],
    classes: [],
    groups: [],
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
        this.updateActivities();
      });
    fetch(apiUrl + "teacher")
      .then((response) => response.json())
      .then((data) => this.setState({ teachers: data }));
    fetch(apiUrl + "group")
      .then((response) => response.json())
      .then((data) => this.setState({ groups: data }));
    fetch(apiUrl + "class")
      .then((response) => response.json())
      .then((data) => this.setState({ classes: data }));
    this.updateActivities();
  }

  handleRoomChange(event) {
    let room = event.target.value;
    this.setState({
      activeRoom: room,
    });
    this.updateActivities(room);
  }

  handleActivityDoubleClick(actIndex) {
    console.log(this.state.activities[actIndex]);
  }

  updateActivities(room = null) {
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
      <div className="App">
        <RoomSelector
          activeRoom={this.state.activeRoom}
          rooms={this.state.rooms}
          handleRoomChange={this.handleRoomChange.bind(this)}
        />
        <ActivityTable
          activities={this.state.activities}
          handleActivityDoubleClick={this.handleActivityDoubleClick.bind(this)}
        />
      </div>
    );
  }
}

export default App;
