<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <LeftMenu ref="leftMenu" @func="loadArticle"></LeftMenu>
      </el-col>
      <el-col :span="15">
        <!-- Menu -->
        <HeadMenu ref="headMenu" @func="loadArticle"/>
        <el-card class="box-card" v-loading="isLoading">
          <el-row :gutter="20">
            <p class="markdownArea"><span v-html="article"></span></p>
            <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
          </el-row>
        </el-card>
        <el-card class="box-card">
        </el-card>
      </el-col>
      <el-col :span="4">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeadMenu from '../components/HeadMenu.vue'
import LeftMenu from '../components/LeftMenu.vue'
import axios from 'axios'
// const MarkdownIt = require('markdown-it')
// const hljs = require('highlight.js')
// const md = require('markdown-it')({
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return hljs.highlight(lang, str).value
//       } catch (__) {}
//     }
//
//     return '' // use external default escaping
//   }
// })
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})

export default {
  name: 'Home',
  components: {
    isLoading: true,
    HeadMenu: HeadMenu,
    LeftMenu: LeftMenu
  },
  data () {
    return {
      article: ''
    }
  },
  created () {
    this.loadArticle('/Mobile Hybrid/2018-12-21-Cordova Plugin 制作与发布流程.md')
  },
  methods: {
    async loadArticle (url) {
      this.isLoading = true
      try {
        const response = await axios.get(this.$root.globalConstant.GITHUB_RAW_DOMAIN + this.$root.globalConstant.GITHUB_USERNAME + '/' + this.$root.globalConstant.GITHUB_REPOSITORY_NAME + '/' + this.$root.globalConstant.GITHUB_REPOSITORY_BRANCH + '/' + this.$root.globalConstant.MARKDOWN_FOLDER_NAME + url)
        this.article = md.render(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*h1, h2, h3, h4, h5, h6 {*/
    /*color: #2e2e2e;*/
    /*font-weight: 600;*/
    /*font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";*/
  /*}*/

  /*h2 {*/
    /*font-size: 1.5em;*/
    /*font-weight: 600;*/
    /*margin: 24px 0 16px;*/
    /*padding-bottom: 0.3em;*/
    /*border-bottom: 1px solid #eaeaea;*/
    /*color: #2e2e2e;*/
  /*}*/

  /*p {*/
    /*font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";*/
  /*}*/

  /*a {*/
    /*text-decoration: none;*/
    /*font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";*/
  /*}*/
</style>
