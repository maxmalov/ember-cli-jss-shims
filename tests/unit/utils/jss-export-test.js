import { module, test } from 'qunit';
import jss from 'jss';

module('Unit | Utility | jss export');

test('should export jss', (assert) => {
  assert.ok(jss);
});
