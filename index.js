let axios = require('axios');

(async function () {
  try {
    let responseData = await axios.get('http://www.0daydown.com/feed');
    let xml = responseData.data;
    let patt = /<link>(.*?)<\/link>/g;

    // console.log(xml.split);

    // get links
    let link;
    let links = [];
    (function getLinks() {
      link = patt.exec(xml);  // link不能是内部变量，why？？？
      if (link !== null) {
        links.push(link[1]);
        return getLinks();
      }
    })();

    // // test password
    // links.push('http://www.0daydown.com/08/412502.html');

    // console.log(links);
    let baiduPatt = /["|'](http:\/\/pan.baidu.com.*?)['|"]/g;
    for (link of links) {  // for of iterator??? 这个link与前面定义的关系
      let responseData = await axios.get(link);
      let html = responseData.data;

      // console.log(html);
      let baiduLink = baiduPatt.exec(html);
      if (baiduLink !== null) {
        let passwordPatt = /密码(.*?)<\/p>/g;
        let password = passwordPatt.exec(html);
        if (password !== null) {
          password = password[1];
        }

        console.log(baiduLink[1], password);
      }

    }
  } catch (e) {
    throw e;
  }
})();

// // console.log(odayXML.data);
// let link;
// let links;
// while ((link = patt.exec(odayXML.data)) !== null) {
//   links.push(link[1]);
// } 不能用while， why？？？？？？？？？？？？？？？？？？
// console.log('links: ');
// console.log(links);
// console.log(odayXML.data);
