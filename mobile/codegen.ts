import { CodegenConfig } from "@graphql-codegen/cli";
import config from "./clients/config";

const codegenConfig: CodegenConfig = {
  schema: config.DEV_GEN_GRAPHQL,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["**/*.{ts,tsx}"],
  generates: {
    "./gql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default codegenConfig;
