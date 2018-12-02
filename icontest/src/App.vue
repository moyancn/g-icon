<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-slider v-model="fontSize"
          @change='fontSizeChanged($event)'
          :min=12
          :show-input="true"
          :max=256></el-slider>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <icon-set-tree />
        </el-aside>
        <el-main>
          <icon-list-view />
        </el-main>
        <el-aside width="250px">
          <el-tabs :value="currentSideTap"
            type="card"
            @tab-click="handleClick">
            <el-tab-pane label="图标集属性"
              name="icon-set-info">
              <icon-set-info />
            </el-tab-pane>
            <el-tab-pane label="图标属性"
              name="icon-info">
              <icon-info />
            </el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import IconInfo from './components/iconInfo'
import IconSetInfo from './components/iconSetInfo'
import IconListView from './components/IconListView'
import IconSetTree from './components/IconSetTree'
import { mapState } from 'vuex'
export default {
  components: {
    IconInfo,
    IconSetInfo,
    IconListView,
    IconSetTree
  },
  data () {
    return {
      fontSize: 12
    }
  },
  computed: {
    ...mapState({
      globalFontSize: state => state.settings.globalFontSize,
      currentIcon: state => state.iconset.currentIcon
    }),
    currentSideTap: {
      get () {
        return this.currentIcon.name ? 'icon-info' : 'icon-set-info'
      },
      set () {

      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.fontSize = this.globalFontSize
    })
  },

  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    fontSizeChanged () {
      this.$store.dispatch('SET_GLOBAL_FONT_SIZE', this.fontSize)
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
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
