var getclass = function (className) {
    return document.getElementsByClassName(className); //获取类
}

var addClass = function (element, _className) { //向某元素添加属性

    var className = element.className.split(' ');
    var classNameMap = {}

    for (var i = 0; i < className.length; i++) {
        classNameMap[className[i]] = 1;
    }
    classNameMap[_className] = 1;

    className = [];
    for (i in classNameMap) {
        className.push(i);
    }
    element.className = className.join(' ');
}

var removeClass = function (element, _className) {
    let className = element.className.split(' ');
    let classnamemap = {};
    for (let i = 0; i < className.length; i++) {
        if (className[i] == _className) {
            continue;
        }
        classnamemap[className[i]] = 1;
    }
    className = [];
    for (i in classnamemap) {
        className.push(i);
    }
    element.className = className.join(' ');
}

nav = function (num) { //页面导航链接函数
    switch (num) {
        case 1:
            document.documentElement.scrollTop = 800 * 0;
            break;
        case 2:
            document.documentElement.scrollTop = 800 * 1;
            break;
        case 3:
            document.documentElement.scrollTop = 800 * 2;
            break;
        case 4:
            document.documentElement.scrollTop = 800 * 3;
            break;
        case 5:
            document.documentElement.scrollTop = 800 * 4;
            break;
    }
}

var div = function (num) {
    switch (num) {
        case 1:
            document.getElementsByClassName("nav_b")[0].style.left = "20px";
            break;
        case 2:
            document.getElementsByClassName("nav_b")[0].style.left = "120px";
            break;
        case 3:
            document.getElementsByClassName("nav_b")[0].style.left = "220px";
            break;
        case 4:
            document.getElementsByClassName("nav_b")[0].style.left = "320px";
            break;
        case 5:
            document.getElementsByClassName("nav_b")[0].style.left = "420px";
            break;
    }
}


var refish = function () {
    let top = document.documentElement.scrollTop;

    for (let i = 1; i < 6; i++) {
        document.getElementsByTagName("a")[i].style.color = "";
    }
    for (i = 2; i < 7; i++) {
        document.getElementsByTagName("div")[i].style.color = "";
    }
    if (top > 250) {
        removeClass(getclass("rightside")[0], "rightside_in");
    } else {
        addClass(getclass("rightside")[0], "rightside_in");
    }
    if (top < (800 * 0 + 650)) {
        document.getElementsByClassName("nav_b")[0].style.left = "20px";
        document.getElementsByTagName("a")[1].style.color = "red";
        document.getElementsByClassName("rs")[0].style.color = "red";
    } else if (top < (800 * 1 + 650)) {
        document.getElementsByClassName("nav_b")[0].style.left = "120px";
        document.getElementsByTagName("a")[2].style.color = "red";
        document.getElementsByClassName("rs")[1].style.color = "red";
    } else if (top < (800 * 2 + 650)) {
        document.getElementsByClassName("nav_b")[0].style.left = "220px";
        document.getElementsByTagName("a")[3].style.color = "red";
        document.getElementsByClassName("rs")[2].style.color = "red";
    } else if (top < (800 * 3 + 650)) {
        document.getElementsByClassName("nav_b")[0].style.left = "320px";
        document.getElementsByTagName("a")[4].style.color = "red";
        document.getElementsByClassName("rs")[3].style.color = "red";
    } else {
        document.getElementsByClassName("nav_b")[0].style.left = "420px";
        document.getElementsByTagName("a")[5].style.color = "red";
        document.getElementsByClassName("rs")[4].style.color = "red";
    }


}

window.onload = function () {
    refish();
    /**加载时直接进行第一屏 */
    removeClass(getclass("text1")[0], "text1_in");
    removeClass(getclass("p1")[0], "p1_in");
    removeClass(getclass("p1_")[0], "p1__in");
}

window.onscroll = function () { //动画效果
    let top = document.documentElement.scrollTop;

    refish();
    /**导航栏的黑白变换 */
    if (top > 5) {
        addClass(getclass('header_class')[0], 'header_black');
        removeClass(getclass('header_class')[0], 'header_white');
        document.getElementsByClassName('logo')[0].style.color = "white";
    } else {
        addClass(getclass('header_class')[0], 'header_white');
        document.getElementsByClassName('logo')[0].style.color = "black";
    }
    /**第二屏 */
    if (top >= (800 * 0 + 650)) {
        removeClass(getclass("s2_head")[0], "s2_head_in");
        removeClass(getclass("s2_text")[0], "s2_text_in");
        removeClass(getclass("s2_phone")[0], "s2_phone_in");
    }
    /**第三屏 */
    if (top >= (800 * 1 + 650)) {
        removeClass(getclass("s3_text_h")[0], "s3_text_h_in");
        removeClass(getclass("s3_text_t")[0], "s3_text_t_in");
        removeClass(getclass("p3")[0], "p3_in");
        removeClass(getclass("s3_b")[0], "s3_b_in");
    }
    /**第四屏 */
    if (top >= (800 * 2 + 650)) {
        removeClass(getclass("s4_text_h")[0], "s4_text_h_in");
        removeClass(getclass("s4_text_t")[0], "s4_text_t_in");
        removeClass(getclass("s4_p1_1")[0], "s4_p1_1_in");
        removeClass(getclass("s4_p1_2")[0], "s4_p1_2_in");
        removeClass(getclass("s4_p1_3")[0], "s4_p1_3_in");
        removeClass(getclass("s4_p1_4")[0], "s4_p1_4_in");
    }
    /**第五屏 */
    if (top >= (800 * 3 + 650)) {
        removeClass(getclass("s5_text_h")[0], "s5_text_h_in");
        removeClass(getclass("s5_text_t")[0], "s5_text_t_in");
        removeClass(getclass("s5_p")[0], "s5_p_in");
    }

}