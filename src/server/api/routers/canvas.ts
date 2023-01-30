import { getCourse, getCourses } from '@/src/utils/canvas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma';
import auth from '../middlewares/auth';
import { router, procedure } from '../trpc';

export const canvasRouter = router({
  getCourses: procedure
    .use(auth)
    .query(async ({ ctx }) => {
      const id = ctx.session?.id || "";

      const user = await prisma.user.findFirst({
        where: { id }
      })

      const url = user?.canvasUrl;
      const token = user?.canvasToken;

      if(!url || !token) {
        throw new TRPCError({
          code: "UNAUTHORIZED"
        })
      }

      const courses = await getCourses(url, token);

      return {
        courses
      };
    }),
  getCourse: procedure
    .use(auth)
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ ctx, input }) => {
      const id = ctx.session?.id || "";

      const user = await prisma.user.findFirst({
        where: { id }
      })

      const url = user?.canvasUrl;
      const token = user?.canvasToken;

      if(!url || !token) {
        throw new TRPCError({
          code: "UNAUTHORIZED"
        })
      }

      const course = await getCourse(url, token, input.id);

      return {
        ...course
      };
    })
})
