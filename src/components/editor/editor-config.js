// import ImageUpload from 'src/utils/upload/image-upload'
import { Message } from 'element-ui'
import { uploadFileApi } from 'src/api/common'

// import { businessURL } from 'src/utils/yb/system'

/**
 * 设置编辑区域样式
 * */
export const defaultContentStyle = `
* {
  margin: 0;
  padding: 0
}
/* 默认字体大小 */
body {
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
}

/* 标题样式 */
h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}
h1 { font-size: 24px; }
h2 { font-size: 20px; }
h3 { font-size: 18px; }
h4 { font-size: 16px; }
h5 { font-size: 14px; }
h6 { font-size: 12px; }


/* 超链接样式 */
a {
  background-color: transparent;
  color: #004d9b;
  text-decoration: none;
  cursor: pointer;
}

blockquote {
  margin-left: 12px !important;
  padding-left: 12px !important;
  border-left: 2px solid #ccc !important;
}

ul, ol {
  margin-left: 1.5em;
}

sup {
  vertical-align: super;
  font-size: smaller;
}

sub {
  vertical-align: sub;
  font-size: smaller;
}

p {
  overflow: hidden;
}

iframe {
  display: block;
  width: 100%;
}

hr {
  margin-top: 12px;
}

`

/**
 * 默认的格式化样式配置
 */
export const defaultStyleFormat = [
  {
    title: 'Headings',
    items: [
      { title: 'Heading 1', format: 'h1' },
      { title: 'Heading 2', format: 'h2' },
      { title: 'Heading 3', format: 'h3' },
      { title: 'Heading 4', format: 'h4' },
      { title: 'Heading 5', format: 'h5' },
      { title: 'Heading 6', format: 'h6' }
    ]
  },
  {
    title: 'Inline',
    items: [
      { title: 'Bold', format: 'bold' },
      { title: 'Italic', format: 'italic' },
      { title: 'Underline', format: 'underline' },
      { title: 'Strikethrough', format: 'strikethrough' },
      { title: 'Superscript', format: 'superscript' },
      { title: 'Subscript', format: 'subscript' },
      { title: 'Code', format: 'code' }
    ]
  },
  {
    title: 'Blocks',
    items: [
      { title: 'Paragraph', format: 'p' },
      { title: 'Blockquote', format: 'blockquote' },
      { title: 'Div', format: 'div' },
      { title: 'Pre', format: 'pre' }
    ]
  },
  {
    title: 'Align',
    items: [
      { title: 'Left', format: 'alignleft' },
      { title: 'Center', format: 'aligncenter' },
      { title: 'Right', format: 'alignright' },
      { title: 'Justify', format: 'alignjustify' }
    ]
  }
]

// https://www.tiny.cloud/docs/advanced/editor-control-identifiers/
// 默认工具栏配置
export const defaultToolBar = [
  'undo redo | removeformat | bold italic underline strikethrough | forecolor backcolor | superscript subscript',
  'alignleft aligncenter alignright alignjustify | indent outdent | blockquote | styleselect fontselect fontsizeselect',
  // 以下为插件相关
  'bullist numlist | link unlink image hr table | formatpainter | searchreplace wordcount code fullscreen preview help',
  // 自定义插件
  'lineheight margintop marginbottom'
]

// 默认引入插件
export const defaultPlugins = [
  'lists advlist paste',
  'link autolink image imagetools media hr table nonbreaking',
  'autosave autoresize fullscreen preview help code',
  'searchreplace noneditable visualblocks wordcount',
  // 自定义插件
  'lineheight margintop marginbottom'
]

/**
 * 默认的图片样式列表
 */
export const defaultImageClassList = [
  { title: '无', value: '' },
  { title: '自适应手机屏幕宽度', value: 'adaptive-screen-width' }
]

/**
 * 将图片转为Blob
 * @param url
 * @param callback
 */
const handleImageUrlToBlob = (url, callback) => {
  function imageToCanvas (src, cb) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = src + '?t=2'
    img.crossOrigin = ''
    img.onload = function () {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      cb(canvas)
    }
  }

  function dataURLToBlob (dataURL) {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bStr = atob(arr[1])
    let n = bStr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  function canvasToDataURL (canvas, format, quality) {
    return canvas.toDataURL(format || 'image/jpeg', quality || 1.0)
  }

  imageToCanvas(url, function (canvas) {
    callback(dataURLToBlob(canvasToDataURL(canvas)))
  })
}

