import type { NextPage } from 'next'
import Error from '../components/Error'
import Head from 'next/head'
const Errors: NextPage = () => {
  return (
    <>
      <Head>
        <title>This page could not befound</title>
      </Head>

      <Error></Error>
    </>
  )
}

export default Errors
