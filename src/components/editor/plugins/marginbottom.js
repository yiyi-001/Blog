import Tinymce from 'tinymce'

Tinymce.PluginManager.add('marginbottom', function (editor) {
  // 执行方法
  const actionFunction = function (editor, val) {
    const value = val || editor.getParam('marginbottom_default_value', '5px')
    editor.formatter.apply('marginbottom', { value })
  }

  // 命令
  editor.addCommand('mceMarginBottom', function (ui, value) {
    actionFunction(editor, value)
  })

  // toolbar 按钮 图标
  editor.ui.registry.addIcon('marginbottom', `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M5,5 L19,5 L19,6.90346703 L5,6.90346703 L5,5 Z M5,8.80693406 L19,8.80693406 L19,10.7104011 L5,10.7104011 L5,8.80693406 Z M5,12.6138681 L19,12.6138681 L19,14.5173351 L5,14.5173351 L5,12.6138681 Z M13.9657444,15.6625357 L14.8794086,16.9425357 L12.3668321,18.9225357 C12.0961168,19.135869 11.7238832,19.135869 11.4531679,18.9225357 L8.94059143,16.9425357 L9.85425561,15.6625357 L11.91,17.2825357 L13.9657444,15.6625357 Z"></path>
    </svg>
  `)

  // toolbar 按钮功能
  editor.ui.registry.addSplitButton('marginbottom', {
    tooltip: '段后距',
    // 图标
    icon: 'marginbottom',
    // 初始化
    onSetup (api) {
      editor.formatter.register({
        marginbottom: {
          selector: 'p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,section,article,header,footer,figcaption',
          styles: { 'margin-bottom': '%value' }
        }
      })
    },
    // 图标点击
    onAction () {
      return editor.execCommand('mceMarginBottom')
    },
    // 列表项点击
    onItemAction (buttonApi, value) {
      return editor.execCommand('mceMarginBottom', false, value)
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
