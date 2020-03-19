exports.pipe = (functions) => {
  return param => {
    return functions.reduce((preValue, currentFuntion) => {
      return currentFuntion(preValue);
    }, param)
  }
}