import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PageLayout from './pages/Layout'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={PageLayout}></Route>

      </Switch>
    </Router>
  )
}

export default App

/* export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
    };
  }


  handleChange = (value) => {
    let color = value.hex;
    this.setState({ color })

  }
  render() {
    let { color } = this.state;
    return (
      <div style={{ position: "absolute", zIndex: 66 }}>
        <SketchPicker color={color} onChange={this.handleChange} />
      </div>
    );
  }
} */
