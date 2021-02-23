setting = {
  background: '#ff9ff3',
  color1: '#2e86de',
  color2: '#5f27cd',
  img: 'url(./img/Block.png)'
}

let lineStyle = function (z_zindex) {
  return `
      z-index:` + z_zindex + `;
      width:0;
      height:150vh;
      transform:rotate(0.08turn);
  `
}

function inBox() {
  console.log("inBox");
  let divOut = addElement('div', 'outSideDiv1', 'c1_outSideDiv');
  divOut.className = 'centre'
  divOut.style = `
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
    margin:auto;
    overflow:hidden;
  `
  let background = addElement('div', 'c1_outSideDiv', 'c1_background');
  background.className = 'centre'
  background.style.opacity = '0'
  background.style.background = setting.background;

  let line1 = addElement('div', 'c1_outSideDiv', 'c1_line1');
  line1.className = 'centre'
  let line1_1 = addElement('div', 'c1_line1', 'c1_line1_1');
  line1_1.style = lineStyle(10);
  line1_1.style.background = setting.color1;

  let line2 = addElement('div', 'c1_outSideDiv', 'c1_line2');
  line2.className = 'centre'
  let line2_1 = addElement('div', 'c1_line2', 'c1_line2_1');
  line2_1.style = lineStyle(9);
  line2_1.style.background = setting.color1;

  let line3 = addElement('div', 'c1_outSideDiv', 'c1_line3');
  line3.className = 'centre'
  let line3_1 = addElement('div', 'c1_line3', 'c1_line3_1');
  line3_1.style = lineStyle(9);
  line3_1.style.background = setting.color1;

  let line4 = addElement('div', 'c1_outSideDiv', 'c1_line4');
  line4.className = 'centre'
  let line4_1 = addElement('div', 'c1_line4', 'c1_line4_1');
  line4_1.style = lineStyle(9);
  line4_1.style.background = setting.color1;

  let line5 = addElement('div', 'c1_outSideDiv', 'c1_line5');
  line5.className = 'centre'
  let line5_1 = addElement('div', 'c1_line5', 'c1_line5_1');
  line5_1.style = lineStyle(9);
  line5_1.style.background = setting.color1;

  let block1 = addElement('div', 'c1_outSideDiv', 'c1_block1');
  block1.className = 'centre'
  let block1_1 = addElement('div', 'c1_block1', 'c1_block1_1');
  let block1_2 = addElement('div', 'c1_block1', 'c1_block1_2');
  block1_2.innerHTML = 'Minecraft';
  block1_2.style = `
  color: white;
  z-index: 11;
  font-size: 30px;
  opacity:0;
  transform: translate(-3.15vw,5vw)
  
  `
  block1_1.className = 'block'
  block1_1.style.background = setting.img;
  block1_1.style.backgroundSize = 'cover';

  line1_1.style.transition = 'all 1.7s cubic-bezier(.02,.57,.7,.97)'
  line2_1.style.transition = 'all 1s cubic-bezier(.2,-0.02,.18,.99)'
  line3_1.style.transition = 'all 1s cubic-bezier(.2,-0.02,.18,.99)'
  line4_1.style.transition = 'all 1.5s cubic-bezier(.2,-0.02,.18,.99)'
  line5_1.style.transition = 'all 1.5s cubic-bezier(.2,-0.02,.18,.99)'
  block1_2.style.transition = 'all 1s cubic-bezier(0,.25,.44,.98)'

  setTimeout(() => {
    line1_1.style.width = '14vw';
    setTimeout(() => {
      background.style.opacity = '100';
      background.style.transition = 'all 0.5s ';

      line2_1.style.width = '8vw';
      line2_1.style.transform = 'translate(68vw) rotate(0.08turn)';
      line3_1.style.width = '5vw';
      line3_1.style.transform = 'translate(-67vw) rotate(0.08turn)';

      block1_1.style.opacity = '100';
      block1_2.style.opacity = '100';
      block1_1.className = 'block block_'
      setTimeout(() => {
        block1_1.style.transition = 'all 0.3s'
        block1_1.onmousedown = function(){
          block1_1.style.transform = 'translate(3vw) scale(1.5)'
        }
        block1_1.onmouseup = function(){
          block1_1.style.transform = 'translate(3vw) scale(1.7)'
          setTimeout(() => {
            if(confirm('是否返回页面')){
              divOut.remove();
            }
          }, 300);
        }
        block1_1.onmouseover = function(){
          block1_1.style.transform = 'translate(3vw) scale(1.7)';
        }
        block1_1.onmouseout = function(){
          block1_1.style.transform = 'translate(3vw) scale(1.5)';
        }
        block1_1.style.cursor= 'pointer';
      }, 1500);

      setTimeout(() => {
        line4_1.style.width = '8vw';
        line4_1.style.transform = 'translate(68vw) rotate(0.08turn)'
        line5_1.style.width = '4vw';
        line5_1.style.transform = 'translate(-67vw) rotate(0.08turn)'
      }, 300);

    }, 300);
  }, 200);


}

let addElement = function (elementType, fatherId, newElementId) {
  let aElement = document.createElement(elementType);
  aElement.id = newElementId;
  let fatherElement = getElement(fatherId);
  fatherElement.appendChild(aElement);
  return aElement;
}

let getElement = function (elementId) {
  return document.getElementById(elementId);
}