import { NextComponentType } from 'next'
import Link from 'next/link'
import styles from '../styles/scss/components/Error.module.scss'

const cat1 = '/image/cat1.png'
const cat2 = '/image/cat2.png'
const cat3 = '/image/cat3.png'
const cat4 = '/image/cat4.png'
const cat5 = '/image/cat5.png'

const SmileCat: string[] = [cat1, cat2, cat3, cat4, cat5]

function RandomCat(): string {
  const any = Math.floor(Math.random() * 4)
  return SmileCat[any]
}

const Error: NextComponentType = () => {
  const ErrorCat = {
    width: 150,
    height: 150,
    background: `no-repeat center/80% url(${RandomCat()})`,
  }

  return (
    <div className={styles.ErrorWrapper}>
      <Link href="/">
        <a>
          <div title="Funny cat" style={ErrorCat}></div>
        </a>
      </Link>
      <div>This page could not be found.</div>
    </div>
  )
}
export default Error
