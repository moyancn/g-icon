export const GLOBAL_ICON_SET_SETTTINGS = {
  keepAttrs: ['viewBox']
}
export const DEFAULT_ICON_SET = {
  icons: [],
  expand: false,
  isEdit: false,
  label: '新图标集'
}
export const DEFAULT_ICON_SET_LIST = [{
  id: 1,
  name: 'project',
  label: '我的项目'
}, {
  id: 3,
  name: 'user',
  label: '用户图标库'
}, {
  id: 2,
  name: 'third',
  label: '第三方图标库'
}
]

export const TEST_ICON_SET_LIST = DEFAULT_ICON_SET_LIST.concat([
  {
    id: 4,
    label: '秒书',
    parentId: 1,
    icons: ['arrow-left', 'user', 'users', 'alipay', 'battery-empty']
  },
  {
    id: 5,
    name: 'collect',
    label: '收集',
    parentId: 2,
    icons: ['alert', 'alipay', 'allergies', 'amazon-pay', 'amazon', 'ambulance', 'amilia', 'archive', 'arrow-bottom', 'arrow-left', 'arrow-right']
  }, {
    id: 6,
    name: 'others',
    label: '其它',
    parentId: 2,
    icons: ['cart', 'play', 'chevron-left', 'chevron-right', 'chevron-top', 'clock']
  },
  {
    id: 7,
    name: 'fontawesome',
    label: 'Font Awesome',
    parentId: 3,
    icons: ['close', 'code', 'compose', 'file', 'folder-open', 'folder', 'forwards', 'gift']
  },
  {
    id: 8,
    name: 'fontello',
    label: 'FontEllo',
    parentId: 3,
    icons: ['unlock', 'upload']
  }])
