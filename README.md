# Web component for Localstorage sync

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

- In page for the component, setup the types...

```js
import '@jsr/cill__lsc'

interface SyncLocalWebComponent extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  data?: MunchData; // Where munch data is the type of data that needs to be stored in local storage
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'data-sync': SyncLocalWebComponent;
    }
  }
}

...

<data-sync data={{ dinners, mealIngredients, selectedMeal, selectedDateIndex, ingredients }}></data-sync>

...
```

- Listen for the data sync event

```js
const [MunchData, setMunchData] = useState({ dinners, mealIngredients, selectedMeal, selectedDateIndex, ingredients }); // Example data

interface OverwriteDataCustomEvent {
  data: MunchData;
}

const handleNewData = (e: Event) => {
  const ce = e as CustomEvent<OverwriteDataCustomEvent>; // Type madness
  setMunchData(ce.detail.data); // Handle the new data and set some state...
}
useEffect(() => {
  document.addEventListener('overwriteData', handleNewData);
  return () => document.removeEventListener('overwriteData', handleNewData);
}, []);
```
