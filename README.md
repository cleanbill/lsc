# React - Localstorage Sync Component

## Next JS

You may wish to redirect the components sync REST request to a syncing service
(like https://github.com/cleanbill/slink)

- Configure `next.config.js` property like this:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sync",
        destination: "https://mickcarter-slink-64.deno.dev/locals/",
      },
    ];
  },
};

module.exports = nextConfig;
```
