<template>
  <div class="mrps-w">
    <!-- :class="{ 'time-line-video': timeFlag === 'true' }" -->
    <div v-if="callrefid" class="mrps-a">
      <div
        :id="'mrps-video-wrap' + alarmId + timeFlag"
        class="video-wrap-m"
        v-show="!playFlag"
      >
        <div>
          <video
            :id="'mrps-video' + alarmId + timeFlag"
            class="video-js vjs-default-skin vjs-playing vjs-controls-enabled vjs-workinghover vjs-v7 vjs-has-started my-video-dimensions vjs-user-active"
            controls
            preload="none"
            data-setup="{}"
          >
            <source :src="mrpsUrl" type="application/x-mpegURL" />
          </video>
        </div>
      </div>
      <div
        class="model-mrps"
        v-show="playFlag"
        @click.stop="mrpsFn"
        :class="{ disable: !playFlag }"
      >
        <span class="mrps-icon" :class="{ 'time-icon': timeFlag }"></span>
        <div class="progress-w" v-show="!timeFlag">
          <div class="process-icon"></div>
        </div>
        <span>{{ timeFn(mrpsTime) }}</span>
      </div>
    </div>
    <div v-else class="no-mrps">{{ $t('addAlarmInfo.noRecord') }}</div>
    <!-- <div @click="getMPRS('20220326073358000818', '1')">播放</div> -->
    <div @click="download"></div>
  </div>
</template>

<script>
import {
  queryCalls,
  playMediaTask,
  mrpsLoginGetToken,
  mrpsCheckToken,
} from '../../api/mrps';
import md5 from 'js-md5';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import videojs from 'video.js';
import VideojsZhcnLanguage from 'video.js/dist/lang/zh-CN.json';
import VideojsENLanguage from 'video.js/dist/lang/en.json';
import { urlTransfer } from '@path/utils/urlTransfer';

