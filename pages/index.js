import Head from 'next/head'
import Result from '../components/result'
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
          Il tool che mancava ai <strong>fanta-allenatori</strong> per un'asta <strong>senza sorprese</strong> <img width="20" height="20" src="https://bit.ly/2H74fJD"/>!
        </p>
        <Result />
      </main>
      <footer className={styles.footer}>
        State a casa se avete sintomi! E mettete la mascherina!
      </footer>
    </div>
  )
}
