<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      
      <el-form-item label="是否工作日" size="mini" prop="sme02">
        <el-radio-group v-model="dataForm.sme02">
          <el-radio label="N">否</el-radio>
          <el-radio label="Y">是</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { Debounce } from '@/utils/debounce'
  export default {
    data () {
      return {
        visible: false,
        roleList: [],
        dataForm: {
          sme01: "",
          sme02: ""
        }
      }
    },
    methods: {
      init(sme01,sme02) {
        this.dataForm.sme01 = sme01;
        this.dataForm.sme02 = sme02;
        
      },
      // 表单提交
      dataFormSubmit: Debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/date/info`),
              method: this.dataForm.id ? 'put' : 'post',
              data: this.$http.adornData({
                'sme01': this.dataForm.sme01 || undefined,
                'sme02': this.dataForm.sme02,

              })
            }).then(({data}) => {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          }
        })
      })
    }
  }
</script>
