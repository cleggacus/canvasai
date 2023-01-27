import { NextPage } from "next"
import SignIn from "../components/entry/signin";
import SignUp from "../components/entry/signup";
import styles from "../styles/signin.module.scss"
const Entry: NextPage = () => {
  const colors = [
    "var(--color-orange)",
    "var(--color-green)",
    "var(--color-purple)",
    "var(--color-yellow)",
    "var(--color-red)",
  ]

  const randomColor = () => {
    const i = Math.floor(Math.random() * colors.length);
    return colors.splice(i, 1)[0];
  }

  const color1 = randomColor();
  const color2 = randomColor();

  return <div className={styles.container}>
    <div className={styles.innerContainer}>
      <SignIn color1={color2} color2={color1} />
      <SignUp color1={color1} color2={color2} />
    </div>
  </div>
}

export default Entry;
