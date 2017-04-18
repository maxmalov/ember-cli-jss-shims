/* eslint-env node */
'use strict';
const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

function getRoot(pkgName) {
  return findRoot(require.resolve(pkgName));
}

function lookupApp(app) {
  while (typeof app.import !== 'function' && app.app) {
    app = app.app;
  }
  return app;
}

module.exports = {
  name: 'ember-cli-jss-shims',

  init() {
    this._super.init && this._super.init.apply(this, arguments);
    this.jssConfig = this.getConfig();
  },

  getConfig() {
    const projectConfig = this.project.config(process.env.EMBER_ENV) || {};
    const config = projectConfig.jss || {};

    const includePreset = config.includePresetDefault;

    return {
      includePresetDefault: !!includePreset
    };
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app = lookupApp(app);

    const vendor = this.treePaths.vendor;
    const includePreset = this.jssConfig.includePresetDefault;

    app.import({
      development: vendor + '/jss/jss.js',
      production: vendor + '/jss/jss.min.js'
    });
    app.import('vendor/ember-cli-jss-shims/jss.js');

    if (includePreset) {
      app.import({
        development: vendor + '/jss/jss-preset-default.js',
        production: vendor + '/jss/jss-preset-default.min.js'
      });
      app.import('vendor/ember-cli-jss-shims/jss-preset-default.js');
    }

    return app;
  },

  treeForVendor(tree) {
    const jssTree = new Funnel(getRoot('jss'), {
      srcDir: 'dist',
      destDir: 'jss',
      include: [/\.js$/]
    });

    const includePresetDefault = this.jssConfig.includePresetDefault;
    const trees = [tree, jssTree];

    if (includePresetDefault) {
      const presetTree = new Funnel(getRoot('jss-preset-default'), {
        srcDir: 'dist',
        destDir: 'jss',
        include: [/\.js$/]
      });

      trees.push(presetTree);
    }

    return new MergeTrees(trees, {
      annotation: 'ember-cli-jss-shims: treeForVendor'
    });
  }

};
