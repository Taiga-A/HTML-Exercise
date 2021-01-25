var down = function () {
    getclasselement('opengame')[0].style.transition = 'all 0.3s';
    getclasselement('opengame')[0].style.transform = 'scale(1) translate(0,3vw)';
}
var up = function () {
    getclasselement('opengame')[0].style.transform = 'scale(1.05) translate(0,3vw)';
    setTimeout(() => {
        getclasselement('opengame')[0].style.transition = 'all 0.6s';
    }, 500);
}
var opengame = function () {
    inblockchange_1(20, 10);
    setTimeout(() => {
        outblockchange_1(20, 10);
    }, 1700);
    setTimeout(() => {
        getclasselement('gamechoose')[0].style.opacity = '1';
        getclasselement('gamechoose')[1].style.opacity = '1';
        getclasselement('s2_text')[0].style.opacity = '1';
    }, 4000);
    setTimeout(() => {
        getclasselement('sc2')[0].style.display = 'flex';
        getclasselement('sc1')[0].style.display = 'none';
    }, 1800);
}
var mouseoverbutton = function (num) {
    switch (num) {
        case 1:
            getclasselement('gamewin')[0].style.marginLeft = '600px';
            getclasselement('gamelose')[0].style.marginRight = '100px';
            break;
        case 2:
            getclasselement('gamelose')[0].style.marginRight = '600px';
            getclasselement('gamewin')[0].style.marginLeft = '100px';
            break;
    }
}
var mouseoutbutton = function (num) {

    getclasselement('gamewin')[0].style.marginLeft = '100px';
    getclasselement('gamelose')[0].style.marginRight = '100px';


}
var inblockchange_2 = function () {
    getclasselement('sc3')[0].style.display = 'flex';
    getclasselement('blockchange_2')[0].style.display = 'block';
    getclasselement('blockchange_2_in')[0].style.display = 'block';
    setTimeout(() => {
        getclasselement('blocklineallpart1')[0].style.top = '0%';
        getclasselement('blocklineallpart2')[0].style.bottom = '0%';
    }, 500);
    setTimeout(() => {
        getclasselement('sc2')[0].style.display = 'none';
        getclasselement('gamechoose')[0].style.opacity = '0';
        getclasselement('gamechoose')[1].style.opacity = '0';
        getclasselement('s2_text')[0].style.opacity = '0';
    }, 1500);
    setTimeout(() => {
        getclasselement('wintext')[0].style.transform = 'translate(0,0)'
    }, 1500);
    setTimeout(() => {
        var i = 0;
        var num1 = setInterval(() => {
            getclasselement('blocknum2')[i].style.top = '60%';
            i++;
            if (i == 20) {
                clearInterval(num1);
            }
        }, 50);
        var j = 20;
        var num2 = setInterval(() => {
            getclasselement('blocknum2')[j].style.top = '-60%';
            j++
            if (j == 40) {
                clearInterval(num2);
            }
        }, 50);
    }, 1200);
    setTimeout(() => {
        inblockchange_1(20, 10);
        setTimeout(() => {
            outblockchange_1(20, 10);
        }, 1700);
        setTimeout(() => {
            getclasselement('sc3')[0].style.display = 'none';
            getclasselement('blockchange_2')[0].style.display = 'none';
            getclasselement('blockchange_2_in')[0].style.display = 'none';
            getclasselement('wintext')[0].style.transform = 'translate(0,-100%)'
            getclasselement('blocklineallpart1')[0].style.top = '-50%';
            getclasselement('blocklineallpart2')[0].style.bottom = '-50%';
            for (let i = 0; i < 40; i++) {
                getclasselement('blocknum2')[i].style.top = '0';
            }
        }, 2000);
    }, 3500);
}
window.onload = function () {
    onloadblock();
}
var getclasselement = function (classname) {
    return document.getElementsByClassName(classname);
}
var inblockchange_1 = function (x, y) {
    getclasselement('blockchange_1')[0].style.display = 'flex';
    let arr1 = new Array;
    for (let i = 0; i < y; i++) {
        arr1[i] = 0 - i;
    }
    let j = 0;
    var num1 = setInterval(() => {
        for (let i = 0; i < y; i++) {
            if (arr1[i] >= 0 && arr1[i] < x) {
                let id = i * x + arr1[i];
                getclasselement('blocknum')[id].style.display = 'block';
                getclasselement('blocknum')[id].style.transform = 'scale(1)';
                getclasselement('blocknum')[id].style.borderRadius = '0%';
            }
        }
        for (let i = 0; i < y; i++) {
            arr1[i]++;
        }
        j++;
        if (j == x * 2) {
            clearInterval(num1);
        }
    }, 40);
}
var outblockchange_1 = function (x, y) {
    let arr2 = new Array;
    for (let i = 0; i < y; i++) {
        arr2[i] = 0 - i;
    }
    let j = 0;
    var num1 = setInterval(() => {
        for (let i = 0; i < y; i++) {
            if (arr2[i] >= 0 && arr2[i] < x) {
                let id = i * x + arr2[i];
                getclasselement('blocknum')[id].style.transform = 'scale(0)';
                getclasselement('blocknum')[id].style.borderRadius = '1%';
            }
        }
        for (let i = 0; i < y; i++) {
            arr2[i]++;
        }
        j++;
        if (j == x * 2) {
            clearInterval(num1);
            getclasselement('blockchange_1')[0].style.display = 'none';
        }
    }, 70);
}
var onloadblock = function () {
    var x = window.innerWidth;
    var y = window.innerHeight;
    for (let i = 0; i < getclasselement('blocknum').length; i++) {
        getclasselement('blocknum')[i].style.borderRadius = '50%';
    }
    getclasselement('sc2')[0].style.display = 'none';
    getclasselement('blockchange_2_in')[0].style.display = 'none';
    getclasselement('blockchange_2')[0].style.display = 'none';
    getclasselement('sc3')[0].style.display = 'none';
}
var wingame = function () {
    inblockchange_2();
    setTimeout(() => {
        getclasselement('sc1')[0].style.display = 'flex';
        getelement('bigscreen')[0].style.display = 'none';        
    }, 1500);
}
var losegame = function () {
    getclasselement('sc4')[0].style.display = 'flex';
    inblockchange_3();
    setTimeout(() => {
        getclasselement('sc1')[0].style.display = 'flex';
        getelement('bigscreen')[0].style.display = 'none';        
    }, 1500);
}
var inblockchange_3 = function () {
    setTimeout(() => {
        getclasselement('blockchange_3')[0].style.left = '0';
    }, 100);
    setTimeout(() => {
        getclasselement('blocknum3')[2].style.left = '0';
        getclasselement('blocknum3')[3].style.left = '0';
        setTimeout(() => {
            getclasselement('blocknum3')[1].style.left = '0';
            getclasselement('blocknum3')[4].style.left = '0';
        }, 100);
        setTimeout(() => {
            getclasselement('blocknum3')[0].style.left = '0';
            getclasselement('blocknum3')[5].style.left = '0';
        }, 200);
        setTimeout(() => {
            getclasselement('text4')[0].style.left = '0';
        }, 300);
        setTimeout(() => {
            getclasselement('text4')[0].style.fontStyle = 'italic';
            getclasselement('sc2')[0].style.display = 'none';
        }, 1500);
        setTimeout(() => {
            setTimeout(() => {
                getclasselement('blockchange_3')[0].style.left = '-100%';
                getclasselement('text4')[0].style.opacity = 0;
            }, 300);
            setTimeout(() => {
                getclasselement('blocknum3')[2].style.left = '-100%';
                getclasselement('blocknum3')[3].style.left = '-100%';

            }, 400);
            setTimeout(() => {
                getclasselement('blocknum3')[1].style.left = '-100%';
                getclasselement('blocknum3')[4].style.left = '-100%';
            }, 500);
            setTimeout(() => {
                getclasselement('blocknum3')[0].style.left = '-100%';
                getclasselement('blocknum3')[5].style.left = '-100%'
            }, 600);
            setTimeout(() => {
                getclasselement('text4')[0].style.opacity = 1;
                getclasselement('text4')[0].style.fontStyle = 'normal';
                getclasselement('text4')[0].style.left = '100%';
                getclasselement('blockchange_3')[0].style.left = '100%';
                getclasselement('blocknum3')[0].style.left = '100%';
                getclasselement('blocknum3')[1].style.left = '100%';
                getclasselement('blocknum3')[2].style.left = '100%';
                getclasselement('blocknum3')[3].style.left = '100%';
                getclasselement('blocknum3')[4].style.left = '100%';
                getclasselement('blocknum3')[5].style.left = '100%';
                getclasselement('sc4')[0].style.display = 'none';
            }, 1200);
        }, 2000);

    }, 700);
}
var openingame = function(num){
    inblockchange_1(20,10);
    setTimeout(() => {
        getclasselement('sc2')[0].style.display = 'none';
        getelement('bigscreen')[0].style.display = 'flex'; 
        ingame(num);
    }, 1400);
    setTimeout(() => {
        outblockchange_1(20,10);
    }, 1500);
}