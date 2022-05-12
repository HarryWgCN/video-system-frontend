<template>
  <div>
    <el-upload class="upload-demo"
    action="#"
    drag
    multiple
    :headers="headers"
    :auto-upload="false"
    :file-list="fileList"
    :on-change="handleChange">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmUpload()">上 传</el-button>
    </div>
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
