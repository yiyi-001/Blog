import Tinymce from 'tinymce'

Tinymce.PluginManager.add('lineheight', function (editor) {
  // 执行方法
  const actionFunction = function (editor, val) {
    const value = val || editor.getParam('lineheight_default_value', 1.5)
    editor.formatter.apply('lineheight', { value })
  }

  // 命令
  editor.addCommand('mceLineHeight', function (ui, value) {
    actionFunction(editor, value)
  })

  // toolbar 按钮 图标
  editor.ui.registry.addIcon('lineheight', `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M5,5 L19,5 L19,7 L5,7 L5,5 Z M13,9 L19,9 L19,11 L13,11 L13,9 Z M13,13 L19,13 L19,15 L13,15 L13,13 Z M5,17 L19,17 L19,19 L5,19 L5,17 Z M11.07,11.46 L8.91,9.84 L6.75,11.46 L5.79,10.18 L8.43,8.2 C8.71444444,7.98666667 9.10555556,7.98666667 9.39,8.2 L12.03,10.18 L11.07,11.46 Z M8.91,14.16 L11.07,12.54 L12.03,13.82 L9.39,15.8 C9.10555556,16.0133333 8.71444444,16.0133333 8.43,15.8 L5.79,13.82 L6.75,12.54 L8.91,14.16 Z" id="行间距"></path>
    </svg>
  `)

  // toolbar 按钮功能
  editor.ui.registry.addSplitButton('lineheight', {
    tooltip: '行间距',
    // 图标
    icon: 'lineheight',
    // 初始化
    onSetup (api) {
      editor.formatter.register({
        lineheight: {
          selector: 'p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,section,article,header,footer,figcaption',
          styles: { 'line-height': '%value' }
        }
      })
    },
    // 图标点击
    onAction (api) {
      return editor.execCommand('mceLineHeight')
    },
    // 列表项点击
    onItemAction (buttonApi, value) {
      return editor.execCommand('mceLineHeight', false, value)
    },
    // 初始化列表
    fetch (callback) {
      const items = [
        {
          type: 'choiceitem',
          text: '1',
          value: 1
        },
        {
          type: 'choiceitem',
          text: '1.5',
          value: 1.5
        },
        {
          type: 'choiceitem',
          text: '1.75',
          value: 1.75
        },
        {
          type: 'choiceitem',
          text: '2',
          value: 2
        },
        {
          type: 'choiceitem',
          text: '3',
          value: 3
        },
        {
          type: 'choiceitem',
          text: '4',
          value: 4
        },
        {
          type: 'choiceitem',
          text: '5',
          value: 5
        }
      ]
      callback(items)
    }
  })
})
