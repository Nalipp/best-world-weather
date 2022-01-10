const addCommas = (numString) => {
  // only adds appropriate commas
  // '1' -> '1'
  // '10' -> '10'
  // '100' -> '100'
  // '1000' -> '1000'
  // '10000' -> '10,000'
  // '100000' -> '100,000'
  // '1000000' -> '1,000,000'

  // handles negatives
  // '-1000' -> '-1000'
  // '-10000' -> '-10,000'
  // '-100000' -> '-100,000'

  // handles decimals
  // '10000.12' -> '10,000.12'
  // '-10000.12' -> '-10,000.12'
  // '-100000.12' -> '-100,000.12'
  
  // always returns a string
  // 10000 -> '10,000'

  numString = String(numString);

  let isNegative = false;
  let isDecimal = false;
  let decimalNum;

  if (numString[0] === '-') {
    isNegative = true;
    numString = numString.slice(1);
  }

  if (numString.includes('.')) {
    isDecimal = true;

    const splitNum = numString.split('.');
    numString = splitNum[0];
    decimalNum = splitNum[1];
  }

  if (numString.length > 4) {
    let newNumString = ''; 
    let count = 1;
    for (let i = numString.length - 1; i >= 0; i--) {
      newNumString = numString[i] + newNumString;

      if (count % 3 === 0 && i !== 0) {
        newNumString = ',' + newNumString;
      } 

      count++;
    }

    numString = newNumString;
  } 

  numString = isNegative ? '-' + numString : numString;
  numString = isDecimal ? `${numString}.${decimalNum}` : numString;

  return numString;
}

export default addCommas;
