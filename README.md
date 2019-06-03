### Introduction

This is a fork of [vuetifyjs/vuetify](https://github.com/vuetifyjs/vuetify), which contains some of the features that is not available in official vuetify yet, such as:
* Grouping table. [code](https://github.com/lzhoucs/vuetify/pull/1), [demo](https://codepen.io/lzhoucs/pen/aadaJx)
* Fixed columns table. [code](https://github.com/lzhoucs/vuetify/pull/4), [demo](https://codepen.io/lzhoucs/pen/dqZvXr)

### Motivation
Our current project has a requirement for this feature, which is the primary reason for working on these features.These added features probably won't be included in official vuetify release due to a full on-going rewrite: https://github.com/vuetifyjs/vuetify/pull/3833, see my original PR: https://github.com/vuetifyjs/vuetify/pull/4966 for details

### Where to get the modified code/package

I am maintaining the following branches:
* [1.5.x.modified](https://github.com/lzhoucs/vuetify/tree/1.5.x.modified)

to keep up to date with 1.5.x versions of vuetify. It is published to npm: [@lzhoucs/vuetify](https://www.npmjs.com/package/@lzhoucs/vuetify)

The following branches are out dated and are no longer maintained:
* [1.2.x.modified](https://github.com/lzhoucs/vuetify/tree/1.2.x.modified)
* [1.0.x.modified](https://github.com/lzhoucs/vuetify/tree/1.0.x.modified)


### How to use this package [@lzhoucs/vuetify](https://www.npmjs.com/package/@lzhoucs/vuetify):
#### Approach 1, use webpack module alias
* Modify `vuetify` package name in `package.json`. One way is to run the following commands:
```
npm uninstall vuetify
npm install @lzhoucs/vuetify --save
```
* Add an alias entry to webpack config so vuetify imports name doesn't have to be touched in the code. If you are using vue cli v3, the syntax looks like the following:
```
  configureWebpack: {
    resolve: {
      alias: {
        vuetify: '@lzhoucs/vuetify'
      }
    }
  }
```
#### Approach 2(recommended), use [package alias](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias)

This is how it looks like in command line
```
yarn add vuetify@npm:@lzhoucs/vuetify
```
This is the package.json added by yarn once the above command is ran:
```
"vuetify": "npm:@lzhoucs/vuetify@^1.5.14-modified.4"
```

### Note
The hope is eventually vuetify can officially support these features so we don't have to use the modified package which takes efforts to keep up to date with the official one. In the meanwhile, use this package at your own risk. Not all features are well tested. You can open an issue if you find something not work.

### License

[MIT licensed](./LICENSE).
