<template>
  <div>
    <el-card>
      <el-table style="width: 100%" :data="classTeacherData">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-width="100px" label-position="left">
              <el-form-item label="班级名称">
                <span>{{ scope.row.classRoom }}</span>
              </el-form-item>
              <el-form-item label="语文">
                <span>{{ scope.row.Chineselanguage }}</span>
              </el-form-item>
              <el-form-item label="数学">
                <span>{{ scope.row.mathematics }}</span>
              </el-form-item>
              <el-form-item label="英语">
                <span>{{ scope.row.English }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="班级名称" prop="classRoom"></el-table-column>
        <el-table-column label="班主任" prop="classTea"></el-table-column>
        <el-table-column label="联系方式" prop="classTeaTel"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="watchAction(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="title" :visible.sync="dialogVisible">
      <div>
        <div class="teacher">
            <span>班主任</span>
            <span>语文</span>
            <span>数学</span>
            <span>英语</span>
        </div>
        <div class="teacher">
            <span>{{info.classTea}}</span>
            <span>{{info.Chineselanguage}}</span>
            <span>{{info.mathematics}}</span>
            <span>{{info.English}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classTeacherData: [],
      title: "",
      dialogVisible: false,
      info: {}
    };
  },
  methods: {
    watchAction(row) {
      this.title = row.classRoom;
      this.info = row
      this.dialogVisible = true;
    },
  },
  async created() {
    let { data: res } = await this.$api.get_teacher();
    this.classTeacherData = res;
  },
};
</script>

<style lang='scss' scoped>
.teacher span{
    display:inline-block;
    width: 100px;
    height: 50px;
    margin: 10px 10px;
    text-align: center;
    font-size: 20px
}
</style>