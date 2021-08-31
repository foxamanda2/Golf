import React from 'react'
import './custom.scss'
import { Scores } from './pages/Scores'
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
          </ul>
        </label>
      </section>

      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/scores">
          <Scores />
        </Route>
        <Route path="*">Page Not Found </Route>
      </Switch>
    </>
  )
}
