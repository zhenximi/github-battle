var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');
// state
// lifecycle event
// UI

class App extends React.Component {
  render() {
    return (
      <Router>
      <div className='container'>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/battle' component={Battle} />
          <Route path="/battle/results" component={Results}/>
          <Route path='/popular' component={Popular} />
        </Switch>
      </div>
      </Router>
    )
  }
}
module.exports = App;
