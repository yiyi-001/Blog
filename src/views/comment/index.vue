<template>
	<div id="links" title="文章评论">
		<!-- 标题部分 -->
		<div slot="header" class="header-title">
			<div class="title">
				<span>文章评论</span>
			</div>
		</div>
		<!-- 表格 + 查询 -->
		<div class="main">
			<!-- 查询 -->
			<div class="content-title">
				<el-form :inline="true" :model="inquiryData" class="demo-form-inline">
					<el-form-item label="查找文章评论">
						<el-input v-model="inquiryData.article" placeholder="请输入文章名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="search-btn-pd" @click="showCommentList">
							查询
						</el-button>
					</el-form-item>
				</el-form>
			</div>

			<!-- 表格 -->
			<div class="content-table">
				<el-table
					v-loading="isLoading"
					:data="commentData"
					style="width: 100%"
					header-row-class-name="table-head"
					empty-text="暂无数据">
					<el-table-column prop="article" label="文章名称" width="280"> </el-table-column>
					<el-table-column prop="commentContent" label="评论信息" width="300"> </el-table-column>
					<el-table-column prop="commentUser" label="评论用户"> </el-table-column>
					<el-table-column prop="commentMaster" label="评论对象"> </el-table-column>
					<el-table-column prop="commentTime" label="评论时间"> </el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="showComment(scope.row)">
								查看
							</el-button>
							<el-button
								type="text"
								size="small"
								@click="addComment(scope.row)">
								评论
							</el-button>
							<el-button
								type="text"
								size="small"
								class="del-btn"
								@click="delComment(scope.row.id)">
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
					<el-form ref="commentForm" :model="newCommentData" :rules="commentRules">
						<el-form-item label="评论信息" prop="commentContent" label-width="80px">
							<el-input v-model="newCommentData.commentContent" type="textarea" maxlength="200" rows="5" placeholder="请输入" :show-word-limit="true" class="pd-text"></el-input>
						</el-form-item>
						<el-form-item label="评论用户" prop="commentUser" label-width="80px">
							<el-input v-model="newCommentData.commentUser" placeholder="请输入" maxlength="20" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="isShowDialog = false">取 消</el-button>
						<el-button type="primary" @click="submitComment('commentForm')">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import { getComment, deleteComment, insertComment } from './fetch'
export default {
  name: 'Comment',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '文章评论' }
      ])
    })
  },
  data () {
    return {
      radio: '0',
      commentData: [],
      inquiryData: {
        article: null
      },

      newCommentData: {
        article: '',
        commentContent: '',
        commentUser: ''

      },
      commentRules: {
        commentContent: [
          { required: true, message: '评论信息不能为空', trigger: 'blur' }
        ],
        commentUser: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]

      },

      total: null,
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
    changePage (p) { // 切换表格页
      this.curPage = p
      this.showCommentList(p, this.pageSize)
    },
    changeSize (s) { // 切换表格展示条数
      this.pageSize = s
      this.showCommentList(this.curPage, s)
    },
    init () {
      this.showCommentList()
    },
    async showCommentList () { // 查询和首次数据渲染
      try {
        const p = this.curPage
        const r = this.pageSize
        const params = {
          ...this.inquiryData,
          page: p,
          rows: r
        }
        this.isLoading = true
        const data = await getComment(params)
        data.data.forEach(item => {
          item.commentTime = item.commentTime.substring(0, 10)
        })
        this.isLoading = false
        this.total = data.total
        this.commentData = data.data
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },

    // 删除评论
    delComment (data) {
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteComment({
          id: data
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.showCommentList()
      }).catch(e => {
        console.log(e)
      })
    },
    // 用户留言
    addComment (data) {
      console.log('data===>', data)

      this.dialogTitle = `评论了${data.commentUser}`
      this.newCommentData.article = data.article
      this.newCommentData.commentMaster = data.commentUser
      this.newCommentData.commentContent = ''
      this.newCommentData.commentUser = ''
      this.isShowDialog = true
    },

    // 查看评论详情
    showComment (data) {
      this.$alert(`${data.commentContent}`, `${data.commentUser} 评论了 ${data.commentMaster} `, {
        showConfirmButton: false
      }).then(() => {

      }).catch(e => {

      })
    },

    async submitComment (formName) {
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
    async sendReq () {
      try {
        this.isLoading = true
        await insertComment(this.newCommentData)
        this.isLoading = false
        this.$success('提交成功')
        this.showCommentList()
      } catch (e) {
        this.isLoading = false

        this.$message({
          message: '该用户不存在',
          type: 'error'
        })
      }
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
							.el-form-item__content{
								.el-input{
									width: 289px;

								}
							}
              .pd-text{
                margin-bottom: 15px;

                .el-input__count{
                  background-color: transparent;
                  bottom:0px;
                  // margin: 0px 20px;
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
