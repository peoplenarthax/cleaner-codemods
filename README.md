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

