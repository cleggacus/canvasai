import { NextPage } from "next";
import Layout from "../components/layout/layout";
import { requireAuth } from "../utils/client/requireAuth";
import styles from "../styles/index.module.scss";
import Input from "../components/core/Input";
import { signOut } from "next-auth/react";
import Box from "../components/core/Box";
import { appRouter } from "../server/api/routers/_app";
import { Course } from "../utils/canvas";

type Props = {
  email: string,
  courses: Course[]
}

const IndexPage: NextPage<Props> = ({ email, courses }) => {
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
        {
          courses.map(course => 
            <Box key={course.id} className={styles.item}>
              <div className={styles.thumb}>
                <img src={course.image_download_url}></img>
              </div>

              <div className={styles.details}>
                <h2>{course.name}</h2>
              </div>
            </Box>
          )
        }
      </div>
    </div>
  </Layout>
}

export const getServerSideProps = requireAuth(async (_ctx, session) => {
  const caller = appRouter.createCaller({
    session
  });

  const result = await caller.canvas.getCourses();

  return { 
    props: {
      email: session.user?.email,
      ...result
    } 
  };
});

export default IndexPage;
