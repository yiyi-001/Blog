<template>
	<div class="img-upload">
		<template v-if="url">
			<img class="img" :src="url" alt="img" @click="handleImgClick">
			<div class="hover">
				<i class="el-icon-circle-close delete-icon" @click="handleRemove"></i>
			</div>
		</template>
		<input v-if="!url" :accept="accept" name="imges" class="input" type="file" @change="handleChange">
		<i v-if=" !uploading && !url " class="el-icon-plus plus-icon"></i>
	</div>
</template>

<script>
import { imageUploadApi } from './fetch'
import ImageFullScreen from '@/widget/Viewer'

export default {
  name: 'SingleUpload',
  props: {
    value: String,
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },
  data () {
    return {
      url: '',
      percent: 0,
      uploading: false
    }
  },
  watch: {
    url (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.url = val
    }
  },
  methods: {
    // 图片上传
    async handleChange ({ target }) {
      try {
        const { maxSize } = this
        const file = target.files[0]
        console.log('target===>>>', target)

        console.log('file===>>>', file)

        // 校验大小
        if (file.size > maxSize) {
          const output = maxSize < 1024 * 1024 ? `${maxSize / 1024}k` : `${maxSize / 1024 / 1024}M`
          this.$message.warning('图片大小不能大于' + output)
          return
        }
        this.uploading = true
        const formData = new FormData()
        formData.append('images', file)
        console.log('formData')

        const data = await imageUploadApi(formData)
        this.url = data.data
        console.log('url==>>>', this.url)
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.uploading = false
        target.value = ''
      }
    },
    // 图片删除
    handleRemove () {
      this.url = ''
    },
    // 图片查看
    handleImgClick () {
      if (this.url) {
        ImageFullScreen({
          list: [{ url: this.url }],
          itemKey: 'url',
          index: 0
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img-upload{
  width: 120px;
  height: 120px;
  position: relative;
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.img-upload .img{
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: zoom-in;
}
.img-upload .process{
  padding: 20px;
}
.img-upload .input{
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.img-upload .plus-icon{
  font-size: 30px;
}
.img-upload .hover {

}
.delete-icon {
  font-size: 24px;
  color: #333;
  position: absolute;
  top: -10px;
  right: -10px;
}
</style>
