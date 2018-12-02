<template>
  <div>
    <el-row class='row-icon'>
      <g-icon ref='currentIcon'
        :name="currentIcon.name"
        :box-size='customIcon.boxSize'
        :font-size='customIcon.fontSize+"px"'
        :color='customIcon.color'
        :background='customIcon.background'
        :options='options'
        :tag="customIcon.tag" />
    </el-row>
    <el-form ref="form">
      <label>Info</label>
      <el-form-item>
        <el-input placeholder="name"
          v-model="currentIcon.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-tag v-for="tag in customIcon.tags"
          type='info'
          :key="tag"
          closable>
          {{tag}}
        </el-tag>
      </el-form-item>
      <label>Customize</label>
      <el-form-item>
        <el-slider v-model="customIcon.fontSize"
          :min=12
          :max=256></el-slider>
      </el-form-item>
      <el-form-item label='color'>
        <el-color-picker v-model="customIcon.color"></el-color-picker>
      </el-form-item>
      <el-form-item label='background'>
        <el-color-picker v-model="customIcon.background"></el-color-picker>
      </el-form-item>
      <el-form-item label='stroke'>
        <el-input-number v-model="customIcon.strokeWidth"
          controls-position="right"
          :min="1"
          :max="4"></el-input-number>
      </el-form-item>
      <el-form-item label='strokeLineType'>
        <el-radio-group v-model="customIcon.strokeLineType"
          size="small">
          <el-radio-button label="round"></el-radio-button>
          <el-radio-button label="butt"></el-radio-button>
          <el-radio-button label="square"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      customIcon: {
        fontSize: 12
      }
    }
  },
  computed: {
    ...mapState({
      currentIcon: state => state.iconset.currentIcon,
      globalFontSize: state => state.settings.globalFontSize
    }),
    options () {
      return {
        'stroke-width': this.customIcon.strokeWidth,
        'stroke-linecap': this.customIcon.strokeLineType,
        'stroke-linejoin': this.customIcon.strokeLineType
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.customIcon.fontSize = this.globalFontSize
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
