import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/scss/Terms.module.scss'
import Footer from '../../components/Footer'

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms</title>
      </Head>
      <div className={styles.TermsWrapper}>
        <div className={styles.TermsContener}>
          <h1>it is test website </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default Terms