/**
 * 图片外部链接的key
 * @type {string}
 */
export const IMG_EXTERNAL_SRC_KEY = 'data-external-origin-src'

export const baseConfig = {
  selector: '.editor-textarea',
  // 插件资源后缀
  suffix: '.min',
  // 编辑器语言
  language: 'zh_CN',
  // 格式化不符合HTML规则的列表
  fix_list_elements: true,
  // undo redo的步数 为10，默认为无限制，但是会耗内存
  custom_undo_redo_levels: 10,
  // 输入url时，开启自动联想。数据来自本地缓存
  typeahead_urls: true,
  /**
   * 工具栏，包含全部可以选项
   */
  toolbar: defaultToolBar,
  /**
   * 插件
   */
  plugins: defaultPlugins,
  /**
   * 编辑器实例初始化完成的回调
   * @param editor
   */
  init_instance_callback: (editor) => {
    console.log('编辑器初始化完成', editor)
  },
  /**
   * 初始化前的回调
   * @param editor
   */
  setup: (editor) => {
    console.log('编辑器置开始初始化')
  }
}

export const uiConfig = {
  /**
   * 默认宽高
   */
  width: 700,
  height: 400,
  /**
   * 默认隐藏菜单栏
   */
  menubar: false,
  /**
   * 去掉右下角版权标识
   * @type Boolean
   */
  branding: false,
  /**
   * 富文本右下角的拖拽按钮
   * @type Boolean | String
   * @param false 不显示
   * @param true 显示，支持垂直方向
   * @param 'both' 显示，支持水平和垂直方向
   */
  resize: 'both',
  /**
   * 禁止默认右键菜单
   * @type Boolean
   */
  contextmenuNeverUseNative: true,
  /**
   * 自定义编辑区域内容样式
   */
  content_style: defaultContentStyle
}

export const corePluginConfig = {
  /**
   * 默认缩进大小
   */
  indentation: '1em',
  /**
   * 「块」样式格式化
   */
  block_formats: '段落=p; 标题 1=h1; 标题 2=h2; 标题 3=h3; 标题 4=h4; 标题 5=h5; 标题 6=h6;',

  /**
   * 工具栏「段落」下拉组件的默认值
   */
  style_formats: defaultStyleFormat,
  /**
   * 字体大小可选列表
   */
  fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',

  /**
   * 字体选择
   * PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Helvetica Neue,Arial,sans-serif
   */
  font_formats: "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';PingFang SC=PingFang SC;Hiragino Sans GB='Hiragino Sans GB';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
  /**
   * 格式化
   */
  formats: {
    removeformat: [
      {
        selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
        remove: 'all',
        split: true,
        block_expand: true,
        expand: false,
        deep: true
      },
      {
        selector: 'span',
        attributes: ['style', 'class'],
        remove: 'empty',
        split: true,
        expand: false,
        deep: true
      },
      {
        selector: '*',
        attributes: ['style', 'class'],
        split: false,
        expand: false,
        deep: true
      }
    ]
  }
}

export const filePluginConfig = {
  file_picker_callback: (callback, value, meta) => {
    // 文件分类
    var filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4,.jpg, .jpeg, .png, .gif'
    // 为不同插件指定文件类型
    switch (meta.filetype) {
      case 'image':
        filetype = '.jpg, .jpeg, .png, .gif'
        break
      case 'file':
      default:
    }
    // 模拟出一个input用于添加本地文件
    var input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', filetype)
    input.click()
    input.onchange = async function () {
      try {
        const file = this.files[0]
        if (file.size > 20 * 1024 * 1024) {
          Message.error('附件大小不得大于20M')
          return
        }
        const formData = new FormData()
        formData.append('multipartFile', file)
        const url = await uploadFileApi(formData)
        callback(url, { text: file.name })
      } catch (e) {
        Message.error(e)
      }
    }
  }
}

