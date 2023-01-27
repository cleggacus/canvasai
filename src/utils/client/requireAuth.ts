import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session, unstable_getServerSession } from "next-auth";

import { nextAuthOptions } from "../../server/auth";

export const requireAuth =
  (func: (ctx: GetServerSidePropsContext, session: Session) => Promise<GetServerSidePropsResult<any>>) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/entry",
          permanent: false,
        },
      };
    }

    return await func(ctx, session);
  };