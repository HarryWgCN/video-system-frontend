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
      <el-menu-item index="/video/description">视频信息</el-menu-item>
      <el-submenu index="2">
        <template slot="title">视频详细信息</template>
        <el-menu-item index="2-1">视频内容</el-menu-item>
        <el-menu-item index="2-2">视频人物</el-menu-item>
        <el-menu-item index="2-3">人物特征</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title" disabled>选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/video/relations" >人物关系网络</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.bupt.edu.cn/" target="_blank">关于我们</a></el-menu-item
      >
    </el-menu>
    <el-main>
      <router-view></router-view>
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
</style>
