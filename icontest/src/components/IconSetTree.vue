<template>
  <div>
    <el-input placeholder="输入关键字进行过滤"
      v-model="searchKey"
      clearable>
    </el-input>
    <el-tree class="filter-tree"
      @node-contextmenu='showContextMenu'
      @node-click='itemClick'
      @node-drop="handleDrop"
      @node-expand='itemExpandCollapse'
      @node-collapse='itemExpandCollapse'
      :data="getIconTree"
      :props="defaultProps"
      node-key="id"
      draggable
      :allow-drop="allowDrop"
      :allow-drag='allowDrag'
      :expand-on-click-node='false'
      :highlight-current="true"
      :default-expanded-keys="getExpandKeys"
      :auto-expand-parent="false"
      :filter-node-method="filterNode"
      ref="tree">

      <div type="flex"
        class="custom-tree-node-container"
        slot-scope="{ node, data }">
        <div v-show='data.isEdit'
          type="flex"
          class="custom-tree-node">
          <el-input class="custom-tree-input"
            size="mini"
            autofocus
            v-model="data.label"
            :ref="'nodeInput-'+data.id"
            @click.stop.native="nodeEditFocus(data)"
            @blur.stop="nodeEditOk(data)"
            @keyup.enter.stop.native="nodeEditOk(data)"></el-input>
        </div>
        <div v-show='!data.isEdit'
          type="flex"
          class="custom-tree-node">
          <div class='custom-tree-node-title'>
            {{ data.label+(data.size&&searchKey?`(${data.size})`:'') }}
          </div>
          <div class='tree-button'>
            <el-button v-if='node.level<3'
              type="text"
              icon='el-icon-plus'
              size="mini"
              @click.stop="() => newIconSet(data)">
            </el-button>
          </div>
          <div class='tree-button'>
            <el-button v-if='node.level>1&&node.level<4'
              type="text"
              icon='el-icon-edit'
              size="mini"
              @click.stop="() => renameIconSet(data)">
            </el-button>
          </div>
          <div class='tree-button'>
            <el-button v-if='node.level>1&&node.level<4'
              type="text"
              icon='el-icon-close'
              size="mini"
              @click.stop="() => delIconSet(data)">
            </el-button>
          </div>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  computed: {
    searchKey: {
      get () {
        return this.$store.state.iconset.searchKey
      },
      set (value) {
        this.$store.commit('SET_SEARCHKEY', value)
      }
    },
    ...mapState({
      currentIconSet: state => state.iconset.currentIconSet
    }),
    ...mapGetters(['getIconTree', 'getExpandKeys', 'getFilterIcons']),

  },
  watch: {
    searchKey (val) {
      this.$refs.tree.filter(val);
    },
    currentIconSet (val) {
      console.log('val..', val)
      this.$refs.tree.setCurrentKey(val.id)
    }
  },
  methods: {
    ...mapMutations({
      setCurrentIconSet: 'SET_CURRENT_ICON_SET',
      updateIconSet: 'UPDATE_ICON_SET',
      addIconSet: 'ADD_ICON_SET',
      removeIconSet: 'REMOVE_ICON_SET',
      dropIconSet: 'DROP_ICON_SET',
    }),
    filterNode (value, data) {
      if (!value) return true;
      let size = 0
      if (data.icons) {
        const filterd = data.icons.filter(icon => icon.indexOf(value) !== -1)
        if (filterd)
          size = filterd.length
      }
      this.updateIconSet(Object.assign(data, {
        size: size
      }))
      return size > 0
    },
    allowDrag (draggingNode) {
      return draggingNode.level >= 2;
    },
    allowDrop (draggingNode, dropNode, type) {
      console.log('allowDrop,,', draggingNode, dropNode, type)
      return draggingNode.level >= 2 && draggingNode.level === dropNode.level;
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', draggingNode.data.label, dropNode.data.label, dropType);
      this.dropIconSet({ drag: draggingNode.data, drop: dropNode.data, type: dropType })
    },

    itemClick (data, node) {
      console.log('itemClick..data', data)
      this.setCurrentIconSet(data)
    },
    itemExpandCollapse (data, node) {
      console.log('itemCollapse..', data)
      this.updateIconSet(Object.assign(data, {
        expand: !data.expand
      }))
    },
    showContextMenu () {

    },
    newIconSet (data) {
      console.log('newIconSet,data..', data.label)
      this.updateIconSet(Object.assign(data, { expand: true }))
      this.addIconSet({
        id: parseInt(Math.random() * 10000),
        parentId: data.id,
        expand: true,
        name: 'new' + Math.random() * 100,
        label: "新图标集"
      })
    },
    renameIconSet (data) {
      console.log('renameIconSet,data..', data.label)
      this.updateIconSet(Object.assign(data, { isEdit: true }))
      setTimeout(() => {
        this.$refs['nodeInput-' + data.id].select()
        this.$refs['nodeInput-' + data.id].focus()
      }, 100)
    },
    delIconSet (data) {
      this.$confirm('此操作将永久删除该图标集, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('delIconSet,data..', data.label)
        this.removeIconSet(data)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    nodeEditFocus () {

    },
    nodeEditOk (data) {
      this.updateIconSet(Object.assign(data, { isEdit: false }))
    }
  }
};
</script>
<style>
.custom-tree-node-container {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.custom-tree-node {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.custom-tree-node-title {
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: nowrap;
}
.tree-button {
  padding: 0 5px;
}
.tree-button:hover {
  display: inline-block;
}
</style>

