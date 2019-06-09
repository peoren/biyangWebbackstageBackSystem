<template>
  <div style="background-color:#f5f5f5; min-width:1126px">
    <div class="account-header-wrap clear">
      <!-- 添加账号按钮 -->
      <el-button type="warning" class="el-icon-circle-plus" @click="openAddUser">添加账号</el-button>
      <!-- 搜索框 -->
      <div class="search-wrap clear">
        <!-- 排序 -->
        <el-select v-model="sort" class="sort">
          <el-option label="按时间升序" value="1">按时间升序↑</el-option>
          <el-option label="按时间降序" value="2">按时间降序↓</el-option>
        </el-select>
      </div>
      <!-- 下拉筛选 -->
      <template>
        <el-select v-model="value" placeholder="所有人员" class="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </div>

    <!-- 员工id -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="员工编号" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.adminId }}</span>
        </template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column label="创建日期" width="220" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- 员工姓名 -->
      <el-table-column label="员工姓名" width="140" align="center">
        <!-- title 提示信息 -->
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>联系电话: {{ scope.row.phone }}</p>
            <p>性别：{{ scope.row.sex}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 职权展示-->
      <el-table-column label="职权" width="160" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>权限描述: {{ scope.row.powerDesc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.role_name}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 所属区域 -->
      <el-table-column label="所属区域" width="160" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.area}}</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态" width="140" align="center">
        <template slot-scope="scope">
          <el-switch
            disabled
            align="left"
            v-model="scope.row.accountState"
            class="switch"
            active-color="#00A854"
            active-text="启用"
            active-value="0"
            inactive-color="#F04134"
            inactive-text="禁用"
            inactive-value="1"
          />
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog 对话框 -->
    <el-dialog
      :title=" ruleForm.title"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
      align="left"
    >
      <div class="account-wrap">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="left"
          @submit.native.prevent
        >
          <!-- 员工姓名 -->
          <el-form-item label="职员姓名：" prop="name" style="display:inline-block;margin-right:10px;">
            <el-input v-model="ruleForm.name" style="width:211px;"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone" style="display:inline-block">
            <el-input v-model="ruleForm.phone" style="width:211px;"></el-input>
          </el-form-item>
          <!-- 职权选择 -->
          <el-form-item label="职权：" prop="role_name" style="display:inline-block;margin-right:15px;">
            <el-select v-model="ruleForm.role_name" placeholder="请选择职权" :disabled="dis">
              <el-option label="店员" value="店员"></el-option>
              <el-option label="店长" value="店长"></el-option>
              <el-option label="超级管理员" value="超级管理员" disabled></el-option>
            </el-select>
          </el-form-item>
          <!-- 账号状态： -->
          <el-form-item label="账号状态：" prop="accountState" style="display:inline-block">
            <el-switch
              v-model="ruleForm.accountState"
              active-text="启用"
              active-value="0"
              inactive-color="#F04134"
              inactive-text="禁用"
              active-color="#00A854"
              inactive-value="1"
              class="switch"
              @change="handelUpdate(ruleForm.accountState)"
            ></el-switch>
          </el-form-item>
          <!-- 登录设置 -->
          <div>
            <el-form-item label="登录账号：" style="display:inline-block">
              <span class="userAccount">{{ ruleForm. adminName}}</span>
            </el-form-item>
            <el-form-item label="登录密码：" prop="password" style="display:inline-block">
              <el-input v-model="ruleForm.password" style="width:211px;" :disabled="dis"></el-input>
            </el-form-item>
          </div>
          <!-- 权限描述 -->
          <el-form-item label="权限描述：">
            <div class="account-desc">
              <p>
                <span class="el-icon-caret-right">技术人员：</span>
                具有订单状态管理；商品上下架修改的权限
              </p>
              <p>
                <span class="el-icon-caret-right">总经理：</span>
                具有订单状态管理；商品上下架修改；账号操作日志查看；账号增，删，改的权限
              </p>
              <p>
                <span class="el-icon-caret-right">营业员：</span>
                具有订单状态管理；商品上下架修改的权限
              </p>
            </div>
          </el-form-item>
          <!-- 职工性别选择 -->
          <el-form-item label="职工性别：" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 所属区域 -->
          <el-form-item label="所属区域：" prop="area" style="display:inline-block">
            <el-select v-model="ruleForm.area" placeholder="请选择所属区域">
              <el-option label="成都分公司" value="成都分公司"></el-option>
              <el-option label="上海分公司" value="上海分公司" disabled></el-option>
              <el-option label="重庆分公司" value="重庆分公司" disabled></el-option>
            </el-select>
          </el-form-item>
          <!-- 备注信息 -->
          <el-form-item label="备注信息：" prop="descr">
            <el-input
              type="textarea"
              v-model="ruleForm.descr"
              :autosize="{ minRows: 3, maxRows: 4}"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 模态框按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="addUser">立即保存</el-button>
        <el-button type="primary" @click="closeForm">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "account",
  data() {
    // 校验手机号码验证逻辑
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空!!"));
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error("电话号码格式有误"));
        } else {
          callback();
        }
      }, 600);
    };
    return {
      //禁用项状态
      dis: false,
      // 添加新用户
      ruleForm: {
        title: null,
        name: "",
        role_name: null,
        accountState: "0",
        sex: "女",
        descr: "",
        adminName: null,
        area: null,
        phone: null,
        password: null,
        adminId:null
      },
      //表单输入信息验证
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        role_name: [{ required: true, message: "请选择职权", trigger: "change" }],
        area: [
          { required: true, message: "请选择员工所属区域", trigger: "change" }
        ],
        sex: [{ required: true, message: "请选择职工性别", trigger: "change" }],
        descr: [
          { required: true, message: "请填写备注信息 ", trigger: "blur" }
        ],
        // 校验手机号码，主要通过validator来指定验证器名称
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      //下拉筛选数据
      options: [
        {
          value: 1,
          label: "店长"
        },
        {
          value: 2,
          label: "店员"
        },
        {
          value: 3,
          label: "已禁用"
        },
        {
          value: 4,
          label: "已启用"
        },
         {
          value: 5,
          label: "所有账号"
        }
      ],
      value: "",
      //时间排序
      sort: "1",
      // dialog 对话框状态
      dialogVisible: false,
      //表格数据
      tableData:[],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取数据
    getData() {
      var _that = this;
      this.$http
        .post("/admin/getaccountinfo")
        .then(res => {
          this.tableData = res.data.data;
          var len = this.tableData.length;
          for (var i = 0; i < len; i++) {
            if (this.tableData[i].role_name == "超级管理员") {
              this.tableData[i].powerDesc = "所有权限";
            } else if (this.tableData[i].role_name == "店长") {
              this.tableData[i].powerDesc = "商品管理；订单状态管理；";
            } else if (this.tableData[i].role_name == "店员") {
              this.tableData[i].powerDesc = "订单状态管理；";
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('出现未知错误')
        });
    },
    //dialog 对话框
    openAddUser() {
      this.initForm();
      var _that = this;
      this.dialogVisible = true;
      setTimeout(function() {
        _that.$refs.ruleForm.clearValidate();
      }, 500);
    },
    //初始化表单数据
    initForm() {
      this.ruleForm.title = "添加新用户";
      this.ruleForm.name = null;
      this.ruleForm.role_name = null;
      this.ruleForm.accountState = "0";
      this.ruleForm.sex = "男";
      this.ruleForm.descr = null;
      this.ruleForm. adminName = null;
      this.ruleForm.area = null;
      this.ruleForm.phone = null;
      this.ruleForm.password = null;
      this.ruleForm.adminId = null;
      this.dis = false;
    },
    //添加账号或修改
    addUser() {
      // 表单验证
      var url = "";
      var _that = this;
      this.$refs.ruleForm.validate(result => {
        if (result) {
          if (this.dis == true) {
            url = "/admin/modifyadmin";
            // "编辑请求";
             var postData = this.$qs.stringify({
            name: _that.ruleForm.name,
            role_name: _that.ruleForm.role_name,
            accountState: _that.ruleForm.accountState,
            sex: _that.ruleForm.sex,
            descr: _that.ruleForm.descr,
            adminName: _that.ruleForm.adminName,
            area: _that.ruleForm.area,
            phone: _that.ruleForm.phone,
            adminPwd: _that.ruleForm.password,
            adminId:_that.ruleForm.adminId,
          });
          } else {
            url = "/admin/addnewadmin";
            // "新增请求";
             var postData = this.$qs.stringify({
            name: _that.ruleForm.name,
            role_name: _that.ruleForm.role_name,
            accountState: _that.ruleForm.accountState,
            sex: _that.ruleForm.sex,
            descr: _that.ruleForm.descr,
            adminName: _that.ruleForm.adminName,
            area: _that.ruleForm.area,
            phone: _that.ruleForm.phone,
            adminPwd: _that.ruleForm.password,
            // adminId:
          });
          }
          this.$http
            .post(url, postData)
            .then(res => {
              if (res.data.code == -1) {
                _that.$alert(res.data.message, "提示信息", {
                  confirmButtonText: "确定",
                  type: "warning"
                });
              } else if (res.data.code == 1) {
                this.closeForm();
                this.getData();
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
              }
            })
            .catch(err => {
             this.$message.error('操作失败')
            });
        } else {
          this.$message.error("表单填写有误!请检测表单!");
        }
      });
    },
    // 编辑
    handleEdit(index, data) {
      this.dialogVisible = true;
      this.ruleForm.title = "账号修改";
      this.ruleForm.name = data.name;
      this.ruleForm.role_name = data.role_name;
      this.ruleForm.accountState = data.accountState;
      this.ruleForm.sex = data.sex;
      this.ruleForm.descr = data.descr;
      this.ruleForm. adminName = data. adminName;
      this.ruleForm.area = data.area;
      this.ruleForm.phone = data.phone;
      this.ruleForm.password = data.password;
      this.ruleForm.adminId = data.adminId;
      this.dis = true;
    },
    // 删除
    handleDelete(itemData) {
      var _that = this;
      this.$confirm("此操作将永久删除该账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let postData = this.$qs.stringify({
            adminId: itemData.adminId
          });
          this.$http
            .post("/admin/deladmin", postData)
            .then(res => {
              if (res.data.code == -1) {
                _that.$alert(res.data.message, "提示信息", {
                  confirmButtonText: "确定",
                  type: "warning"
                });
              } else if (res.data.code == 1) {
                _that.getData();
                _that.$message({
                  message: "操作成功",
                  type: "success"
                });
              }
            })
            .catch(err => {
              console.log(err);
             _that.$message.error('出现未知错误')
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // switch开关控制
    handelUpdate(state) {
      var _that = this;
      console.log(state);
      if (state == "0") {
        this.ruleForm.accountState = "1";
        this.$confirm("您是否要将账号恢复使用？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _that.ruleForm.accountState = "0";
          })
          .catch(() => {});
      } else if (state == "1") {
        this.ruleForm.accountState = "0";
        this.$confirm("您是否要停用该账号？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _that.ruleForm.accountState = "1";
          })
          .catch(() => {});
      }
    },
    //dialog对话框
    handleClose() {
      var _that = this;
      this.$confirm("确认关闭？")
        .then(_ => {
          _that.initForm();
          _that.$refs.ruleForm.clearValidate();
          _that.dialogVisible = false;
        })
        .catch(_ => {});
    },
    //关闭表单并重置
    closeForm() {
      this.initForm();
      this.$refs.ruleForm.clearValidate();
      this.dialogVisible = false;
    }
  },
  watch: {
    //角色变化监听
    FormPower(newValue, oldValue) {
      if (newValue == "超级管理员") {
        this.ruleForm. adminName = "root";
      }
      if (newValue == "店长") {
        this.ruleForm. adminName = "admin";
      }
      if (newValue == "店员") {
        this.ruleForm. adminName = "assistant";
      }
    },
    //时间排序监听
    sort: {
      handler(newValue, oldValue) {
        if (newValue == "1") {
          this.tableData.sort(function(a, b) {
            return new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
          });
        }
        if (newValue == "2") {
          this.tableData.sort(function(a, b) {
            return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
          });
        }
      },
      immediate: true
    },
    //下拉筛查监听
    value(newValue, oldValue) {
        var _that = this;
      if(newValue==5){
        _that.getData();
        return
      }
      let postData = this.$qs.stringify({
        switchNum: newValue
      });
      this.$http
        .post("/admin/orderbyadmin", postData)
        .then(res => {
          if (res.data.code == -1) {
              this.$message.error(res.data.message);
          } else if (res.data.code == 1) {
             this.tableData = res.data.data;
          var len = this.tableData.length;
          for (var i = 0; i < len; i++) {
            if (this.tableData[i].role_name == "超级管理员") {
              this.tableData[i].powerDesc = "所有权限";
            } else if (this.tableData[i].role_name == "店长") {
              this.tableData[i].powerDesc = "商品管理；订单状态管理；";
            } else if (this.tableData[i].role_name == "店员") {
              this.tableData[i].powerDesc = "订单状态管理；";
            }
          }
            _that.$message({
              message: "操作成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('出现未知错误')
        });
    }
  },
  computed: {
    FormPower() {
      return this.ruleForm.role_name;
    }
  }
};
</script>
<style scoped>
.sort {
  margin: 0 50px 20px 0;
  width: 140px;
}
.userAccount {
  box-sizing: border-box;
  height: 40px;
  display: inline-block;
  width: 211px;
  border-bottom: solid 1px #ff4400;
  margin-right: 10px;
  text-indent: 2em;
}
.account-desc p {
  height: 30px;
  padding: 0;
  margin: 0;
  line-height: 30px;
  font-size: 12px;
}
.el-icon-caret-right {
  font-weight: 700;
}
.clear::before,
.clear::after {
  display: table;
  content: "";
}
.clear::after {
  clear: both;
}
.account-header-wrap {
  padding-top: 20px;
  min-width: 1140px;
  max-width: 1258px;
}
.account-header-wrap .el-icon-circle-plus {
  float: left;
}
.account-header-wrap .search-wrap,
.account-header-wrap .select {
  float: right;
  margin-right: 50px;
}
.account-header-wrap .select {
  width: 120px;
}
.search-wrap > * {
  margin-left: 30px;
  width: 160px;
}
.el-input__icon {
  cursor: pointer;
}
.paixu {
  margin-top: 20px;
  min-width: 1140px;
  max-width: 1258px;
}
</style>
