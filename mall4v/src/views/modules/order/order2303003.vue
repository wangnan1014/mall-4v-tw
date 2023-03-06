<template>
  <div class="mod-order-order">
    <el-form :inline="true"
             :model="dataForm"
             @keyup.enter.native="getDataList(this.page)">
      <!-- <el-form-item>
        <el-input v-model="dataForm.orderNumber"
                  placeholder="訂單編號"
                  clearable></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-date-picker v-model="dateRange"
                        type="datetimerange"
                        range-separator="至"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        start-placeholder="開始日期"
                        end-placeholder="結束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <template>
          <el-select v-model="dataForm.factory"
                     clearable
                     placeholder="請選擇廠區">
            <el-option v-for="item in factoryOptions"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-select v-model="dataForm.foodType"
                     clearable
                     placeholder="請選擇葷素">
            <el-option v-for="item in foodTypeOptions"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-input v-model="dataForm.deptName" placeholder="請輸入部門"></el-input>
        </template>

      </el-form-item>
      <el-form-item>
        <template>
          <el-input v-model="dataForm.realName" placeholder="請輸入員工姓名"></el-input>
        </template>

      </el-form-item>
      <el-form-item>
        <template>
          <el-select v-model="dataForm.status"
                     clearable
                     placeholder="請選擇訂單狀態">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   icon="el-icon-search"
                   size="small"
                   @click="getDataList()">查詢</el-button>
        <!-- <el-button v-if="isAuth('order:order:waitingConsignmentExcel')"
                   @click="showConsignmentInfo()"
                   type="primary"
                   size="small">導出訂單</el-button> -->
        <!-- <el-button v-if="isAuth('order:order:soldExcel')"
                   @click="getSoldExcel()"
                   type="primary"
                   size="small">導出訂單記錄</el-button> -->
        <el-button @click="clearDatas()"
                   size="small">清空</el-button>
      </el-form-item>
      
      
    </el-form>
    <el-row :gutter="20" style="text-align: center;" >
        <el-col :span="6" ><div class="grid-content bg-purple">
          <div class="pad">
           <h3>總廠葷素（份）</h3>
          <div class = "subtitle">{{ dataSum.total }}</div>
        </div>

        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <div class="pad">
          <h3>总葷（份）</h3>
          <div class = "subtitle">{{ dataSum.totalHun }}</div>
        </div>

        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <div class="pad">
          <h3>总素（份）</h3>
          <div class = "subtitle">{{ dataSum.totalSu }}</div>
        </div>

        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <div class="pad">
          <h3>总加饭（份）</h3>
          <div class = "subtitle">{{ dataSum.totalRice }}</div>
        </div>
        </div></el-col>

      </el-row>
    
      <el-row :gutter="20" style="text-align: center">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="pad">
              <span class="titles">
               新仁厰-葷（份）：
              </span>
              <span class = "subtitle1">{{ dataSum.totalHun1 }}</span>
            </div>
           <div class="pad">
            <span class="titles ">
              新仁厰-素（份）：
            </span>
            <span class = "subtitle1">{{ dataSum.totalSu1 }}</span>
           </div>
           <div class="pad">
            <span class="titles ">
              新仁厰-加飯（份）：
            </span>
            <span class = "subtitle1">{{ dataSum.totalRice1 }}</span>
           </div>
          </div>
          
      </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="pad">
              <span class="titles">
               新樂厰-葷（份）：
              </span>
              <span class = "subtitle1">{{ dataSum.totalHun2 }}</span>
            </div>
           <div class="pad">
            <span class="titles ">
              新樂厰-素（份）：
            </span>
            <span class = "subtitle1">{{ dataSum.totalSu2 }}</span>
           </div>
           <div class="pad">
            <span class="titles ">
              新樂厰-加飯（份）：
            </span>
            <span class = "subtitle1">{{ dataSum.totalRice2 }}</span>
           </div>
          </div>
        </el-col>

      </el-row>
    <div class="main">
      <div class="content">
        <div class="tit">
          <el-row style="text-align: center;width:100%" class="titles">

            <el-col :span="5"><span class="item product">葷素</span></el-col>
            <el-col :span="5"><span class="item product">是否加飯</span></el-col>
            <el-col :span="5"><span class="item product">狀態</span></el-col>
            <el-col :span="5"><span class="item product">取餐時間</span></el-col>
            <el-col :span="4"><span class="item product">操作</span></el-col>
          </el-row>
        </div>
        <div class="prod"
             v-for="order in dataList"
             :key="order.orderId">
          <div class="prod-tit">
            <span class="titles ">廠區：</span><span>{{order.attr2}}</span>
            <span class="titles ">部門：</span> <span>{{order.deptName?order.deptName:""}}</span>           
            <span class="titles ">人員：</span><span>{{order.realName?order.realName+'（'+order.userId+')':""}}</span>
            <span class="titles ">預定時間：</span><span>{{order.createTime}}</span>
            <!-- <span>买家：19999999999</span>
            <span >联系电话：19999999999</span> -->
          </div>
          <div class="prod-cont">
            
            <el-row style="width:100%">
              <el-col :span="5"
                      style="height: 100%;">
                <div class="item">
                  <div>
                    <el-button 
                               type="primary"
                               size="small"  
                               >{{ order.attr1 }}</el-button>
                  </div>
                </div>
              </el-col>
            
            
              <!-- <el-col :span="5"
                      style="height: 100%;">
                <div class="item">
                  <div>
                    <span class="totalprice">￥{{order.actualTotal}}</span>
                    <span v-if="order.freightAmount">（含运费：￥{{order.freightAmount}}）</span>
                    <span>共{{order.productNums}}件</span>
                  </div>
                </div>
              </el-col> -->
              <el-col :span="5"
                      style="height: 100%;">
                <div class="item">
                  <div>
                    <span v-if="order.isAddRice === '1'">加饭</span>
                    <span v-else-if="order.isAddRice === '0'">不加饭</span>
                    <span v-else></span>
                  </div>
                </div>
              </el-col>
              <el-col :span="5"
                      style="height: 100%;">
                <div class="item">
                 
                  <span v-if="order.status === 2"
                        size="small"
                        type="danger">已訂</span>
                  <span v-else-if="order.status === 6"
                        size="small"
                        type="danger">取消</span>
              
                  <span v-else
                        size="small">成功</span>
                </div>
              </el-col>
              <el-col :span="5"
                      style="height: 100%;">
                <div class="item">
                  <div class="operate">
                    <!-- <button onclick="">打印訂單</button><br> -->
                    <span>{{order.clockedTime}}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4" >
                <div style=" display: flex;  display: -webkit-flex;    align-items: center;    justify-content: center;padding: 5px;">
                    <el-button v-if="isAuth('order:order:update')&&order.status === 2"
                               type="danger"
                               size="small"   icon="el-icon-delete"
                               @click="cancelOrder(order.orderNumber)">取消</el-button>
                </div>
              </el-col>
            </el-row>
               
          </div>
          
        </div>
      </div>
    </div>
    <!-- 空 -->
    
    <el-pagination @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle"
                   :current-page="page.pageIndex"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="page.pageSize"
                   :total="page.total"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="getDataList"></add-or-update>
    <consignment-info v-if="consignmentInfoVisible"
                      ref="consignmentInfo"
                      @inputCallback="getWaitingConsignmentExcel"></consignment-info>
  </div>
