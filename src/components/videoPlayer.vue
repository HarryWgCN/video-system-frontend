<template>
  <div class="my_video">
    <el-row>
      <DropDown @process-change-event='processChange'></DropDown>
    </el-row>
    <el-row>
      <div class="style1">
        <span style="font-size:17px;width:200px;margin-right: 30px">
          <p>{{introduction1}}</p>
          <p>{{introduction2}}</p>
        </span>
      </div>
    </el-row>
    <el-row>
      <video-player  class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="videoPlayerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @statechanged="playerStateChanged($event)"
                    @ready="playerReadied"
      ></video-player>
    </el-row>
    <div>
      <el-col :span="12" id='uploader'>
      <Uploader></Uploader>
      </el-col>
      <el-col :span="12" id='submit_process'>
        <el-row>
          <h1 class='word'>提交视频处理任务</h1>
        </el-row>
        <SubmitProcess></SubmitProcess>
      </el-col>
    </div>
  </div>
</template>

<script>
// 导入组件
import {videoPlayer} from 'vue-video-player'
import Uploader from '@/components/videoProcess/Uploader.vue'
import DropDown from '@/components/videoProcess/DropDown.vue'
import SubmitProcess from '@/components/videoProcess/SubmitProcess.vue'
export default {
  name: 'VideoPlayer',
  components: {
    videoPlayer, Uploader, DropDown, SubmitProcess
  },
  data () {
    return {
      selectProcess: 'yeqiudi', // 具体视频
      fileType: 'mp4', // 资源的类型
      videoUrl: '', // 资源的路径地址
      posterUrl: '', // 封面地址
      introduction1: '基于视频的社交关系网络构建致力于解决人们对于视频中人物社交关系信息抽取的需求，主流影评网站对于视频会给出人物关系图谱帮助用户理解影视作品中复杂的人物关系，影视解说频道会在讲解剧情的同时辅以人物关系图表进行讲解，同时公安侦查、情报分析中也会对大量的视频线索进行信息抽取分析，试图将其中隐含的社交关系挖掘出来，本系统中视频人物社交关系网络构建与分析对各领域的需求提供一站式、易于操作的网络服务。',
      introduction2: '本平台左侧可以进行任务选择、视频预览、视频上传、任务提交，右侧进行各种处理结果的展示，包括视频信息（原视频的静态属性）、视频处理信息（分镜抽帧结果、目标检测结果、人脸聚类结果）、视频人物（人物图片）、人物特征（人脸特征可视化）、人物关系网络'
    }
  },
  mounted () {

  },
  methods: {
    processChange: function (selectProcess) {
      console.log('video_player caught process change', selectProcess)
      this.selectProcess = selectProcess
      this.$emit('process-change-event', selectProcess)
    },
    // 播放回调
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },

    // 暂停回调
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },

    // 视频播完回调
    onPlayerEnded ($event) {
      this.$refs.videoPlayer.player.src(this.fileUrl)
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting ($event) {
      // console.log(player)
    },

    // 已开始播放回调
    onPlayerPlaying ($event) {
      // console.log(player)
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata ($event) {
      // console.log(player)
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate ($event) {
      var videoSeconds = $event.cache_.currentTime
      this.$emit('video-seconds-change-event', videoSeconds)
    },

    // 媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay (player) {
      // console.log('player Canplay!', player)
    },

    // 媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },

    // 播放状态改变回调
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // 将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied (player) {
      // console.log('example player 1 readied', player);
    }
  },
  computed: {
    videoPlayerOptions () {
      const videoPlayerOptions = {
        playbackRates: [0.75, 1.0, 1.25, 1.5, 2.0], // 播放速度
        autoplay: false, // 是否自动播放。
        muted: false, // 是否静音播放，默认情况下将会消除任何音频。
        loop: false, // 是否循环播放。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '3:1', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 是否流体从而按比例缩放以适应其容器。
        flash: {hls: {withCreadentials: false}}, // 可以播放rtmp视频
        html5: {hls: {withCreadentials: false}}, // 可以播放m3u8视频
        sources: [{
          type: 'video/' + this.fileType,
          src: this.$axios.defaults.baseURL + '/file/video-preview?filePath=/2020110710/' + this.selectProcess.videoPath // 视频url地址
        }],
        poster: this.posterUrl, // 封面地址
        width: '100%',
        notSupportedMessage: '此视频暂无法播放...', // 当无法播放时允许覆盖Video.js，显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
      return videoPlayerOptions
    }
  }
}
</script>
<style scoped lang="less">
  .style1{
    background-color: rgb(231, 197, 136);
    text-align:left;
    text-indent: 2em;
    margin-top: 10px;
    height: 180px;
    margin-bottom: 0px;
    padding-top: 10px;
  }
  .my_video {
    width: 100%;
    height: calc(100vh);
  }
  .video-player {
    margin-top: 20px;
  }
  .video-js .vjs-big-play-button{
    /*对播放按钮的样式进行设置*/
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  #uploader{
    margin-left: 40px;
    margin-top: 10px;
    padding: 20px;
    width: 400px;
    // height: 380px;
    border-radius: 4px;
    background-color: white;
    box-shadow: 10px 10px 5px #888888;
  }
  #submit_process {
    margin-left: 60px;
    // height: 380px;
    background-color: white;
    margin-top: 10px;
    padding: 5px;
    width: 400px;
    border-radius: 4px;
    box-shadow: 10px 10px 5px #888888;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

</style>
