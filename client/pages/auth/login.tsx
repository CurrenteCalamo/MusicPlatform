import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/scss/Auth.module.scss'
import Link from 'next/link'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import { useInput } from '../../hooks/useInput'
import axios from 'axios'
import Nav from '../../components/Nav'

const Login: NextPage = () => {
  const email = useInput('')
  const username = useInput('')
  const password = useInput('')
  const router = useRouter()

  async function send() {
    const formData = new FormData()
    formData.append('username', username.value)
    formData.append('password', password.value)
    console.log(email.value)
    axios
      .post('http://localhost:5000/login', {
        username: username.value,
        password: password.value,
      })
      .then((res: any) => {
        localStorage.setItem('access_token', res.data.access_token)

        router.push('/user')
      })
      .catch((e: any) => alert('Something wrong!'))
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.AuthWrapper}>
        <div className={styles.AuthContener}>
          <div className={styles.AuthNav}>
            <div className={styles.AuthH1}>To continue, log in to Eternety</div>
            <Nav></Nav>
            <div className={styles.AuthOr}></div>
            <div className={styles.AuthForm}>
              <div>
                <div>Email address or username</div>
                <div className={styles.inputWrapper}>
                  <input
                    {...username}
                    className={styles.input}
                    placeholder="Enter a profile name"
                    type="name"
                    maxLength={30}
                    minLength={5}
                    pattern="[a-Z]{1,15}"
                  />
                </div>
              </div>
              <div>
                <div>Password</div>
                <div className={styles.inputWrapper}>
                  <input
                    maxLength={30}
                    {...password}
                    minLength={5}
                    className={styles.input}
                    placeholder="password"
                    type="password"
                    pattern="[a-Z]{1,15}"
                  />
                </div>
              </div>

              <div>
                <div className={styles.ButtonWrapper}>
                  <button
                    className={styles.FloatingButton}
                    type="button"
                    onClick={send}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.NavLink}>
              <div>
                ☻Create
                <Link href="/auth/signup">
                  <a> acount </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default Login
