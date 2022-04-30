<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/description">视频信息</el-menu-item>
      <el-submenu index="2">
        <template slot="title">视频处理信息</template>
        <el-menu-item index="/frames">视频内容</el-menu-item>
        <el-menu-item index="/personclusters">视频人物</el-menu-item>
        <el-menu-item index="/personfeatures">人物特征</el-menu-item>
      </el-submenu>
      <el-menu-item index="/relations" >人物关系网络</el-menu-item>
      <el-menu-item index="4">
        <a href="https://www.bupt.edu.cn/" target="_blank" style='text-decoration:none;'>关于我们</a>
      </el-menu-item>
    </el-menu>
    <el-main class='navmenu_content'>
      <router-view v-bind:videoName='videoNameData'></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  props: {
    videoNameData: {
      type: String,
      required: true // 缺失，控制台报错
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navmenu_content{
  height: 700px
}
</style>
