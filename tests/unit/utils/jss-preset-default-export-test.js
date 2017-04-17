import jssPreset from 'jss-preset-default';
import { module, test } from 'qunit';

module('Unit | Utility | jss preset default export');

test('should export jss-preset-default', (assert) => {
  assert.ok(jssPreset);
});
