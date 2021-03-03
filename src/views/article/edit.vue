<template>
	<div v-loading="loading" class="edit-container">
		<!-- 头部 -->
		<section class="header">{{ title }}</section>
		<!-- 表单 -->
		<section class="form">
			<el-form ref="form" :model="formData" :rules="rules" label-position="right" label-width="120px">
				<el-form-item label="文章名称：" prop="articleTitle">
					<el-input v-model="formData.articleTitle" placeholder="请输入" maxlength="50" show-word-limit style="width: 696px;"></el-input>
				</el-form-item>
				<el-form-item label="所属分类：" prop="categoryId">
					<el-select v-model="formData.categoryId" filterable>
						<el-option v-for="(item,index) in categoryList" :key="index" :value="item.id" :label="item.categoryName"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="缩略图：" prop="articleImg" :rules="!!formData.slideFlag ? rules.articleImg:[]">
					<Single v-model="formData.articleImg" name="image"></Single>
					<div class="tips">图片建议尺寸 700*420，图片大小不超过5M</div>
				</el-form-item>
				<el-form-item label="文章来源：" prop="articleSource">
					<el-input v-model="formData.articleSource" placeholder="请输入" maxlength="15" show-word-limit style="width: 332px;"></el-input>
				</el-form-item>
				<el-form-item label="发布日期：">
					<el-date-picker
						v-model="formData.publishDate"
						type="date"
						format="yyyy-MM-dd "
						placeholder="选择日期">
					</el-date-picker>
					<div class="tips">请选择发布日期，未选择默认按文章添加日期</div>
				</el-form-item>

				<el-form-item label="文章内容：" prop="articleContent">
					<!-- <Editor v-model="formData.articleContent" instance-name="full"></Editor> -->

					<!-- mavon-editor--- markdown 编辑器 -->
					<!-- :ishljs="true"  :short-cut="true" 开启代码高亮props -->
					<mavon-editor ref="md" v-model="articleContent" :box-shadow="false" :transition="true"
						:short-cut="true"
						:ishljs="true"
						class="markdown"
						@imgAdd="$imgAdd" @imgDel="$imgDel" />
				</el-form-item>
			</el-form>
			<div class="btn-wrap">
				<el-button @click="handleGoBack">返回</el-button>
				<el-button type="primary" @click="handleSave">保存</el-button>
			</div>
		</section>
	</div>
</template>

<script>
// import { getArticleDetailApi, saveArticleDetailApi, getCateGoryListApi } from './fetch'

import Single from 'src/components/imageUpload/Single'
import axios from 'axios'
// import Editor from '@/components/editor/editor'
export default {
  name: 'EditArticle',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '文章管理', path: '/article' },
        { name: vm.id ? '编辑文章' : ' 添加文章' }
      ])
    })
  },
  components: {
    Single
    // Editor
  },
  data () {
    const { id } = this.$route.params
    return {
      id: id,
      loading: false,
      content: '',
      formData: {
        articleTitle: '',
        categoryId: undefined,
        slideFlag: undefined,
        headFlag: undefined,
        recommendFlag: undefined,
        articleImg: '',
        articleSource: '',
        publishDate: '',
        displayFlag: undefined,
        articleContent: ''
      },
      rules: {
        articleTitle: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] }
        ],
        categoryId: [
          { required: true, message: '请选择', trigger: ['change', 'blur'] }
        ],
        articleImg: [
          { required: true, message: '请上传', trigger: ['change', 'blur'] }
        ],
        articleSource: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] }
        ],
        displayFlag: [
          { required: true, message: '请选择', trigger: ['change', 'blur'] }
        ],
        articleContent: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] }
        ]
      },
      categoryList: null

    }
  },
  computed: {
    title () {
      return this.id ? '编辑文章' : '添加文章'
    }
  },
  // async created () {
  //   try {
  //     this.loading = true
  //     this.categoryList = await getCateGoryListApi()
  //     this.init()
  //   } catch (e) {
  //     this.$error(e)
  //   }
  // },
  methods: {
    // async init () {
    //   try {
    //     if (this.id) {
    //       this.loading = true
    //       const res = await getArticleDetailApi({
    //         id: this.id
    //       })
    //       if (res) {
    //         res.headFlag = !!res.headFlag
    //         res.slideFlag = !!res.slideFlag
    //         res.recommendFlag = !!res.recommendFlag
    //         this.formData = res
    //       }
    //     }
    //   } catch (e) {
    //     this.$error(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
    // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      this.img_file[pos] = $file
      axios({
        url: '/api/edit/uploadimg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        const _res = res.data
        // 第二步.将返回的url替换到文本原位置[外链图片转存失败(img-Anv63SQR-1564734760257)(0)] -> [外链图片转存失败(img-OVX7vZS4-1564734760259)(url)]
        /**
       * $vm 指为mavonEditor实例，可以通过如下两种方式获取
       * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
       * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
       */

        this.$refs.md.$img2Url(pos, _res.url)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },

    zero (val) {
      return val < 10 ? '0' + val : val
    },
    // async handleSave () {
    //   try {
    //     this.loading = true
    //     await this.$refs.form.validate()
    //     let date = ''
    //     if (this.formData.publishDate) {
    //       const tempDate = new Date(this.formData.publishDate)
    //       date = tempDate.getFullYear() + '-' + this.zero(tempDate.getMonth() + 1) + '-' + this.zero(tempDate.getDate())
    //     }
    //     const data = {
    //       id: this.id,
    //       headFlag: +this.formData.headFlag || 0,
    //       slideFlag: +this.formData.slideFlag || 0,
    //       recommendFlag: +this.formData.recommendFlag || 0,
    //       articleContent: this.formData.articleContent,
    //       articleSource: this.formData.articleSource,
    //       articleTitle: this.formData.articleTitle,
    //       categoryId: this.formData.categoryId,
    //       displayFlag: this.formData.displayFlag,
    //       publishDate: date,
    //       articleImg: this.formData.articleImg
    //     }
    //     await saveArticleDetailApi(data)
    //     this.$success('保存成功！')
    //     this.$refs.form.clearValidate()
    //     this.$router.push({
    //       path: '/article'
    //     })
    //   } catch (e) {
    //     this.$error(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
    handleGoBack () {
      this.$router.push({
        path: '/article'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container{
  background-color: #fff;
  padding-bottom: 30px;
  .header{
    height: 54px;
    color: #333333;
    padding-left: 20px;
    line-height: 54px;
    font-weight: 500;
    border-bottom: 1px solid #EAEEFB;
  }
  .form{
    margin: 30px 20px 0 20px;
    padding: 30px 0;
    border: 1px solid #EAEEFB;
    .tips{
      color: #F56C6C;
      font-size: 12px;
    }
    .markdown{
      width:1500px;
      height:500px;
      border:1px solid #dcdfe6;
    }
  }
  .btn-wrap{
    margin-left: 120px;
    padding-top: 20px;
    .el-button{
      width: 100px;
    }
  }
}
</style>
