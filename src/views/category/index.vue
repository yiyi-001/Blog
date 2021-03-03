<template>
	<div id="links" title="分类管理">
		<!-- 标题部分 -->
		<div slot="header" class="header-title">
			<div class="title">
				<span>分类管理</span>
			</div>
		</div>
		<!-- 表格 + 查询 -->
		<div class="main">
			<!-- 查询 -->
			<div class="content-title">
				<el-form :inline="true" :model="inquiryData" class="demo-form-inline">
					<el-form-item label="分类名称">
						<el-input v-model="inquiryData.categoryName" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="search-btn-pd" @click="showCategoryList">
							查询
						</el-button>
					</el-form-item>
				</el-form>
				<div class="btns">
					<el-button type="success" class="btn-pd" @click="editCategory('add')">添加分类</el-button>
				</div>
			</div>

			<!-- 表格 -->
			<div class="content-table">
				<el-table
					v-loading="isLoading"
					:data="categoryData"
					style="width: 100%"
					header-row-class-name="table-head"
					empty-text="暂无数据">
					<el-table-column prop="id" label="分类ID"> </el-table-column>
					<el-table-column prop="categoryName" label="分类名称"> </el-table-column>
					<el-table-column prop="categoryDesc" label="分类描述" width="480"> </el-table-column>
					<el-table-column prop="categoryNum" label="文章总数"> </el-table-column>
					<el-table-column label="操作" width="280">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="editCategory('edit', scope.row)">
								编辑
							</el-button>
							<el-button
								type="text"
								size="small"
								class="del-btn"
								@click="delCategory(scope.row.id)">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页 -->
				<el-pagination
					:current-page="curPage"
					:page-sizes="[10]"
					:page-size="pageSize"
					:page-count="total / pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
					@current-change="changePage"
					@size-change="changeSize">
				</el-pagination>

				<el-dialog v-if="isShowDialog" :title="dialogTitle" :close-on-click-modal="false" :visible.sync="isShowDialog" width="433px">
					<el-form ref="categoryForm" :model="newCategoryData" :rules="categoryRules">
						<el-form-item label="分类名称" prop="categoryName" label-width="80px">
							<el-input v-model="newCategoryData.categoryName" maxlength="30" placeholder="请输入" class="pd-r"></el-input>
						</el-form-item>

						<el-form-item label="分类描述" prop="categoryDesc" label-width="80px">
							<el-input v-model="newCategoryData.categoryDesc" type="textarea" placeholder="请输入" maxlength="80" :show-word-limit="true" rows="4"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="isShowDialog = false">取 消</el-button>
						<el-button type="primary" @click="submitCategory('categoryForm')">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>

import { getCategory, deleteCategory, updateCategory, insertCategory } from './fetch'

export default {
  name: 'Category',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '分类管理' }
      ])
    })
  },
  data () {
    return {
      categoryData: [],
      inquiryData: {
        categoryName: null
      },

      newCategoryData: {
        categoryName: '',
        categoryDesc: ''
      },

      categoryRules: {
        categoryName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ]
      },

      total: 3,
      pageSize: 10,

      curPage: 1,

      isLoading: false,

      isShowDialog: false,
      dialogTitle: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.showCategoryList()
    },
    async showCategoryList () { // 查询和首次数据渲染
      try {
        const p = this.curPage
        const r = this.pageSize
        const params = {
          ...this.inquiryData,
          page: p,
          rows: r
        }
        this.isLoading = true
        const data = await getCategory(params)

        this.isLoading = false
        this.total = data.total
        this.categoryData = data.data
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },

    // 删除分类
    delCategory (data) {
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteCategory({
          id: data
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.showCategoryList()
      }).catch(e => {
        console.log(e)
      })
    },

    // 编辑分类
    async editCategory (title, data) {
      if (this.isAdd(title)) {
        this.dialogTitle = '添加分类'
        Object.keys(this.newCategoryData).forEach(categoryData => {
          this.newCategoryData[categoryData] = ''
        })
      } else {
        this.dialogTitle = '编辑分类'
        this.newCategoryData = JSON.parse(JSON.stringify(data))
      }
      this.isShowDialog = true
    },

    isAdd (title) {
      return title === 'add'
    },
    async submitCategory (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.sendReq(valid)
        } else {
          console.log('error submit!!')
          return false
        }
        this.isShowDialog = false
      })
    },

    // post数据
    async sendReq () {
      if (this.dialogTitle === '添加分类') {
        try {
          await insertCategory(this.newCategoryData)
          this.$success('添加成功')
          this.showCategoryList()
        } catch (e) {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      } else {
        try {
          await updateCategory(this.newCategoryData)
          this.$success('修改成功')
          this.showCategoryList()
        } catch (e) {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      }
    },

    changePage (p) { // 切换表格页
      this.curPage = p
      this.showCategoryList(p, this.pageSize)
    },
    changeSize (s) { // 切换表格展示条数
      this.pageSize = s
      this.showCategoryList(this.curPage, s)
    }
  }

}
</script>

<style lang="scss" scope>
.el-table__empty-text,
.cell,
.el-button--small{
  font-size: 14px;
}
#links{
	background-color: #fff;
  color: #666;
	.header-title {
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #EAEEFB;
    .title{
    padding: 0 19px 0 21px;
      span {
        color: #333;
      }
    }
  }
	.main {
    padding: 0 19px 20px 21px;
    .content-title {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
			.search-btn-pd{
				padding: 10px 32px;
				font-size: 14px;
			}
			.btns{
				line-height: 40px;
				.btn-pd {
					padding: 10px 18px;
					font-size: 14px;
				}
			}
			.el-input__inner{
				height: 40px;
				line-height: 40px;
			}
			.el-form-item__label{
				line-height: 40px;
			}
			.el-form-item__content{
				line-height: 40px;
			}
		}
		.content-table{
      padding:0 20px;
      margin:0 20px;
      border: 1px solid #EAEEFB;
			.del-btn{
				color: #F56C6C;
			}
			.el-pagination {
				text-align: center;
				margin-top: 55px;
				margin-bottom: 36px;
				color: #666 !important;
				.btn-next{
					padding-left: 0;
				}
				.btn-prev{
					padding-right: 0;
				}
				.el-pager{
					li{
						font-weight: 400;
						font-size: 14px;
					}
				}
				.el-pagination__total, .el-pagination__jump{
					color: #666;
				}

			}
		}
		.el-dialog__wrapper{
				.el-dialog{
					height: 410px;
					border-radius: 8px;
					.el-dialog__header{
						border-bottom: 1px solid #E9E9E9;
						padding-left: 38px;
						padding-bottom: 19px;
						.el-dialog__title{
							font-size: 20px;
						}
						i{
							font-size: 20px;
						}
					}
					.el-dialog__body{

						.el-form-item{
              margin-bottom: 28px;
							.el-form-item__content{
								.el-input{
									width: 289px;
								}
							}
              .el-textarea{
                width:92%;
              }
						}
						.tips{
							color: #F56C6C;
							font-size: 12px;
							margin-left: 80px;
						}
					}
				}
			}
	}

}
</style>
