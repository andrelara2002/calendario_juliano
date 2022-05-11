import React from 'react'
import './App.css'

export default function App() {

  const [state, setState] = React.useState({
    selected_date: new Date(),
    converted_date: '',
    day_count: '',
    initial_digit: 2
  })

  const handleDate = date => {
    const _date = new Date(date)
    const day = parseInt(_date.getDay())
    const month = parseInt(_date.getMonth())
    const year = parseInt(_date.getFullYear())

    const converted_date = day - 32075 + 1461 * (year + 4800 + (month - 14) / 12) / 4 + 367 * (month - 2 - (month - 14) / 12 * 12) / 12 - 3 * ((year + 4900 + (month - 14) / 12) / 100) / 4
    const day_count = `${state.initial_digit}${getDayOfYear(_date)}`

    setState({
      ...state, converted_date, day_count
    })
  }

  function getDayOfYear(date = new Date()) {
    const timestamp1 = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

    const differenceInMilliseconds = timestamp1 - timestamp2;

    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

    return differenceInDays;
  }

  return <div className='app'>
    <div className='card'>
      <h1>{state.selected_date.toDateString()}</h1>
      <h2>{"Data juliano: " + state.converted_date}</h2>
      <h2>{"Dia juliano: " + state.day_count}</h2>
    </div>
    <input type={'date'} onChange={e => { handleDate(e.target.value) }}></input>
  </div>
}