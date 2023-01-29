import { GetServerSideProps, NextPage } from "next"
import { useState } from "react";
import Box from "../components/core/Box";
import SignIn from "../components/entry/signin";
import SignUp from "../components/entry/signup";
import Dots from "../components/patterns/Dots";
import styles from "../styles/components/entry.module.scss"
import randomColor from "../utils/client/randomColor";

type Props = {
  color1: string,
  color2: string
}

const Entry: NextPage<Props> = ({ color1, color2 }) => {
  return <div className={styles.container}>
    <Dots className={styles.innerContainer}>
      <Box className={styles.content}>
        <SignIn color1={color2} color2={color1} />
        <SignUp color1={color1} color2={color2} />
      </Box>
    </Dots>
  </div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [color1, color2] = randomColor(2);

  return { 
    props: {
      color1,
      color2
    } 
  };
};

export default Entry;
