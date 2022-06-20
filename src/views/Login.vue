<template>
  <div class="page_login">
    <div class="login_main">
      <!-- 项目名称 -->
      <div class="text_title">
        <h2>后台管理系统</h2>
      </div>

      <!-- 登录 -->
      <el-form
        label-width="0px"
        class="login_box"
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
      >
        <el-form-item prop="username"
          ><el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入您的用户名"
            v-model="loginForm.username"
          ></el-input
        ></el-form-item>
        <el-form-item prop="password"
          ><el-input
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入您的密码"
            v-model="loginForm.password"
            >></el-input
          ></el-form-item
        >
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录数据
      loginForm: {
        username: "",
        password: "",
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: "请输入正确的用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置
    resetForm() {
      this.$refs["loginFormRef"].resetFields();
    },
    // 提交
    submitForm() {
      this.$refs["loginFormRef"].validate(async (valid) => {
        //校验失败
        if (!valid) return;
        // 校验成功
        let result = await this.$api.get_LoginUserInfo(this.loginForm);
        if (result.data.length > 0) {
          this.$message.success("恭喜你！登录成功");
          window.sessionStorage.setItem("token", result.data[0].token);
          this.$router.push("/home");
        } else {
          this.$message.error("登录失败");
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.page_login {
  height: 100%;
  background: #eee;
  .login_main {
    width: 450px;
    height: 300px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    // 项目名称
    .text_title {
      padding: 20px 0;
      text-align: center;
    }
    // 登录
    .login_box {
      width: 100%;
      position: absolute;
      top: 100px;
      padding: 0 60px;
      box-sizing: border-box;
    }
  }
}
</style>