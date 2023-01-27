import { NextPage } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Input from "../components/core/input";
import { requireAuth } from "../utils/client/requireAuth";

type Props = {
  email: string
}

const IndexPage: NextPage<Props> = ({ email }) => {
  return <div>
    <h1>Hey {email}</h1>
    <Input
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      value="LOGOUT"
    />
  </div>
}

export const getServerSideProps = requireAuth(async (_ctx, session) => {
  return { 
    props: {
      email: session.user?.email
    } 
  };
});

export default IndexPage;
