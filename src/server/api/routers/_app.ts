import { router } from '../trpc';
import { canvasRouter } from './canvas';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  canvas: canvasRouter,
});

export type AppRouter = typeof appRouter;