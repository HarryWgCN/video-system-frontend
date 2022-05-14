<template>
  <div id='up_load_file'>
    <h1 class='word'>上传待处理视频</h1>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
