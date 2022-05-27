// mq服务器连接配置
const mqServes = {
    host: window.ICC_SYSCONFIG.mqHost,
    port: window.ICC_SYSCONFIG.mqPort,
    endpoint: '/amq/wss',
    clientId: new Date().getTime(),
    username: window.ICC_SYSCONFIG.mqUserName,
    password: window.ICC_SYSCONFIG.mqPassword,
  };
  
  // 各消息订阅的主题
const requestData = {
    //
    monitor_sync: {
      connection: mqServes,
      subscription: {
        topic: 'topic_monitor_sync',
        qos: 0,
      },
    },
}

export default requestData;
