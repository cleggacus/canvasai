import useInputs from "@/src/utils/client/useInputs";
import styles from "../../styles/signin.module.scss";
import { FC, useEffect, useState } from "react";
import Input from "../core/input";
import { useRouter } from "next/router";
import { trpc } from "@/src/utils/trpc";
import { signUpSchema } from "@/src/utils/validation/auth";
import { z } from "zod";
import ErrorInput from "../core/errorInput";

type SignUpInput = "email" | "password" | "repassword";

const SignUp: FC = () => {
  const router = useRouter();

  const [emailErr, setEmailErr] = useState<string[]>([]);
  const [passwordErr, setPasswordErr] = useState<string[]>([]);
  const [rePasswordErr, setRePasswordErr] = useState<string[]>([]);
  const [generalErr, setGeneralErr] = useState("");

  const [signUpData, setSignUpData] = useInputs<SignUpInput>({
    email: "",
    password: "",
    repassword: "",
  });

  const mutation = trpc.user.signup.useMutation();

  const checkPasswordMatch = () => {
    if(signUpData.password == signUpData.repassword) {
      setRePasswordErr([])
      return true;
    }

    setRePasswordErr(["Password do not match"])
    return false;
  }

  const checkZodErrors = () => {
    const parsed = signUpSchema.safeParse(signUpData);

    if(parsed.success)
      return false;

    let errors = parsed.error.errors
      .flatMap(err => 
        err.path.map(path => ({
          path,
          message: err.message
        }))
      );

    setPasswordErr(
      errors
        .filter(err => err.path == "password")
        .map(err => err.message)
    );

    setEmailErr(
      errors
        .filter(err => err.path == "email")
        .map(err => err.message)
    );

    return true;
  }

  const register = async () => {
    const passwordsMatch = checkPasswordMatch();
    const zodErrors = checkZodErrors();

    if(!passwordsMatch || zodErrors)
      return;

    mutation.mutate(signUpData);

    if(mutation.error) {
      setGeneralErr(mutation.error.message);
      return;
    }

    router.push("/");
  }

  return <div className={styles.signupContainer}>
    <h1 className={styles.title}>NEW ACCOUNT</h1>
    <ErrorInput 
      error={emailErr} 
      placeholder="Email"
      {...setSignUpData("email")} 
    />

    <ErrorInput 
      error={passwordErr} 
      type="password" 
      placeholder="Password"
      {...setSignUpData("password")} 
    />

    <ErrorInput 
      error={rePasswordErr} 
      type="password" 
      placeholder="Retype Password"
      {...setSignUpData("repassword")} 
    />

    { generalErr && <p className={styles.error}>{generalErr}</p> }

    <Input type="button" onClick={register} value="Create"></Input>
  </div>
}

export default SignUp;

