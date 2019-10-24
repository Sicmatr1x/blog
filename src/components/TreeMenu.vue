
<template>
  <div>
    <div v-for="item in children" :key="item.name">
      <el-tooltip class="item" v-if="item.type === 'File'" effect="dark" :content="item.name" placement="right">
        <el-menu-item :index="item.url" lass="textTruncation">{{ item.name }}</el-menu-item>
      </el-tooltip>
      <el-submenu index="2" v-else>
        <template slot="title">{{ item.name }}</template>
        <TreeMenu v-if="item.children" :children="item.children"></TreeMenu>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeMenu',
  props: {children: Array},
  data () {
    return {
    }
  },
  methods: {
    selectAction (item) {
      console.log(item)
    }
  }
}
</script>
<style>
.textTruncation {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
