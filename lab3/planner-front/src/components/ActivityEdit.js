import React from "react";
import { Link } from "react-router-dom";
import RemoveActivityButton from "./RemoveActivityButton"

function ActivityEditSelector(props) {
  if (props.list.length === 0) return null; //Fix for defaultvalue
  return (
    <div className="activity-edit-selector">
      <label htmlFor={props.name}>{props.name}: </label>
      <select
        className="form-control"
        name={props.name.toLowerCase()}
        disabled={props.disabled}
        defaultValue={props.default}
      >
        {props.list.map((v, k) => {
          return (
            <option value={v} key={k}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}


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
          this.setState({ activity: data[0], exists: true });
      });
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
    if (this.state.activity) {
      let act = this.state.activity;

      return (
        <main className="pb-3">
          <Link to="/" type="button" className="btn btn-dark">
            Go back
          </Link>
          <RemoveActivityButton activity={this.state.activity} disabled={!this.state.exists} />
          <button type="button" className="btn btn-success">
            Add
          </button>
          <form className="edit-activity-form">
            <input type="hidden" name="day" value={this.state.activity.day} />
            <input type="hidden" name="slot" value={this.state.activity.slot} />
            <input type="hidden" name="room" value={this.state.activity.room} />
            <ActivityEditSelector
              name="Room"
              list={[act.room]}
              disabled={true}
            />
            <ActivityEditSelector
              name="Hours"
              list={[this.slots[act.slot]]}
              disabled={true}
            />
            <ActivityEditSelector
              name="Day"
              list={[this.days[act.day]]}
              disabled={true}
            />
            <ActivityEditSelector
              name="Teacher"
              list={this.state.teachers}
              default={act.teacher}
            />
            <ActivityEditSelector
              name="Group"
              list={this.state.groups}
              default={act.group}
            />
            <ActivityEditSelector
              name="Class"
              list={this.state.classes}
              default={act.class}
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
