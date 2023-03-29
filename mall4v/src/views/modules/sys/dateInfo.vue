<template>
  <div class="mod-user">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @on-load="getDataList">
       <!--<template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth('sys:user:save')"
                   @click.stop="addOrUpdateHandle()">新增</el-button> -->

        <!-- <el-button type="danger"
                   @click="deleteHandle()"
                   v-if="isAuth('sys:user:delete')"
                   size="small"
                   :disabled="dataListSelections.length <= 0">批量删除</el-button> 
      </template>-->
      <template slot-scope="scope"
                slot="menu">
        <el-button :type="scope.row.sme02=='Y'?'danger':'primary'"
                   :icon="scope.row.sme02=='Y'?'el-icon-remove':'el-icon-caret-right'"
                   size="small"
                   v-if="isAuth('sys:user:update')"
                   @click.stop="addOrUpdateHandle(scope.row.sme01,scope.row.sme02)">{{scope.row.sme02=='Y'?'禁止':'啓動'}}</el-button>
        

      </template>
    </avue-crud>

  </div>
</template>

<script>
import { tableOption } from '@/crud/sys/dateInfo'
import AddOrUpdate from './date-update'
export default {
  data () {
    return {
      dataList: [],
      dataForm:{},
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      tableOption: tableOption,
      dateRange:[this.formatDate(new Date())+" 00:00:00",this.getDates(30)+" 00:00:00"],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      }
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    // 获取数据列表
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/date/info/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize,
              'sme02': this.dataForm.sme02==''?null:this.dataForm.sme02,
              'sdate': this.dateRange ==undefined? null : this.dateRange[0], // 開始時間
              'edate': this.dateRange ==undefined ? null : this.dateRange[1] // 結束時間
            },
            params
          )
        )
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    formatDate(date) {
		  const year = date.getFullYear();
		  const month = date.getMonth() + 1;
		  const day = date.getDate();
		  return year+'-'+month+'-'+day//[year, month, day].map(this.formatNumber).join('-') 
		},
    // 条件查詢
    searchChange (params) {
      this.dateRange = params.sme01?params.sme01:null;
      this.dataForm = params
      this.getDataList(this.page, params)
    },
    // 多选变化
    selectionChange (val) {
      this.dataListSelections = val
    },
    // 修改
    addOrUpdateHandle (sem01,sme02) {
      this.$http({
        url: this.$http.adornUrl(`/date/info`),
        method: 'put' ,
        data: this.$http.adornData({
          'sme01': sem01,
          'sme02': sme02=='N'?'Y':'N',

        })
      }).then(({data}) => {
        this.getDataList()

        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
        })


      })
    },
        // 清除数据
    clearDatas () {
      this.dataForm = {}
      this.dateRange = []
    },
    // 删除
    deleteHandle (id) {
      var userIds = id ? [id] : this.dataListSelections.map(item => {
        return item.userId
      })
      this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/date/info/page'),
          method: 'delete',
          data: this.$http.adornData(userIds, false)
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        })
      }).catch(() => { })
    },
    getDates(days) {//獲取當前時間的未來7天
      days = days?days:7;
      var dd=new Date();
      dd.setDate(dd.getDate()+days);
  
      return this.formatDate(dd);
    } 
  }
}
</script>
