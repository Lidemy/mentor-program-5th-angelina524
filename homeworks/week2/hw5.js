function join(arr, concatStr){
  if(arr.length === 1){
      return arr + concatStr
  }
  var temp = arr[0]
  for(var i = 1; i < arr.length; i++){
      temp += concatStr + arr[i]
  }
  return temp
}
function repeat(str, times){
  var sum = ''
  for(var i = 1; i <= times; i++){
      sum += str
  }
  return sum
}
join(['a'], '!');
repeat('a', 5);