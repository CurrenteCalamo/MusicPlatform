import { NextComponentType } from 'next'

import styles from '../styles/scss/components/Footer.module.scss'

const Footer: NextComponentType = () => {
  return (
    <div className={styles.FooterWrapper}>
      © 2022 all rights reserved
      <div className={styles.FooterImageWrapper}>
        <a href="https://currentecalamo.herokuapp.com/requisites">
          <div className={styles.FooterImageFirst}></div>
        </a>
      </div>
    </div>
  )
}
export default Footer
