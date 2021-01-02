import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import RoomSelector from './components/RoomSelector.js'
class App extends React.Component {
  state = { rooms: [], teachers: [], classes: [], groups: [], activities: [] };
  componentDidMount() {
    // Fetching static lists
    const apiUrl = "http://localhost:3001/";
    fetch(apiUrl + "room")
      .then((response) => response.json())
      .then((data) => this.setState({ rooms: data }));
    fetch(apiUrl + "teacher")
      .then((response) => response.json())
      .then((data) => this.setState({ teachers: data }));
    fetch(apiUrl + "group")
      .then((response) => response.json())
      .then((data) => this.setState({ groups: data }));
    fetch(apiUrl + "class")
      .then((response) => response.json())
      .then((data) => this.setState({ classes: data }));
  }

  handleRoomChange(){
    console.log("xd!");
  }

  render() {
    var { rooms } = this.state;
    return (
      <div className="App">
        <header className="App-header">Hi</header>
        <RoomSelector rooms={this.state.rooms} handleChange={this.handleRoomChange}/>
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
