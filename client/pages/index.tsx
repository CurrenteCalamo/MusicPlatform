import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/scss/Index.module.scss'
import Link from 'next/link'
import Footer from '../components/Footer'
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eternety</title>
      </Head>
      <div className={styles.HomeWrapper}>
        <div className={styles.HomeContener}>
          Eternety is a digital music, podcast, and video service that gives you
          access to millions of songs and other content from creators all over
          the world
          <Link href="/auth/login">
            <a> Login</a>
          </Link>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default Home
