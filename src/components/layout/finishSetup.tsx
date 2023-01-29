import { FC, useState } from "react";
import Input from "../core/Input";
import styles from "../../styles/layout.module.scss"
import randomColor from "@/src/utils/client/randomColor";
import useInputs from "@/src/utils/client/useInputs";
import { trpc } from "@/src/utils/trpc";
import { useRouter } from "next/router";
import Box from "../core/Box";

const FinishSetup: FC = () => {
  const router = useRouter()
  const [[color1, color2], _] = useState(randomColor(2));

  const [info, setInfo] = useInputs({
    canvasUrl: "",
    canvasToken: ""
  });

  const mutation = trpc.user.updateUserInfo.useMutation({
    async onSuccess() {
      router.reload();
    },
    // onError(error) {
    // }
  })

  const updateInfo = () => {
    mutation.mutate(info);
  }

  return <div className={styles.finishSetup}>
    <Box 
      style={{ backgroundColor: color1 }}
      className={styles.content}
    >
      <h2>To continue you must input the following information.</h2>

      {/* <p>The canvas domain is the website name e.g. https://canvas.swansea.ac.uk/</p> */}

      <Input
        placeholder="Canvas domain" 
        { ...setInfo("canvasUrl") }
      ></Input>

      {/* <p>Create a token by going to "canvas &gt; account &gt; settings &gt; new access token" in canvas and paste it here.</p> */}

      <Input
        placeholder="Canvas token"
        { ...setInfo("canvasToken") }
      ></Input>

      <Input
        type="button"
        value="FINISH SETUP"
        onClick={updateInfo}
        style={{ backgroundColor: color2 }}
      />
    </Box>
  </div>
}

export default FinishSetup;