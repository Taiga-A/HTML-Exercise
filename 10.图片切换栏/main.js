nowImg = 0;

let getElementId = function (id) {
  return document.getElementById(id)
}
let getElementClass = function (Class) {
  return document.getElementsByClassName(Class)
}

function addClass(element, Class) {
  let list = element.className.split(' ')
  // console.log(list)
  let map = {}
  for (num in list) {
    map[list[num]] = 1
  }
  list = []
  map[Class] = Class
  // console.log(map)
  for (num in map){
    list.push(num)
  }
  element.className = list.join(' ')
}
function lessClass(element, Class) {
  let list = element.className.split(' ')
  // console.log(list)
  map = {}
  for(num in list){
    if(list[num] == Class){
      continue
    }
    map[list[num]] = 1
  }
  list = []
  // console.log(map)
  for(num in map){
    list.push(num)
  }
  element.className = list.join(' ')
}

function ToImg(){
  let img = [getElementClass('img')[0],getElementClass('img')[1],getElementClass('img')[2]]
  let nev = [getElementClass('nev_')[0],getElementClass('nev_')[1],getElementClass('nev_')[2]]
  for(let i =0;i<3;i++){
    if(i==nowImg){
      lessClass(img[i],'hidden')
      addClass(nev[i],'nev_in')
    }
    else{
      addClass(img[i],'hidden')
      lessClass(nev[i],'nev_in')
    }
  }
}
function imgChange(num,num2){
  if(num > 0){
    if(nowImg == 2){
      nowImg = 0
    }else{
      nowImg ++
    }
  }else if (num < 0){
    if(nowImg == 0){
      nowImg = 2
    }else{
      nowImg --
    }
  }else if (num == 0){
    nowImg = num2
  }
  ToImg()
}


ToImg()
let inc = setInterval(() => {
  imgChange(1)
}, 5000);


function change(num,num2){
  clearInterval(inc)
  imgChange(num,num2)
  inc = setInterval(() => {
    imgChange(1)
  }, 5000);
}