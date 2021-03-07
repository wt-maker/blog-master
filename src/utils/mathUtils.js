export const toDecimal = (number) => {
  var f = parseFloat(number);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(number * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}