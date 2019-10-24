<template>
  <div class="app-container">
    <!-- Menu -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuDispatcher">
      <el-menu-item index="1">Home</el-menu-item>
      <!--<el-submenu index="2">-->
        <!--<template slot="title">Article List</template>-->
        <!--<TreeMenu :children="items.children"></TreeMenu>-->
      <!--</el-submenu>-->
      <el-menu-item index="3">About</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
import TreeMenu from '../components/TreeMenu.vue'

export default {
  name: 'HeadMenu',
  components: {TreeMenu},
  data () {
    return {
      activeIndex: '1',
      items: this.$root.markdownFileTree
    }
  },
  methods: {
    menuDispatcher (key, keyPath) {
      console.log(key, keyPath)
      switch (keyPath) {
        case '1':
          break
        case '3':
          this.$router.push({
            name: 'About'
          })
          break
        default:
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
