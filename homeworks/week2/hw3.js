//解法一：用陣列
function reverse(str){
    var arr = Array.from(str)
    var result = ""
    for(var i = str.length - 1; i >= 0; i--){
        result += arr[i]
    }
    console.log(result)
}
reverse('hello');

//解法二：用字串
function reverse(str){
    var newStr = ""
    for(var i = str.length - 1; i >= 0; i--){
        newStr += str[i]
    }
    console.log(newStr)
}
reverse('hello');