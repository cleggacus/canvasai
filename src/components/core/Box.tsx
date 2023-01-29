import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { boolean } from "zod";
import styles from "../../styles/components/core/box.module.scss"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  shadow?: boolean,
  border?: boolean,
}

const Box: FC<Props> = ({ className = "", shadow = true, border = true, ...other }) => {
  return <div 
    className={`${styles.box} ${shadow ? styles.shadow : ""} ${border ? styles.border : ""} ${className}`} 
    {...other} 
  />

}

export default Box