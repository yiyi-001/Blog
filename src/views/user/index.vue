<template>
	<div id="links" title="用户管理">
		<!-- 标题部分 -->
		<div slot="header" class="header-title">
			<div class="title">
				<span>用户管理</span>
			</div>
		</div>
		<!-- 表格 + 查询 -->
		<div class="main">
			<!-- 查询 -->
			<div class="content-title">
				<el-form :inline="true" :model="inquiryData" class="demo-form-inline">
					<el-form-item label="用户">
						<el-input v-model="inquiryData.userName" placeholder="请输入用户名称" @keyup.native.enter="showUserList"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="search-btn-pd" @click="showUserList">
							查询
						</el-button>
					</el-form-item>
				</el-form>
				<!-- <div class="btns">
					<el-button type="success" class="btn-pd" @click="editUser('add')">添加用户</el-button>
				</div> -->
			</div>

			<!-- 表格 -->
			<div class="content-table">
				<el-table
					v-loading="isLoading"
					:data="userData"
					style="width: 100%"
					header-row-class-name="table-head"
					empty-text="暂无数据">
					<el-table-column prop="id" label="用户ID"> </el-table-column>
					<el-table-column prop="userName" label="用户名称"> </el-table-column>
					<el-table-column prop="email" label="用户邮箱" width="280"> </el-table-column>
					<el-table-column prop="rightFlag" label="用户权限">
						<template v-slot="scope">
							{{ scope.row.rightFlag ? '超级管理员':'普通用户' }}
						</template>
					</el-table-column>
					<el-table-column prop="regiestTime" label="注册时间"> </el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="editUser(scope.row)">
								编辑
							</el-button>
							<el-button
								type="text"
								size="small"
								class="del-btn"
								@click="delUser(scope.row.id)">
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
					<el-form ref="userForm" :model="newUserData" :rules="userRules">
						<el-form-item label="用户名称" prop="userName" label-width="80px">
							<el-input v-model="newUserData.userName" maxlength="30" placeholder="请输入" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>

						<el-form-item label="用户邮箱" prop="email" label-width="80px">
							<el-input v-model="newUserData.email" placeholder="请输入" maxlength="30" :show-word-limit="true" class="pd-r"></el-input>
						</el-form-item>
						<el-form-item label="用户权限" prop="rightFlag" label-width="80px">
							<el-radio-group v-model="newUserData.rightFlag">
								<el-radio :label="0">普通用户</el-radio>
								<el-radio :label="1">超级管理员</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="isShowDialog = false">取 消</el-button>
						<el-button type="primary" @click="submitWeb('userForm')">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import { getUser, deleteUser, updateUser } from './fetch'

export default {
  name: 'User',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/home' },
        { name: '用户管理' }
      ])
    })
  },
  data () {
    return {
      radio: '0',
      sex: '',
      userData: [],
      inquiryData: {
        userName: null
      },

      newUserData: {
        userName: '',
        email: '',
        rightFlag: null
      },
      userRules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '用户邮箱不能为空', trigger: 'blur' }
        ],
        rightFlag: [
          { required: true, message: '请至少选择一个用户权限', trigger: 'change' }
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
      this.showUserList()
    },

    async showUserList () { // 查询和首次数据渲染
      try {
        const p = this.curPage
        const r = this.pageSize
        const params = {
          ...this.inquiryData,
          page: p,
          rows: r
        }
        this.isLoading = true
        const data = await getUser(params)
        data.data.forEach(item => {
          item.regiestTime = item.regiestTime.substring(0, 10)
        })
        this.isLoading = false
        this.total = data.total
        this.userData = data.data
      } catch (e) {
        this.$error(e.message)
      } finally {
        this.isLoading = false
      }
    },
    // 删除用户
    delUser (data) {
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteUser({
          id: data
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.showUserList()
      }).catch(e => {
        console.log(e)
      })
    },

    // 编辑用户信息
    async editUser (data) {
      this.dialogTitle = '编辑用户信息'
      this.newUserData.rightFlag = `${data.rightFlag}`
      this.newUserData = JSON.parse(JSON.stringify(data))
      this.isShowDialog = true
    },

    isAdd (title) {
      return title === 'add'
    },
    async submitWeb (formName) {
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
        await updateUser(this.newUserData)
        this.$success('修改成功')
        this.showUserList()
      } catch (e) {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      }
    },
    changePage (p) { // 切换表格页
      this.curPage = p
      this.showUserList(p, this.pageSize)
    },
    changeSize (s) { // 切换表格展示条数
      this.pageSize = s
      this.showUserList(this.curPage, s)
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
					height: 420px;
					border-radius: 8px;
					.el-dialog__header{
						border-bottom: 1px solid #E9E9E9;
						padding-left: 38px;
						// padding-bottom: 20px;
						.el-dialog__title{
							font-size: 20px;
						}
						i{
							font-size: 20px;
						}
					}
					.el-dialog__body{

						.el-form-item{
              margin-bottom: 10px;
							.el-form-item__content{
								.el-input{
									width: 289px;
                  margin-bottom: 20px;;
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
