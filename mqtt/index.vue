<template>
  <div>

  </div>
</template>

<script>
	import {subDeviceState} from './index.js';
  import {
    createConnection,
    destroyConnection,
    doPingTimer,
  } from './mqtt.js';
  import requestData from './immediate.js';

  export default {
    data() {
      return {
        heartBeatTimer: null,
      }
    },
    created() {
      this.mqttConnect();
    },
    methods: {
      mqttConnect() {
        // mqtt建立连接
        createConnection(
          requestData.monitor_sync.connection,
          requestData.monitor_sync.subscription,
          (res) => {
            subDeviceState();
            this.messageTip && this.messageTip.close();
          },
          this.connectSuccessCb,
          () => {
            // this.setMessageServer(false);
          },
        );
      },
      // mq连接成功后，启动线程给后台服务发心跳
      connectSuccessCb() {
        // this.setMessageServer(true);
        this.setCloseAlert(true);
        this.heartBeatTimer = new Worker(
          `${webpackConfig.publicPath}static/webWork/timeWork.js`,
        );
        this.heartBeatTimer.onmessage = () => {
          // 一分钟自动心跳
          // console.log(`一分钟自动心跳${new Date()}----`);
          doPingTimer();
        };
        this.heartBeatTimer.postMessage(60000);
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>