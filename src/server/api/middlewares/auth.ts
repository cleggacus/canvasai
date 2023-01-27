import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

const auth = middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: ctx.session,
    }
  });
})

export default auth;
