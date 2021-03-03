<template>
	<div id="links" title="友情链接">
		<!-- 标题部分 -->
		<div slot="header" class="header-title">
			<div class="title">
				<span>友情链接</span>
			</div>
		</div>
		<!-- 表格 + 查询 -->
		<div class="main">
			<!-- 查询 -->
			<div class="content-title">
				<el-form :inline="true" :model="inquiryData" class="demo-form-inline">
					<el-form-item label="网站名称">
						<el-input v-model="inquiryData.siteName" placeholder="请输入" @keyup.enter.native="showLinkList()"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="search-btn-pd" @click="showLinkList">
							查询
						</el-button>
					</el-form-item>
				</el-form>
				<div class="btns">
					<el-button type="success" class="btn-pd" @click="editLinks('add')">添加链接</el-button>
				</div>
			</div>

			<!-- 表格 -->
			<div class="content-table">
				<el-table
					v-loading="isLoading"
					:data="linkData"
					style="width: 100%"
					header-row-class-name="table-head"
					empty-text="暂无数据">
					<el-table-column prop="id" label="id" width="140"> </el-table-column>
					<el-table-column prop="siteName" label="网站名称" width="200"> </el-table-column>
					<el-table-column prop="siteUrl" label="网址" width="360"> </el-table-column>
					<el-table-column prop="sortNo" label="排序"> </el-table-column>
					<el-table-column prop="updatedTime" label="更新日期">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="editLinks('edit', scope.row)">
								编辑
							</el-button>
							<el-button
								type="text"
								size="small"
								class="del-btn"
								@click="delLinks(scope.row.id)">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页 -->
				<el-pagination
					v-if="total"
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
					<el-form ref="commentForm" :model="newCommentData" :rules="commentRules">
						<el-form-item label="网站名称" prop="siteName" label-width="80px">
							<el-input v-model="newCommentData.siteName" maxlength="30" placeholder="请输入" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>
						<el-form-item label="网址" prop="siteUrl" label-width="80px">
							<el-input v-model="newCommentData.siteUrl" placeholder="请输入" maxlength="200" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>
						<el-form-item label="排序" prop="sortNo" label-width="80px">
							<el-input v-model="newCommentData.sortNo" placeholder="请输入"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="isShowDialog = false">取 消</el-button>
						<el-button type="primary" @click="submitWeb('commentForm')">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import { getLink, deleteLinks, updateLinks, insertLinks } from './fetch'
export default {
  name: 'Link',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '友情链接' }
      ])
    })
  },
  data () {
    return {
      linkData: [],
      inquiryData: {
        siteName: null
      },

      newCommentData: {
        siteName: '',
        siteUrl: '',
        sortNo: ''
      },

      commentRules: {
        siteName: [
          { required: true, message: '网站名称不能为空', trigger: 'blur' }
        ],
        siteUrl: [
          { required: true, message: '网址不能为空', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      },

      total: 0,
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
      this.showLinkList()
    },

    async showLinkList () { // 查询和首次数据渲染
      try {
        const p = this.curPage
        const r = this.pageSize
        const params = {
          ...this.inquiryData,
          page: p,
          rows: r
        }
        this.isLoading = true
        const data = await getLink(params)

        data.data.forEach(item => {
          item.updatedTime = item.updatedTime.substring(0, 10)
        })
        this.isLoading = false
        this.total = data.total
        this.linkData = data.data
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },

    // 删除友链
    delLinks (data) {
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteLinks({
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

    // 编辑友链
    async editLinks (title, data) {
      if (this.isAdd(title)) {
        this.dialogTitle = '添加友情链接'
        Object.keys(this.newCommentData).forEach(linkData => {
          this.newCommentData[linkData] = ''
        })
      } else {
        this.dialogTitle = '编辑友情链接'
        this.newCommentData = JSON.parse(JSON.stringify(data))
      }
      this.isShowDialog = true
    },

    isAdd (title) {
      return title === 'add'
    },
    async submitWeb (formName) {
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
      if (this.dialogTitle === '添加友情链接') {
        try {
          await insertLinks(this.newCommentData)
          this.$success('提交成功')
          this.showLinkList()
        } catch (e) {
          this.$message({
            message: '该网站已存在',
            type: 'error'
          })
        }
      } else {
        try {
          console.log('netlink===>>>', this.newCommentData)

          await updateLinks(this.newCommentData)
          this.$success('提交成功')
          this.showLinkList()
        } catch (e) {
          this.$message({
            message: '该网站已存在',
            type: 'error'
          })
        }
      }
    },
    changePage (p) { // 切换表格页
      this.curPage = p
      this.showLinkList(p, this.pageSize)
    },
    changeSize (s) { // 切换表格展示条数
      this.pageSize = s
      this.showLinkList(this.curPage, s)
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
      margin: 0 20px;
      padding: 0 20px;
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
              margin-bottom:10px;
							.el-form-item__content{
								.el-input{
									width: 289px;
								}
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