export default {
  data() {
    return {
      playFlag: true,
      player: null,
      videoFlag: true,
      count: 0,
      mrpsTime: '',
      currentIndex: 0,
      mrpsUrl:
        'http://20.0.10.207:8880/mrps-streamserver/mediaPlay/mediafileLocal/QzpcUFJPR1JBfjJcTVJQU1xSZWNvcmRcUkVQTEFZfjFcVG1wSExTXDIwMjIwMzI2MTY1MzU1X19fMjAyMDZc/20220326165355___000000000000.m3u8',
      playArr: [],
    };
  },
  created() {
    this.videoFlag = true;
    this.getQuery();
  },
  props: {
    timeFlag: String, // 专属时间轴
    alarmId: String, // 给video加唯一性
    callrefid: String, // 话务id
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.getQuery();
  },
  methods: {
     // 批量下载
    download() {
      if (this.fileArr.length === 0 || this.playArr.length === 0) {
        this.$message.error(this.$t('recordingQuery.noFile'));
        return;
      }
      clearInterval(this.timer);
      this.percentComplete = 0;
      this.timer = setInterval(() => {
        this.percentComplete++;
        if (this.percentComplete >= 100) {
          this.percentComplete = 100;
          clearInterval(this.timer);
        }
      }, 50);
      const _this = this;
      const fileArr = this.fileArr;
      let newPlayArr = [];
      this.playArr.forEach(a => {
        newPlayArr.push(a.id)
      });
      const newArr2 = fileArr.filter(item => newPlayArr.includes(item.callrefid))
      console.log(newArr2);
      let newArr = [];
      let listIndex = 0;
      newArr2.forEach((list) => {
        // 创建下载任务
        createMediaTask({
          download_guid: this.guid(),
          media_file_path: list.media_file_path,
          media_file: list.media_file,
          guid: list.guid,
        }).then((res) => {
          listIndex++;
          // 获取下载进度
          if (res.data && res.data.result) {
            if (res.data.msgcode === 10005) {
              this.getMPRS('', 1);
              return false;
            }
            getTaskProgress({
              download_guid: res.data.result.download_guid,
              guid: list.guid,
            }).then((res2) => {
              if (res2.msgcode === 200) {
                setTimeout(() => {
                  // 判断下载完成
                  checkTask({
                    download_guid: res2.result.download_guid,
                    media_file_path: list.media_file_path,
                    media_file: list.media_file,
                    guid: list.guid,
                  }).then((res3) => {
                    if (res3.msgcode === 200) {
                      let ret3 = res3.result.download_file_path.split('/');
                      // 获取地址
                      getDownloadip({
                        download_file_path: ret3[0] + '/',
                        download_file_name: ret3[1],
                      }).then((res4) => {
                        if (res4.data.msgcode === 200) {
                          newArr.push(urlTransfer(res4.data.result.stream_address));
                          if (newArr.length === _this.playArr.length) {
                            // 下载到本地
                            _this.downloadAll(newArr);
                          }
                        }
                       
                        // this.downloadFile(newArr);
                      });
                    }
                    
                    // setTimeout(() => {
                    //   this.downloadFile(newArr);
                    // }, 2000);
                  });
                }, 2000);
              }
              // if (res2.)
            });
          }
        });
      });
    },
    downloadAll(data1) {
      const _this = this;
      const zip = new JSZip();
      const cache = {};
      const promises = [];
      data1.forEach((item) => {
        const promise = this.getFile(item).then((data) => {
          const arr_name = item.split('='); // 下载文件, 并存成ArrayBuffer对象
          const file_name = arr_name[arr_name.length - 1]; // 获取文件名
          zip.file(file_name, data, { binary: true }); // 逐个添加文件
          cache[file_name] = data;
        });
        promises.push(promise);
      });
      if (_this.percentComplete > 98) {
        _this.percentComplete = 99;
        clearInterval(_this.timer);
      }
      Promise.all(promises).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          _this.percentComplete = 100;
          clearInterval(_this.timer);
          // 生成二进制流
          FileSaver.saveAs(content, +new Date() + '.zip'); // 利用file-saver保存文件  自定义文件名
        });
      });
    },
    init() {
      if (this.player) {
        this.player.dispose();
      }
      if (!this.callrefid) return;
      const _this = this;
      const str2 = `<video id="mrps-video${this.alarmId}${this.timeFlag}" class="video-js vjs-default-skin vjs-playing vjs-controls-enabled vjs-workinghover vjs-v7 vjs-has-started my-video-dimensions vjs-user-active" controls preload="none">
          <source id="source" src="${this.mrpsUrl}" type="application/x-mpegURL">
      </video>`;
      document.getElementById(
        'mrps-video-wrap' + this.alarmId + this.timeFlag,
      ).innerHTML = str2;
      this.videoLang();
      this.player = videojs(
        'mrps-video' + this.alarmId + this.timeFlag,
        {
          language: this.$i18n.locale,
          controls: true,
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false,
          controlBar: true,
        },
        function () {
          this.on('play', () => {
            if (!_this.callrefid) {
              this.src({
                type: 'application/x-mpegURL',
                src: '',
              });
              this.play.paused();
              _this.$message.info(this.$t('addAlarmInfo.noRecord'));
            } else {
              _this.getToken(_this.callrefid, '1');
            }
          });
        },
      );
    },
    timeFn(str) {
      if (!str) return '0:00';
      let a; // 分
      let i; // 秒
      str = Number(str);
      const e = parseInt(str / 3600); // 小时
      if (str < 60) {
        return '00:' + str.toString().padStart(2, '0');
      }
      if (str < 3600) {
        return (
          (a = parseInt(str / 60)).toString().padStart(2, '0') +
          ':' +
          (i = str % 60).toString().padStart(2, '0')
        );
      }
      if (str >= 3600) {
        return (
          e.toString().padStart(2, '0') +
          ':' +
          // eslint-disable-next-line no-unused-vars
          (a = parseInt((str % 3600) / 60)).toString().padStart(2, '0') +
          ':' +
          // eslint-disable-next-line no-unused-vars
          (i = str % 60).toString().padStart(2, '0')
        );
      }
    },
    getQuery() {
      if (this.callrefid) {
        queryCalls({
          page_size: 10,
          page_index: 1,
          callrefid: this.callrefid,
        }).then((res) => {
          if (res.msgcode === 200) {
            if (res.result.data.length > 0) {
              this.mrpsTime = res.result.data[0].call_duration;
            }
          }
        });
      }
    },
    mrpsFn() {
      this.$message.destroy();
      if (!this.callrefid) {
        this.$message.info(this.$t('addAlarmInfo.noRecord'));
      } else {
        this.getToken(this.callrefid);
      }
    },
    // video设置语言
    videoLang() {
      const lang = this.$i18n.locale;
      if (lang === 'zh-CN') {
        videojs.addLanguage(lang, VideojsZhcnLanguage);
      } else {
        videojs.addLanguage(lang, VideojsENLanguage);
      }
    },
    unique(arr) {
      arr = arr.filter((item, index) => {
        return arr.findIndex((item1) => item1.src === item.src) === index;
      });
      return arr;
    },
    getMPRS(callrefid, flag) {
      // 登录
      mrpsLoginGetToken({
        user_name: window.ICC_SYSCONFIG.mrpsUserName,
        password: md5(window.ICC_SYSCONFIG.mrpsPwd),
      }).then((res) => {
        if (res.msgcode === 200) {
          localStorage.setItem('MRPSTOKEN', res.result.access_token);
          // 验证token
          mrpsCheckToken({
            access_token: res.result.access_token,
          }).then((ret) => {
            this.getToken(callrefid, 'flag');
          });
        } else {
          this.$message.info(this.$t('addAlarmInfo.PlayFaild'));
        }
      });
    },
    getToken(callrefid, tokenFlag) {
      this.$message.destroy();
      this.count = 0;
      // this.playArr = [];
      const _this = this;
      // let callrefLastid = callrefid[callrefid.length - 1];
      const callrefLastid = this.callrefid;
      const form = {
        page_size: 10,
        page_index: 1,
        // start_time: startTime,
        // end_time: endTime
        // callrefid: callrefLastid,
        callrefid: this.callrefid,
        // caseid: ''
      };
      if (!this.callrefid) return;
      // 获取录音文件
      queryCalls(form)
        .then((res) => {
          if (res.msgcode === 200) {
            if (res.result.data.length > 0) {
              const guidArr = res.result.data;
              guidArr.forEach((a) => {
                // 获取播放地址
                playMediaTask({
                  // download_guid: this.guid(),
                  radio_backup: 1,
                  guid: a.guid,
                }).then((ret) => {
                  this.count++;
                  if (ret.data.result && ret.data.result.stream_address) {
                    _this.playArr.push({
                      id: callrefLastid,
                      src: urlTransfer(ret.data.result.stream_address),
                    });
                    const newPlayArr = [];
                    _this.playArr.forEach((item) => {
                      if (callrefid.indexOf(item.id) > -1) {
                        newPlayArr.push(item);
                      }
                    });
                    _this.mrpsUrl = _this.playArr[0].src;
                    _this.playArr = this.unique(newPlayArr);
                    setTimeout(() => {
                      if (this.count === guidArr.length) {
                        setTimeout(() => {
                          if (
                            document.getElementById(
                              'mrps-video-wrap' +
                                _this.alarmId +
                                _this.timeFlag,
                            )
                          ) {
                            if (_this.player) {
                              // _this.player = null;
                              // _this.player.pause();
                              _this.player.dispose();
                            }
                          }
                          const str2 = `<video id="mrps-video${_this.alarmId}${_this.timeFlag}"  class="video-js vjs-default-skin vjs-playing vjs-controls-enabled vjs-workinghover vjs-v7 vjs-has-started my-video-dimensions vjs-user-active"
                                controls
                                preload="none">
                              <source id="source" src="${_this.playArr[0].src}" type="application/x-mpegURL">
                          </video>`;
                          document.getElementById(
                            'mrps-video-wrap' + this.alarmId + this.timeFlag,
                          ).innerHTML = str2;
                          _this.videoLang();
                          _this.player = videojs(
                            'mrps-video' + _this.alarmId + this.timeFlag,
                            {
                              language: _this.$i18n.locale,
                              bigPlayButton: false,
                              textTrackDisplay: false,
                              posterImage: false,
                              errorDisplay: false,
                              controlBar: true,
                            },
                            function () {
                              setTimeout(() => {
                                this.play();
                              }, 1000);
                              _this.player = this;
                              _this.playFlag = false;
                              this.on('ended', function () {
                                if (
                                  _this.playArr.length - 1 >
                                  _this.currentIndex
                                ) {
                                  _this.currentIndex++;
                                  // _this.playVideo(_this.playArr[_this.currentIndex]);
                                  this.src({
                                    type: 'application/x-mpegURL',
                                    src: _this.playArr[_this.currentIndex].src,
                                  });
                                  this.play();
                                }
                              });
                              // this.on('loadedmetadata', function () {
                              //   const videoLength = _this.player.duration();
                              //   this.pause();
                              // });
                              _this.currentIndex = 0;
                            },
                          );
                        }, 1000);
                        return false;
                      } else {
                        return false;
                      }
                    }, 50);
                  }
                });
              });
            } else {
              // 没有录音
              this.$message.info(this.$t('addAlarmInfo.noRecord'));
            }
          } else {
            if (!tokenFlag) {
              this.getMPRS(callrefid);
            } else {
              this.$message.info(this.$t('addAlarmInfo.PlayFaild'));
            }
            return false;
          }
        })
        .catch(() => {
          this.$message.info(this.$t('addAlarmInfo.PlayFaild'));
        });
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  watch: {
    callrefid: {
      handler(v, d) {
        // this.getQuery();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.time-line-video {
  width: 80px;
  /deep/ .video-wrap-m {
    width: 80px;
    .vjs-progress-control {
      display: none !important;
    }
    .vjs-play-control {
      margin-left: 5px;
    }
    .vjs-control-bar {
      padding: 0;
    }
  }
}
.mrps-w {
  position: relative;
  width: 80px;
  height: 32px;
  .no-mrps {
    line-height: 32px;
    white-space: nowrap;
  }
  .mrps-a {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 32px;
  }
  .model-mrps {
    position: absolute;
    width: 100%;
    height: 32px;
    z-index: 10;
    left: 0;
    top: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 10px 0 15px;
    border-radius: 12px;
    background-color: #fff;
    &.disable {
      pointer-events: none;
    }
    .mrps-icon {
      width: 0;
      height: 0;
      display: block;
      border-top: 6px solid transparent;
      border-left: 10px solid #000;
      border-bottom: 6px solid transparent;
      &.time-icon {
        margin-right: 10px;
      }
    }
    .progress-w {
      flex: 1;
      height: 4px;
      background-color: rgba(115, 133, 159, 0.5);
      position: relative;
      margin: 0 10px 0 17px;
      .process-icon {
        position: absolute;
        left: 0;
        top: -4px;
        width: 12px;
        height: 12px;
        background-color: #000;
        border-radius: 50%;
      }
    }
  }
}
.video-wrap-m {
  width: 240px;
  height: 30px;
  font-size: 14px;
  background: #fff !important;
  position: relative;
  border-radius: 15px;
}
/deep/ .video-js {
  width: 100%;
  height: 30px;
  background: #fff !important;
  font-size: 14px;
  border-radius: 15px;
  .vjs-live-control {
    display: none !important;
  }
  .vjs-seek-to-live-control {
    display: none !important;
  }
  .vjs-volume-panel-horizontal {
    display: none;
  }
  .vjs-progress-control {
    width: 100px;
    min-width: 100px;
  }
  .vjs-duration {
    display: none;
    // display: block !important;
    // padding-right: 2px;
    // position: absolute;
    // line-height: 30px;
    // right: 10px;
  }
  .vjs-current-time {
    display: none !important;
    padding-right: 2px;
    position: absolute;
    line-height: 30px;
    right: 10px;
  }
  .vjs-remaining-time {
    display: flex;
    align-items: center;
    span {
      &:nth-child(2) {
        display: none;
      }
    }
  }
  .vjs-play-control {
    width: 20px;
    margin-right: 10px;
  }
  .vjs-button > .vjs-icon-placeholder:before {
    line-height: 30px;
  }
  .vjs-control-bar {
    height: 30px;
    opacity: 1 !important;
    padding-right: 0;
    padding-left: 8px;
    position: absolute;
    background-color: transparent;
    top: 0;
    color: #000;
    .vjs-picture-in-picture-control {
      display: none;
    }
    .vjs-fullscreen-control {
      display: none;
    }
    .vjs-play-progress {
      background-color: #a1acbf;
    }
    .vjs-volume-level {
      background-color: #a1acbf;
    }
    .vjs-volume-panel {
      position: absolute;
      right: 0;
    }
  }
  /deep/ .my-video_html5_api {
    background-color: transparent;
  }
}
</style>
