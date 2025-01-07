// cypress/plugins/index.js
module.exports = (on, config) => {

    // modify env value
    config.env = process.env
  
    // return config
    return config
  }