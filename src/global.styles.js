import { injectGlobal } from 'styled-components'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }

  a {
    text-decoration: none;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
    font-size: 18px;
  }
`
