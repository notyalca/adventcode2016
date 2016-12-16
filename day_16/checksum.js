
function dCurveStep(a) {
  //a is a binary string like '1100'
  let input = parseInt(a, 2);
  let b = JSON.parse(JSON.stringify(a));
  b = b.split('').reverse().join('');
  let flipped = [];
  for (let i = 0; i < b.length; i++) {
    if (b.charAt(i) === '0'){
      flipped.push('1');
    }else{
      flipped.push('0');
    }
  }
  b = flipped.join('');
  return (a + '0' + b);
}

function checksum(data) {
  if (data.length % 2 === 1){
    return data;
  }
  let temp_checksum = [];
  let i = 0;
  while (i < data.length) {
    if (data.charAt(i) === data.charAt(i+1)){
      temp_checksum.push('1');
    } else {
      temp_checksum.push('0');
    }
    i = i + 2;
  }
  return checksum(temp_checksum.join(''));
}

console.log('test dCurve: 1 becomes ' + dCurveStep('1'));
console.log('test dCurve: 0 becomes ' + dCurveStep('0'));
console.log('test dCurve: 11111 becomes ' + dCurveStep('11111'));
console.log('test dCurve: 111100001010 becomes ' + dCurveStep('111100001010'));
console.log('test checksum: 110010110100 becomes ' + checksum('110010110100'));

function fillDisk (input, disk_size) {
  if (input.length >= disk_size) {
    return input.substr(0, input.length - (input.length - disk_size));
  }
  //return dCurveStep(input);
  return fillDisk(dCurveStep(input), disk_size);
  
}

console.log('fillDisk test: ' + fillDisk('10000', 20));
console.log('complete test: ' + checksum(fillDisk('10000', 20)));

console.log('Solution: ' + checksum(fillDisk('11011110011011101', 272)));
console.log('Solution: ' + checksum(fillDisk('11011110011011101', 35651584)));

