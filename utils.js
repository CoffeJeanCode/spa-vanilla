const curry = (fn) => (x) => (y) => fn(x, y);
const compose = (...fns) => (x) => fns.reduceRight((x, fn) => fn(x), x);

const toLower = (string) => string.toLowerCase();
const replace = curry((pattern, string) => string.replace(pattern));

const normalizeString = compose(toLower, replace(" ", ""));
