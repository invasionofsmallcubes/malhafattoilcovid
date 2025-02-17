import { useCallback, useRef, useState } from 'react'

import styles from './search.module.css'

export default function Search(props) {

  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `/api/search?q=${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results)
        }).catch(e => alert(e))
    } else {
      setResults([])
      props.setPlayer({})
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])


  const onClickList = useCallback(player => (
    event
  ) => {
    props.setPlayer(player)
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
      {  active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((player) => (
            <li onClick={onClickList(player)} className={styles.result} key={player.name}>
                <a>{player.name} [{player.team}]</a>
            </li>
          ))}
        </ul>
      ) }
    </div>
  )
}