import { useSession } from "next-auth/react"
import { FC, ReactNode } from "react"
import styles from "../../styles/layout.module.scss"
import Dots from "../patterns/Dots"
import FinishSetup from "./finishSetup"
import Navbar from "./navbar"

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const session = useSession();

  return <div className={styles.container}>
    {/* {
      session.data?.hasCanvasInfo && <Navbar></Navbar>
    } */}


    <div className={styles.content}>
      <Dots>
      { 
        session.status == "loading" ?
          <></> :
          (
            !session.data?.hasCanvasInfo ?
              <FinishSetup/> : children
          )
      }
      </Dots>
    </div>
  </div>
}

export default Layout