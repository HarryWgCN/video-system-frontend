<template>
  <div id='dropdown_box'>
    <el-dropdown @command="handleCommand" id='drop_down_'>
      <span class="el-dropdown-link">
        {{selectProcess.name}} - {{translateState(selectProcess)}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(process) in process_list" :key="process.id" :command="process">
          {{process.name}} - {{translateState(process)}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      process_list: [],
      selectProcess: ''
    }
  },
  props: {
    submitProcessSign: {
      type: Number,
      required: true // 缺失，控制台报错
    }
  },
  mounted: function () {
    this.forMounted()
  },
  watch: {
    submitProcessSign: function () {
      console.log('submitProcessSign changed')
      this.forMounted()
    }
  },
  methods: {
    forMounted: function () {
      var this_ = this
      this.$axios.get('http://10.112.207.79:8100/vs-portal/video-process/list', {
        params: {
          userId: '2020110710'
        }
      }).then(function (response) {
        console.log(response)
        this_.process_list = response.data.data.splice(0, 10)
        this_.selectProcess = this_.process_list[0]
        this_.$emit('process-change-event', this_.selectProcess)
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleCommand: function (command) {
      this.selectProcess = command
      this.$emit('process-change-event', this.selectProcess)
    },
    translateState: function (process) {
      switch (process.state) {
        case 1:
          return '等待服务器资源处理'
        case 2:
          return '预处理中'
        case 3:
          return '关系网络生成中'
        case 4:
          return '已完成'
        case 5:
          return '已失败'
        case 6:
          return '已停止'
      }
    }
  }
}
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    margin-top: 30px;
  }
  .el-icon-arrow-down {
    font-size: 20px;
  }
  #drop_down_ {
    margin-top: 5px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
  }
  #dropdown_box {
    background-color: #545c64;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
</style>
