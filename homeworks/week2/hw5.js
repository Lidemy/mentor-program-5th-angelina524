function join(arr, concatStr) {
    var result = ''
    var sum = ''
    var lastArr = arr[arr.length-1]
    if(arr.length-1 == 0){
        return arr+concatStr
    }
    for (var i=0;i<arr.length-1;i++){
        result = arr[i]+concatStr
        sum += result
    }
    return sum+lastArr
}

function repeat(str, times) {
    var sum = ''
    for (var i=1;i<=times;i++){
      sum += str
    }
    return sum
  }

console.log(join(['a'], '!'));
console.log(repeat('a', 5));