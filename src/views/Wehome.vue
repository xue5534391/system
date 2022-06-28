<template>
  <el-card class="box-card">
    <!-- 功能类 -->
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-delete" @click="delectAll"
          >批量删除</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="selectOption"
          placeholder="请选择"
          clearable
          @change="select_change"
        >
          <el-option value="已完成"></el-option>
          <el-option value="未完成"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="11">
        <div class="search">
          <el-input
            class="inp"
            v-model="inpVal"
            :clearable="true"
            placeholder="请搜索任务名称"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="selectBtnAction"
            >搜索</el-button
          >
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-plus" @click="clickAddAction"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <!-- 数据展示 -->
    <el-table
      :data="tableDataEnd"
      style="width: 100%"
      border
      class="table"
      @selection-change="selectListAction"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="task"
        label="任务"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="datestar"
        label="开始日期"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="dateend"
        label="截至日期"
        align="center"
      ></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.state ? "已完成" : "未完成" }}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="RowAction(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            icon="el-icon-delete"
            class="delectBtn"
            @click="delectAction(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      :total="total"
    >
    </el-pagination>

    <!-- 新增任务弹窗 -->
    <el-dialog
      title="代办事项"
      :visible="dialogFormVisible"
      @close="closeAction"
    >
      <el-form
        :model="dialogForm"
        label-width="100px"
        ref="dialogRef"
        :rules="dialogRules"
      >
        <el-form-item label="任务名称" prop="task">
          <el-input
            maxlength="10"
            v-model="dialogForm.task"
            class="inp"
            :clearable="true"
            placeholder="添加任务名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="datePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-M-d"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeAction">取 消</el-button>
        <el-button type="primary" @click="submitAction">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog
      title="更新任务"
      :visible="EidtFormVisible"
      @close="closeEidtAction"
    >
      <el-form
        :model="EidtForm"
        label-width="100px"
        ref="EidtRef"
        :rules="EidtRules"
      >
        <el-form-item label="任务名称" prop="task">
          <el-input
            maxlength="10"
            v-model="EidtForm.task"
            class="inp"
            :clearable="true"
            placeholder="添加任务名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="EidtDatePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-M-d"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="EidtFormState" placeholder="请选择">
            <el-option :value="true">已完成</el-option>
            <el-option :value="false">未完成</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeEidtAction">取 消</el-button>
        <el-button type="primary" @click="EidtAction">更新</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      selectOption: "",
      inpVal: "",
      pageInfo: {
        pageNum: 1, //当前页数
        pageSize: 8, //每页显示几条数据
      },
      // 控制新增弹出框 显示/隐藏
      dialogFormVisible: false,
      // 控制编辑弹出框 显示/隐藏
      EidtFormVisible: false,
      // 新增弹出框数据
      dialogForm: {
        task: "",
        datestar: "",
        dateend: "",
        state: false,
      },
      // 编辑弹出框数据
      EidtForm: {
        task: "",
        datestar: "",
        dateend: "",
        state: false,
      },
      datePicker: ["", ""], //新增日期
      EidtDatePicker: ["", ""], //更新日期
      // 新增表单校验规则
      dialogRules: {
        task: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      // 编辑表单校验规则
      EidtRules: {
        task: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      // 选中的select框的值
      selectList: [],
    };
  },
  computed: {
    EidtFormState: {
      get() {
        // 获取状态
        return this.EidtForm.state ? "已完成" : "未完成";
      },
      set(val) {
        // 设置状态
        this.EidtForm.state = val;
      },
    },
    total() {
      return this.tableData.length;
    },
    // 分页过滤出的数据
    tableDataEnd() {
      return this.tableData.slice(
        (this.pageInfo.pageNum - 1) * this.pageInfo.pageSize,
        this.pageInfo.pageNum * this.pageInfo.pageSize
      );
    },
  },
  methods: {
    // 批量删除
    delectAll() {
      this.selectList.filter((item) => {
        if (item.id) {
          this.tableData.forEach((i, index, arr) => {
            if (i.id == item.id) {
              arr.splice(index, 1);
              this.$api.delect_tableData(item.id);
            }
          });
        }
      });
    },
    // 单个删除
    delectAction(row) {
      this.tableData.forEach((item, index, arr) => {
        if (item.id === row.id) arr.splice(index, 1);
      });
      this.$api.delect_tableData(row.id);
    },
    // 筛选
    select_change(val) {
      this.$api.get_tableData().then((res) => {
        if (val == "已完成") {
          this.tableData = res.data.filter((item) => {
            return item.state;
          });
        } else if (val == "未完成") {
          this.tableData = res.data.filter((item) => {
            return !item.state;
          });
        } else {
          this.tableData = res.data;
        }
      });
    },
    // 搜素
    selectBtnAction() {
      this.$api.get_like_tableData(this.inpVal).then((res) => {
        console.log(res);
        this.tableData = res.data.filter((item) => {
          if (item.task.indexOf(this.inpVal) > -1) {
            return item;
          }
        });
      });
    },
    //添加
    clickAddAction() {
      this.dialogFormVisible = true;
    },
    // 选中select框
    selectListAction(list) {
      this.selectList = list;
    },
    // 新增弹出框取消
    closeAction() {
      this.$refs.dialogRef.resetFields(); //重置表单
      this.datePicker = []; //重置日期
      this.dialogFormVisible = false;
    },
    // 编辑弹出框取消
    closeEidtAction() {
      this.EidtFormVisible = false;
    },
    // 确定
    submitAction() {
      // 表单预验证
      this.$refs.dialogRef.validate((valid) => {
        if (!valid) return this.$message.error("添加任务失败");
        // 验证成功
        var obj = {
          task: this.dialogForm.task,
          datestar: this.datePicker[0],
          dateend: this.datePicker[1],
          state: false,
        };
        this.$api.post_tableData(obj);
        this.tableDataAction(); // 更新数据，渲染视图
        this.$message.success("添加任务成功");
        this.dialogFormVisible = false;
      });
    },
    // 更新
    EidtAction() {
      this.$refs.EidtRef.validate((valid) => {
        if (!valid) return this.$message.error("更新任务失败");
        this.confirm();
      });
    },
    // 是否更新
    confirm() {
      this.$confirm("是否更新该任务信息, 是否继续?", "更新操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = this.EidtForm.id;
          this.$api.patch_tableData(id, {
            task: this.EidtForm.task,
            datestar: this.EidtDatePicker[0],
            dateend: this.EidtDatePicker[1],
            state: this.EidtForm.state,
          });
          this.tableDataAction(); //更新视图
          this.EidtFormVisible = false;
          this.$message({
            type: "success",
            message: "更新成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新操作",
          });
        });
    },
    // 打开编辑信息
    async RowAction(row) {
      this.EidtFormVisible = true;
      let { data: res } = await this.$api.get_tableData({ id: row.id });
      this.EidtForm = res[0];
      this.EidtDatePicker.splice(0, 1, row.datestar);
      this.EidtDatePicker.splice(1, 1, row.dateend);
    },
    // 获取数据
    async tableDataAction() {
      let { data: result } = await this.$api.get_tableData();
      this.tableData = result;
    },
    // 当前页数
    handleCurrentChange(newPageNum) {
      this.pageInfo.pageNum = newPageNum;
    },
  },

  created() {
    this.tableDataAction();
  },
};
</script>

<style lang='scss' scoped>
.search {
  display: flex;
}
.table {
  margin-top: 20px;
  .delectBtn {
    color: red;
  }
}
.inp {
  width: 300px;
}
</style>