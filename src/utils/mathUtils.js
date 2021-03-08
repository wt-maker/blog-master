export const toDecimal = (number) => {
  let f = parseFloat(number);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(number * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

export const toPercent = (point) => {
  let str = Number(point * 100).toFixed(2);
  str += "%";
  return str;
}