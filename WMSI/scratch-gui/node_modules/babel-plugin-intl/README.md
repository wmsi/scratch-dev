# babel-plugin-intl

Extracts string messages for translation from modules that use `intl`.

_**Note:** This Babel plugin is based on [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl) and **works with Babel 6**._


## Installation

```sh
$ npm install babel-plugin-intl
```


## Usage

**This Babel plugin only visits ES6 modules which `import` `intl`.**

The default message descriptors for the app's default language will be extracted from `intl()`, which is a default export of the `intl` package.


### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    [
      "intl", {
        "messagesDir": "./build/messages/",
        "enforceDescriptions": false
      }
    ]
  ]
}
```


#### Options

- **`messagesDir`**: The target location where the plugin will output a `.json` file corresponding to each call from which `intl` messages were extracted. If not provided, the extracted message descriptors will only be accessible via Babel's API.

- **`enforceDescriptions`**: Whether or not message declarations _must_ contain a `description` to provide context to translators. Defaults to: `false`.

- **`moduleSourceName`**: The ES6 module source name of the `intl` package. Defaults to: `"./intl"`, but can be changed to another name/path.


### Via CLI

```sh
$ babel --plugins intl script.js
```


### Via Node API

The extract message descriptors are available via the `metadata` property on the object returned from Babel's `transform()` API:

```javascript
require('babel-core').transform('code', {
  plugins: ['intl']
}) // => { code, map, ast, metadata['intl'].messages };
```
