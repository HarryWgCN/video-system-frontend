<template>
  <div id='up_load_file'>
    <h1 class='word'>上传待处理视频</h1>
    <el-upload
      class="upload-demo"
      action="http://10.112.207.79:8100/vs-filesystem/file?dirPath=/2020110710/video_system/videos"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :file-list="fileList">
      <el-button size="small" type="primary"  @click="confirmUpload()">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogOfUpload: false,
      fileList: [],
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleChange (file, fileList) { // 文件数量改变
      this.fileList = fileList
    },

    confirmUpload () { // 确认上传
      var param = new FormData()
      var this_ = this
      this.fileList.forEach(
        (val, index) => {
          param.append('file', val.raw)
        }
      )
      console.log(param.getAll('file'))
      this.$axios.post('/file?dirPath=/2020110710/video_system/videos', param).then(responce => {
        this_.$message({
          message: '上传成功！',
          duration: 2000
        })
        this_.fileList = []
        // TODO: message emit to SubmitProcess to be added
      })
    }
  }
}
</script>

<style>
.word {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.dialog-footer {
  margin-top: 20px;
}
</style>
