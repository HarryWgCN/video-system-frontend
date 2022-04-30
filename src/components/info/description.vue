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
  data: function () {
    return {
      name: 'Legal_High',
      duration: '30',
      format: 'mp4',
      width: '800',
      height: '600',
      size: '1280'
    }
  }
}
</script>

<style>
</style>
