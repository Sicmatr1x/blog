<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <LeftMenu @func="loadArticle"></LeftMenu>
      </el-col>
      <el-col :span="18">
        <!-- Menu -->
        <HeadMenu ref="headMenu" />
        <el-card class="box-card">
          <el-row :gutter="20">
            <p><span v-html="article"></span></p>
            <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
          </el-row>
        </el-card>
      </el-col>
      <router-view/>
    </el-row>
  </div>
</template>

<script>
import HeadMenu from '../components/HeadMenu.vue'
import LeftMenu from '../components/LeftMenu.vue'
import axios from 'axios'
import marked from 'marked'

export default {
  name: 'Home',
  components: {
    HeadMenu: HeadMenu,
    LeftMenu: LeftMenu
  },
  data () {
    return {
      article: ''
    }
  },
  created () {

  },
  methods: {
    loadArticle (url) {
      let self = this
      axios.get(this.$root.globalConstant.GITHUB_RAW_DOMAIN + this.$root.globalConstant.GITHUB_USERNAME + '/' + this.$root.globalConstant.GITHUB_REPOSITORY_NAME + '/' + this.$root.globalConstant.GITHUB_REPOSITORY_BRANCH + '/' + this.$root.globalConstant.MARKDOWN_FOLDER_NAME + url)
        .then(function (response) {
          // handle success
          console.log(response)
          self.article = marked(response.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .finally(function () {
          // always executed
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
