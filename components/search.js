import { useCallback, useRef, useState } from 'react'

import Link from 'next/link'
import styles from './search.module.css'

export default function Search() {

  const searchRef = useRef(null)
  const [player, setPlayer] = useState({})
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `/api/search?q=${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    console.log("onChange")
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results)
        })
    } else {
      setResults([])
      setPlayer({})
    }
  }, [])

  const onFocus = useCallback(() => {
    console.log("onFocus")
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    console.log("onClick")
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])


  const onClickList = useCallback(player => (
    event
  ) => {
    console.log("onClickList")
    setPlayer(player)
    setActive(false)  
  },
  []);

  return (
      <div
      className={styles.container}
      ref={searchRef}
    >
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder='Cerca il cognome'
        type='text'
        value={query}
      />
      { active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((player) => (
            <li onClick={onClickList(player)} className={styles.result} key={player.name}>
                <a>{player.name} [{player.team}]</a>
            </li>
          ))}
        </ul>
      ) }
    {player.name && player.covid === "si" && (
        <div className={styles.cov}>{player.name} [{player.team}] ha fatto il Covid</div>
      )}
    { player.name && player.covid === "no" && (
        <div className={styles.cov}>{player.name} [{player.team}] NON ha fatto il Covid</div>
      )}
    </div>
  )
}