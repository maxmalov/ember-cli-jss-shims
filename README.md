# ember-cli-jss-shims

[JSS](https://github.com/cssinjs/jss) is a better abstraction over CSS for Ember.js [Default preset](https://github.com/cssinjs/jss-preset-default) included!

## Installation

```
ember install ember-cli-jss-shims
```

## Usage

After installing ember-cli-jss-shims you can import [JSS](https://github.com/cssinjs/jss) from the `jss` package:

```javascript
import jss from 'jss';
```

of import the internals directly:

```javascript
import { create } from 'jss';
```

Have a look at the [vendor shim test](https://github.com/maxmalov/ember-cli-jss-shims/blob/master/tests/unit/utils/jss-export-test.js#L2) to understand what else can be imported this way.

### Plugins

`ember-cli-jss-shims` is able to load [default preset for JSS](https://github.com/cssinjs/jss-preset-default). To enable this feature you need to specify a `includePresetDefault` flag in application configuration

```javascript
// config/environment.js

jss: {
  includePresetDefault: true
}

```

Then you can import default preset and setup global JSS instance:

```javascript
import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());
```

Or create a new instance:

```javascript
import { create } from 'jss';
import preset from 'jss-preset-default';

const jss = create(preset());
```

## Collaboration

The following outlines the details of collaborating on this Ember addon.

### Installation

* `git clone https://github.com/maxmalov/ember-cli-jss-shims` this repository
* `cd ember-cli-jss-shims`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

`ember-cli-jss-shims` is licensed under the [MIT License](https://github.com/maxmalov/ember-cli-jss-shims/blob/master/LICENSE.md).
