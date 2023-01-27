import useInputs from "@/src/utils/client/useInputs";
import styles from "../../styles/signin.module.scss";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import Input from "../core/input";
import { useRouter } from "next/router";

type SignInInput = "email" | "password";

type Props = {
  color1: string,
  color2: string,
}

const SignIn: FC<Props> = ({ color1, color2 }) => {
  const router = useRouter();

  const [error, setError] = useState("");

  const [signInData, setSignInData] = useInputs<SignInInput>({
    email: "",
    password: "",
  });

  const signInSubmit = async () => {
    let response = await signIn("credentials", { 
      ...signInData, 
      callbackUrl: "/",
      redirect: false
    })

    if(response?.error) {
      setError("Either your email or password is incorrect")
    }

    if(response?.ok) {
      router.push("/");
    }
  }

  return <div 
    className={styles.signinContainer}
    style={{ backgroundColor: color2 }}
  >
    <h1 className={styles.title}>SIGN IN</h1>
    <Input {...setSignInData("email")} placeholder="Email"></Input>
    <Input {...setSignInData("password")} type="password" placeholder="Password"/>
    { error && <p className={styles.error}>{error}</p> }
    <Input 
      type="button" 
      onClick={signInSubmit} 
      value="SIGN IN" 
      style={{ backgroundColor: color1 }}
    />
  </div>
}

export default SignIn;