</template>

<script>
import AddOrUpdate from './orderInfo'
import ConsignmentInfo from './consignment-info'
export default {
  data () {
    return {
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
              'startTime': this.dateRange === null ? null : this.dateRange[0], // 開始時間
              'endTime': this.dateRange === null ? null : this.dateRange[1] // 結束時間
            },
            params
          ), false
        )
      }).then(({ data }) => {
        this.dataSum = data
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
              'startTime': this.dateRange === null ? null : this.dateRange[0], // 開始時間
              'endTime': this.dateRange === null ? null : this.dateRange[1] // 結束時間
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
        url: this.$http.adornUrl('/order/order/soldExcel'),
        method: 'get',
        params: this.$http.adornParams({
          'startTime': this.dateRange === null ? null : this.dateRange[0], // 開始時間
          'endTime': this.dateRange === null ? null : this.dateRange[1] // 結束時間
        }),
        responseType: 'blob' // 解决文件下载乱码问题
      }).then(({ data }) => {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
        const fileName = '銷售信息整理.xls'
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
    }
  }
}
</script>
<style lang="scss">
.mod-order-order {
  .tit {
    display: flex;
    height: 45px;
    align-items: center;
  }
  .tit .item {
    padding: 0 10px;
    width: 10%;
    text-align: center;
  }
  .tit .product {
    width: 25%;
  }
  .prod-tit {
    padding: 10px;
    background: #f8f8f9;
    border-left: 1px solid #dddee1;
    border-top: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
  }
  .prod-tit span {
    margin-right: 15px;
  }
  .prod-cont {
    display: flex;
    border-top: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    border-left: 1px solid #dddee1;
    color: #495060;
  }
  .prod-cont .item {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    // width: 10%;
    border-right: 1px solid #dddee1;
    text-align: center;
    height: 100%;
  }
  .prod-cont .item span {
    display: block;
  }
  .prod-cont .prod-item {
    // width: 38%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #dddee1;
  }
  .prod-name {
    width: 55%;
    text-align: left;
  }
  .prod-price {
    position: absolute;
    right: 40px;
    text-align: right;
  }
  .prod-price span {
    display: block;
    margin-bottom: 10px;
  }
  .prod-name .prod-info {
    display: block;
    color: #80848f;
    margin-top: 30px;
  }
  .prod-cont .items.name {
    display: flex;
    position: relative;
    padding: 20px;
    // height: 100px;
    border-bottom: 1px solid #dddee1;
  }
  .prod-cont .items.name:last-child {
    border-bottom: none;
  }
  .prod-image {
    margin-right: 20px;
    width: 100px;
    height: 100px;
  }
  .prod-image img {
    width: 100px;
    height: 100px;
  }
  .item span {
    display: block;
    // margin-bottom: 10px;
  }
  .item .operate {
    color: #2d8cf0;
  }
  .item .totalprice {
    color: #c00;
  }
  .prod .remark {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #e8f7f6;
    border-left: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
  }
  .buyer-remark {
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
</style>
