import useInputs from "@/src/utils/client/useInputs";
import styles from "../../styles/components/entry.module.scss";
import { FC, useState } from "react";
import Input from "../core/Input";
import { trpc } from "@/src/utils/trpc";
import { signUpSchema } from "@/src/utils/validation/auth";
import ErrorInput from "../core/ErrorInput";

type SignUpInput = "email" | "password" | "repassword";

type Props = {
  color1: string,
  color2: string,
}

const SignUp: FC<Props> = ({ color1, color2 }) => {
  const [success, setSuccess] = useState(false);

  const [emailErr, setEmailErr] = useState<string[]>([]);
  const [passwordErr, setPasswordErr] = useState<string[]>([]);
  const [rePasswordErr, setRePasswordErr] = useState<string[]>([]);
  const [generalErr, setGeneralErr] = useState("");

  const [signUpData, setSignUpData] = useInputs<SignUpInput>({
    email: "",
    password: "",
    repassword: "",
  });

  const mutation = trpc.user.signup.useMutation({
    onSuccess() {
      setSuccess(true);
    },
    onError(error) {
      setGeneralErr(error.message);
    }
  });

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
  }

  if (success)
    return <></>

  return <div 
    style={{ backgroundColor: color2}}
    className={styles.signupContainer}
  >
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

    <Input 
      type="button" 
      onClick={register} 
      value="Create"
      style={{ backgroundColor: color1 }}
    ></Input>
  </div>
}

export default SignUp;

