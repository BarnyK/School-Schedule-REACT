import React from "react";
import { useHistory } from "react-router-dom";

function ActivityTableCell(props) {
  const history = useHistory();
  const handleClick = () =>
    history.push(
      `/EditActivity/${props.activity.room},${props.activity.day},${props.activity.slot}`
    );
  if (typeof props.activity !== "undefined" && props.activity != null) {
    return <td onDoubleClick={handleClick}>{props.activity.group}</td>;
  }

  return <td></td>;
}

export default ActivityTableCell;
