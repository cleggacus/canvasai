import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Session, unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth';

interface CreateContextOptions {
  session: Session | null
}

export async function createContextInner(opts: CreateContextOptions) {
  return {
    session: opts.session
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  const { req, res } = opts;
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  return await createContextInner({
    session
  });
}