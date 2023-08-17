<template>
  <div class="login">
    <div class="logo"></div>
    <div class="form">
      <h1>登录</h1>
      <el-card class="login-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" hide-required-asterisk>
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="ruleForm.isAgree">用户平台使用权益</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="login-remind">仅用于IT培训教学使用,为保障您的个人信息安全,请勿向平台录入任何个人敏感信息 (如手机号、身份证号等)!</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    const isAgreeFn = (rule, value, callback) => {
      // rule规则 value数据 true/false  callback 回调函数 执行函数
      // 成功执行callback 失败也执行callback(new Error("请勾选"))
      value ? callback() : callback(new Error("您必须勾选用户的使用协议"))
    }
    return {
      ruleForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: false
      },
      rules: {
        mobile: [
          // required 必填  message提示信息  trigger 触发什么事件 验证
          // pattern 正则校验
          { required: true, message: "请输入手机号", trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}/, message: "手机号格式错误", trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: 'blur' },
          { min: 6, max: 16, message: "密码长度在6-16位", trigger: 'blur' }
        ],
        isAgree: [
          {
            validator: isAgreeFn
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.login({ mobile: this.ruleForm.mobile, password: this.ruleForm.password })
          this.$router.push('/')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss">
.login {
  height: 100vh;
  display: flex;

  .logo {
    flex: 3;
    background: url('https://heimahr.itheima.net/static/img/login_back.5ecbf4ab.png');
    border-top-right-radius: 60px;
  }

  .form {
    flex: 2;
    display: flex;
    padding-left: 100px;
    flex-direction: column;
    justify-content: center;

    h1 {
      padding-left: 20px;
      font-size: 24px;
    }

    .el-button {
      width: 100%;
      border-radius: 2px;
    }

    .login-remind {
      font-size: 14px;
      color: red;
    }
  }
}
</style>