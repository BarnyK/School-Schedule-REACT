import React from "react";

class ActivityEdit extends React.Component {
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  slots = [
    "8:00 - 8:45",
    "8:55 - 9:40",
    "9:50 - 11:35",
    "11:55 - 12:40",
    "12:50 - 13:35",
    "13:45 - 14:30",
    "14:40 - 15:25",
    "15:35 - 16:20",
    "16:30 - 17:15",
  ];
  state = {
    room: null,
    day: null,
    slot: null,
    teachers: [],
    groups: [],
    classes: [],
  };

  componentDidMount() {
    const apiUrl = "http://localhost:3001/";
    let room = this.props.match.params.room;
    let day = this.props.match.params.day;
    let slot = this.props.match.params.slot;
    this.setState({
      room: room,
      day: day,
      slot: slot,
    });
    let actUrl = new URL(apiUrl + "activity");
    actUrl.search = new URLSearchParams({
      day: day,
      room: room,
      slot: slot,
    }).toString();
    fetch(actUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ activity: data }));
    // Fetching static lists

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

  render() {
    return (
      <div>
        <p>Day: {this.days[this.state.day]}</p>
        <p>Slot: {this.slots[this.state.slot]}</p>
        <p>Room: {this.state.room}</p>
      </div>
    );
  }
}

export default ActivityEdit;
