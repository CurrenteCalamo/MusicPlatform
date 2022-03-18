import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/scss/Auth.module.scss'
import Link from 'next/link'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useInput } from '../../hooks/useInput'
import * as path from 'path'

const Siginup: NextPage = () => {
  const email = useInput('')
  const username = useInput('')
  const password = useInput('')
  const router = useRouter()

  async function send() {
    const formData = new FormData()

    formData.append('email', email.value)
    formData.append('username', username.value)
    formData.append('password', password.value)
    const ext = path.extname(email.value)
    if (ext == '.com') {
      axios
        .post('http://localhost:5000/user/create', {
          username: username.value,
          email: email.value,
          password: password.value,
        })
        .then((resp) => router.push('/auth/login'))
        .catch((e) => alert('Your email has been used'))
    } else {
      alert('Your email not available')
    }
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className={styles.AuthWrapper}>
        <div className={styles.AuthContener}>
          <div className={styles.AuthNav}>
            <div className={styles.AuthH1}>To continue, sign up</div>
            <Nav></Nav>
            <div className={styles.AuthOr}></div>
            <div className={styles.AuthForm}>
              <div>
                <div>Whats your email</div>
                <div className={styles.inputWrapper}>
                  <input
                    {...email}
                    className={styles.input}
                    placeholder="email"
                    type="email"
                    maxLength={50}
                  />
                </div>
              </div>
              <div>
                <div>What should we call you?</div>
                <div className={styles.inputWrapper}>
                  <input
                    {...username}
                    className={styles.input}
                    placeholder="Enter a profile name"
                    type="name"
                    maxLength={30}
                    minLength={10}
                    pattern="[a-Z]{1,15}"
                  />
                </div>
              </div>
              <div>
                <div>Create a password</div>
                <div className={styles.inputWrapper}>
                  <input
                    maxLength={30}
                    {...password}
                    minLength={10}
                    className={styles.input}
                    placeholder="password"
                    type="password"
                    pattern="[a-Z]{1,15}"
                  />
                </div>
              </div>
              <div>
                <div className={styles.AuthCheckbox}>
                  <input type="checkbox" />
                  Please send me news and offers from Eternety
                </div>
                <div className={styles.AuthCheckbox}>
                  <input type="checkbox" />I agree to the Eternety
                  <Link href="/auth/terms">
                    <a>Terms</a>
                  </Link>
                  and Conditions of Use and Privacy Policy.
                </div>
                <div className={styles.ButtonWrapper}>
                  <button
                    className={styles.FloatingButton}
                    onClick={send}
                    type="button"
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div>
                ☺Have an account?
                <Link href="/auth/login">
                  <a> Login</a>
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

export default Siginup
