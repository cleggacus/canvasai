import { NextPage } from "next"
import SignIn from "../components/entry/signin";
import SignUp from "../components/entry/signup";
import styles from "../styles/signin.module.scss"

const Entry: NextPage = () => {
  return <div className={styles.container}>
    <div className={styles.innerContainer}>
      <SignIn/>
      <SignUp/>
    </div>
  </div>
}

export default Entry;
