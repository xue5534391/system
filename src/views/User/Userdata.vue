<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userdata' }"
        >用户数据</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-card>
      <el-table :data="userData" border>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          align="center"
        ></el-table-column>
        <el-table-column prop="tel" label="联系方式"></el-table-column>
        <el-table-column label="权限管理">
          <el-tag type="success" size="medium">普通用户</el-tag>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    async getUserData() {
      let { data: res } = await this.$api.get_UserData();
      this.userData = res;
    },
  },
  created() {
    this.getUserData();
  },
};
</script>

<style lang='scss' scoped>
.el-card {
  margin-top: 20px;
}
</style>