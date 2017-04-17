/* eslint-env node */
'use strict';
const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');

function getRoot(pkgName) {
  return findRoot(require.resolve(pkgName));
}

module.exports = {
  name: 'ember-cli-jss-shims',

  included(app) {
    this._super.included.apply(this, arguments);
    this.jssConfig = this.getConfig();
    this.app = app;

    this.importDeps();
    this.importShims();

    return app;
  },

  getConfig() {
    const projectConfig = this.project.config(process.env.EMBER_ENV) || {};
    const config = projectConfig.jss || {};

    const plugins = config.plugins || ['jss-preset-default'];

    const finalPlugins = plugins.filter(pluginName => {
      const pluginFile = path.join(getRoot(pluginName), 'dist', pluginName + '.js');

      if (!fs.existsSync(pluginFile)) {
        console.warn(this.name + ': Cannot find jss plugin: ' + pluginName);
        return false;
      }

      return true;
    });

    return {
      plugins: finalPlugins
    };
  },

  importDeps() {
    const vendor = this.treePaths.vendor;
    const plugins = this.jssConfig.plugins;

    this.app.import({
      development: vendor + '/jss/jss.js',
      production: vendor + '/jss/jss.min.js'
    });

    plugins.forEach(pluginName => {
      this.app.import({
        development: vendor + '/jss/' + pluginName + '.js',
        production: vendor + '/jss/' + pluginName + '.min.js'
      });
    });
  },

  importShims() {
    this.app.import('vendor/ember-cli-jss-shim/jss.js');

    const plugins = this.jssConfig.plugins;

    if (!plugins.length) {
      return;
    }

    // FIXME: add more shims for other plugins
    plugins.forEach(plugin => this.app.import('vendor/ember-cli-jss-shim/' + plugin + '.js'));
  },

  treeForVendor() {
    const jssTree = funnel(getRoot('jss'), {
      srcDir: 'dist',
      destDir: 'jss',
      include: [/\.js$/]
    });

    const plugins = this.jssConfig.plugins;

    if (!plugins.length) {
      return jssTree;
    }

    const pluginTrees = plugins.map(pluginName => {
      return funnel(getRoot(pluginName), {
        srcDir: 'dist',
        destDir: 'jss',
        include: [/\.js$/]
      });
    });

    return mergeTrees(
      [jssTree].concat(pluginTrees)
    );
  }

};
