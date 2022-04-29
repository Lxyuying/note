// npm install --save lodash
import _ from 'lodash';
// go-back-管理资源
// import './style.css';
// import './iconfont.css'
// import Icon from './mkm.jpg';
// import Data from './data.xml';
// import Notes from './data.csv';
// import toml from './data.toml';
// import yaml from './data.yaml';
// import json from './data.json5';

import printMe from './print.js';

// console.log(toml.title); // output `TOML Example`
// console.log(toml.owner.name); // output `Tom Preston-Werner`

// console.log(yaml.title); // output `YAML Example`
// console.log(yaml.owner.name); // output `Tom Preston-Werner`

// console.log(json.title); // output `JSON5 Example`
// console.log(json.owner.name); // output `Tom Preston-Werner`

function component () {

  // console.log(Data);
  // console.log(Notes);

  const element = document.createElement('div');
  const btn = document.createElement('button');
  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);
  
  // element.classList.add('hello');
  // // 将图像添加到我们已经存在的 div 中。
  // const myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);
  // const element1 = document.createElement('span');
  // element1.classList.add('iconfont');
  // element1.classList.add('icon-baidussp');
  // const element2 = document.createElement('span');
  // element2.classList.add('iconfont');
  // element2.classList.add('icon-denglupeizhi')
  // const element3 = document.createElement('span');
  // element3.classList.add('iconfont');
  // element3.classList.add('icon-cebianlan')
  // const element4 = document.createElement('span');
  // element4.classList.add('iconfont');
  // element4.classList.add('icon-fenxiangzujian')
  // const element5 = document.createElement('span');
  // element5.classList.add('iconfont');
  // element5.classList.add('icon-dingbudaohang')
  // const element6 = document.createElement('span');
  // element6.classList.add('iconfont');
  // element6.classList.add('icon-dongman9-01')
  // return [element,element1,element2,element3,element4,element5,element6];
  return element
}
// const elements = component();
// for (let i = 0; i < elements.length; i++) {
//   document.body.appendChild(elements[i]);
// }

document.body.appendChild(component());