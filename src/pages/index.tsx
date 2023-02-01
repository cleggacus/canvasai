import { NextPage } from "next";
import Layout from "../components/layout/layout";
import { requireAuth } from "../utils/client/requireAuth";
import styles from "../styles/index.module.scss";
import Input from "../components/core/Input";
import { signOut } from "next-auth/react";
import Box from "../components/core/Box";
import { appRouter } from "../server/api/routers/_app";
import Link from "next/link";
import { Course } from "../utils/canvas/courses";
import { useEffect } from "react";

type Props = {
  courses: Course[]
}

const IndexPage: NextPage<Props> = ({ courses }) => {
  useEffect(() => {
    console.log(courses.map(course => ({
      name: course.name,
      fav: course.is_favorite
    })));
  }, [])

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
          courses
            .filter(course => course.is_favorite)
            .map(course => 
              <Box 
                key={course.id} 
                className={styles.item}
              >
                <Link href={`/course/${course.id}`}>
                  <div className={styles.thumb}>
                    <img src={course.image_download_url}></img>
                  </div>

                  <div className={styles.details}>
                    <h2>{course.name}</h2>
                  </div>
                </Link>
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

  let result;

  try {
    result = await caller.canvas.getCourses();
  } catch {
    result = {
      courses: []
    }
  }
  

  return { 
    props: {
      ...result
    } 
  };
});

export default IndexPage;
