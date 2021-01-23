var a = window.screen.availHeight;
document.getElementsByTagName("*")[0].style.transform = "scale(" + (a / 1040) + ")";

var hightgrade = 0; /**最高次数 */
var exitnum; /**游戏结束标志 */
var Anum = 0 //**确保相邻两次字母不会重复的变量 */
var grade;
opengame = function () {/**主函数 */
    exitnum = 0;
    grade = 0;
    timepass = 60;
    getelement("timeshare").style.color = "black";
    getelement("timeshare").innerHTML = timepass;
    getelement("ingame").style.opacity = 0;
    getelement("gameover").style.opacity = 0;
    setTimeout(() => {
        getelement("ingame").style.dispaly = "none";
    }, 1000);
    clear();
    fun();
    timemove(timepass);
}
var getelement = function (id) {//**快速利用ID获取元素 */
    return document.getElementById(id);
}
var randnum = function () { //随机数，选择按键
    do {
        var i = Math.floor(Math.random() * 30);
    } while (i < 1 || i > 26 || i == Anum)
    Anum = i;
    i += 64;
    return i;
}
var timemove = function (timepass) { //**计时函数，时间到结束游戏，显示结果 */
    getelement("timeshare").innerHTML = timepass;
    if (timepass <= 5) {
        getelement("timeshare").style.color = "red";
    }
    if (timepass == 0) {
        setTimeout(() => {
            exitnum = 1;
            if (grade > hightgrade) {
                hightgrade = grade;
            }
            clear();
            getelement("nowgrade").innerHTML = "正确次数：" + grade + "/mins";
            getelement("hightgrade").innerHTML = "最高次数：" + hightgrade + "/mins";
            getelement("ingame").innerHTML = "再来一次";
            getelement("ingame").style.dispaly = " ";
            getelement("ingame").style.opacity = 1;
            getelement("gameover").style.opacity = 1;
        }, 1000);
    } else {
        timepass--;
        setTimeout(() => {
            timemove(timepass);
        }, 1000);
    }
}
var fun = function () {
    /**主要逻辑函数 */
    if (exitnum == 1) return 0;
    var num = "_" + randnum();
    getelement(num).style.background = " rgba(0, 119, 255, 0.329)"
    document.onkeypress = function (event) {
        if (event.keyCode >= 97 && event.keyCode <= 122) {
            var id = "_" + (event.keyCode - 32);
        } else {
            var id = "_" + (event.keyCode);
        }
        if (id === num) {
            getelement(num).style.background = "  rgba(0, 255, 85, 0.486)";
            grade += 1;
            fun();
            setTimeout(() => {
                getelement(num).style.background = " rgba(0, 0, 0, 0.089)";
            }, 300);
        } else {
            getelement(num).style.background = "  rgba(255, 0, 0, 0.486)";
            setTimeout(() => {
                getelement(num).style.background = " rgba(0, 0, 0, 0.089)";
            }, 300);
            fun();
        }
    }
}
var clear = function () {
    for (let i = 0; i < 26; i++) {
        document.getElementsByClassName("block")[i].style.background = "rgba(0, 0, 0, 0.089)";
    }
}