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
        >{{subPath}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div id='file_dir'>
    <!-- 简陋版文件展示 -->
    <!-- <div v-if='show_dir'>
      <button v-for="(value) in elements" v-bind:class="getClass(value)" v-bind:key="value.name" v-on:click='pressButton(now_path + "/" + value.name, value.dir)'>
        {{value.name}}
      </button>
    </div> -->
    <div class="video-main" v-if='show_dir' v-loading="loading">
      <ul class="list">
        <li
          v-for="(file) in elements"
          :key="file.name"
          :class="{active:file.active}"
          class="list-item"
          v-on:click='pressButton(file.name, file.dir)'
        >
          <div class="inner">
            <!-- <span v-if='!file.hasOwnProperty(file)' v-bind:class="getClass(file)"></span> -->
            <el-image
              v-if="file.content.length > 0"
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
    <div v-else>
      <img :src="src" alt="" />
    </div>
  </div>
  <!-- <el-button id='back_button' type="primary" round v-on:click='pressButton(former_path, true)'>返回上层</el-button> -->
</div>
</template>

<script>
export default {
  data: function () {
    return {
      elements: [
      ], // 目录结构
      show_dir: true, // 是否显示目录结构，false展示文件
      src: null, // 文件连接
      now_path: ['process_results'], // 当前的路径
      loading: true
    }
  },
  props: {
    videoName: {
      type: String,
      required: true // 缺失，控制台报错
    }
  },
  watch: {
    videoName: function () {
      console.log('videoName changed')
      this.forMounted()
    }
  },
  mounted: function () {
    this.forMounted()
  },
  computed: {
    former_path: function () {
      return this.now_path.substr(0, this.now_path.lastIndexOf('/'))
    }
  },
  methods: {
    forMounted: function () {
      var this_ = this
      this.$axios.get('/ls-with-content', {
        params: {
          dirPath: '/2020110710/video_system/' + this.videoName + '/' + this_.now_path.join('/')
        }
      }).then(function (response) {
        this_.elements = response.data.data
        this_.loading = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    getClass: function (value) { // 获取文件夹、文件对应css class
      return value.dir ? 'icon-folder' : 'icon-file'
    },
    backFileFolder: function (index) {
      this.now_path = this.now_path.slice(0, index + 1)
      var this_ = this
      this.loading = true
      this.$axios.get('/ls-with-content', {
        params: {
          dirPath: '/2020110710/video_system/' + this.videoName + '/' + this.now_path.join('/')
        }
      }).then(function (response) {
        this_.elements = response.data.data
        this_.show_dir = true
        this_.loading = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    pressButton: function (name, isDir) { // 点击按钮请求新的目录结构或请求文件
      this.now_path.push(name)
      var this_ = this
      if (isDir) {
        this_.loading = true
        this.$axios.get('/ls-with-content', {
          params: {
            dirPath: '/2020110710/video_system/' + this.videoName + '/' + this.now_path.join('/')
          }
        }).then(function (response) {
          this_.elements = response.data.data
          this_.show_dir = true
          this_.loading = false
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        this_.loading = true
        this.$axios.get('/file', {
          params: {
            filePath: '/2020110710/video_system/' + this.videoName + '/' + this.now_path.join('/')
          },
          responseType: 'arraybuffer'
        }).then(function (response) {
          this_.src = 'data:image/jpg;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          this_.show_dir = false
          this_.loading = false
        }).catch(function (error) {
          console.log(error)
        })
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
.element{
  margin-right: 50px;
  margin-bottom: 30px;
  font-size: 20px;
  overflow: scroll;
}
img{
  width: 400px;
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
  width: 120px;
  /* background-color: green; */
  margin-top: 20px;
  display: inline-block;
  cursor: pointer;
}
.inner {
  height: 80px;
  width: 100px;
  margin: 0px auto
}
.icon-folder {
  /* 文件夹的样式 */
  display: inline-block;
  width: 80px;
  height: 60px;
  background-image: url(../../assets/svg/folder.svg);
  background-size: 100% 100%;
}
.icon-file {
  /* 文件夹的样式 */
  display: inline-block;
  width: 60px;
  height: 60px;
  background-image: url(../../assets/svg/file.svg);
  background-size: 100% 100%;
}
.icon-thumb {
  /* 文件的样式 */
  width: 100px;
  height: 80px;
}
.file-name {
  /* 文件夹name样式 */
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #424e67;
  font-size: 18px;
}
.file-name:hover {
  color: #409eff;
}
.hover-cover {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 10px;
  top: 5px;
  background-color: rgb(0,0,0);
  opacity: 0;
  text-align: center;
  line-height: 60px;
  font-size: 12px;
}
.list-item:hover {
  background-color: #f1f5fa;
}
.icon-file-selected {
  opacity: 0.5;
}
.hover-cover {
  opacity: 0.6;
}
.icon-file-selected {
  /* // 小圆点默认样式 */
  position: absolute;
  left: 5px;
  top: 5px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  /* background-image: url(../../assets/svg/icon-file-selected.svg); */
  opacity: 0;
}
.icon-file-selected:hover {
  /* // 小圆点hover */
  opacity: 1 !important;
}
.active {
  /* // 选择文件触发激活样式 */
  border: 1px solid #409eff;
  border-radius: 8px;
}
.icon-file-selected {
  position: absolute;
  left: 5px;
  top: 5px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  /* background-image: url(../../assets/svg/icon-file-selected.svg); */
  opacity: 1;
}
 .icon-file-selected{
  /* // 激活状态小圆点透明度1 */
  opacity: 1 !important;
}
.active:hover .loadding-message {
  /* // 加载loading的文字样式 */
  color: #424e67;
  font-size: 12px;
  text-align: center;
}
</style>
