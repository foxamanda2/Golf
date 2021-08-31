import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export function NewPlayer() {
  const [newPlayer, SetNewPlayer] = useState({
    firstName: '',
    lastName: '',
    averageScore: null,
    date: '',
  })
  const history = useHistory()

  // function handleFirstName(event) {
  //   const newFirstNameText = event.target.value

  //   const updatedPlayer = { ...newPlayer, firstName: newFirstNameText }

  //   SetNewPlayer(updatedPlayer)
  // }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedPlayer = { ...newPlayer, [fieldName]: value }

    SetNewPlayer(updatedPlayer)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Player', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPlayer),
    })

    const json = await response.json()

    history.push('/scores')
  }

  return (
    <>
      <input
        type="text"
        placeholder="First Name"
        onChange={handleStringFieldChange}
        alue={newPlayer.firstName}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={handleStringFieldChange}
        value={newPlayer.lastName}
      />
      <input type="text" placeholder="Score" value={newPlayer.averageScore} />
      <label>Date of Event</label>
      <input
        type="date"
        onChange={handleStringFieldChange}
        value={newPlayer.date}
      />
      <button onClick={handleFormSubmit}>Submit</button>
    </>
  )
}
