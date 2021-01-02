import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import RoomSelector from "./components/RoomSelector.js";
class App extends React.Component {
  state = {
    rooms: [],
    teachers: [],
    classes: [],
    groups: [],
    activities: [],
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
    this.setState({
      activeRoom: event.target.value,
    });
    this.updateActivities();
  }

  updateActivities() {
    let room = this.state.activeRoom;
    console.log(room);
    if (room) {
      fetch("http://localhost:3001/activity?room=" + room)
        .then((response) => response.json())
        .then((data) => this.setState({ activities: data }));
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Hi</header>
        <RoomSelector
          activeRoom={this.state.activeRoom}
          rooms={this.state.rooms}
          handleRoomChange={this.handleRoomChange.bind(this)}
        />
      </div>
    );
  }
}

// function App2() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       {/* <Test /> */}
//     </div>
//   );
// }

export default App;
