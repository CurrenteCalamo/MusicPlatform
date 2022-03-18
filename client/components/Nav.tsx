import { NextComponentType } from 'next'
import Link from 'next/link'

import styles from '../styles/scss/components/Nav.module.scss'

const Nav: NextComponentType = () => {
  return (
    <div className={styles.NavWrapper}>
      <Link href="/loginwithfacebook">
        <a>
          <div className={styles.LoginNavButton}>Continue with facebook</div>
        </a>
      </Link>
      <Link href="/loginwihtgoogle">
        <a>
          <div className={styles.LoginNavButton}>Continue with google</div>
        </a>
      </Link>
      <Link href="/loginwithapple">
        <a>
          <div className={styles.LoginNavButton}>Continue with apple</div>
        </a>
      </Link>
    </div>
  )
}
export default Nav
