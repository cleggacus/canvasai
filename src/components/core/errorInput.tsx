import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import styles from "../../styles/components/core/input.module.scss";
import Input from "./input";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  error: string[] | string
}

const ErrInput: FC<Props> = (props) => {
  const {className, ...other} = props;

  const errors = (
    typeof props.error == "string" ? 
      [props.error] : props.error
  ).filter(err => err.replaceAll(" ", "").length > 0);

  const isError = errors.length > 0;

  return <>
    <Input 
      className={`${isError ? styles.error : ""} ${(props.className || "")}`} 
      {...other}
    />

    {
      isError && <p className={styles.errorMessage}>{errors[0]}</p>
    }
  </>
}

export default ErrInput;