// vue.config.js
module.exports = {
    configureWebpack: {
      externals: {
        fsevents: "require('fsevents')"
      }
    }
}  