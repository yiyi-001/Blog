import Tinymce from 'tinymce'

Tinymce.PluginManager.add('horizontalindent', function (editor) {
  const actionFunction = function (editor, val) {
    const value = val || editor.getParam('horizontalindent_default_value', '5px')
    editor.formatter.apply('horizontalindent', { value })
  }

  // 命令
  editor.addCommand('mceHorizontalIndent', function (ui, value) {
    actionFunction(editor, value)
  })

  // toolbar 按钮 图标
  editor.ui.registry.addIcon('horizontalindent', `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14">
    <path d="M3,0 L15,0 C15.6,0 16,0.4 16,1 C16,1.6 15.6,2 15,2 L3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 Z M6.66666667,4 L11.3333333,4 C11.7333333,4 12,4.4 12,5 C12,5.6 11.7333333,6 11.3333333,6 L6.66666667,6 C6.29847683,6 6,5.55228475 6,5 C6,4.44771525 6.29847683,4 6.66666667,4 Z M6.66666667,8 L11.3333333,8 C11.7333333,8 12,8.4 12,9 C12,9.6 11.7333333,10 11.3333333,10 L6.66666667,10 C6.29847683,10 6,9.55228475 6,9 C6,8.44771525 6.29847683,8 6.66666667,8 Z M3,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L3,14 C2.44771525,14 2,13.5522847 2,13 C2,12.4477153 2.44771525,12 3,12 Z M0.4,8.2 L2.2,7 L0.4,5.8 C-0.0418277903,5.46862915 -0.131370834,4.8418278 0.200000012,4.40000001 C0.531370858,3.95817221 1.1581722,3.86862916 1.6,4.2 L4.6,6.2 C4.85180584,6.38885438 5,6.6852427 5,7 C5,7.3147573 4.85180584,7.61114562 4.6,7.8 L1.6,9.8 C1.31418753,10.0143594 0.935726556,10.0599564 0.60717967,9.91961525 C0.278632784,9.77927407 0.0499140732,9.47431579 0.00717966446,9.11961525 C-0.0355547443,8.7649147 0.114187522,8.41435935 0.4,8.2 L0.4,8.2 Z M17.6,8.20005884 L15.8,7.00005884 L17.6,5.80005884 C18.0418278,5.46868799 18.1313708,4.84188665 17.8,4.40005885 C17.4686291,3.95823106 16.8418278,3.868688 16.4,4.20005884 L13.4,6.20005884 C13.1481942,6.38891322 13,6.68530154 13,7.00005884 C13,7.31481615 13.1481942,7.61120446 13.4,7.80005884 L16.4,9.80005884 C16.6858125,10.0144182 17.0642734,10.0600153 17.3928203,9.9196741 C17.7213672,9.77933291 17.9500859,9.47437463 17.9928203,9.11967409 C18.0355547,8.76497355 17.8858125,8.41441819 17.6,8.20005884 L17.6,8.20005884 Z"/>
  </svg>
  `)

  // toolbar 按钮功能
  editor.ui.registry.addSplitButton('horizontalindent', {
    tooltip: '水平缩进',
    // 图标
    icon: 'horizontalindent',
    // 初始化
    onSetup (api) {
      editor.formatter.register({
        horizontalindent: {
          selector: 'p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,section,article,header,footer,figcaption',
          styles: { 'padding-left': '%value', 'padding-right': '%value' }
        }
      })
    },
    // 图标点击
    onAction (api) {
      return editor.execCommand('mceHorizontalIndent')
    },
    // 列表项点击
    onItemAction (buttonApi, value) {
      return editor.execCommand('mceHorizontalIndent', false, value)
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
