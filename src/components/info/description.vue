<template>
  <el-descriptions>
    <el-descriptions-item label="视频名称">{{name}}</el-descriptions-item>
    <el-descriptions-item label="时长">{{duration}}s</el-descriptions-item>
    <el-descriptions-item label="帧尺寸">宽: {{width}}px 高: {{height}}px</el-descriptions-item>
    <el-descriptions-item label="格式">
      <el-tag size="small">{{format}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="文件大小">{{size}}Mb</el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: 'Description',
  props: {
    processId: {
      type: Number,
      required: true // 缺失，控制台报错
    }
  },
  data: function () {
    return {
      name: 'Legal_High',
      duration: '30',
      format: 'mp4',
      width: '800',
      height: '600',
      size: '1280'
    }
  },
  watch: {
    processId: function () {
      console.log('processId changed')
      this.forMounted()
    }
  },
  mounted() {
    this.forMounted()
  },
  methods: {
    forMounted() {
      const url = `http://10.112.207.79:8100/vs-portal/video-process/${this.processId}`
      this.$axios.get(url)
        .then((response) => {
          const data = response.data.data
          const videoPath = data.videoPath.split('/')
          const video = videoPath[videoPath.length - 1].split('.');
          const videoName = video[0], format = video[1]
          this.name = videoName
          this.duration = data.videoDuration
          this.format = format
          this.width = data.videoWidth
          this.height = data.videoHeight
          this.size = Math.floor(data.videoSize / 1024 / 1024)
        })
    }
  }
}
</script>

<style>
</style>
