---
title: 方法
date: 2022-01-04
---

# 方法 en

- [秒转时分秒](#_1-秒转时分秒)
- [补零](#_2-补零)
- [获取日期格式化](#_3-获取日期格式化)
- [下载文件进度条](#_4-下载文件进度条)

## 1.秒转时分秒

```javascript
 this.$bus.$on(DEVICE_STATE_SYNC, res => {
      console.log(this.seartData);
      let arr = [];
      this.seartData.forEach((item, i) => {
        if (item.device === res.device) {
          // this.seartData[i] = res;
          this.$set(this.seartData, i, res);
        }
        arr.push({ ...item, count: 0 });
      });
      this.seartData = arr;
      this.seartData.forEach((item, i) => {
        this.timer = setInterval(() => {
          item.count++;
        }, 1000);
        this.$set(this.seartData, i, item);
      });

      console.log(this.seartData);
    });


timeFn(str) {
  if (!str) return '-';
  var a; // 分
  var i; // 秒
  var e = parseInt(str / 3600); // 小时
  if (str < 60) {
    return '00:' + str.toString().padStart(2, '0');
  }
  if (str < 3600) {
    return (a = parseInt(str / 60)).toString().padStart(2, '0') + ':' + (i = str % 60).toString().padStart(2, '0');
  }
  if (str >= 3600) {
    return (
      e.toString().padStart(2, '0') +
      ':' +
      (a = parseInt((str % 3600) / 60)).toString().padStart(2, '0') +
      ':' +
      (i = str % 60).toString().padStart(2, '0')
    );
  }
},
```

## 2.补零

```javascript
num.toString().padStart(2, "0");
```

## 3.获取日期格式化

```javascript

  time(type, date, str) {
    let myDate = new Date();
    if (date) {
      myDate = new Date(myDate);
    }
    if (!str) {
      str = '-';
    }
    const y = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    const m = (myDate.getMonth() + 1).toString().padStart(2, '0'); // 获取当前月份(0-11,0代表1月)
    const d = myDate.getDate().toString().padStart(2, '0'); // 获取当前日(1-31)
    const h = myDate.getHours().toString().padStart(2, '0'); // 获取当前小时数(0-23)
    const min = myDate.getMinutes().toString().padStart(2, '0'); // 获取当前分钟数(0-59)
    const s = myDate.getSeconds().toString().padStart(2, '0'); // 获取当前秒数(0-59)
    if (type === 1) {
      return y + str + m + str + d + ' ' + '00:00:00';
    }
    return y + str + m + str + d + ' ' + h + ':' + min + ':' + s;
  },

```

## 4.下载文件进度条

```javascript

download() {
  const _this = this;
  const audioUrl = this.audioUrl;
  const xhr = new XMLHttpRequest();
  const downloadUrl = this.audioUrl;
  const xhrm = xhr.open('GET', downloadUrl, true);
  console.log(xhrm);
  xhr.addEventListener(
    'progress',
    function (event) {
      // 响应头要有Content-Length
      if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        console.log(percentComplete); // 最后输出1
        _this.percentComplete = percentComplete;
        if (percentComplete === 1) {
          var link = document.createElement('a');
          link.href = audioUrl;
          const str = audioUrl.split('/');
          const lastName = str[str.length - 1];
          // 获取文件名
          link.download = lastName.substring(0, lastName.lastIndexOf('.'));
          link.click();
        }
      }
    },
    false
  );
  xhr.send();
},
```

## 5.数组转化

```javascript
const arrObj = [
  {
    入职日期: 43535,
    姓名: "张三",
    工号: "9527",
    手机号: "13899999999",
    转正日期: 43719,
  },
  {
    入职日期: 43535,
    姓名: "李四",
    工号: 9528,
    手机号: 18255555555,
    转正日期: "43719",
  },
];

const obj = {
  入职日期: "timeOfEntry",
  姓名: "username",
  工号: "workNumber",
  手机号: "mobile",
  转正日期: "correctionTime",
};

const newArr = arrObj.map((item) => {
  const newObj = {};
  for (let chineseKey in obj) {
    newObj[obj[chineseKey]] = item[chineseKey];
  }
  return newObj;
});
```
