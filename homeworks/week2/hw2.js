//解法一：檢查第一個值
function capitalize(str){
    var firstChar = str[0]
    var newStr = ""
    for(var i = 1; i < str.length; i++){
        newStr += str[i]
    }
    if((firstChar.charCodeAt(0) - 32)<=90){
        return firstChar.toUpperCase() + newStr
    }
    return str
}
capitalize(',hello');

/*
解法二：不檢查第一個值
情況一：第一個值是大寫，回傳
情況二：第一個值是小寫，改大寫，回傳
情況三：第一個值不是字母，回傳
*/
function capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
}
capitalize(',hello');