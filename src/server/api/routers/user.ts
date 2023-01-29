import { signUpSchema } from '@/src/utils/validation/auth';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { z } from 'zod';
import { prisma } from '../../prisma';
import auth from '../middlewares/auth';
import { router, procedure } from '../trpc';

export const userRouter = router({
  signup: procedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const exists = await prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const hashedPassword = await hash(password);

      const result = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: {
          email: result.email
        },
      };
    }),
  updateUserInfo: procedure
    .input(z.object({
      canvasToken: z.string().optional(),
      canvasUrl: z.string().optional(),
    }))
    .use(auth)
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.id || "";

      const updateCount = await prisma.user.updateMany({
        where: {
          id: id
        },
        data: input
      })

      if(updateCount.count == 0) {
        throw new TRPCError({
          code: "BAD_REQUEST"
        })
      }

      return {
        status: 204,
        message: "User info updated successfully"
      }
    })
});