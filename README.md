# This is a work in progress that is not ready to be used yet

# Catalyst Elements Utils

[![Travis](https://img.shields.io/travis/catalyst/CatalystElementsUtils/master.svg?style=flat-square)](https://travis-ci.org/catalyst/CatalystElementsUtils)
[![David](https://img.shields.io/david/catalyst/CatalystElementsUtils.svg?style=flat-square)](https://david-dm.org/catalyst/CatalystElementsUtils)
[![David](https://img.shields.io/david/dev/catalyst/CatalystElementsUtils.svg?style=flat-square)](https://david-dm.org/catalyst/CatalystElementsUtils?type=dev)
[![npm (scoped)](https://img.shields.io/npm/v/@catalyst-elements/utils.svg?style=flat-square)](https://www.npmjs.com/package/@catalyst-elements/utils)

This package contains utility functions that maybe helpful for use in custom web components.

## Installation

```sh
# Install with npm:
npm install @catalyst-elements/utils

# Install with yarn:
yarn add @catalyst-elements/utils
```

## Usage

1.  Import the utilities.

```js
// Import all the util functions.
import * as utils from '@catalyst-elements/utils';

// Or import a subset of util functions.
import * as arrayUtils from '@catalyst-elements/utils/lib/array';
```

2.  Use them.

```js
const foo = utils.array.transpose([[0, 1, 2], [3, 4, 5]]);

// Or

const foo = arrayUtils.transpose([[0, 1, 2], [3, 4, 5]]);
```

## Utility Functions

The following utility functions are available:

### Array functions

| Function           | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `transpose(array)` | Returns a new 2D array that is a transposed version of the original. |

## Contributions

Contributions are most welcome.

Please read our [contribution guidelines](./CONTRIBUTING.md).
