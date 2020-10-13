import Head from 'next/head'
import Search from '../components/search'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ma il Covid l'ha fatto?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ma il Covid l'ha fatto?
        </h1>

        <p className={styles.description}>
          Il tool che mancava ai <strong>fanta-allenatori</strong> per un'asta <strong>senza sorprese</strong>!
        </p>

        <Search />
      </main>

      <footer className={styles.footer}>
        Lista presa da <a
          href="https://sport.sky.it/calcio/serie-a/2020/10/13/giocatori-serie-a-positivi-covid#08"
          target="_blank"
          rel="noopener noreferrer"
        ><b>questo articolo</b></a>
      </footer>
    </div>
  )
}
