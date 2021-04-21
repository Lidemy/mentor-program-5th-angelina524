//解法一：用陣列
function reverse(str) {
    var arr = Array.from(str)
    var newArr = []
    for(var i=str.length-1;i>=0;i--){
        newArr.push(arr[i])
    }
    console.log (newArr.join(""))
}
reverse('hello');

//解法二：用字串
function reverse(str) {
    var newStr =""
    for(var i=str.length-1;i>=0;i--){
        newStr += str[i]
    }
    console.log(newStr)
}
reverse('hello');