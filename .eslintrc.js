module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: 'react-app',
  plugins: ['react-hooks', '@emotion'],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@emotion/pkg-renaming": "error"
  }
}
