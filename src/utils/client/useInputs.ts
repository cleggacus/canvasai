import { ChangeEvent, ChangeEventHandler, useState } from "react";

type InputsType<T extends string> = {
  [key in T]: string;
};

type InitialInputsState<T extends string> = InputsType<T> | (() => InputsType<T>);

type InputProps<T extends string> = (key: T) => {
  onChange: ChangeEventHandler<HTMLInputElement>
}

type InputsHook<T extends string> = [InputsType<T>, InputProps<T>];

const useInputs = <T extends string>(initialState: InitialInputsState<T>): InputsHook<T> => {
  const [state, setState] = useState(initialState);

  return [
    state,
    (key: T) => ({
      onChange: (elem: ChangeEvent<HTMLInputElement>) => {
        state[key] = elem.target.value;
        setState(state);
      }
    })
  ]
}

export default useInputs;

  // const signInSetter = (key: SignInInput) => {
  //   }
  // }