<template>
  <div class="app-container">
    <!-- Menu -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuDispatcher">
      <el-menu-item index="1"><i class="el-icon-s-home"></i>Home</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-magic-stick"></i>Time Line</el-menu-item>
      <el-menu-item index="4"><i class="el-icon-info"></i>About</el-menu-item>
    </el-menu>
    <div class="line"></div>

    <el-drawer
      title="Time Line"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose">
      <div class="block">
        <el-timeline style="width: 35em">
          <el-timeline-item v-for="item in markdownFileList" v-bind:key="item.url" :timestamp="item.dateTime" placement="top">
            <!--<h4>{{ item.name }}</h4>-->
            <el-button type="info" round @click="loadArticle(item.url)" plain>{{ item.name }}</el-button>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import TreeMenu from '../components/TreeMenu.vue'
const moment = require('moment')

export default {
  name: 'HeadMenu',
  components: {TreeMenu},
  data () {
    return {
      drawer: false,
      activeIndex: '1',
      items: this.$root.markdownFileTree,
      markdownFileList: []
    }
  },
  created () {
    this.getMarkdownFileList(this.items)
    this.sortMarkdownFileList(this.markdownFileList)
    console.log(this.markdownFileList)
  },
  methods: {
    loadArticle (url) {
      this.$emit('func', url)
    },
    menuDispatcher (key, keyPath) {
      console.log(key, keyPath)
      switch (keyPath[0]) {
        case '1':
          break
        case '3':
          this.drawer = true
          break
        case '4':
          this.$router.push({
            name: 'About'
          })
          break
        default:
      }
    },
    getMarkdownFileList (markdownFileTree) {
      if (markdownFileTree.hasOwnProperty('children')) {
        for (let i = 0; i < markdownFileTree.children.length; i++) {
          const node = markdownFileTree.children[i]
          if (node.hasOwnProperty('children')) {
            this.getMarkdownFileList(node)
          } else {
            this.markdownFileList.push(node)
          }
        }
      }
    },
    compareBigThan (markdownNodeA, markdownNodeB) {
      if (markdownNodeA.hasOwnProperty('dateTime') && markdownNodeB.hasOwnProperty('dateTime')) {
        return moment(markdownNodeA.dateTime).format('YYYY/MM/DD') > moment(markdownNodeB.dateTime).format('YYYY/MM/DD')
      }
      return false
    },
    sortMarkdownFileList (arr) {
      let i = arr.length
      let j
      let tempExchangVal
      while (i > 0) {
        for (j = 0; j < i - 1; j++) {
          if (this.compareBigThan(arr[j + 1], arr[j])) {
            tempExchangVal = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = tempExchangVal
          }
        }
        i--
      }
      return arr
    },
    handleClose (done) {
      done()
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
