<template>
	<div class="wrap">
		<div v-for="(item, index) in urlList" :key="index" class="img-upload">
			<img class="img" :src="item[itemKey]" alt="img" @click="handleImgClick(index)" />
			<div class="hover">
				<i class="el-icon-circle-close delete-icon" @click="handleRemove"></i>
			</div>
		</div>
		<div v-if="urlList.length<+limit" class="img-upload">
			<input
				ref="input"
				:accept="accept"
				class="input"
				type="file"
				multiple
				@change="handleChange" />
			<i v-if="!uploading" class="el-icon-plus plus-icon"></i>
			<svg v-if="uploading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#e15b64" stroke="none">
					<animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
				</path>
			</svg>
		</div>
	</div>
</template>

<script>
import { imageUploadApi } from './fetch'
import ImageFullScreen from '@/widget/Viewer'
export default {
  name: 'SingleUpload',
  props: {
    itemKey: {
      type: String,
      default: 'url'
    },
    value: Array,
    maxSize: {
      type: Number,
      default: 50 * 1024 * 1024
    },
    limit: {
      type: [String, Number],
      default: 9
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },
  data () {
    return {
      urlList: [],
      percent: 0,
      uploading: false
    }
  },
  watch: {
    urlList (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.urlList = val
    }
  },
  methods: {
    // 图片上传
    async handleChange ({ target }) {
      try {
        if (!target.files.length) return
        if (target.files.length + this.urlList.length > +this.limit) {
          this.$message.warning(`最多可上传${this.limit}张图片！`)
          return
        }
        const files = Array.from(target.files)
        files.forEach(item => {
          if (item.size > this.maxSize) {
            const tips = this.maxSize < 1024 * 1024 ? `${this.maxSize / 1024}K` : `${this.maxSize / 1024 / 1024}M`
            this.$message.warning(`图片大小不能大于${tips}！`)
          }
        })
        this.uploading = true
        // 图片处理
        const uploadList = files.map(file => {
          const formData = new FormData()
          formData.append('multipartFile', file)
          return imageUploadApi(formData)
        })
        // 图片上传
        const res = await Promise.all(uploadList)
        res.forEach(item => {
          this.urlList.push({
            url: item.data.fullPath
          })
        })
        this.$refs.input.value = ''
      } catch (e) {
        this.$message({
          type: 'error',
          message: e
        })
      } finally {
        this.uploading = false
      }
    },
    // 图片删除
    handleRemove (index) {
      this.urlList.splice(index, 1)
    },
    // // 图片查看
    handleImgClick (index) {
      ImageFullScreen({
        list: this.urlList,
        itemKey: 'url',
        index: index
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.wrap{
  display: flex;
}
.img-upload {
  width: 120px;
  height: 120px;
  position: relative;
  border: 1px dashed orange;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.img-upload .img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: zoom-in;
}
.img-upload .process {
  padding: 20px;
}
.img-upload .input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.img-upload .plus-icon {
  font-size: 30px;
}
.img-upload .hover {
}
.delete-icon {
  font-size: 20px;
  color: rgb(38,50,56);
  position: absolute;
  top: -8px;
  right: -8px;
  cursor: pointer;
}
</style>
