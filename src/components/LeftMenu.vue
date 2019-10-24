<template>
  <div class="app-container">
    <!-- Menu -->
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="menuDispatcher" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
      <el-menu-item index="1"><i class="el-icon-user-solid"></i>{{ $root.globalConstant.GITHUB_USERNAME }}'s Blog</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-order"></i>Article List</template>
        <TreeMenu :children="items.children"></TreeMenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import TreeMenu from '../components/TreeMenu.vue'

export default {
  name: 'LeftMenu',
  components: {TreeMenu},
  data () {
    return {
      activeIndex: '2',
      items: this.$root.markdownFileTree
    }
  },
  methods: {
    menuDispatcher (key, keyPath) {
      console.log(key, keyPath)
      // func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('func', key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
