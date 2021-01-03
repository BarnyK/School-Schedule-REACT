import React from 'react';


function ActivityEditSelector(props) {
  if (props.list.length === 0) return null; //Fix for defaultvalue
  return (
    <div className="activity-edit-selector">
      <label htmlFor={props.name}>{props.name}: </label>
      <select
        className="form-control"
        name={props.name.toLowerCase()}
        disabled={props.disabled}
        onChange={props.onChange}
        value={props.default}
        
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

export default ActivityEditSelector;