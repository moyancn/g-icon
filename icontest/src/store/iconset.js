import { DEFAULT_ICON_SET, TEST_ICON_SET_LIST, GLOBAL_ICON_SET_SETTTINGS } from '../utils'

// global states
const state = {
  searchKey: '',
  currentIcon: {},
  currentIconSet: {},
  iconSetList: TEST_ICON_SET_LIST || []
}
const getters = {
  getExpandKeys: (state) => {
    const getExpandKeys = state.iconSetList.filter(is => {
      return is.expand
    }).map(fis => {
      return fis.id
    })
    // console.log('getExpandKeys', getExpandKeys)
    return getExpandKeys
  },
  getFilterIcons: (state) => (iconSet) => {
    // 根节点将使用所有的下级图标库的图标
    if (!iconSet.parentId) {
      let totalFilterIcons = iconSet.children.reduce((pIs, cIs) => {
        const icons = cIs.icons.filter(ic => {
          return ic.indexOf(state.searchKey) !== -1
        })
        pIs.push(...icons)
        return pIs
      }, [])
      //  console.log('totalFilterIcons', totalFilterIcons)
      return totalFilterIcons
    } else {
      return iconSet.icons.filter(ic => {
        return ic.indexOf(state.searchKey) !== -1
      })
    }
  },
  getIconTree: (state) => {
    let rootIconSet = []
    state.iconSetList.forEach(is => {
      if (is.children) is.children = []
      return is
    })
    state.iconSetList.map(is => {
      if (is.parentId) {
        const find = state.iconSetList.find(p => p.id === is.parentId)
        if (find) {
          if (!find.children) find.children = []
          find.children.push(is)
        }
      } else {
        rootIconSet.push(is)
      }
    })
    return rootIconSet
  }
}

const mutations = {
  SET_SEARCHKEY (state, val) {
    state.searchKey = val
  },
  SET_CURRENT_ICON (state, name) {
    state.currentIcon = {
      name
    }
    //   console.log('state.currentIcon..', state.currentIcon)
  },
  SET_CURRENT_ICON_SET (state, iconSet) {
    // console.log('SET_CURRENT_ICON_SET', iconSet)
    const find = state.iconSetList.find(ic => ic.id === iconSet.id)
    // console.log('find', find)
    if (find) {
      //  console.log('find.options..', find.options)
      // if (!find.options) {
      find.options = JSON.parse(JSON.stringify(GLOBAL_ICON_SET_SETTTINGS))
      //  }
      // console.log('find.options..', JSON.stringify(find.options))
      // find.expand = !find.expand
      state.currentIconSet = find
      state.currentIcon = {}
      //  console.log('state.currentIconSet', state.currentIconSet)
    }
  },
  UPDATE_ICON_SET (state, data) {
    // console.log('data..', data)
    const find = state.iconSetList.find(ic => ic.id === data.id)

    if (find) {
      Object.assign(find, data)
      // console.log('UPDATE_ICON_SET find', find)
    }
  },
  ADD_ICON_SET (state, iconSet) {
    const find = state.iconSetList.find(ic => ic.id === iconSet.id)
    console.log('find', find)
    if (!find) {
      iconSet = Object.assign(DEFAULT_ICON_SET, iconSet)
      iconSet.options = JSON.parse(JSON.stringify(GLOBAL_ICON_SET_SETTTINGS))
      // console.log('find.options..', JSON.stringify(find.options))
      state.iconSetList.unshift(iconSet)
      state.currentIconSet = iconSet
      // console.log('state.currentIconSet', iconSet)
    }
  },
  REMOVE_ICON_SET (state, iconSet) {
    const findIndex = state.iconSetList.findIndex(ic => ic.id === iconSet.id)
    console.log('findIndex', findIndex)
    if (findIndex >= 0) {
      state.iconSetList.splice(findIndex, 1)
      const next = state.iconSetList[findIndex] || state.iconSetList[findIndex - 1] || null
      state.currentIconSet = next
      // console.log('state.currentIconSet', next.label)
    }
  },
  DROP_ICON_SET (state, { drag, drop, type }) {
    // console.log('drop', drag, drop, type)
    const findDragIndex = state.iconSetList.findIndex(ic => ic.id === drag.id)
    // console.log('findDragIndex', findDragIndex)
    const findDropIndex = state.iconSetList.findIndex(ic => ic.id === drop.id)
    // console.log('findDropIndex', findDropIndex)
    if (findDragIndex >= 0 && findDropIndex >= 0) {
      state.iconSetList.splice(findDragIndex, 1)
      if (type === 'before') {
        state.iconSetList.splice(findDragIndex - 1, 0, drag)
      } else {
        state.iconSetList.splice(findDropIndex, 0, drag)
      }
    }
  }
}

const actions = {

}

export default { state, getters, mutations, actions }
