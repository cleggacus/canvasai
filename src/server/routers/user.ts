import { signUpSchema } from '@/src/utils/validation/auth';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { prisma } from '../prisma';
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
          message: "User already exists.",
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
    })
});