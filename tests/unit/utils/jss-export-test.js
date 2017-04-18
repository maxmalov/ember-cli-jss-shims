import { module, test } from 'qunit';
import jss, { RulesContainer, SheetsRegistry, create, sheets, getDynamicStyles } from 'jss';

module('Unit | Utility | jss export');

test('should export default jss', (assert) => {
  assert.ok(jss);
});

test('should export named components', assert => {
  assert.ok(RulesContainer, 'should export RulesContainer');
  assert.ok(SheetsRegistry, 'should export SheetsRegistry');
  assert.ok(create, 'should export create');
  assert.ok(sheets, 'should export sheets');
  assert.ok(getDynamicStyles, 'should export getDynamicStyles');
});
