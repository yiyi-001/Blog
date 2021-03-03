import Tinymce from 'tinymce'
import { uploadFileApi } from 'src/api/common'
import { getUid } from 'src/utils/utils'
import editorConfig, { IMG_EXTERNAL_SRC_KEY } from './editor-config'
import instanceConfig from './instance-config'
import './zh_CN.js'
import './plugins'
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/themes/silver'
// import 'tinymce/icons/default'

export default {
  name: 'TinymceEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    instanceName: {
      type: String,
      required: true,
      default: 'full'
    },
    value: {
      type: String,
      required: true,
      default: ''
    },
    width: {
      type: Number,
      required: false,
      default: 900
    },
    height: {
      type: Number,
      required: false,
      default: 700
    },
    multiple: {
      type: [Boolean, String],
      required: false,
      default: true
    }
  },
  data () {
    const uid = getUid(8)
    return {
      ultimateConfig: instanceConfig[this.instanceName] || {},
      loading: false,
      loadingText: '加载中',
      selector: this.multiple ? ('editor-' + uid) : '',
      // 图片上传失败后，重新上传的次数
      imgUploadCount: 3
    }
  },
  async mounted () {
    try {
      // 清除超过1天的自动存储
      this.handleClearExpiredData(1)
      //
      await this.init()
    } catch (e) {
      this.$error(e)
    }
  },
  methods: {
    async init () {
      try {
        const self = this
        const { width, height, selector, multiple } = this
        const editor = await Tinymce.init(Object.assign({}, editorConfig, {
          selector: multiple ? ('#' + selector) : editorConfig.selector,
          width,
          height,
          // 编辑器实例初始化完成的回调
          init_instance_callback: editor => {
            self.handleInitEditorInstance(editor, self)
          }
        }, self.ultimateConfig))
        this.editor = editor[0]
      } catch (e) {
        console.log(e)
        await Promise.reject(e)
      }
    },
    handleInitEditorInstance (editor, self) {
      // 数据双向绑定
      self.$nextTick(() => {
        self.handleTwoWayDataBinding(editor, self)
      })
      // 处理命令事件
      editor.on('ExecCommand', async (e) => {
        console.log('editor command:' + e.command)
        try {
          // 插入内容到编辑器
          if (e.command === 'mceInsertContent') {
            await self.handlePasteCommand(e, editor, self)
          }
          // 如果是全屏指令
          if (e.command === 'mceFullScreen') {
            self.$emit('hackFullScreenScrollBar')
          }
        } catch (e) {
          self.$error(e)
        }
      })
    },
    handleTwoWayDataBinding (editor, self) {
      let currentContent = ''
      // 双向绑定数据
      self.$watch('value', (val, prevVal) => {
        if (editor && typeof val === 'string' && val !== currentContent && val !== prevVal) {
          editor.setContent(val)
          currentContent = val
        }
      })
      editor.on('change keyup undo redo', () => {
        currentContent = editor.getContent()
        self.$emit('change', currentContent)
      })
    },
    dataURLtoFile (dataurl, filename) {
      // 将base64转换为文件
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {
        type: mime
      })
    },

    async handlePastePostProcess (editor, self, temp) {
      self.loading = true
      const text = self.loadingText
      self.loadingText = '粘贴的内容中有图片，正在上传到服务器，请稍后'
      // 取出外链
      const imgList = Array.from(temp.querySelectorAll(`img[${IMG_EXTERNAL_SRC_KEY}]`))
      // 如果没有外链图片
      if (!imgList.length) {
        temp = null
        self.loadingText = text
        self.loading = false
        return
      }
      // 如果有外链图片,将外链转File，上传自己服务器
      try {
        const externalLinks = imgList.map(img => img.src)
        const promiseList = externalLinks.map(item => {
          return new Promise((resolve, reject) => {
            const image = new Image()
            image.setAttribute('crossOrigin', 'anonymous')
            image.setAttribute('src', item)
            image.onload = async function () {
              const canvas = document.createElement('canvas')
              canvas.width = image.width
              canvas.height = image.height
              const context = canvas.getContext('2d')
              context.drawImage(image, 0, 0, image.width, image.height)
              const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
              const file = self.dataURLtoFile(url, 'xxx.png')
              // 上传自己的服务器
              const formData = new FormData()
              formData.append('multipartFile', file)
              const res = await uploadFileApi(formData)
              resolve(res)
            }
          })
        })

        const res = await Promise.all(promiseList)
        if (res.length) {
          // 设置图片为七牛地址
          imgList.forEach((img, index) => {
            img.setAttribute('src', res[index])
            img.removeAttribute(IMG_EXTERNAL_SRC_KEY)
          })
        }
        self.imgUploadCount -= 1
        // 如果还有外链图片（可能是部分上传失败），递归
        if (temp.querySelectorAll(`img[${IMG_EXTERNAL_SRC_KEY}]`).length && self.imgUploadCount > 0) {
          await self.handlePastePostProcess(editor, self, temp)
        }
      } catch (e) {
        self.$error(e)
      } finally {
        temp = null
        self.loadingText = text
        self.loading = false
      }
    },
    handleClearExpiredData (day = 3) {
      Object.keys(localStorage)
        .filter(i => /^tinymce-autosave-/.test(i))
        .filter(j => {
          const match = j.match(/-time$/)
          if (match) {
            const time = localStorage.getItem(j)
            return (Date.now() - time) / (1000 * 60 * 60 * 24) > day
          } else {
            return false
          }
        })
        .forEach(k => {
          const draft = k.replace(/-time$/, '-draft')
          localStorage.removeItem(draft)
          localStorage.removeItem(k)
        })
    },
    async handlePasteCommand (e, editor, self) {
      const content = editor.getContent()
      if (e.value && e.value.content) {
        // 如果内容中有图片
        let temp = document.createElement('div')
        temp.innerHTML = content
        if (temp.querySelectorAll('img').length) {
          await self.handlePastePostProcess(editor, self, temp)
          // 图片上传完成后，恢复上传次数
          self.imgUploadCount = 3
        }
        // 如果还有外链图片，替换为默认图片
        if (temp && temp.querySelectorAll(`img[${IMG_EXTERNAL_SRC_KEY}]`).length) {
          Array.from(temp.querySelectorAll(`img[${IMG_EXTERNAL_SRC_KEY}]`)).forEach(img => {
            img.setAttribute('src', `${process.env.VUE_APP_BASE_CDN}/common/images/cant-find-and-reupload.png`)
            img.removeAttribute(IMG_EXTERNAL_SRC_KEY)
          })
          this.$warn('粘贴的图片中有外链图片无法上传到服务器，请从本地重新上传')
        }
        self.$emit('change', temp.innerHTML)
        temp = null
      }
    }
  }
}
