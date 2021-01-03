import React from "react";
import { useHistory } from "react-router-dom";

function ActivityTableCell(props) {
  const history = useHistory();
  const handleClick = () =>
    history.push(
      `/EditActivity/${props.activity.room},${props.activity.day},${props.activity.slot}`
    );

  return <td onDoubleClick={handleClick}>{props.activity.group}</td>;
}

export default ActivityTableCell;
