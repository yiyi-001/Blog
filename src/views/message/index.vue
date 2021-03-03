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
					<el-form-item label="查找用户留言">
						<el-input v-model="inquiryData.messageUser" placeholder="请输入用户名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="search-btn-pd" @click="showMessageList">
							查询
						</el-button>
					</el-form-item>
				</el-form>
			</div>

			<!-- 表格 -->
			<div class="content-table">
				<el-table
					v-loading="isLoading"
					:data="messageData"
					style="width: 100%"
					header-row-class-name="table-head"
					empty-text="暂无数据">
					<el-table-column prop="id" label="留言ID"> </el-table-column>
					<el-table-column prop="messageContent" label="留言信息" width="400"> </el-table-column>
					<el-table-column prop="messageUser" label="留言用户"> </el-table-column>
					<el-table-column prop="messageMaster" label="留言对象"> </el-table-column>
					<el-table-column prop="messageTime" label="留言时间"> </el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="showMessage(scope.row)">
								查看
							</el-button>
							<el-button
								type="text"
								size="small"
								@click="addMessage(scope.row)">
								评论
							</el-button>
							<el-button
								type="text"
								size="small"
								class="del-btn"
								@click="delMessage(scope.row.id)">
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
					<el-form ref="messageForm" :model="newMessageData" :rules="messageRules">
						<el-form-item label="留言信息" prop="messageContent" label-width="80px">
							<el-input v-model="newMessageData.messageContent" type="textarea" maxlength="200" rows="5" placeholder="请输入" :show-word-limit="true" class="pd-text"></el-input>
						</el-form-item>
						<el-form-item label="留言用户" prop="messageUser" label-width="80px">
							<el-input v-model="newMessageData.messageUser" placeholder="请输入" maxlength="20" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="isShowDialog = false">取 消</el-button>
						<el-button type="primary" @click="submitMessage('messageForm')">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import { getMessage, deleteMessage, insertMessage } from './fetch'
export default {
  name: 'Message',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '留言管理' }
      ])
    })
  },
  data () {
    return {
      radio: '0',
      messageData: [],
      inquiryData: {
        messageContent: null
      },

      newMessageData: {
        messageContent: '',
        messageUser: '',
        messageMaster: ''
      },

      messageRules: {
        messageContent: [
          { required: true, message: '留言内容不能为空', trigger: 'blur' }
        ],
        messageUser: [
          { required: true, message: '留言用户不能为空', trigger: 'blur' }
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
    init () {
      this.showMessageList()
    },
    async showMessageList () { // 查询和首次数据渲染
      try {
        const p = this.curPage
        const r = this.pageSize
        const params = {
          ...this.inquiryData,
          page: p,
          rows: r
        }
        this.isLoading = true
        const data = await getMessage(params)
        data.data.forEach(item => {
          item.messageTime = item.messageTime.substring(0, 10)
        })
        this.isLoading = false
        this.total = data.total
        this.messageData = data.data
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },

    // 删除
    delMessage (data) {
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteMessage({
          id: data
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.showMessageList()
      }).catch(e => {
        console.log(e)
      })
    },
    showMessage (data) {
      this.$alert(`${data.messageContent}`, `${data.messageUser} 给 ${data.messageMaster} 留言`, {
        showConfirmButton: false
      }).then(() => {

      }).catch(e => {

      })
    },

    // 查看留言详情
    editMessage (title, data) {
      if (this.isAdd(title === 'add')) {
        this.dialogTitle = '添加用户'
        Object.keys(this.newMessageData).forEach(messageData => {
          this.newMessageData[messageData] = ''
        })
      } else {
        this.$alert(`${data.messageContent}`, `${data.messageUser} 给 ${data.messageMaster} 留言`, {
          showConfirmButton: false

        })
        this.newMessageData = JSON.parse(JSON.stringify(data))
      }
    },
    // 用户留言
    addMessage (data) {
      this.dialogTitle = `给${data.messageUser}留言`
      // Object.keys(this.newMessageData).forEach(messageData => {
      //   this.newMessageData[messageData] = ''
      // })
      this.newMessageData.messageMaster = data.messageUser
      this.newMessageData.messageContent = ''
      this.newMessageData.messageUser = ''
      this.isShowDialog = true
    },

    async submitMessage (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.sendReq(valid)
        } else {
          console.log('error submit!!')
          this.isShowDialog = false
          return false
        }
        this.isShowDialog = false
      })
    },
    async sendReq () {
      try {
        console.log('newMessageData===>>>', this.newMessageData)
        this.isLoading = true
        await insertMessage(this.newMessageData)
        this.isLoading = false
        this.$success('提交成功')
        this.showMessageList()
      } catch (e) {
        this.isLoading = false
        this.$message({
          message: '该用户不存在',
          type: 'error'
        })
      }
    },
    changePage (p) { // 切换表格页
      this.curPage = p
      this.showMessageList(p, this.pageSize)
    },
    changeSize (s) { // 切换表格展示条数
      this.pageSize = s
      this.showMessageList(this.curPage, s)
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
      margin: 60px 20px;
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
						padding-bottom: 20px;
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
                .el-textarea__inner{

                }
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
