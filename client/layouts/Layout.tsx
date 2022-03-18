import Link from 'next/link'
import Player from '../components/Player'
import styles from '../styles/scss/Layout.module.scss'
const Layout = ({ children }: any) => {
  return (
    <div className={styles.LayoutWrapper}>
      <div className={styles.LayoutContener}>
        <div>
          <div className={styles.LayoutItem}>
            <div className="homepng"></div>
            <Link href="/home">
              <a>Home</a>
            </Link>
          </div>
          <div className={styles.LayoutItem}>
            <div className="searchpng"></div>
            <Link href="/search">
              <a>Search</a>
            </Link>
          </div>
          <div className={styles.LayoutItem}>
            <div className="userpng"></div>
            <Link href="/user">
              <a>Your Library</a>
            </Link>
          </div>
          <div className={styles.LayoutItem}>
            <div className="trackpng"></div>
            <Link href="/create/track">
              <a>Create Track</a>
            </Link>
          </div>
          <div className={styles.LayoutItem}>
            <div className="albumpng"></div>
            <Link href="/create/album">
              <a>Create Album</a>
            </Link>
          </div>
        </div>
        <Player></Player>
      </div>
      <div className={styles.LayoutChildren}>{children}</div>
    </div>
  )
}
export default Layout
