<template>
  <el-form class="form" ref="form" label-width="100px" :model="form" :rules="rules">
    <el-form-item label="用户名:"
      ><span style="display: inline-block;width: 100%;">{{ userName }}</span></el-form-item
    >
    <el-form-item label="旧密码:" prop="password">
      <el-input
        v-model.trim="form.password"
        type="password"
        placeholder="请输入旧密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码:" prop="newPassword">
      <el-input
        v-model.trim="form.newPassword"
        type="password"
        placeholder="请输入新密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="重复密码:" prop="confirm">
      <el-input
        v-model.trim="form.confirm"
        type="password"
        placeholder="请输入重复密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">提交</el-button>
      <el-button type="default" @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { changePassword } from '@/api/modules/login';

export default {
  name: 'UserCenter',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.password !== '') {
          this.$refs.form.validateField('password');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复输入密码'));
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    return {
      form: {
        newPassword: '',
        confirm: '',
        password: ''
      },
      rules: {
        password: [{ required: true, message: '必填字段', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '必填字段', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirm: [
          { required: true, message: '必填字段', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      submitLoading: false
    };
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.name
    })
  },
  methods: {
    ...mapMutations('user', ['RESET_USER_INFO']),
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          changePassword({
            newPassword: this.form.newPassword,
            password: this.form.password
          })
            .then(() => {
              this.$message.success('密码修改成功，请重新登录');
              this.$router.replace({ path: '/login' });
              this.RESET_USER_INFO();
            })
            .finally(() => {
              this.submitLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 400px;
  max-width: 100%;
  margin: 20px auto 0;
}
</style>
