import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

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
