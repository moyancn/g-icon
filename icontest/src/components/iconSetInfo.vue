<template>
  <div>
    <el-form ref="form"
      label-width="50px"
      size="mini"
      v-if='currentIconSet'>
      <el-form-item label='名称'>
        <el-input placeholder="图标集名称"
          v-model="currentIconSet.label"></el-input>
      </el-form-item>
      <el-form-item label='版本'>
        <el-input placeholder="图标集版本"
          v-model="currentIconSet.version"></el-input>
      </el-form-item>
      <el-form-item label='主页'>
        <el-input placeholder="图标集主页"
          v-model="currentIconSet.homepage"></el-input>
      </el-form-item>
      <el-form-item label='版权'>
        <el-input placeholder="图标集版权"
          v-model="currentIconSet.copyright"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-tag v-for="tag in currentIconSet.tags"
          type='info'
          :key="tag"
          closable>
          {{tag}}
        </el-tag>
      </el-form-item>
      <label>保留的原始属性</label>
      <el-form-item label="viewBox">
        <el-switch v-model="viewBox">
        </el-switch>
      </el-form-item>
      <label>添加的特有属性</label>
      <el-form-item label="strokeWidth">
        <el-switch>
        </el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      viewBox: state => state.iconset.currentIconSet.options.keepAttrs.includes('viewBox'),
      currentIconSet: state => state.iconset.currentIconSet
    })
  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style>
.row-icon {
  margin: 0 0 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  border: 1px solid #eeeeee;
  height: 200px;
}
</style>
