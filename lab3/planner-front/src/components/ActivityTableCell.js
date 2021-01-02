import React from "react";

function ActivityTableCell(props) {
    if(typeof props.activity !== "undefined" && props.activity != null){
        return <td onDoubleClick={props.handleActivityDoubleClick}>{props.activity.group}</td>
    }
    
    return <td></td>
  }


export default ActivityTableCell;
