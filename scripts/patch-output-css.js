const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'dist', 'output.css');
let css = fs.readFileSync(outputPath, 'utf8');

css = css.replace(
  /button,\ninput:where\(\[type='button'\]\),\ninput:where\(\[type='reset'\]\),\ninput:where\(\[type='submit'\]\) \{\n  -webkit-appearance: button;\n/,
  "button,\ninput:where([type='button']),\ninput:where([type='reset']),\ninput:where([type='submit']) {\n  -webkit-appearance: button;\n  appearance: button;\n"
);

css = css.replace(
  /\[type='search'\] \{\n  -webkit-appearance: textfield;\n/,
  "[type='search'] {\n  -webkit-appearance: textfield;\n  appearance: textfield;\n"
);

css = css.replace(
  /::-webkit-search-decoration \{\n  -webkit-appearance: none;\n\}/,
  "::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n}"
);

css = css.replace(
  /::-webkit-file-upload-button \{\n  -webkit-appearance: button;\n/,
  "::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  appearance: button;\n"
);

css = css.replace(
  /(img,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject \{\n  display: block;\n  \/\* 1 \*\/\n)  vertical-align: middle;\n  \/\* 2 \*\/\n\}/,
  '$1}'
);

fs.writeFileSync(outputPath, css);
