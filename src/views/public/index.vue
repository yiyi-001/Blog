<template>
	<div v-loading="loading" class="article-container">
		<!-- 头部 -->
		<section class="header">
			公告管理
		</section>
		<!-- 筛选 -->
		<section class="filter">
			<el-form inline :model="inquiryData">
				<el-form-item label="公告名称：">
					<el-input v-model="inquiryData.publicTitle" clearable placeholder="请输入公告名称"></el-input>
				</el-form-item>
		
				<el-button class="search-btn" type="primary" @click="handleFilterSearch">查询</el-button>
			</el-form>
			<span>
				<el-button type="success" @click="editPublic('add')">添加公告</el-button>
			</span>
		</section>
		<!-- 表格 -->
		<section class="table">
			<el-table :data="publicData" style="width: 100%" >
				<el-table-column label="公告ID" prop="id"></el-table-column>
				<el-table-column label="通知公告" prop="publicContent" width="420"></el-table-column>
				<el-table-column label="发布者" prop="publishUser"></el-table-column>
				<el-table-column label="发布日期" prop="publishDate"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-button type="text" @click="editPublic('edit', scope.row)">编辑</el-button>
						<el-button class="red" type="text" @click="delPublic(scope.row.id)">删除</el-button>
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
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange">
			</el-pagination>

      <el-dialog v-if="isShowDialog" :title="dialogTitle" :close-on-click-modal="false" :visible.sync="isShowDialog" width="433px">
					<el-form ref="publicForm" :model="newPublicData" :rules="publicRules">
						<el-form-item label="公告内容" prop="publicContent" label-width="80px">
							<el-input type='textarea' v-model="newPublicData.publicContent" maxlength="40"  rows='4' placeholder="请输入" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>
            <el-form-item label="发布者" prop="publishUser" label-width="80px">
							<el-input v-model="newPublicData.publishUser" placeholder="请输入" maxlength="20" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>
					
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="isShowDialog = false">取 消</el-button>
						<el-button type="primary" @click="submitPublic('publicForm')">确 定</el-button>
					</div>
				</el-dialog>
		</section>
	</div>
</template>

<script>
import { getPublic, deletePublic, insertPublic, updatePublic} from './fetch'
export default {
  name: 'Public',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '公告管理' }
      ])
    })
  },
  data () {
    return {
      pageSize: 10,
      curPage: 1,
      total: undefined,
      loading: false,
      inquiryData: {
        publicTitle: ''
        
      },
      newPublicData: {
        publicContent: '',
        publishUser: ''
      },
      publicData: null,
      isShowDialog: false,
      publicRules:{
        publicContent: [
          { required: true, message: '公告内容不能为空', trigger: 'blur' }
        ],
        publishUser: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created () {
    this.init()
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
        const data = await getPublic(params)
        console.log('');
        data.data.forEach(item => {
          item.publishDate = item.publishDate.substring(0, 10)
        })
        this.isLoading = false
        this.total = data.total
        this.publicData = data.data
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },

    delPublic (id) {
      try {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.loading = true
          await deletePublic({ id: id })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loading = false
          this.init()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } catch (e) {
        this.$error(e)
      }
    },

    // 编辑公告
    async editPublic (title, data) {
      if (title === 'add') {
        this.dialogTitle = '添加公告'
        Object.keys(this.newPublicData).forEach(publicData => {
          this.newPublicData[publicData] = ''
        })
      } else {
        this.dialogTitle = '编辑公告'
        this.newPublicData = JSON.parse(JSON.stringify(data))
      }
      this.isShowDialog = true
    },

    isAdd (title) {
      return title === 'add'
    },
    async submitPublic (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendReq(valid)
        } else {
          console.log('error submit!!')
          return false
        }
        this.isShowDialog = false
      })
    },
    async sendReq () {
      if (this.dialogTitle === '添加公告') {
        try {
          console.log('data ===>>>', this.newPublicData);
          await insertPublic(this.newPublicData)
          this.$success('提交成功')
          this.init()
        } catch (e) {
          this.$message({
            message: '提交失败 ',
            type: 'error'
          })
        }
      } else {
        try {
          // console.log('netlink===>>>', this.newPublicData)

          await updatePublic(this.newPublicData)
          this.$success('提交成功')
          this.init()
        } catch (e) {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        }
      }
    },

    handleFilterSearch () {
      this.init()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.init()
    },
    handleCurrentChange (currentPage) {
      this.curPage = currentPage
      this.init()
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
    padding: 0 20px;
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
