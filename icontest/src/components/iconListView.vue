<template>
  <div class='icon-set-page'>
    <div class='icon-set-container'>
      <div class='icon-set-item'
        @click.stop="itemTap(name)"
        v-for="(name,index) in filterIcons"
        :key='index'>
        <g-icon :fontSize='`${globalFontSize}px`'
          ref="`icon-${index}`"
          :name="name" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      searchKey: state => state.iconset.searchKey,
      globalFontSize: state => state.settings.globalFontSize,
      currentIconSet: state => state.iconset.currentIconSet
    }),
    ...mapGetters({
      getFilterIcons: 'getFilterIcons'
    }),
    filterIcons () {
      return this.getFilterIcons(this.currentIconSet)
    }
  },

  watch: {
    searchKey () {
      this.resetIcons()
    },
    currentIconSet (newVal, oldVal) {
      this.resetIcons()
    }
  },
  mounted () {
    // this.currentIconSet = this.$icons
  },
  methods: {
    ...mapMutations({
      setCurrentIcon: 'SET_CURRENT_ICON'
    }),
    resetIcons () {
      let icons = {}
      if (this.filterIcons) {
        this.filterIcons.map(name => {
          //console.log('this.currentIconSet.options..', this.currentIconSet.options)
          icons[name] = [require(`!svg-inline-loader!~/assets/icons/${name}.svg`), JSON.parse(JSON.stringify(this.currentIconSet.options))]
        })
        // console.log('icons..', icons)
        this.$setIcons(icons)
      }
    },
    itemTap (icon) {
      this.setCurrentIcon(icon)
    }
  }
}
</script>
<style scoped>
.icon-set-container {
  display: flex;
  flex-wrap: wrap;
}
.icon-set-item {
  margin: 16px;
  min-width: 128px;
  min-height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

