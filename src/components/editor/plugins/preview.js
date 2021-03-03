import Tinymce from 'tinymce'

Tinymce.PluginManager.add('preview', function (editor) {
  const adaptStyle = `
    body {
      width: 375px !important;
      height: 667px !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 17px;
    }
    .adaptive-screen-width {
      width: 100% !important;
      height: auto;
    }
  
  `

  const Settings = {
    getContentStyle (editor) {
      return editor.getParam('content_style', '')
    },
    shouldUseContentCssCors (editor) {
      return editor.getParam('content_css_cors', false, 'boolean')
    },
    getBodyId (editor) {
      let bodyId = editor.settings.body_id || 'tinymce'
      if (bodyId.indexOf('=') !== -1) {
        bodyId = editor.getParam('body_id', '', 'hash')
        bodyId = bodyId[editor.id] || bodyId
      }
      return bodyId
    },
    getBodyClass (editor) {
      let bodyClass = editor.settings.body_class || ''
      if (bodyClass.indexOf('=') !== -1) {
        bodyClass = editor.getParam('body_class', '', 'hash')
        bodyClass = bodyClass[editor.id] || ''
      }
      return bodyClass
    },
    getDirAttr (editor) {
      const encode = editor.dom.encode
      const directionality = editor.getBody().dir
      return directionality ? ' dir="' + encode(directionality) + '"' : ''
    }
  }

  const getPreviewFrame = function (editor) {
    // <head>
    let headHtml = ''
    const encode = editor.dom.encode
    const contentStyle = Settings.getContentStyle(editor)
    headHtml += `<base href="${encode(editor.documentBaseURI.getURI())}">`
    if (contentStyle) {
      headHtml += `<style type="text/css">${contentStyle + adaptStyle}</style>`
    }
    const cors = Settings.shouldUseContentCssCors(editor) ? ' crossorigin="anonymous"' : ''
    Array.from(editor.contentCSS).forEach(url => {
      headHtml += `<link type="text/css" rel="stylesheet" href="${encode(editor.documentBaseURI.toAbsolute(url))}" ${cors}>`
    })
    // <body>
    const bodyId = Settings.getBodyId(editor)
    const bodyClass = Settings.getBodyClass(editor)
    const dirAttr = Settings.getDirAttr(editor)
    // 禁用点击事件
    const preventClicksOnLinksScript = '<script>document.addEventListener && document.addEventListener("click", function(e) {for (var elm = e.target; elm; elm = elm.parentNode) {if (elm.nodeName === "A") {e.preventDefault();}}}, false);</script> '
    // html
    const html = `
      <!DOCTYPE html>
        <html lang="zh_cn">
          <head>${headHtml}</head>
          <body id="${encode(bodyId)}" class="mce-content-body ${encode(bodyClass)}" ${dirAttr}>
            ${editor.getContent()}
            ${preventClicksOnLinksScript}
          </body>
        </html>  
    `
    // iframe
    return `
      <iframe sandbox="allow-scripts allow-same-origin" frameborder="0" width="395" height="667" srcdoc="${encode(html)}">
      </iframe>
    `
  }

  const getPreviewDialog = function (editor) {
    const frame = getPreviewFrame(editor)
    const id = 'tinymce-editor-preview-dialog-wrapper'
    const closeEvent = `
      onclick="document.getElementById('${id}').remove()"
    `
    const dialog = document.createElement('div')
    dialog.id = id
    dialog.innerHTML = `
      <div class="tinymce-editor-preview-dialog-mask"></div>
      <div class="tinymce-editor-preview-dialog">
        <div class="tinymce-editor-preview-dialog-header">
            <div class="tinymce-editor-preview-dialog-header-title">预览</div>
            <div class="tinymce-editor-preview-dialog-header-close" ${closeEvent} title="关闭">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.953 7.453L13.422 12l4.531 4.547-1.406 1.406L12 13.422l-4.547 4.531-1.406-1.406L10.578 12
                 6.047 7.453l1.406-1.406L12 10.578l4.547-4.531z" fill-rule="evenodd"></path>
              </svg>
            </div>
        </div>
        <div class="tinymce-editor-preview-dialog-body">${frame}</div>
        <div class="tinymce-editor-preview-dialog-footer">
            <div class="tinymce-editor-preview-dialog-footer-btn" ${closeEvent}>关闭</div>
        </div>
      </div>
    `
    return dialog
  }

  const actionFunction = (editor, value) => {
    const dialog = getPreviewDialog(editor)
    if (document.getElementById(dialog.id)) {
      console.warn('当前页面只能有一个弹窗')
    } else {
      document.body.appendChild(dialog)
    }
  }

  editor.addCommand('mcePreview', function () {
    actionFunction(editor)
  })

  editor.ui.registry.addButton('preview', {
    icon: 'preview',
    tooltip: 'Preview',
    onAction: function () {
      return editor.execCommand('mcePreview')
    }
  })
})
