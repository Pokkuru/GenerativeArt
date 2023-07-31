export class DisplaySrcAdjuster {
  SetComma(numberValue) {
    numberValue = String(numberValue);
    if (numberValue.length > 3) {
      for (let idx = numberValue.length - 3; idx > 0; idx -= 3) {
        if (idx === 0) {
          continue;
        } else {
          let tempStr = numberValue;
          let a = tempStr.slice(0, idx);
          let b = ',';
          let c = tempStr.slice(idx);
          numberValue = a + b + c;
        }
      }
    }
    return (numberValue);
  }
}