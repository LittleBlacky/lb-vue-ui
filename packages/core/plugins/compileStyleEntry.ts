export function rollupPluginCompileStyleEntry() {
  const themeEntryPrefix = "@lb-vue-ui/theme-chalk/";
  return {
    name: "rollup-plugin-compile-style-entry",
    async resolveId(id) {
      if (id.startsWith(themeEntryPrefix) && id.endsWith(".scss")) {
        return {
          id: id.replace(".scss", ".css"),
          external: true,
        };
      }
      return null;
    },
    transform(code, id) {
      if (code.includes(themeEntryPrefix) && code.includes(".scss")) {
        const newCode = code.replace(
          new RegExp(`"${themeEntryPrefix}(.*?)\\.scss"`, "g"),
          `"${themeEntryPrefix}$1.css"`
        );
        return {
          code: newCode,
          map: null,
        };
      }
      return null;
    },
  };
}
