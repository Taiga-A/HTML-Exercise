var mapX = 12;
var mapY = 20;
var opengame = function () {
    getelement("_opengame").style.opacity = 0;
    setTimeout(() => {
        getelement("openbutton").style.display = 'none';
    }, 1000);
    document.getElementsByClassName('text')[0].style.opacity = 0;
    document.getElementsByClassName('text')[2].style.opacity = 0;
    getelement('openbutton').style.opacity = 0;
    var nowblocks = randnewblock();
    printblock(0, nowblocks); //初始
    newround(nowblocks);
}

var overgame = function () {
    getelement('_opengame').style.opacity = 1;
    getelement('gameover').style.opacity = 1;
    setTimeout(() => {
        getelement('gameover').style.opacity = 0;
        getelement("openbutton").style.display = 'block';
    }, 2500);
    setTimeout(() => {
        document.getElementsByClassName('text')[0].style.opacity = 1;
        document.getElementsByClassName('text')[2].style.opacity = 1;
    }, 3000);
    setTimeout(() => {
        getelement("openbutton").style.opacity = 1;
    }, 4000);
}

var newround = function (nowblocks) {
    /**上119/87下115/83左97/65右100/68 */
    /**主要逻辑函数 */
    var timeset = setInterval(() => {
        var block1 = new Block(nowblocks.blocktype, nowblocks.dictionnum, nowblocks.colornum, ' ', nowblocks.baseid);
        var newbaseid = [nowblocks.baseid[0], nowblocks.baseid[1]];
        newbaseid[0]++;
        blockchangeset(block1, nowblocks.dictionnum, newbaseid);
        var num = testmove(block1, nowblocks);
        if (num == 0) {
            nowblocks = block1;
        } else if (num == 1) {
            do {
                var exitnum = testclear();
            } while (exitnum == 1);
            for (i = 1; i <= mapX; i++) {
                let eleid = '_3_' + i;
                if (getelement(eleid).style.opacity == 1) {
                    clearInterval(timeset);
                    overgame();
                    console.log('gameover');
                    return 0;
                }
            }
            var newblock2 = randnewblock();
            printblock(0, newblock2);
            newround(newblock2);
            clearInterval(timeset);
            return 0;
        }
        block1 == null;
    }, 700);
    var i;
    document.onkeypress = function (event) {
        i = event.keyCode;
        if (i == 119 || i == 87) {
            var a = nowblocks.dictionnum % 4 + 1;
            var block1 = new Block(nowblocks.blocktype, a, nowblocks.colornum, '', nowblocks.baseid);
            blockchangeset(block1, a, nowblocks.baseid);
            var num = testmove(block1, nowblocks);
            if (num == 0) {
                nowblocks = block1;
            }
            block1 == null;
        }
        if (i == 115 || i == 83) {
            var block1 = new Block(nowblocks.blocktype, nowblocks.dictionnum, nowblocks.colornum, ' ', nowblocks.baseid);
            var newbaseid = [nowblocks.baseid[0], nowblocks.baseid[1]];
            newbaseid[0]++;
            blockchangeset(block1, nowblocks.dictionnum, newbaseid);
            var num = testmove(block1, nowblocks);
            if (num == 0) {
                nowblocks = block1;
            }
            block1 == null;
        }
        if (i == 97 || i == 65) {
            var block1 = new Block(nowblocks.blocktype, nowblocks.dictionnum, nowblocks.colornum, ' ', nowblocks.baseid);
            var newbaseid = [nowblocks.baseid[0], nowblocks.baseid[1]];
            newbaseid[1]--;
            blockchangeset(block1, nowblocks.dictionnum, newbaseid);
            var num = testmove(block1, nowblocks);
            if (num == 0) {
                nowblocks = block1;
            }
            block1 == null;
        }
        if (i == 100 || i == 68) {
            var block1 = new Block(nowblocks.blocktype, nowblocks.dictionnum, nowblocks.colornum, ' ', nowblocks.baseid);
            var newbaseid = [nowblocks.baseid[0], nowblocks.baseid[1]];
            newbaseid[1]++;
            blockchangeset(block1, nowblocks.dictionnum, newbaseid);
            var num = testmove(block1, nowblocks);
            if (num == 0) {
                nowblocks = block1;
            }
            block1 == null;
        }
    }


}
var blockchangeset = function (block, newdiction, baseid) {
    for (var i = 1; i <= 4; i++) {
        var a = allblock[block.blocktype][newdiction][i].split('_');
        block.blockiddata[i] = '_' + (Number(baseid[0]) + Number(a[1])) + '_' + (Number(baseid[1]) + Number(a[2]));
        block.baseid = baseid;
    }
}
var Block = function (blocktype, dictionnum, colornum, blockiddata, baseid) {
    this.dictionnum = dictionnum;
    this.colornum = colornum;
    this.blocktype = blocktype;
    this.blockiddata = new Object;
    this.baseid = [baseid[0], baseid[1]]
    this.blockiddata[1] = blockiddata[1];
    this.blockiddata[2] = blockiddata[2];
    this.blockiddata[3] = blockiddata[3];
    this.blockiddata[4] = blockiddata[4];
}
var randnewblock = function () {
    var blocktype = randnum(4);
    var dictionnum = randnum(4);
    var colornum = randnum(4);
    var baseid = [0, 0];
    var newblockdata = new Block(blocktype, dictionnum, colornum, allblock[blocktype][dictionnum], baseid);
    return newblockdata;
}
var printblock = function (blockdata1, blockdata2) {
    /**清除1位置方块，输出2位置方块 */
    if (blockdata1 !== 0) {
        for (var a = 1; a <= 4; a++) {
            elementid = blockdata1.blockiddata[a];
            removeclass(getelement(elementid));
            getelement(elementid).style.opacity = 0;
        }
    }
    for (a = 1; a <= 4; a++) {
        elementid = blockdata2.blockiddata[a];
        addclass(getelement(elementid), allcolor[blockdata2.colornum]);
        getelement(elementid).style.opacity = 1;
    }
}
var testmove = function (blockdata, blockdata_) {
    /**除2位置外1位置有方块或边界 返回1;无方块 返回0并移动*/
    for (var a = 1; a <= 4; a++) {
        var XY = blockdata.blockiddata[a].split('_');
        if (XY[1] >= mapY || XY[1] < 0 || XY[2] > mapX || XY[2] <= 0) {
            //console.log('该位置位于地图外，禁止移动！');
            return 1;
        }
    }
    for (a = 1; a <= 4; a++) {
        getelement(blockdata_.blockiddata[a]).style.opacity = 0;
    }
    for (a = 1; a <= 4; a++) {
        var ele = getelement(blockdata.blockiddata[a]);
        var num = ele.style.opacity;
        if (num == 1) {
            for (a = 1; a <= 4; a++) {
                getelement(blockdata_.blockiddata[a]).style.opacity = 1;
            }
            //console.log('该位置有方块，禁止移动！');
            return 1;
        }
    }
    printblock(blockdata_, blockdata);
    //console.log('该位置无方块可以移动此处！');
    return 0;
}
var testclear = function () {
    /**检查是否满行，是：清除并下落 */
    let i = 0,
        j;
    for (; i < mapY; i++) {
        let num = 0;
        for (j = 1; j <= mapX; j++) {
            let a = getelement("_" + i + "_" + j).style.opacity;
            if (a == 0) {
                num++;
            }
        }
        if (num == 0) {
            for (j = 1; j <= mapX; j++) {
                getelement("_" + i + "_" + j).style.opacity = ' ';
            }
            let i1 = i
            var _i = i1 - 1;
            for (_i; _i >= 0; _i--) {
                for (j = 1; j <= mapX; j++) {
                    exchangeclass('_' + _i + '_' + j, '_' + (_i + 1) + '_' + j);
                }
            }
            return 1;
        }
    }
    return 0;
}
var getelement = function (id) {
    /**获取ID */
    return document.getElementById(id);
}
var clearmap = function () {
    /**初始化地图（清除方块类，并使其不可见） */
    let i = 0,
        j;
    for (; i < 15; i++) {
        for (j = 1; j <= 12; j++) {
            let id = "_" + i + "_" + j;
            removeclass(getelement(id));
            getelement(id).style.opacity = "0";
        }
    }
}
var addclass = function (element, newclass) {
    var a = element.className;
    var a_ = a + ' ' + newclass;
    element.className = a_
}
var removeclass = function (element) {
    /**初始化地图方块元素の类 */
    element.className = "block b_";

}
var allblock = {
    /**四种方块四种方向初始位置方块ID */
    1: { //正方体
        1: {
            1: '_0_6',
            2: '_0_7',
            3: '_1_6',
            4: '_1_7',
        },
        2: {
            1: '_0_6',
            2: '_0_7',
            3: '_1_6',
            4: '_1_7',
        },
        3: {
            1: '_0_6',
            2: '_0_7',
            3: '_1_6',
            4: '_1_7',
        },
        4: {
            1: '_0_6',
            2: '_0_7',
            3: '_1_6',
            4: '_1_7',
        },
    },
    2: { //长条
        1: {
            1: '_0_5',
            2: '_0_6',
            3: '_0_7',
            4: '_0_8',
        },
        2: {
            1: '_0_6',
            2: '_1_6',
            3: '_2_6',
            4: '_3_6',
        },
        3: {
            1: '_0_5',
            2: '_0_6',
            3: '_0_7',
            4: '_0_8',
        },
        4: {
            1: '_0_6',
            2: '_1_6',
            3: '_2_6',
            4: '_3_6',
        },
    },
    3: { //十字
        1: {
            1: '_0_6',
            2: '_1_5',
            3: '_1_6',
            4: '_1_7',
        },
        2: {
            1: '_0_6',
            2: '_1_6',
            3: '_1_7',
            4: '_2_6',
        },
        3: {
            1: '_0_5',
            2: '_0_6',
            3: '_0_7',
            4: '_1_6',
        },
        4: {
            1: '_0_6',
            2: '_1_5',
            3: '_1_6',
            4: '_2_6',
        },
    },
    4: { //T型
        1: {
            1: '_0_5',
            2: '_0_6',
            3: '_0_7',
            4: '_1_5',
        },
        2: {
            1: '_0_6',
            2: '_0_7',
            3: '_1_7',
            4: '_2_7',
        },
        3: {
            1: '_0_7',
            2: '_1_5',
            3: '_1_6',
            4: '_1_7',
        },
        4: {
            1: '_0_6',
            2: '_1_6',
            3: '_2_6',
            4: '_2_7',
        },
    },
}
var allcolor = {
    1: 'red',
    2: 'green',
    3: 'yellow',
    4: 'blue',
}
var randnum = function (n) {
    /**随机整数(1~n) */
    do {
        var a = Math.floor(Math.random() * (n + 1));
        if (a >= 1 && a <= n) break;
    } while (1)
    return a;
}
var exchangeclass = function (fromclassid, toclassid) {
    /**将id1class和opacity属性赋值给id2*/
    getelement(toclassid).className = getelement(fromclassid).className;
    getelement(toclassid).style.opacity = getelement(fromclassid).style.opacity;
}
/**
 * if (testclear() == 1) {
                for (var i = 1; i <= 4; i++) {
                    let a = blockdata_.blockiddata[i].split('_')
                    exchangeclass('_'+Number(a[1])+1 + '_' + Number(a[2]),blockdata_.blockiddata[i]);
                }
            }
 */