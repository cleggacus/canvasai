const getKeys = <K extends string | number | symbol>(obj: {
  [key in K]: any
}) => Object.keys(obj) as K[];

const fromEntries = <K extends string | number | symbol, V>(entries: [K, V][]) =>
  Object.fromEntries(entries) as {
    [key in K]: V
  };

export {
  getKeys, fromEntries
}