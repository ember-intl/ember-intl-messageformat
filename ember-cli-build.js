/* eslint-env node */
/* global require, module */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-addon');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const path = require('path');

function treeGenerator (dir) {
  return {
    read: function () { return dir; },
    cleanup: function () { }
  }
};

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  let polyfillTree = new Funnel(treeGenerator(path.join(require.resolve('intl'), '..', 'dist')), {
    files:   ['Intl.complete.js'],
    srcDir:  '/',
    destDir: '/assets/polyfill/'
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return mergeTrees([polyfillTree, app.toTree()]);
};
