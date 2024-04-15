/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^@tanstack/(.*)$",
    "",
    "^@/app/(.*)$",
    "^@/hooks/(.*)$",
    "^@/apis/(.*)$",
    "^@/lib/(.*)$",
    "^@/stores/(.*)$",
    "^@/mocks/(.*)$",
    "^@/components/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/types/(.*)$",
    "^types$",
    "",
    "^@/styles/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}