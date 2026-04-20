import next from "eslint-config-next";
import tseslint from "typescript-eslint";

const config = [
  ...next,
  { ignores: ["drizzle/**", "data/**"] },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default config;
