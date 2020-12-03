<template>
  <div class="login-container">
    <el-card class="login-panel">
      <h3 class="login-title">{{ title }}</h3>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="accountNo">
          <el-input
            ref="accountNo"
            v-model="loginForm.accountNo"
            placeholder="用户名"
            type="text"
            tabindex="1"
            autocomplete="on"
            clearable
          >
            <span slot="prefix" class="svg-container">
              <svg-icon icon-class="user" />
            </span>
          </el-input>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="大写已开启" placement="top" manual>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.password"
              type="password"
              placeholder="登录密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
              show-password
              clearable
            >
              <span slot="prefix" class="svg-container">
                <svg-icon icon-class="password" />
              </span>
            </el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item prop="code">
          <div class="captcha-form-item">
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="验证码"
              @keyup.enter.native="handleLogin"
              type="text"
              clearable
            />
            <img
              class="captcha-image"
              :src="captchaSrc"
              alt="验证码"
              title="点击刷新验证码"
              @click="getCaptcha"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click.native.prevent="handleLogin"
            style="width: 100%;"
            >登录</el-button
          >
        </el-form-item>
        <p class="copyright" v-if="copyright">{{ copyright }}</p>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/login';
import { mapActions } from 'vuex';
const appCode = process.env.VUE_APP_CODE;

export default {
  name: 'Login',
  data() {
    return {
      // 验证码
      captchaSrc: '',
      // 登录表单
      loginForm: {
        accountNo: undefined,
        password: undefined,
        code: undefined,
        uuid: undefined,
        isRememberMe: true,
        appCode
      },
      // 表单校验
      loginRules: {
        accountNo: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      // 大小写提示
      capsTooltip: false,
      // 表单loading
      loading: false,
      // 重定向地址
      redirect: undefined,
      // 重定向参数
      otherQuery: {}
    };
  },
  computed: {
    title() {
      return process.env.VUE_APP_TITLE;
    },
    copyright() {
      return `CopyRight @ ${process.env.VUE_APP_BRAND} 2020 - 2030`;
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    this.getCaptcha();
  },
  mounted() {
    if (this.loginForm.accountNo === '') {
      this.$refs.accountNo.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    } else if (this.loginForm.code === '') {
      this.$refs.code.focus();
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    // 获取验证码
    getCaptcha() {
      this.loginForm.code = undefined;
      this.loginForm.uuid = undefined;
      getCaptcha({
        timestamp: Date.now()
      }).then(({ data = {} }) => {
        const { img, uuid } = data;
        this.captchaSrc = `data:image/jpg;base64,${img}`;
        this.loginForm.uuid = uuid;
      });
    },
    // 检查大小写
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z';
    },
    // 登录提交
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.login(this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
              setTimeout(() => {
                this.loading = false;
                this.getCaptcha();
              }, 1000);
            })
            .catch(() => {
              this.getCaptcha();
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-panel {
    max-width: 340px;
    margin: 160px 35px 0;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    background-color: #ffffff;
  }

  .login-input-content {
    display: flex;
    align-items: center;
  }

  .svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $dark_gray;
    width: 25px;
    height: 100%;
    left: 0;
  }

  .login-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 20px 0;
    line-height: 1.5em;
    text-align: center;
    color: #666666;
  }

  .captcha-form-item {
    display: flex;
    align-items: center;
  }

  .captcha-image {
    flex-shrink: 0;
    margin-left: 10px;
    width: 120px;
    height: 33px;
    cursor: pointer;
  }
  .copyright {
    color: #606266;
    font-size: 14px;
    line-height: 1.5em;
    text-align: center;
    margin: 0;
  }
}
</style>
