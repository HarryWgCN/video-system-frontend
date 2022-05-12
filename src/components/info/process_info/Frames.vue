<template>
<div>
  <div class="breadcrumb">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='breadcrumb_entire'>
      <el-breadcrumb-item v-for="(subPath,index) in now_path" :key="index">
        <span
          :class="(index === now_path.length-1) ? 'breadcrumb-link-active': ''"
          class="breadcrumb-link"
          @click="backFileFolder(index)"
        >
          {{subPath}}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div id='file_dir' v-loading="loading">
    <div class="video-main" v-if='show_dir'>
      <ul class="list">
        <li
          v-for="(file) in elements"
          :key="file.name"
          :class="{active:file.active}"
          class="list-item"
          v-on:click='pressButton(file)'
        >
          <div class="inner">
            <span v-if='!file.hasOwnProperty("content")' v-bind:class="getClass(file)"></span>
            <el-image
              v-else-if="file.content.length > 0"
              :src= "'data:image/jpg;base64,' + file.content"
              class="icon-thumb"
              fit="contain"
              alt
            ></el-image>
            <span v-else v-bind:class="getClass(file)"></span>
          </div>
          <div class="file-name">
            <span :title="file.name">{{ file.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-else id="file">
      <el-carousel trigger="click">
        <el-carousel-item v-for="(src, index) in srcs" :key="index" :label="src.fileName">
          <el-image
            :src="src.src" 
            ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</div>
</template>

<script scoped>
export default {
  data: function () {
    return {
      elements: [], // 目录结构
      show_dir: true, // 是否显示目录结构，false展示文件
      srcs: [],
      now_path: ['frames'],
      clip: '', // 当前的路径
      loading: true,
      pageSize: 20
    }
  },
  props: {
    processId: {
      type: Number,
      required: true // 缺失，控制台报错
    }
  },
  watch: {
    processId: function () {
      console.log('processId changed')
      this.forMounted()
    }
  },
  mounted: function () {
    this.forMounted()
  },
  methods: {
    forMounted: function () {
      const url = `/video/${this.processId}/ls/clip`
      const params = {
        pageSize: this.pageSize,
        page: 0,
        clip: ''
      }
      this.$axios.get(url, { params: params })
        .then((response) => {
          this.elements = response.data.data.data
          this.show_dir = true
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.now_path = ['frames']
        })
    },
    getClass: function (value) { // 获取文件夹、文件对应css class
      return value.dir ? 'icon-folder' : 'icon-file'
    },
    backFileFolder: function (index) {
      switch (index) {
        case 0:
          this.now_path = this.now_path.slice(0, 1)
          this.forMounted()
          break
        case 1:
          const name = this.now_path[index]
          this.now_path = this.now_path.slice(0, 2)
          this.pressButton({name: name, dir: true})
          break
        default :
          break
      }
    },
    pressButton: function (file) { // 点击按钮请求新的目录结构或请求文件
      const name = file.name
      const isDir = file.dir

      if (name.indexOf('.') === -1 && name !== this.now_path[this.now_path.length - 1]) {
        this.now_path.push(name)
      }

      if (isDir) {
        this.loading = true
        const url = `/video/${this.processId}/ls/clip`
        const params = {
          pageSize: this.pageSize,
          page: 0,
          clip: name
        }
        this.$axios.get(url, { params: params })
          .then((response) => {
            const fileData = response.data.data.data
            this.elements = fileData
            this.show_dir = true
            this.loading = false
            const pictures = []
            fileData.forEach(item => {
              const src = 'data:image/jpg;base64,' + item.content
              const fileName = item.name
              pictures.push({
                src: src,
                fileName: fileName
              })
              this.srcs = pictures
            })
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.show_dir = false
      }
    }
  }
}
</script>

<style>
#file_dir{
  display: flex;
  flex-wrap: wrap;
  height: 500px;
}
#file {
  height: 100%;
  width: 100%;
}
.element{
  margin-right: 50px;
  margin-bottom: 30px;
  font-size: 20px;
  overflow: scroll;
}
#back_button{
    position:fixed;
    top:500px;
    right:200px;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.breadcrumb {
  /* float: left; */
  height: 20px;
  margin-top: 10px;
}
.breadcrumb_entire{
  position: absolute
}
.breadcrumb-link {
  cursor: pointer;
  font-size: 16px;
}
.breadcrumb-link:hover {
  color: #409eff;
  text-decoration: underline;
}
.breadcrumb-link-active {
  /* 面包屑当前激活文件夹的样式 */
  font-weight: 700;
}
.list-item {
  border: 1px solid #fff;
  box-sizing: border-box;
  position: relative;
  height: 120px;
  width: 150px;
  /* background-color: green; */
  margin-top: 20px;
  display: inline-block;
  cursor: pointer;
}
.inner {
  height: 120px;
  width: 150px;
  margin: 0px auto
}
.icon-folder {
  /* 文件夹的样式 */
  display: inline-block;
  width: 120px;
  height: 90px;
  background-image: url('../../../assets/svg/folder.svg');
  background-size: 100% 100%;
}
.icon-file {
  /* 文件的样式 */
  display: inline-block;
  width: 90px;
  height: 90px;
  background-image: url('../../../assets/svg/file.svg');
  background-size: 100% 100%;
}
.icon-thumb {
  /* 文件的样式 */
  width: 150px;
  height: 120px;
}
.file-name {
  /* 文件夹name样式 */
  margin: 0px auto;
  text-align: center;
  overflow: hidden;
  width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #424e67;
  font-size: 18px;
}
.file-name:hover {
  color: #409eff;
}
.hover-cover {
  width: 90px;
  height: 90px;
  position: absolute;
  left: 10px;
  top: 5px;
  background-color: rgb(0,0,0);
  opacity: 0.6;
  text-align: center;
  line-height: 60px;
  font-size: 12px;
}
.list-item:hover {
  background-color: #f1f5fa;
  width: 150px;
}
.active {
  /* // 选择文件触发激活样式 */
  border: 1px solid #409eff;
  border-radius: 8px;
}
.active:hover .loadding-message {
  /* // 加载loading的文字样式 */
  color: #424e67;
  font-size: 12px;
  text-align: center;
}
.el-carousel {
  width: 100%;
  height: 100%;
}
.el-carousel .el-carousel__container {
  height: 100%;
}
.el-carousel .el-image {
  height: 100%;
  object-fit: contain;
}
</style>
