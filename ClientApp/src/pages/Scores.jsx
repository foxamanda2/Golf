import React, { useEffect, useState } from 'react'

export function Scores() {
  const [scores, setScores] = useState([])
  const [filterText, setFilterText] = useState('')
  // {
  //   id: 1,
  //   firstName: 'Gracie',
  //   lastName: 'Binder',
  //   averageScore: 95,
  //   date: '2021-01-23T00:00:00',
  // },
  // {
  //   id: 2,
  //   firstName: 'Fancie',
  //   lastName: 'Faithfull',
  //   averageScore: 56,
  //   date: '2020-10-11T00:00:00',
  // },
  // {
  //   id: 3,
  //   firstName: 'Armand',
  //   lastName: 'Ochterlony',
  //   averageScore: 69,
  //   date: '2021-02-21T00:00:00',
  // },
  // {
  //   id: 4,
  //   firstName: 'Morten',
  //   lastName: 'Chettoe',
  //   averageScore: 68,
  //   date: '2021-06-25T00:00:00',
  // },
  // {
  //   id: 5,
  //   firstName: 'Mirna',
  //   lastName: 'Foy',
  //   averageScore: 90,
  //   date: '2021-06-08T00:00:00',
  // },

  useEffect(
    function () {
      async function loadScores() {
        let url = '/api/Player'

        if (filterText.length > 0) {
          url = `/api/Player?filter=${filterText}`
        }
        const response = await fetch(url)
        const json = await response.json()
        setScores(json)
      }
      loadScores()
    },
    [filterText]
  )

  return (
    <>
      <div className="row">
        <input
          type="text"
          placeholder="Search"
          className="col"
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
        <select name="namesearch" id="namesearch" className="col">
          <option value="name1">Doe, John </option>
          <option value="name2">Doe, Jane </option>
          <option value="name3">Smith, Sarah </option>
          <option value="name4">Smith, Sam </option>
        </select>
        <button className="col">New Player</button>
      </div>
      <ul className="playerlist">
        {scores.map(function (player) {
          return (
            <li key={player.id}>
              <h2>{player.firstName + ' ' + player.lastName}</h2>
              <p>{player.date}</p>
              <p>{player.averageScore}</p>
            </li>
          )
        })}
      </ul>
      {/* <ul className="playerlist">
          <li>
            <p>John Doe</p>
            <p>Date</p>
            <p>Average:43</p>
            <p>Card: 48</p>
            <p>Handicap: 10</p>
          </li>
        </ul>
        <ul className="playerlist">
          <li>
            <p>John Doe</p>
            <p>Date</p>
            <p>Average:43</p>
            <p>Card: 48</p>
            <p>Handicap: 10</p>
          </li>
        </ul> */}
    </>
  )
}
