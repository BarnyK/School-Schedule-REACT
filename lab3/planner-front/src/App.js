import React from "react";
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import ActivityMain from "./components/ActivityMain";
import ActivityEdit from "./components/ActivityEdit";

class App extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path="/" component={ActivityMain} />
        <Route path="/EditActivity/:room,:day,:slot" component={ActivityEdit} />
      </Switch>
    )
  }
}

export default App;
