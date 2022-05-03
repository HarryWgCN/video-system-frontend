<template>
  <div>
    <el-col :span="10" class="lightgreen-box">
      <el-dropdown @command="handleCommand" size="medium" split-button type="primary">
        {{selectVideo.name}}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(video) in videoList" :key="video.name" :command="video">
            {{video.name}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col :span="6" class="lightgreen-box">
      <el-input v-model="processNameInput" placeholder="请输入自定义任务名"></el-input>
    </el-col>
    <el-col :span="8" class="lightgreen-box">
      <el-button type="primary" @click='submitProcess'>提交任务</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      videoList: [],
      selectVideo: {name: '选择视频'},
      processNameInput: ''
    }
  },
  mounted: function () {
    var this_ = this
    this.$axios.get('/ls', {
      params: {
        dirPath: '/2020110710/video_system/videos'
      }
    }).then(function (response) {
      this_.videoList = response.data.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleCommand: function (command) {
      this.selectVideo = command
    },
    submitProcess: function () {
      var this_ = this
      this.$axios.post('http://10.112.207.79:8100/vs-portal/video-process?name=' + this_.processNameInput + '&userId=2020110710&videoPath=/video_system/videos/' + this_.selectVideo.name
      ).then(function (response) {
        if (response.data.code === '200') {
          this_.$message('任务提交成功')
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  #drop_down {
    margin-bottom: 42.9px;
  }
</style>
