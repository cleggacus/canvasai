import { FC, ReactNode } from "react"
import styles from "../../styles/layout.module.scss"
import Navbar from "./navbar"

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return <div className={styles.container}>
    <Navbar></Navbar>

    <div className={styles.content}>
      { children }
    </div>
  </div>
}

export default Layout