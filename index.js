import alfy from 'alfy';
import * as crypto from 'crypto';

const appid = process.env['APPID'];
const key = process.env['KEY'];
const salt = new Date().getTime();
const query = alfy.input;
const from = 'auto';
const to = 'zh';
const str1 = appid + query + salt + key;
const sign = crypto.createHash('md5').update(str1).digest('hex');

const data = await alfy.fetch(
  'http://api.fanyi.baidu.com/api/trans/vip/translate',
  {
    query: {
      q: query,
      appid: appid,
      salt: salt,
      from: from,
      to: to,
      sign: sign,
    },
  }
);

const items = [];

for (let element of data.trans_result) {
  items.push({
    title: element.dst,
    subtitle: element.src,
    arg: element.dst,
  });
}

alfy.output(items);
