import { NextPage } from "next";
import Layout from "../components/layout/layout";
import { requireAuth } from "../utils/client/requireAuth";
import styles from "../styles/index.module.scss";
import Input from "../components/core/input";
import { signOut } from "next-auth/react";

type Props = {
  email: string
}

const IndexPage: NextPage<Props> = ({ email }) => {
  return <Layout>
    <div className={styles.container}>
      <div className={styles.bar}>
        <h1>Dashboard</h1>

        <Input
          type="button" 
          value="LOGOUT"
          onClick={() => signOut()}
        />
      </div>

      <div className={styles.dashboard}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
    </div>
  </Layout>
}

export const getServerSideProps = requireAuth(async (_ctx, session) => {
  return { 
    props: {
      email: session.user?.email
    } 
  };
});

export default IndexPage;
