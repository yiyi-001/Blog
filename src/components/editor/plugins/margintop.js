import Tinymce from 'tinymce'

Tinymce.PluginManager.add('margintop', function (editor) {
  const actionFunction = function (editor, val) {
    const value = val || editor.getParam('margintop_default_value', '5px')
    editor.formatter.apply('margintop', { value })
  }

  // 命令
  editor.addCommand('mceMarginTop', function (ui, value) {
    actionFunction(editor, value)
  })

  // toolbar 按钮 图标
  editor.ui.registry.addIcon('margintop', `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M5,9.48266485 L19,9.48266485 L19,11.3861319 L5,11.3861319 L5,9.48266485 Z M5,13.2895989 L19,13.2895989 L19,15.1930659 L5,15.1930659 L5,13.2895989 Z M5,17.096533 L19,17.096533 L19,19 L5,19 L5,17.096533 Z M13.9657444,8.33746431 L11.91,6.71746431 L9.85425561,8.33746431 L8.94059143,7.05746431 L11.4531679,5.07746431 C11.7238832,4.86413098 12.0961168,4.86413098 12.3668321,5.07746431 L14.8794086,7.05746431 L13.9657444,8.33746431 Z"></path>
    </svg>
  `)

  // toolbar 按钮功能
  editor.ui.registry.addSplitButton('margintop', {
    tooltip: '段前距',
    // 图标
    icon: 'margintop',
    // 初始化
    onSetup (api) {
      editor.formatter.register({
        margintop: {
          selector: 'p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,section,article,header,footer,figcaption',
          styles: { 'margin-top': '%value' }
        }
      })
    },
    // 图标点击
    onAction (api) {
      return editor.execCommand('mceMarginTop')
    },
    // 列表项点击
    onItemAction (buttonApi, value) {
      return editor.execCommand('mceMarginTop', false, value)
    },
    // 初始化列表
    fetch (callback) {
      const items = [
        {
          type: 'choiceitem',
          text: '0',
          value: '0'
        },
        {
          type: 'choiceitem',
          text: '5',
          value: '5px'
        },
        {
          type: 'choiceitem',
          text: '10',
          value: '10px'
        },
        {
          type: 'choiceitem',
          text: '15',
          value: '15px'
        },
        {
          type: 'choiceitem',
          text: '20',
          value: '20px'
        },
        {
          type: 'choiceitem',
          text: '25',
          value: '25px'
        }
      ]
      callback(items)
    }
  })
})
