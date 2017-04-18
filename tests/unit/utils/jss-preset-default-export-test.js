import { module, test } from 'qunit';
import jssPreset from 'jss-preset-default';

module('Unit | Utility | jss preset default export');

test('should export jss-preset-default', assert => {
  assert.ok(jssPreset);
});
