import Search from '../components/search'
import styles from './result.module.css'
import {useState} from 'react'

export default function Result() {
  
  const [player, setPlayer] = useState({})

  return (
    <div className={styles.resultss}>
      <Search setPlayer={setPlayer}/>
      {player.name && player.covid === "si" && (
        <div className={styles.cov}>{player.name} [{player.team}] ha fatto il Covid</div>
      )}
      { player.name && player.covid === "no" && (
        <div className={styles.cov}>{player.name} [{player.team}] NON ha fatto il Covid</div>
      )}
    </div>
  )
}