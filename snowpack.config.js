// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */

const testPlugins = []
if (process.env.NODE_ENV === 'test') {
  testPlugins.push('@snowpack/plugin-babel')
}

module.exports = {
  mount: {
    javascript: '/'
  },
  plugins: testPlugins.concat(
    '@snowpack/plugin-sass',
    './snowpack-markdown-plugin.js'
  ),
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    htmlFragments: true,
    sourcemap: true
  }
}
