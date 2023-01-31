import Box from "@/src/components/core/Box";
import Input from "@/src/components/core/Input";
import Layout from "@/src/components/layout/layout";
import { appRouter, RouterOutput } from "@/src/server/api/routers/_app";
import { requireAuth } from "@/src/utils/client/requireAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/course.module.scss"


type Props = {
  course?: RouterOutput['canvas']['getCourse']
}

const Course: NextPage<Props> = ({ course }) => {
  const router = useRouter();

  useEffect(() => {
    console.log(course);
  }, [])

  return <Layout>
    <div className={styles.container}>
      <div className={styles.content}>
        <Box className={styles.thumbnail}>
          <img src={course?.imageUrl} />

          <div className={styles.info}>
            <h1>{course?.name}</h1>
          </div>
        </Box>

        {
          course?.modulesConnection?.nodes?.map(node => 
            <Box className={styles.module}>
              <h1>{node?.name}</h1>

              {
                node?.moduleItems?.map(item => {
                  if(
                    item.content?.__typename == "Quiz" || 
                    item.content?.__typename == "ModuleExternalTool"
                  ) { return <></>; }

                  if(item?.content?.__typename == "SubHeader") {
                    return <h2>{item?.content?.title}</h2>
                  } 

                  if(item?.content?.__typename == "File") {
                    const url: string = item.content.url || "";

                    if(item.content.contentType == "application/pdf") {
                      return <Input
                        type="button"
                        value={item?.content?.title || ""}
                        onClick={async () => {
                          router.push(url)
                        }}
                        style={{
                          // backgroundColor: color[item?.content?.__typename || "Page"]
                        }}
                      />
                    }
                  }

                  return <Input
                    type="button"
                    value={item?.content?.title || ""}
                    style={{
                      // backgroundColor: color[item?.content?.__typename || "Page"]
                    }}
                  />
                })
              }
            </Box> 
          )
        }
      </div>
    </div>
  </Layout>
}

export const getServerSideProps = requireAuth(async (ctx, session) => {
  const { course } = ctx.query;

  const caller = appRouter.createCaller({
    session
  });

  const result = await caller.canvas.getCourse({
    id: course as string
  });


  return { 
    props: {
      course: result
    } 
  };
});

export default Course;
