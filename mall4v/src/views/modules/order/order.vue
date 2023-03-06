<template>
  <div class="mod-order-order">

    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChangeHandle"
               @on-load="getDataList">
               
    <template slot="menuLeft" >
      <avue-crud :data="totalData" :option="totalOption" >
        <template slot-scope="scope" slot="hun">
          
          <el-tag type="success">{{scope.row.hun}}</el-tag>
        </template>
        <template slot-scope="scope" slot="su">
          <el-tag type="success">{{scope.row.su}}</el-tag>
        </template>
        <template slot-scope="scope" slot="rice">
          <el-tag type="success">{{scope.row.rice}}</el-tag>
        </template>
      </avue-crud>
    </template>
    <template slot="menuRight" > 
                  <el-button v-if="isAuth('order:order:waitingConsignmentExcel')"
                   @click="getSoldExcel()"
                   type="primary"
                   style="max-height: 45px;"
                   size="small">導出訂單</el-button>
    </template>


   
      <template slot-scope="scope"
                slot="menu">
       <el-button type="danger"
                  size="small"   
                  v-if="isAuth('order:order:update')&&scope.row.status==2"
                               @click="cancelOrder(scope.row.orderNumber)">取消</el-button>

      </template>
    </avue-crud>

    <!-- 空 -->
<!--     
    <el-pagination @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle"
                   :current-page="page.pageIndex"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="page.pageSize"
                   :total="page.total"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination> -->
 
  </div>
</template>

<script>
import { tableOption } from '@/crud/order/order'
import AddOrUpdate from './orderInfo'
import ConsignmentInfo from './consignment-info'

