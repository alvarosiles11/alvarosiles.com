/** @format */

module.exports = {
  // Especifique la longitud de la línea en la que se ajustará la impresora.
  // printWidth: 80,

  /*Especifique el número de espacios por nivel de sangría.*/
  tabWidth: 2,

  /*Sangre las líneas con tabulaciones en lugar de espacios.*/
  useTabs: false,

  /*Imprima punto y coma al final de las declaraciones.*/
  semi: true,

  /*Utilice comillas simples en lugar de comillas dobles.*/
  // singleQuote: true,

  /*Use comillas simples en lugar de comillas dobles en JSX.*/
  // jsxSingleQuote: true,

  /*Sin comas finales*/
  trailingComma: "none",

  /*Quitar espacios entre corchetes en literales de objetos. {foo: bar} */
  bracketSpacing: false,

  // Quitar espacios de elementos(HTML, JSX, Vue, Angular) dentro de <button>
  bracketSameLine: true,

  // Quitar espacios de elementos(HTML, JSX, Vue, Angular) dentro de <button>
  jsxBracketSameLine: true,

  // Incluya paréntesis alrededor de un único parámetro de función de flecha (x) => x
  arrowParens: "always",

  // Formatee solo un segmento de un archivo.
  rangeStart: 0,
  rangeEnd: Infinity,

  // /** @format */
  insertPragma: false,

  // Se formateará un archivo con lo siguiente como su primer comentario cuando se proporcione --require - pragma
  // requirePragma : false,

  // Sensibilidad de espacios en blanco HTML
  htmlWhitespaceSensitivity: "css",
  // htmlWhitespaceSensitivity: 'strict',

  // Fin de la línea
  // endOfLine: 'auto',
  // importOrder: ['ARRAY OF IMPORT NAMES'],
  // importOrderSeparation: true,
  // importOrderSortSpecifiers: true,

  // importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  // importOrderSeparation: true,
  // importOrderSortSpecifiers: true,
  // documentacion https://prettier.io/docs/en/options.html

  embeddedLanguageFormatting: "auto",
  proseWrap: "preserve"
};
