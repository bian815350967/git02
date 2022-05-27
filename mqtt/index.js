import { doSubscribe } from './mqtt.js';
import requestData from './immediate.js';

import Vue from 'vue';

// 订阅主题
const subDeviceState = function () {
  doSubscribe(requestData.topic_device_state_sync.subscription, (res) => {
    const data = JSON.parse(res);
    Vue.prototype.$bus.$emit(DEVICE_STATE_SYNC, data.body);
  });
};

export {subDeviceState}
