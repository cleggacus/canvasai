import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
})

const config: CodegenConfig = {
  generates: {
    'src/graphql/sdk.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      documents: 'src/graphql/**/*.graphql',
      schema: [
        {
          'https://canvas.swansea.ac.uk/api/graphql': {
            headers: {
              Authorization: `Bearer ${process.env.CANVAS_TOKEN}`
            }
          }
        }
      ],
      config: {
        rawRequest: true
      },
    },
  },
};
export default config;