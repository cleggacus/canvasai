import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import styles from "../../styles/components/core/input.module.scss";
type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props) => {
  const {className, onKeyDown, ...other} = props;

  const focusNext = (elem: HTMLInputElement) => {
    const siblings = elem.parentElement?.children;

    if(!siblings)
      return;

    let found = false;

    for(let i = 0; i < siblings.length; i++) {
      const item = siblings.item(i);

      if(!(item instanceof HTMLInputElement))
        continue;

      if(found) {
        item.focus();
        break;
      }

      found = item == elem;
    }
  }

  return <input 
    className={`${styles.input} ${(props.className || "")}`} 
    onKeyDown={e => {
      if(onKeyDown)
        onKeyDown(e);

      if(e.key == "Enter")
        focusNext(e.currentTarget);
    }}
    {...other}
  ></input>
}

export default Input;