export const imagePluginConfig = {
  images_upload_base_path: '/',
  /**
   * 图片的样式编辑
   * 包括边框粗细、颜色，边距
   */
  image_advtab: true,
  /**
   * 图片下方的标题
   * 会使用figure 和 figcaption 标签
   */
  image_caption: false,
  /**
   * 图片 title
   */
  image_title: false,
  /**
   * 图片上传，使用示例见注释
   * @param blobInfo
   * @param success
   * @param fail
   * @returns {Promise<void>}
   */
  async images_upload_handler (blobInfo, success, fail) {
    try {
      const file = blobInfo.blob()
      const formData = new FormData()
      formData.append('multipartFile', file)
      const url = await uploadFileApi(formData)
      success(url)
    } catch (e) {
      fail(e.message || '上传失败，请重试')
    }
  },
  /**
   * 此两项在使用imagetools插件时必填，用于服务端上传。
   * 设置了imagetools_fetch_image之后无效，但也必须设置
   */
  imagetools_cors_hosts: [],
  imagetools_proxy: 'just a string and do nothing',
  /**
   * 使用imagetools修改图片之后，获取图片原始数据
   * @param image
   * @returns {Promise}
   */
  imagetools_fetch_image: (image) => {
    return new tinymce.util.Promise(function (resolve) {
      handleImageUrlToBlob(image.src, resolve)
    })
  },
  /**
   * 可选的图片样式列表
   */
  image_class_list: defaultImageClassList
}

export const linkPluginConfig = {
  // 默认链接打开方式
  default_link_target: '_blank',
  // 自动给链接添加https协议
  // link_assume_external_targets: 'https',
  // 链接的title属性
  link_title: false,
  // 可选的超链接class名称，用法同image_class_list
  link_class_list: [],
  // 光标移到超链接上时，展示操作栏
  link_context_toolbar: true
  // 预留的超链接列表，支持Array，function，api String
  // link_list: [],
  // 设置rel属性
  // rel_list: [],
  // 设置target属性
  // target_list: []
}

export const autoResizePluginConfig = {
  // 编辑器的最大高度，超出即显示滚动条
  max_height: 1200
}

export const autoSavePluginConfig = {
  // 自动保存的时间间隔
  autosave_interval: '30s',
  // 自动保存的数据存储的最大时间
  autosave_retention: '30m'
}

export const helpPluginConfig = {
  help_tabs: [
    'shortcuts',
    // 自定义的帮助tab
    {
      name: '使用说明',
      title: '使用说明',
      items: [
        {
          type: 'htmlpanel',
          html: '<p>此处可以添加自定义的说明文档</p>'
        }
      ]
    }
  ]
}

export const nonBreakingPluginConfig = {
  // 修改tab键的行为为在光标之后增加三个空格
  // 此插件引入需在table插件之后，不然会被table插件覆盖此行为
  nonbreaking_force_tab: true
}

export const powerPastePluginConfig = {

  // 粘贴前提示是否保留文本格式
  powerpaste_word_import: 'prompt',
  powerpaste_html_import: 'prompt',
  /**
   * 在粘贴到富文本之前，已经DOM格式化
   * @param plugin
   * @param args
   * @returns {Promise<void>}
   */
  async paste_postprocess (plugin, args) {
    Array.from(args.node.querySelectorAll('img')).forEach(img => {
      // 如果是外链
      if (/^((https|http):\/\/)/.test(img.src)) {
        // 如果不是内部URL
        if (!(img.src.indexOf('http://localhost') > -1 || img.src.indexOf('http://www.zjepa.com.cn') > -1)) {
          // 增加源地址的属性
          img.setAttribute(IMG_EXTERNAL_SRC_KEY, img.src)
        }
      }
    })
  }
}

export const visualBlocksPluginConfig = {
  // 是否展示每个内容的边框（在编辑区域）
  visualblocks_default_state: false
}

export const mediaPluginConfig = {
  media_alt_source: false,
  media_filter_html: false,
  media_live_embeds: true,
  // 视频封面图
  media_poster: false,
  // 视频展示尺寸
  media_dimensions: true
}

// 自定义插件的默认配置
export const customPluginConfig = {
  // 行高插件的默认值
  lineheight_default_value: 1.5,
  // margintop插件的默认值
  margintop_default_value: '5px',
  // marginbottom插件的默认值
  marginbottom_default_value: '5px'
}

export default {
  ...filePluginConfig,
  ...baseConfig,
  ...corePluginConfig,
  ...uiConfig,
  ...imagePluginConfig,
  ...linkPluginConfig,
  ...autoResizePluginConfig,
  ...autoSavePluginConfig,
  ...helpPluginConfig,
  ...nonBreakingPluginConfig,
  ...powerPastePluginConfig,
  ...visualBlocksPluginConfig,
  ...mediaPluginConfig,
  ...customPluginConfig
}
