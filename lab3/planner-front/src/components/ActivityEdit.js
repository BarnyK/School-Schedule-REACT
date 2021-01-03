import React from "react";
import { Link } from "react-router-dom";
import RemoveActivityButton from "./RemoveActivityButton";
import ActivityEditSelector from "./ActivityEditSelector";

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
    exists: false,
    teachers: [],
    groups: [],
    classes: [],
    activity: null,
    group: "",
    teacher: "",
    class: "",
  };

  componentDidMount() {
    const apiUrl = "http://localhost:3001/";
    let room = this.props.match.params.room;
    let day = this.props.match.params.day;
    let slot = this.props.match.params.slot;
    this.setState({
      activity: {
        room: room,
        day: parseInt(day),
        slot: parseInt(slot),
      },
    });

    let actUrl = new URL(apiUrl + "activity");
    actUrl.search = new URLSearchParams({
      day: day,
      room: room,
      slot: slot,
    }).toString();
    fetch(actUrl)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data[0] !== "undefined")
          this.setState({
            activity: data[0],
            exists: true,
            class: data[0].class,
            group: data[0].group,
            teacher: data[0].teacher,
          });
      });
    // Fetching static lists
    fetch(apiUrl + "teacher")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ teachers: data });
        if (!this.state.teacher) this.setState({ teacher: data[0] });
      });
    fetch(apiUrl + "group")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ groups: data });
        if (!this.state.group) this.setState({ group: data[0] });
      });
    fetch(apiUrl + "class")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ classes: data });
        if (!this.state.class) this.setState({ class: data[0] });
      });
  }

  handleSaveClick() {
    let newAct = this.state.activity;
    let method = this.state.exists ? "PUT" : "POST";
    newAct.teacher = this.state.teacher;
    newAct.group = this.state.group;
    newAct.class = this.state.class;
    fetch("http://localhost:3001/activity", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAct),
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          activity: newAct,
          exists: true,
        });
      }
    });
  }

  handleChange(event) {
    let target = event.target;
    console.log(target.value);
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    if (this.state.activity) {
      let act = this.state.activity;

      return (
        <main className="pb-3">
          <Link to="/" type="button" className="btn btn-dark">
            Go back
          </Link>
          <RemoveActivityButton
            activity={this.state.activity}
            disabled={!this.state.exists}
          />
          <button
            type="button"
            onClick={this.handleSaveClick.bind(this)}
            className="btn btn-success"
          >
            Save
          </button>
          <form className="edit-activity-form">
            <input type="hidden" name="day" value={this.state.activity.day} />
            <input type="hidden" name="slot" value={this.state.activity.slot} />
            <input type="hidden" name="room" value={this.state.activity.room} />
            <ActivityEditSelector
              name="Room"
              list={[act.room]}
              disabled={true}
              onChange={this.handleChange.bind(this)}
            />
            <ActivityEditSelector
              name="Hours"
              list={[this.slots[act.slot]]}
              disabled={true}
              onChange={this.handleChange.bind(this)}
            />
            <ActivityEditSelector
              name="Day"
              list={[this.days[act.day]]}
              disabled={true}
              onChange={this.handleChange.bind(this)}
            />
            <ActivityEditSelector
              name="Teacher"
              list={this.state.teachers}
              default={this.state.teacher}
              onChange={this.handleChange.bind(this)}
            />
            <ActivityEditSelector
              name="Group"
              list={this.state.groups}
              default={this.state.group}
              onChange={this.handleChange.bind(this)}
            />
            <ActivityEditSelector
              name="Class"
              list={this.state.classes}
              default={this.state.class}
              onChange={this.handleChange.bind(this)}
            />
          </form>
        </main>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default ActivityEdit;