export default {
  data () {
    return {
      totalObj:{},
      totalData:[{
            fatory:'新樂厰',
            hun: this.dataSum?this.dataSum.totalHun2:0 ,
            su: this.dataSum?this.dataSum.totalSu2 :0 ,
            rice: this.dataSum ? this.dataSum.totalRice2 :0 
          }, {
            fatory:'新仁厰',
            hun: this.dataSum ?this.dataSum.totalHun1 :0 ,
            su: this.dataSum?this.dataSum.totalSu1 :0 ,
            rice: this.dataSum?this.dataSum.totalRice1 :0 
          },  {
            fatory:'總數',
            hun: this.dataSum ?this.dataSum.totalHun:0 ,
            su: this.dataSum?this.dataSum.totalSu :0 ,
            rice: this.dataSum ?this.dataSum.totalRice:0 
          }],
      totalOption:{
        border: false,

          menu:false,
          refreshBtn: false,
          columnBtn:false,
          searchBtn:false,
          addBtn: false,
          editBtn: false,
          delBtn: false,
          viewBtn: false,
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'廠區',
              prop:'fatory',
            },

              {
                label:'葷食',
                prop:'hun'
              },{
                label: "素食",
                prop: "su",
                
              },{
                label: "加飯",
                prop: "rice",
              }
            ]   


      },
      tableOption: tableOption,
      dataForm: {},
      dateRange: [],
      factoryOptions:[
        {value: '新樂',
        label: '新樂'},
        {value: '新仁',
        label: '新仁'}
      ],
      foodTypeOptions:[
        {value: '素食',
        label: '素食'},
        {value: '葷食',
        label: '葷食'}
      ],
      options: [
      {
        value: 2,
        label: '已訂'
      },
      {
        value: 3,
        label: '已使用'
      },
      {
        value: 6,
        label: '取消'
      },
     ],
      resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
      dataList: [],
      dataSum:{},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      consignmentInfoVisible: false
    }
  },
  components: {
    AddOrUpdate,
    ConsignmentInfo
  },
  activated () {
    this.getDataList(this.page)
  },
  methods: {
    //取消訂單
    cancelOrder(orderNumber){
      if(orderNumber==null ){
        this.$message({
            message: '取消失敗',
            type: 'error',
            duration: 1000,
            
          })  
        return; 
      }
      this.$http({
          url: this.$http.adornUrl(`/order/order/cancel/${orderNumber}`),
          method: 'get',
          data: this.$http.adornData({
            orderNumber: orderNumber
          })
        }).then(({ data }) => {
          this.$message({
            message: '取消成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.getDataList(this.page)
            }
          })
        })
    },
    //獲取統計數據
    getDataSum ( params){
      this.$http({
        url: this.$http.adornUrl('/order/order/sum'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              'attr1': this.dataForm.foodType==''?null:this.dataForm.foodType,
              'attr2': this.dataForm.factory==''?null:this.dataForm.factory,
              'isAddRice': this.dataForm.richAdd==''?null:this.dataForm.richAdd,
              'deptName':this.dataForm.deptName==''?null:this.dataForm.deptName,
              'realName':this.dataForm.realName==''?null:this.dataForm.realName,
              'orderNumber': this.dataForm.orderNumber==''?null:this.dataForm.orderNumber,
              'status': this.dataForm.status==''?null:this.dataForm.status,
              'startTime': this.dateRange ==undefined? null : this.dateRange[0], // 開始時間
              'endTime': this.dateRange ==undefined ? null : this.dateRange[1] // 結束時間
            },
            params
          ), false
        )
      }).then(({ data }) => {
        this.dataSum = data
        this.totalData=[{
            fatory:'新樂厰',
            hun: this.dataSum?this.dataSum.totalHun2:0 ,
            su: this.dataSum?this.dataSum.totalSu2 :0 ,
            rice: this.dataSum ? this.dataSum.totalRice2 :0 
          }, {
            fatory:'新仁厰',
            hun: this.dataSum ?this.dataSum.totalHun1 :0 ,
            su: this.dataSum?this.dataSum.totalSu1 :0 ,
            rice: this.dataSum?this.dataSum.totalRice1 :0 
          },  {
            fatory:'總數',
            hun: this.dataSum ?this.dataSum.totalHun:0 ,
            su: this.dataSum?this.dataSum.totalSu :0 ,
            rice: this.dataSum ?this.dataSum.totalRice:0 
          }]
      })
    } ,
    // 获取数据列表
    getDataList (page, params) {
      page = (page === undefined ? this.page : page)
      this.dataListLoading = true
      this.getDataSum(params);
      this.$http({
        url: this.$http.adornUrl('/order/order/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize,
              'attr1': this.dataForm.foodType==''?null:this.dataForm.foodType,
              'attr2': this.dataForm.factory==''?null:this.dataForm.factory,
              'isAddRice': this.dataForm.richAdd==''?null:this.dataForm.richAdd,
              'deptName':this.dataForm.deptName==''?null:this.dataForm.deptName,
              'realName':this.dataForm.realName==''?null:this.dataForm.realName,

              'orderNumber': this.dataForm.orderNumber==''?null:this.dataForm.orderNumber,
              'status': this.dataForm.status==''?null:this.dataForm.status,
              'startTime': this.dateRange ==undefined? null : this.dateRange[0], // 開始時間
              'endTime': this.dateRange ==undefined ? null : this.dateRange[1] // 結束時間
            },
            params
          ), false
        )
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 清除数据
    clearDatas () {
      this.dataForm = {}
      this.dateRange = []
    },
    // 每页数
    sizeChangeHandle (val) {
      this.page.pageSize = val
      this.page.currentPage = 1
      this.getDataList(this.page)
    },
    // 当前页
    currentChangeHandle (val) {
      this.page.currentPage = val
      this.getDataList(this.page)
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    orderStatus () {

    },
    // 新增 / 修改
    addOrUpdateHandle (val) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(val)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.orderId
      })
      this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(`/prod/spec/${ids}`),
          method: 'delete',
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList(this.page)
            }
          })
        })
      }).catch(() => { })
    },
    showConsignmentInfo () {
      this.consignmentInfoVisible = true
      this.$nextTick(() => {
        this.$refs.consignmentInfo.init()
      })
    },
    getWaitingConsignmentExcel (consignmentInfo) {
      this.$http({
        url: this.$http.adornUrl('/order/order/waitingConsignmentExcel'),
        method: 'get',
        params: this.$http.adornParams({
          'consignmentName': consignmentInfo.consignmentName,
          'consignmentMobile': consignmentInfo.consignmentMobile,
          'consignmentAddr': consignmentInfo.consignmentAddr,
          'startTime': this.dateRange === null ? null : this.dateRange[0], // 開始時間
          'endTime': this.dateRange === null ? null : this.dateRange[1] // 結束時間
        }),
        responseType: 'blob' // 解决文件下载乱码问题
      }).then(({ data }) => {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
        const fileName = '待發貨信息整理.xls'
        const elink = document.createElement('a')
        if ('download' in elink) { // 非IE下载
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    getSoldExcel () {
      this.$http({
        url: this.$http.adornUrl('/order/order/soldExcelNew'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          'attr1': this.dataForm.attr1==''?null:this.dataForm.attr1,
          'attr2': this.dataForm.attr2==''?null:this.dataForm.attr2,
          'isAddRice': this.dataForm.richAdd==''?null:this.dataForm.isAddRice,
          'deptName':this.dataForm.deptName==''?null:this.dataForm.deptName,
          'realName':this.dataForm.realName==''?null:this.dataForm.realName,
          'userId':this.dataForm.userId==''?null:this.dataForm.userId,
          'orderNumber': this.dataForm.orderNumber==''?null:this.dataForm.orderNumber,
          'status': this.dataForm.status==''?null:this.dataForm.status,
          'startTime': this.dateRange ==undefined? null : this.dateRange[0], // 開始時間
          'endTime': this.dateRange ==undefined ? null : this.dateRange[1] // 結束時間
        } ), false),
        responseType: 'blob' // 解决文件下载乱码问题
      }).then(({ data }) => {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
        const fileName = '點餐信息整理.xls'
        const elink = document.createElement('a')
        if ('download' in elink) { // 非IE下载
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
        // 条件查詢
    searchChange (params) {
      this.dateRange = params.orderUseDate?params.orderUseDate:null
      this.dataForm = params
      this.getDataList(this.page, params)
    },

  }
}
</script>
<style lang="scss">

.mod-order-order {

  .el-table {
    th.gutter, colgroup.gutter {
        width: 5px !important;//此处的宽度值，对应你自定义滚动条的宽度即可
    }
  }

  .el-table__header colgroup col[name="gutter"] {
    display: table-cell !important;

  }


  .empty-tips {
    display: block;
    width: 100%;
    text-align: center;
    margin: 50px 0;
    color: #999;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .subtitle {
     color: #0080ff
  }
  .pad{
    padding-top: 6px;
    padding-bottom: 10px;
  }
  .titles{
    font-weight: bold
  }
  .subtitle1{
    color: #ff0000
  }
}

 

/* vue 使用 scoped 需要 /deep/ 深度作用 */

</style>
