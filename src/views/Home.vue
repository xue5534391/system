<template>
  <el-container class="contain-box">
    <!-- 头部内容 -->
    <el-header>
      <div @click="asideIconBtnAction" class="asideIconBtn">
        <i class="el-icon-s-fold" v-if="asideIcon"></i>
        <i class="el-icon-s-unfold" v-else></i>
      </div>

      <el-dropdown trigger="click" @command="backLogin">
        <span>
          <span>{{ username }}</span>
          <i class="el-icon-setting" style="margin-left: 15px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="asideIcon ? '200px' : '64px'">
        <el-menu
          router
          :collapse="!asideIcon"
          background-color="#545c64"
          text-color="#fff"
          unique-opened
          :collapse-transition="false"
          active-text-color="#ffd04b"
          :default-active="activeIndex"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{ item.menuName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="i.path"
              v-for="i in item.children"
              :key="i.id"
              @click="setActiveIndexAction(i.path)"
            >
              <i class="el-icon-menu"></i>
              {{ i.menuName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      menuList: [],
      iconList: {
        //根据menuList的id,手动添加icon
        101: "el-icon-s-home",
        102: "el-icon-s-flag",
        103: "el-icon-s-tools",
        104: "el-icon-reading",
        105: "el-icon-s-data",
      },
      asideIcon: true,
      activeIndex: "", // 菜单高亮
    };
  },
  methods: {
    async getMenuList() {
      let type = window.sessionStorage.getItem("type");
      let { data: res } = await this.$api.get_menuList({ id: type });
      this.menuList = res[0].data;
    },
    // 点击按钮折叠menu
    asideIconBtnAction() {
      this.asideIcon = !this.asideIcon;
    },
    // 退出登录
    backLogin() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    // 存储高亮
    setActiveIndexAction(activeIndex) {
      window.sessionStorage.setItem("path", activeIndex);
      this.activeIndex = activeIndex;
    },
  },
  created() {
    this.getMenuList();
    this.username = window.sessionStorage.getItem("name");
  },
};
</script>

<style lang='scss' scoped>
.contain-box {
  height: 100%;
  // 头部
  .el-header {
    background-color: #242f42;
    display: flex;
    justify-content: space-between;
    .asideIconBtn {
      line-height: 60px;
      font-size: 28px;
      color: #fff;
    }
    .el-dropdown {
      cursor: pointer;
      text-align: center;
      line-height: 60px;
      color: #fff;
    }
  }
  // 侧边栏
  .el-aside {
    background-color: #545c64;
    // 解决 el-menu 自带的1px样式问题
    .el-menu {
      border-right: 0;
    }
    i {
      margin-right: 10px;
    }
  }
  .el-main {
    background-color: #eee;
  }
}
</style>