<template>
  <div class="style1">
    <span style="font-size:28px;width:200px;margin-right: 30px">
      <p>{{introduction1}}</p>
      <p>{{introduction2}}</p>
      <button @click='switchLang' class='switch_lang'>{{language}}</button>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language: '中文',
      introduction1_zh: '基于视频的社交关系网络构建致力于解决人们对于视频中人物社交关系信息抽取的需求，主流影评网站对于视频会给出人物关系图谱帮助用户理解影视作品中复杂的人物关系，影视解说频道会在讲解剧情的同时辅以人物关系图表进行讲解，同时公安侦查、情报分析中也会对大量的视频线索进行信息抽取分析，试图将其中隐含的社交关系挖掘出来，本系统中视频人物社交关系网络构建与分析对各领域的需求提供一站式、易于操作的网络服务。',
      introduction2_zh: '本平台左侧可以进行任务选择、视频预览、视频上传、任务提交，右侧进行各种处理结果的展示，包括视频信息（原视频的静态属性）、视频处理信息（分镜抽帧结果、目标检测结果、人脸聚类结果）、视频人物（人物图片）、人物特征（人脸特征可视化）、人物关系网络',
      introduction1_en: "We attempt to fulfill the public's demand for extracting social relationships among video characters by constructing social relationship networks based on videos. Main-stream movie critic sites usually present character relationship graphs to help visitors understand underlying relations, while film and television narrating channels tend to use relationship diagrams to help plot narrating. In addition, the security departments and intelligence analysts make use of videos to extract valuable information, expecting to retrieve implicit social relationships. This platform provides one-stop, user-friendly online service for the above demands.",
      introduction2_en: 'In the left, you can select the tasks submitted before, preview the corresponding video, upload local video and submit your task. The process results are shown in the Right, including the primitive information, intermediate result(fragmentation, object detection, face clustering), characters, character feature visualization and the key result--character social relationship network.',
      introduction1: '',
      introduction2: ''
    }
  },
  mounted: function () {
    this.language = '中文'
    this.introduction1 = this.introduction1_zh
    this.introduction2 = this.introduction2_zh
  },
  methods: {
    switchLang: function () {
      if (this.language === '中文') {
        this.language = 'English'
        this.introduction1 = this.introduction1_en
        this.introduction2 = this.introduction2_en
      } else {
        this.language = '中文'
        this.introduction1 = this.introduction1_zh
        this.introduction2 = this.introduction2_zh
      }
    }
  },
  components: {
  }
}
</script>

<style>
  p{
    margin-bottom: 0px;
    margin-top: 5px;
  }
  .switch_lang{
    /* position: absolute; */
    float: right;
    margin-right: 40px;
  }
  .style1{
    background-color: rgb(231, 197, 136);
    text-align:left;
    text-indent: 2em;
    margin-top: 10px;
    height: 550px;
    margin-bottom: 0px;
    padding-top: 10px;
    font-family: 'Times New Roman', KaiTi;
  }
</style>
