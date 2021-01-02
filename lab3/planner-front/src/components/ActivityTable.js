import React from "react";
import ActivityTableCell from "./ActivityTableCell";
class ActivityTable extends React.Component {
  timeSlots = [
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
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  renderCell(day, slot) {
    var actIndex = slot * 5 + day;
    let act = this.props.activities[actIndex];
    return (
      <ActivityTableCell
        key={actIndex}
        activity={act}
        handleActivityDoubleClick={() =>
          this.props.handleActivityDoubleClick(actIndex)
        }
      />
    );
  }
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            {this.days.map((v, k) => {
              return (
                <th scope="col" key={k}>
                  {v}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {this.timeSlots.map((v, indexY) => {
            return (
              <tr key={indexY}>
                <th scope="row">{v}</th>
                {this.days.map((v, indexX) => {
                  return this.renderCell(indexX, indexY);
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ActivityTable;
