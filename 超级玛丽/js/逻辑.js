var g,
    v,
    gr,
    keyin,
    span,
    indead,
    inwin,
    poh,
    pow,
    life,
    gold,
    returnPlace = [];
var ingame = function (ingamelife) {
    getelement('lifenum')[0].innerHTML = '× ' + ingamelife;
    getelement('gamescreen')[0].style.display = 'block';
    g = 0.054;
    v = 0;
    keyin = true;
    span = true;
    indead = false;
    inwin = false;
    poh = 3;
    pow = 1.8;
    life = ingamelife;
    gold = 0;
    returnPlace = ['2.2vw', '2.3vw'];

    getelement('people')[0].style.transition = 'all 0.01s';
            getelement('people')[0].style.bottom = returnPlace[1];
            getelement('people')[0].style.left = returnPlace[0];
    onmapbuild(mapdata1);
    mapfun.inloadfun();
    setTimeout(() => {
        move();
    }, 500);
    gr = setInterval(() => {
        peopleChange();
        gravity();
    }, 20);
    setInterval(() => {
        screenMove();
    }, 1);
};
peopleData = {
    direction: 'right',
    run: false,
    jump: false,
};
var onmapbuild = function (mapdata) {
    for (let i = 0; i < getelement('gbnum').length; i++) {
        switch (mapdata[i]) {
            case 0:
                /**空方块 */
                getelement('gbnum')[i].className = 'gbnum gbnum1';
                getelement('gbnum')[i].type = 0;
                break;
            case 'w1':
                /**墙 */
                addclass(getelement('gbnum')[i], 'gbwall1');
                getelement('gbnum')[i].type = 1;
                break;
            case 'w2':
                /**墙 */
                addclass(getelement('gbnum')[i], 'gbwall2');
                getelement('gbnum')[i].type = 1;
                break;
            case 'w3':
                /**墙 */
                addclass(getelement('gbnum')[i], 'gbwall3');
                getelement('gbnum')[i].type = 1;
                break;
            case '?':
                /**问号方块 */
                addclass(getelement('gbnum')[i], 'gbanyblock');
                getelement('gbnum')[i].type = 2;
                getelement('gbnum')[i].content = 1;
                break;
            case 's':
                /**弹簧 */
                addclass(getelement('gbnum')[i], 'gbspring');
                getelement('gbnum')[i].type = 3;
                break;
            case 'g':
                /**金币 */
                addclass(getelement('gbnum')[i], 'gbgold');
                getelement('gbnum')[i].type = 4;
                getelement('gbnum')[i].style.opacity = 1;
                break;
            case 'm':
                /**蘑菇 */
                addclass(getelement('gbnum')[i], 'gbmushroom');
                getelement('gbnum')[i].type = 7;
                getelement('gbnum')[i].style.opacity = 1;
                break;
            case 'sw':
                /**隐藏方块w1 */
                addclass(getelement('gbnum')[i], 'gbwall1');
                getelement('gbnum')[i].style.opacity = 0;
                getelement('gbnum')[i].type = 11;
                break;
            case 'c':
                /**刺方块 */
                addclass(getelement('gbnum')[i], 'gbthorn');
                getelement('gbnum')[i].type = 6;
                break;
            case 'fd':
                /**旗台方块 */
                addclass(getelement('gbnum')[i], 'gbflagdown');
                getelement('gbnum')[i].type = 9;
                break;
            case 'fm':
                /**旗杆方块 */
                addclass(getelement('gbnum')[i], 'gbflagmid');
                getelement('gbnum')[i].type = 9;
                break;
            case 'fu':
                /**旗头方块 */
                addclass(getelement('gbnum')[i], 'gbflagup');
                getelement('gbnum')[i].type = 9;
                break;


        }
    }
};
var deadfun = function () {
    indead = true;
    clearInterval(gr);
    life--;
    keyin = false;
    span = false;
    getelement('people')[0].className = 'people peopleDead';
    setTimeout(() => {
        getelement('people')[0].style.transition = 'all 0.5s cubic-bezier(.37,1.01,.7,1)';
        getelement('people')[0].style.transform = 'translate(0,-10vw)';
        setTimeout(() => {
            getelement('people')[0].style.transition = 'all 0.5s cubic-bezier(.54,0,.76,.24)';
            getelement('people')[0].style.bottom = '-4vw';
            getelement('people')[0].style.transform = 'translate(0,0vw)';
        }, 500);
        let nr = setTimeout(() => {
            getelement('lifenum')[0].style.transform = 'translate(40vw,10vw) scale(5)';
            setTimeout(() => {
                getelement('lifenum')[0].innerHTML = '× ' + life;
                setTimeout(() => {
                    getelement('lifenum')[0].style.transform = 'translate(0vw,0vw) scale(1)';
                }, 1000);
            }, 1300);
        }, 1500);
        setTimeout(() => {
            if (life < 0) {
                clearTimeout(rr);
                clearTimeout(nr);
                gameover();
            }
        }, 1000);
        let rr = setTimeout(() => {
            getelement('people')[0].style.transition = 'all 0.01s';
            getelement('people')[0].style.bottom = returnPlace[1];
            getelement('people')[0].style.left = returnPlace[0];
            indead = false;
            keyin = true;
            span = true;
            gr = setInterval(() => {
                peopleChange();
                gravity();
            }, 20);
        }, 5000);
    }, 500);

};
var gameover = function () {
    console.log('lost');
    losegame();
};
var winfun = function () {
    getelement('blackFlag')[0].style.top = '16.8vw';
    getelement('redFlag')[0].style.top = '-3vw';
    setTimeout(() => {
        clearInterval(gr);
        wingame();
    }, 3000);
};
var move = function () {
    window.onkeydown = function (event) {
        let key = event.keyCode;
        switch (key) {
            case 68:
                if (keyin) {
                    keyin = false;
                    peopleData.direction = 'right';
                    peopleData.run = true;
                    let d = setInterval(() => {
                        movechange(0.2, 0);
                    }, 10);
                    window.onkeyup = function (event) {
                        if (event.keyCode == 68) {
                            peopleData.run = false;
                            keyin = true;
                            clearInterval(d);
                        }
                    }
                }
                break;
            case 65:
                if (keyin) {
                    keyin = false;
                    peopleData.direction = 'left';
                    peopleData.run = true;
                    //peopleChange();
                    let a = setInterval(() => {
                        movechange(-0.2, 0);
                    }, 10);
                    window.onkeyup = function (event) {
                        if (event.keyCode == 65) {
                            peopleData.run = false;
                            //peopleChange();
                            keyin = true;
                            clearInterval(a);
                        }
                    }
                }
                break;
            case 32:
                if (span) {
                    span = false;
                    v = getv(6);
                }
                break;
        }
    }
};
var movechange = function (tox, toy) {
    let ny = parseFloat(getelement('people')[0].style.bottom);
    let x = parseFloat(getelement('people')[0].style.left) + tox;
    let y = parseFloat(getelement('people')[0].style.bottom) + toy;
    let block = {
        1: {
            X: Math.floor(in0_(x / 2.2)),
            Y: Math.floor(in0_(y / 2.2)),
        },
        2: {
            X: Math.floor(in0_(x / 2.2)) + 1,
            Y: Math.floor(in0_(y / 2.2)),
        },
        3: {
            X: Math.floor(in0_(x / 2.2)),
            Y: Math.floor(in0_(y / 2.2)) + 1,
        },
        4: {
            X: Math.floor(in0_(x / 2.2)) + 1,
            Y: Math.floor(in0_(y / 2.2)) + 1,
        },
        5: {
            X: Math.floor(in0_(x / 2.2)),
            Y: Math.floor(in0_(y / 2.2)) + 2,
        },
        6: {
            X: Math.floor(in0_(x / 2.2)) + 1,
            Y: Math.floor(in0_(y / 2.2)) + 2,
        }
    }
    let num1 = 0;
    for (let i = 1; i < 7; i++) {
        let xy = in0_(block[i]['X']) + (15 - in0_(block[i]['Y'])) * 400
        if (xy > 17 * 400 && indead == false) {
            deadfun();
        }
        if (xy < 0 || xy > 16 * 400 && xy < 18 * 400 ||
            xy < 16 * 400 && (getelement('gbnum')[xy].type == 0 || getelement('gbnum')[xy].type == 5 || getelement('gbnum')[xy].type == 8)) {
            num1++;
            continue;
        }
        if (xy >= 18 * 400) {
            continue;
        }
        let bx = in0_(block[i]['X']) * 2.2;
        let by = in0_(block[i]['Y']) * 2.2;
        let bx_ = bx + 2.2;
        let by_ = by + 2.2;
        if (bx_ <= x || bx >= x + pow || by_ <= y || by >= y + poh) {
            num1++;
            continue;
        }
        if (getelement('gbnum')[xy].type == 3 && by < y && by_ > y && toy != 0) {
            /**弹簧判定 */
            span = false;
            num1++;
            getelement('gbnum')[xy].style.height = y % 2.2 + 'vw';
            getelement('gbnum')[xy].style.backgroundSize = '2.2vw ' + y % 2.2 + 'vw';
            if (parseFloat(getelement('gbnum')[xy].style.height) <= 1.1) {
                v = getv(2.3 * 5);
                setTimeout(() => {
                    getelement('gbnum')[xy].style.height = 2.2 + 'vw';
                    getelement('gbnum')[xy].style.backgroundSize = '2.2vw 2.2vw';
                }, 60);
            }
            continue;
        }
        if (getelement('gbnum')[xy].type == 2 && by < y + poh && by_ > y + poh && toy != 0) {
            /**?判定 */
            mapfun.anyb(xy);
            getelement('gbnum')[xy].style.transform = 'translate(0,-1vw)';
            setTimeout(() => {
                getelement('gbnum')[xy].style.transform = 'translate(0,0vw)';
            }, 60);
            continue;
        }
        if (getelement('gbnum')[xy].type == 11 && by < y + poh && by_ > y + poh && by > ny + poh) {
            /**隐藏方块出现判定 */
            /**上方方块相交判定 */
            mapfun.anyb(xy);
            getelement('gbnum')[xy].style.opacity = 1;
            continue;
        }
        if (getelement('gbnum')[xy].type == 11 && getelement('gbnum')[xy].style.opacity == 0) {
            num1++;
            continue;
        }
        if (getelement('gbnum')[xy].type == 6 &&
            ((by < y + poh && by_ > y + poh) || (by_ > y && by < y) || (bx < x + pow && bx_ > x + pow) || (bx < x && bx_ > x))) {
            /**刺方块判定 */
            /**单一方块相交完全判定 */
            console.log('thorn!');
            if (indead == false) {
                indead = true;
                deadfun();
            }
        }
        if (getelement('gbnum')[xy].type == 4 &&
            ((by < y + poh && by_ > y + poh) || (by_ > y && by < y) || (bx < x + pow && bx_ > x + pow) || (bx < x && bx_ > x))) {
            /**gold判定 */
            /**单一方块相交完全判定 */
            num1++;
            if (getelement('gbnum')[xy].style.opacity != 0) {
                gold++;
                getelement('goldnum')[0].innerHTML = gold;
            }
            getelement('gbnum')[xy].style.transition = 'all 0s';
            getelement('gbnum')[xy].style.opacity = 0;
            continue;
        }
        if (getelement('gbnum')[xy].type == 7 &&
            ((by < y + poh && by_ > y + poh) || (by_ > y && by < y) || (bx < x + pow && bx_ > x + pow) || (bx < x && bx_ > x))) {
            /**蘑菇判定 */
            /**单一方块相交完全判定 */
            num1++;
            if (getelement('gbnum')[xy].style.opacity != 0) {
                life++;
                getelement('lifenum')[0].innerHTML = '× ' + life;
            }
            getelement('gbnum')[xy].style.transition = 'all 0s';
            getelement('gbnum')[xy].style.opacity = 0;
            continue;
        }
        if (getelement('gbnum')[xy].type == 9 &&
            ((by < y + poh && by_ > y + poh) || (by_ > y && by < y) || (bx < x + pow && bx_ > x + pow) || (bx < x && bx_ > x))) {
            /**旗判定 */
            /**单一方块相交完全判定 */
            if (inwin == false) {
                keyin = false;
                span = false;
                inwin = true;
                winfun();
            }
            num1++;
        }
    }
    if (num1 == 6) {
        getelement('people')[0].style.bottom = y + 'vw';
        getelement('people')[0].style.left = x + 'vw';
        return 0;
    } else {
        return 1;
    }
};
var gravity = function () {
    let x = v - 0.5 * g;
    let num = movechange(0, x);
    if (num == 1) {
        if (v > 0) {
            v = -v;
        } else {
            v = 0;
        }
    } else {
        if (v < -0.6) {
            v = -0.8
        } else {
            v -= g;
        }
    }
    if (span == false && v == 0) {
        span = true;
    }
};
var getv = function (long) {
    return Math.sqrt(2 * g * long);
};
var peopleChange = function () {
    let arr;
    if (peopleData.direction == 'right') {
        if (v > 0) {
            arr = 'people3_1';
        } else if (peopleData.run) {
            arr = 'people2_1';
        } else arr = 'people1_1';
    } else {
        if (v > 0) {
            arr = 'people3_2';
        } else if (peopleData.run) {
            arr = 'people2_2';
        } else arr = 'people1_2';
    }
    getelement('people')[0].className = 'people' + ' ' + arr;
};
var mapfun = {
    inloadfun: function () {
        /**问号方块里的金币 */
        getelement('gbnum')[10 * 400 + 12].style.animation = 'none';
        getelement('gbnum')[10 * 400 + 12].style.transform = 'translate(0,2.2vw)'; //  -1/13-
        getelement('gbnum')[10 * 400 + 12].type = 5; //禁用金币
        /**问号方块里的蘑菇 */
        getelement('gbnum')[10 * 400 + 28].style.animation = 'none';
        getelement('gbnum')[10 * 400 + 28].style.transform = 'translate(0,2.2vw)'; //  -1/13-
        getelement('gbnum')[10 * 400 + 28].type = 8; //禁用蘑菇
        /**升旗 */
        getelement('blackFlag')[0].style.top = '0vw';
        getelement('redFlag')[0].style.top = '13.8vw';
        getelement('blackFlag')[0].style.transition = 'all 2s';
        getelement('redFlag')[0].style.transition = 'all 2s';
        /**清除建地图时的辅助标记 */
        for(let i=0;i<400;i++){
            getelement('gbnum')[i].innerHTML = ' ';
        }
    },
    anyb: function (xy) {
        switch (xy) {
            case 11 * 400 + 12:
                getelement('gbnum')[10 * 400 + 12].type = 4; //激活金币
                getelement('gbnum')[10 * 400 + 12].style.transform = 'translate(0,0)'
                setTimeout(() => {
                    getelement('gbnum')[10 * 400 + 12].style.animation = 'kgold 1.5s cubic-bezier(.7,.71,.72,.71) infinite';
                }, 450);
                break;
            case 11 * 400 + 28:
                getelement('gbnum')[10 * 400 + 28].type = 7; //激活蘑菇
                getelement('gbnum')[10 * 400 + 28].style.transform = 'translate(0,0)'
                setTimeout(() => {
                    getelement('gbnum')[10 * 400 + 28].style.animation = 'kmushroom 1.5s cubic-bezier(.7,.71,.72,.71) infinite';
                }, 450);
                break;
        }
    }
};
var in0_ = function (x) {
    if (Math.abs(Math.round(x) - x) < 0.000001) {
        return Math.round(x)
    } else return x;
};
var screenMove = function () {
    let x = parseFloat(getelement('people')[0].style.left)
    let scrx = -parseFloat(getelement('gamemap')[0].style.marginLeft)
    if (x >= scrx + 60) {
        getelement('gamemap')[0].style.transition = 'all 0s';
        getelement('gamemap')[0].style.marginLeft = -(x - 60) + 'vw';
    }
    if (scrx > 0 && x <= scrx + 20) {
        getelement('gamemap')[0].style.transition = 'all 0s';
        getelement('gamemap')[0].style.marginLeft = -(x - 20) + 'vw';
    }
    if (x < 10) {
        getelement('gamemap')[0].style.transition = 'all 1s cubic-bezier(.54,0,0,.99)';
        getelement('gamemap')[0].style.marginLeft = '0vw';
    }
};
var getelement = function (classname) {
    return document.getElementsByClassName(classname);
};
var mapclear = function () {
    for (let i = 0; i < getelement('gbnum').length; i++) {
        getelement('gbnum')[i].className = 'gbnum';
    }
};
var addclass = function (element, classname) {
    let i = element.className;
    element.className = i + ' ' + classname;
};