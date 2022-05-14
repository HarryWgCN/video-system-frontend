<template>
  <el-descriptions>
    <el-descriptions-item label="视频名称">{{name}}</el-descriptions-item>
    <el-descriptions-item label="时长">{{duration}}s</el-descriptions-item>
    <el-descriptions-item label="帧尺寸">宽: {{width}}px 高: {{height}}px</el-descriptions-item>
    <el-descriptions-item label="格式">
      <el-tag size="small">{{format}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="文件大小">{{size}}MB</el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: 'Description',
  data: function () {
    return {
      name: '球场七侠',
      duration: '158',
      format: 'mp4',
      width: '1920',
      height: '1080',
      size: '44.2'
    }
  }
}
</script>

<style>
</style>
