<template>
  <div>
    <el-dropdown @command="handleCommand" id='drop_down'>
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
  mounted: function () {
    var this_ = this
    this.$axios.get('http://10.112.207.79:8100/vs-portal/video-process/list', {
      params: {
        userId: '2020110710'
      }
    }).then(function (response) {
      console.log(response)
      this_.process_list = response.data.data
      this_.selectProcess = this_.process_list[0]
      this_.$emit('process-change-event', this_.selectProcess)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
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
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  #drop_down {
    margin-bottom: 42.9px;
  }
</style>
