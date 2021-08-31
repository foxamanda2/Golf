import React from 'react'
import './custom.scss'
import { Scores } from './pages/Scores'
import { NewPlayer } from './pages/New Player'
import { Link, Route, Switch } from 'react-router-dom'

export function App() {
  return (
    <>
      <section className="allmenu">
        <label>
          <input type="checkbox" />
          <span className="menu">
            <span className="hamburger"></span>
          </span>
          <ul className="menulist">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/scores">Scores</Link>
            </li>
            <li>
              <Link to="/newplayer">New Player</Link>
            </li>
          </ul>
        </label>
      </section>

      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/scores">
          <Scores />
        </Route>
        <Route exact path="/newplayer">
          <NewPlayer />
        </Route>
        <Route path="*">Page Not Found </Route>
      </Switch>
    </>
  )
}
