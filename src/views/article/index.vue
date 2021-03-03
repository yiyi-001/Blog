<template>
	<div v-loading="loading" class="article-container">
		<!-- 头部 -->
		<section class="header">
			文章管理
		</section>
		<!-- 筛选 -->
		<section class="filter">
			<el-form inline :model="inquiryData">
				<el-form-item label="文章名称：">
					<el-input v-model="inquiryData.articleTitle" clearable placeholder="请输入文章名称"></el-input>
				</el-form-item>
				<el-form-item label="文章分类:">
					<el-select v-model="inquiryData.attr" filterable clearable>
						<el-option v-for="(item,index) in categoryList" :key="index" :value="item.value" :label="item.label"></el-option>
					</el-select>
				</el-form-item>
				<el-button class="search-btn" type="primary" @click="search">查询</el-button>
			</el-form>
			<span>
				<el-button type="success" @click="handleAddArticle">添加文章</el-button>
			</span>
		</section>
		<!-- 表格 -->
		<section class="table">
			<el-table :data="articleData">
				<el-table-column label="文章ID" prop="id" width="180"></el-table-column>
				<el-table-column label="文章名称" prop="articleTitle"></el-table-column>
				<el-table-column label="文章分类" prop="categoryName" width="220"></el-table-column>
				<el-table-column label="发布日期" prop="publishDate" width="180"></el-table-column>
				<el-table-column label="操作" width="180">
					<template v-slot="scope">
						<el-button type="text" @click="editArticle(scope.row)">编辑</el-button>
						<el-button class="green" type="text" @click="preArticle(scope.row.id)">预览</el-button>
						<el-button class="red" type="text" @click="delArticle(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="form-pagination"
				:current-page="curPage"
				:page-sizes="[10]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="changePage"
				@current-change="changeSize">
			</el-pagination>
		</section>
	</div>
</template>

<script>
import { getArticle, deleteArticle } from './fetch'
import { getCategory } from '../category/fetch'
export default {
  name: 'Article',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '文章管理' }
      ])
    })
  },
  data () {
    return {
      curPage: 1,
      pageSize: 10,
      total: undefined,
      loading: false,
      inquiryData: {
        articleTitle: '',
        attr: undefined
      },
      articleData: null,
      categoryList: []
    }
  },
  created () {
    this.init()
    this.getCate()
  },
  methods: {
    async init () { // 查询和首次数据渲染
      try {
        const p = this.curPage
        const r = this.pageSize
        const params = {
          ...this.inquiryData,
          page: p,
          rows: r
        }
        this.isLoading = true
        const data = await getArticle(params)

        data.data.forEach(item => {
          item.publishDate = item.publishDate.substring(0, 10)
        })
        this.isLoading = false
        this.total = data.total
        this.articleData = data.data
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },
    async getCate () { // 获取分类项
      try {
        const params = {

          page: 1,
          rows: 20
        }
        const data = await getCategory(params)
        data.data.forEach(item => {
          const category = {
            label: item.categoryName,
            value: item.id
          }
          this.categoryList.push(category)
        })

        // console.log('data==>>>', data)
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },
    editArticle (id) {
      this.$router.push({ path: `/article/edit/${id}` })
    },
    delArticle (data) {
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteArticle({
          id: data
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.showLinkList()
      }).catch(e => {
        console.log(e)
      })
    },

    // preArticle (id) {
    //   if (id) {
    //     window.open(`https://www.zjepa.cn/detail/${id}`)
    //   }
    // },
    search () {
      this.init()
    },
    handleAddArticle () {
      this.$router.push({ path: '/article/add' })
    },
    changePage (size) {
      this.pageSize = size
      // this.init()
    },
    changeSize (curPage) {
      this.curPage = curPage
      // this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container{
  background-color: #fff;
  padding-bottom: 20px;
  .header{
    height: 54px;
    color: #333333;
    padding-left: 20px;
    line-height: 54px;
    font-weight: 500;
    border-bottom: 1px solid #EAEEFB;
  }
  .filter{
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    .search-btn{
      width: 90px;
      margin-left: 40px;
    }
  }
  .table{
    margin: 0 20px;
    border: 1px solid #EAEEFB;
    .green{
      color: #67C23A;
    }
    .red{
      color: #F56C6C;
    }
  }
  .form-pagination{
    text-align: center;
    padding: 60px 0 36px 0;
  }
}
</style>
