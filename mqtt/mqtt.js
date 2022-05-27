import mqtt from 'mqtt';

const connectObj = {
  clean: true, // 保留会话
  connectTimeout: 4000, // 超时时间
  reconnectPeriod: 4000, // 重连时间间隔
};
window.client = {
  connected: false,
};

/**
 * 创建mqtt连接
 * @param {Object} connection // 连接对象，包括host(连接ip)、port(连接端口)、endpoint(mq连接端口后的路径)、
 *                               clientId(必须全局唯一)、username(用户名)、password(密码)
 * @param {Object} subscription // 订阅主题对象，包括topic(订阅主题, 要与接受消息mq接口的主题一致)、
 *                                 qos(一套保证消息稳定传输的机制，包括消息应答、存储和重传, 0:至多一次, 1:至少一次, 2:确保只有一次)
 * @param {Function} subSuccessCb // 订阅成功回调函数
 * @param {Function} subErrorCb // 订阅失败回调函数
 * @param {Function} connectSuccessCb  // 连接成功回调
 */
const createConnection = (
  connection,
  subscription,
  subSuccessCb,
  connectSuccessCb,
  subErrorCb,
) => {
  // 创建链接
  const newConnection = Object.assign(connectObj, connection);
  const { host, port, endpoint, ...options } = newConnection;

  const connectUrl = `wss://${host}:${port}${endpoint}`;
  const { topic, qos } = subscription;
  window.client = mqtt.connect(connectUrl, options);
  window.client.on('connect', () => {
    console.log(`mq连接成功${new Date()}----`);
    window.client.subscribe(topic, qos, (err, res) => {
      if (!err) {
        subSuccessCb && subSuccessCb(res);
      }
    });
    connectSuccessCb && connectSuccessCb();
  });
  window.client.on('error', (error) => {
    subErrorCb && subErrorCb(error);
  });
  window.client.on('close', (error) => {
    console.log(error);
    // subErrorCb && subErrorCb(error);
  });
  window.client.on('disconnect', (error) => {
    subErrorCb && subErrorCb(error);
  });
  window.client.on('offline', (error) => {
    subErrorCb && subErrorCb(error);
  });
  window.client.on('reconnect', (error) => {
    console.log(`mq重连连接${new Date()}----`);
    subErrorCb && subErrorCb(error);
  });
};

/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */
const Uint8ArrayToString = (array) => {
  let out, i, c;
  let char2, char3;

  out = '';
  const len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0),
        );
        break;
    }
  }
  return out;
};

/**
 * 订阅主题
 * @param {Object} subscription // 订阅主题对象，包括topic(订阅主题)、qos(一套保证消息稳定传输的机制，
 *                                 包括消息应答、存储和重传, 0:至多一次, 1:至少一次, 2:确保只有一次)
 * @param {Function} subSuccessCb // 订阅成功回调函数
 */
const doSubscribe = (subscription, subSuccessCb) => {
  const { topic, qos } = subscription;
  window.client.subscribe(topic, qos, (error, res) => {
    if (error) {
      console.log('Subscribe to topics error', error);
      return;
    }
    window.client.on('message', (topic2, message) => {
      if (topic === topic2) {
        subSuccessCb && subSuccessCb(Uint8ArrayToString(message), topic2);
      }
    });
  });
};

/**
 * 取消订阅
 * @param {Object} subscription // 订阅主题对象，包括topic(订阅主题)、qos(一套保证消息稳定传输的机制，
 *                                 包括消息应答、存储和重传, 0:至多一次, 1:至少一次, 2:确保只有一次)
 * @param {Function} unSubSuccessCb // 取消订阅成功回调函数
 */
const doUnSubscribe = (subscription, unSubSuccessCb) => {
  const { topic } = subscription;
  window.client.unsubscribe(topic, (error, res) => {
    if (error) {
      console.log('Unsubscribe error', error);
      return;
    }
    unSubSuccessCb && unSubSuccessCb(res);
  });
};

/**
 * 发送消息
 * @param {Object} publish // 发送消息对象，包括topic(主题)、qos(一套保证消息稳定传输的机制，
 *                            包括消息应答、存储和重传, 0:至多一次, 1:至少一次, 2:确保只有一次), payload(对象题)
 * @param {Function} publishCb // 发送消息成功回调函数
 */
const doPublish = (publish, publishCb) => {
  const { topic, qos, payload } = publish;
  window.client.publish(topic, payload, qos, (error, res) => {
    if (error) {
      console.log('Publish error', error);
      return;
    }
    publishCb && publishCb(res);
  });
};

// 心跳
const doPingTimer = () => {
  if (!window.client._handlePingresp) return;
  window.client._handlePingresp({ cmd: 'pingreq' });
  if (!window.client._checkPing) return;
  window.client._checkPing({ cmd: 'pingreq' });
};

/**
 * 断开连接
 * @param {Function} desConnectionFn // 断开连接成功回调函数
 */
const destroyConnection = (desConnectionFn) => {
  if (window.client.connected) {
    try {
      window.client.end();
      window.client = {
        connected: false,
      };
      desConnectionFn && desConnectionFn();
      console.log('Successfully disconnected!');
    } catch (error) {
      console.log('Disconnect failed', error.toString());
    }
  }
};

export {
  createConnection,
  doSubscribe,
  doUnSubscribe,
  doPublish,
  destroyConnection,
  doPingTimer,
};
