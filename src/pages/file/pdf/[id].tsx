import Box from "@/src/components/core/Box";
import Input from "@/src/components/core/Input";
import Layout from "@/src/components/layout/layout";
import PDF from "@/src/components/pdf";
import { appRouter, RouterOutput } from "@/src/server/api/routers/_app";
import { requireAuth } from "@/src/utils/client/requireAuth";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import styles from "../../../styles/course.module.scss"

type Props = {
  file?: RouterOutput['canvas']['getFile']
}

const File: NextPage<Props> = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    console.log(file?.pdf)
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return <Layout>
    <div className={styles.container}>
      <div className={styles.content}>
        <Box className={styles.thumbnail}>
          <div className={styles.info}>
            <h1>{file?.displayName}</h1>
          </div>
        </Box>

        <Box>
          <Document
            file={URL.createObjectURL(new Blob([file?.pdf || ""]))}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Box>
      </div>
    </div>
  </Layout>
}

export const getServerSideProps = requireAuth(async (ctx, session) => {
  const { id } = ctx.query;

  const caller = appRouter.createCaller({
    session
  });

  const result = await caller.canvas.getFile({
    id: id as string
  });

  return { 
    props: {
      file: result
    } 
  };
});

export default File;

