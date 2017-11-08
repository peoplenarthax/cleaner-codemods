## Cleaner-Codemods

Simple codemodods to beautify your code

### Setup & Run

```sh
npm install -g jscodeshift
git clone https://github.com/peoplenarthax/cleaner-codemods.git
jscodeshift -t <codemod-script> <file>
```

### Included Scripts

#### `destructure-proptypes`

```sh
jscodeshift -t cleaner-codemods/transforms/destructure-proptypes.js <file>
```
It transforms propTypes objects assigments from:
```sh 
import PropTypes from 'prop-types';

class SomeClass {
...
}
SomeClass.propTypes = {
variable: PropType.object,
another: PropType.any,
}
```
to:
```sh 
import {any, object} from 'prop-types';

class SomeClass {
...
}
SomeClass.propTypes = {
variable: object,
another: any,
}
```

It only supports imports from prop-types by the moment.

Work in progress
