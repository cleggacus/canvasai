import Layout from "@/src/components/layout/layout";
import { requireAuth } from "@/src/utils/client/requireAuth";
import { appRouter } from "@/src/server/api/routers/_app";
import { NextPage } from "next";

const Page: NextPage = () => {
  return <Layout>
    
  </Layout>
}

export const getServerSideProps = requireAuth(async (ctx, session) => {
  const { course } = ctx.query;

  const caller = appRouter.createCaller({
    session
  });

  // const result = await caller.canvas.get({
  //   id: course as string
  // });

  return { 
    props: {
      course: result
    } 
  };
});

export default Course;

