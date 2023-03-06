<template>
<view class="container">

	<!-- <view class="box-bg">
		<uni-nav-bar shadow title="按日訂餐" />
	</view> -->
	<view class="content ">
		<!-- <uni-section title="日历选择" type="line"></uni-section> -->
		<view >
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" 
			:date="selectdDayStr"
			:selected="info.selected" 
			:showMonth="true" 
			@change="changeDetail" 
			@confirm="monthSwitch"
			@monthSwitch="monthSwitch"
			/>
		</view>
	</view>
	<view class="content ">
		<uni-section title="訂餐明細" type="line" class="example-head">
		<scroll-view scroll-y="true" >
		<block v-for="(item, index) in detailList" :key="index">
			<uni-row class="example-body">
				<uni-col :span="20" >
					<text >{{item.orderUseDate.slice(0,10)}}</text>
					<uni-tag style="margin-left: 10rpx;" :inverted="true" :text="!item.orderNumber?item.addr:item.attr2" type="primary" :disabled="!item.orderNumber?false:true"  @click="setType('attr1',index)" ></uni-tag>
					<uni-tag style="margin-left: 10rpx;" :inverted="true" :text="!item.orderNumber?item.meatSet:item.attr1" type="primary" :disabled="!item.orderNumber?false:true" @click="setType('attr2',index)"></uni-tag>
					<uni-tag style="margin-left: 10rpx;" :inverted="true" :text="item.isAddRice==1||item.isAddRice=='1'?'加飯':'不加飯'" type="primary" :disabled="!item.orderNumber?false:true" @click="setType('addRice',index)"></uni-tag>
				</uni-col>
				<uni-col :span="4" >
					<uni-tag  :text="!item.orderNumber?'訂餐':item.status=='2'&&item.orderCancel?'取消':'已訂'"  :type="!item.orderNumber?'primary':item.status=='2'&&item.orderCancel?'error':''" :disabled="!item.orderNumber?false:item.status=='2'&&item.orderCancel?false:true" @click="item.orderCancel?cancelOrder(item,index):submitOrder(item,index)"></uni-tag>
				</uni-col>
			</uni-row>
		</block>
		<view v-if="!detailList||!detailList.length" class="ca-empty">
			<uni-nav-bar shadow title="暫無訂餐記錄" />
		</view>
		
		
		</scroll-view>
		</uni-section>
	</view>
	
	<view class="content ">
		
	</view>
</view>
	
	
</template>
<script module="wxs" lang="wxs" src="../../wxs/number.wxs"></script>

<script>
/**
 * 获取任意时间
 */
function getDate(date, AddDayCount = 0) {
	if (!date) {
		date = new Date()
	}
	if (typeof date !== 'object') {
		date = date.replace(/-/g, '/')
	}
	const dd = new Date(date)

	dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

	const y = dd.getFullYear()
	const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
	const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
	return {
		fullDate: y + '-' + m + '-' + d,
		year: y,
		month: m,
		date: d,
		day: dd.getDay()
	}
}
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp();
export default {
	components: {},
	data() {
		return {
			showCalendar: false,
			info: {
				lunar: true,
				range: true,
				insert: false,
				selected: []
			},
			//订单
			orders:[],
			//选中日期
			selectdDay:"",
			selectdDayStr:"",
			//选中周日期
			selectdWeeks:[],
			//明细列表
			detailList:[],
			pages:1,
			current:1,
			monthSE:[],
			selectYearMonth:""
		}
	},
	onPullDownRefresh(){
		this.loadOrderData(this.monthSE[0],this.monthSE[1],1);
		uni.stopPullDownRefresh()
	},
	onReady() {
		// this.$nextTick(() => {
		// 	this.showCalendar = true
		// })
		this.load();
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		// console.log("=================")
		let isLoad= uni.getStorageSync("indexLoad",true);
		if(this.monthSE[0]&&isLoad){
			this.loadOrderData(this.monthSE[0],this.monthSE[1],1);
			uni.setStorageSync("indexLoad",false);
		}
	},
	methods: {
		load(){
			let dt = new Date();
			this.selectYearMonth = dt.getFullYear()+""+dt.getMonth();
			//加载当周日期
			this.loadWeeks(dt);
			let se = this.getMonthSE();
			//获取当月订单数据 並 显示明细
			this.loadOrderData(se[0],se[1],1);
			//显示明细
			// this.detail({"fulldate":this.formatDate(new Date())})
			
		},
		/**
		 * 默认当前月
		 * @param date 带月份的日期，例：2021-8
		 * @returns 月初至月末数组，例：[2021-8-1, 2021-8-31]
		 */
		getMonthSE(date) {
		  let nowdays = date ? new Date(date) : new Date();
		  let year = nowdays.getFullYear();
		  let month = nowdays.getMonth() + 1;
		  if (month < 10) { month = "0" + month; }
		  let myDate = new Date(year, month, 0);
		  let startDate = year + "-" + month + "-01";
		  let endDate = year + "-" + month + "-" + myDate.getDate();
		  this.monthSE = [startDate, endDate]
		  return [startDate, endDate];
		},
		/**
		 * @param {Object} n
		 * 个位数前缀补零
		 */
		formatNumber(n){
		  n = n.toString();
		  return n[1] ? n : '0' + n;
		},
		//日期格式化
		formatDate(date) {
		  const year = date.getFullYear();
		  const month = date.getMonth() + 1;
		  const day = date.getDate();
		  return [year, month, day].map(this.formatNumber).join('-') 
		},
		//获取周一和周五
		loadWeeks(dt){
			// let day = dt.getDay()||7;
			let day = dt.getDay();
			let month = dt.getMonth();
			this.selectdDay = dt;
			let week1 = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()+1 - day);
			let week5 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()+5 - day);
			this.selectdWeeks=[];
			for(var i = 1;i<6;i++){
				let week = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()+i - day)
				let monthDefault = week.getMonth();
				if(month==monthDefault){
					this.selectdWeeks.push(this.formatDate(week))
				}
			}
		},
		//设置类型
		setType(e,i){
			if(this.detailList[i].orderNumber){
				return 
			}
			if('attr1'==e){
				if(this.detailList[i].addr == '新仁'){
					this.detailList[i].addr='新樂';
				}else if(this.detailList[i].addr == '新樂'){
					this.detailList[i].addr='新仁';
				}else{
					
				}
				
			}else if('attr2'==e){
				if(this.detailList[i].meatSet == '葷食'){
					this.detailList[i].meatSet='素食';
				}else if(this.detailList[i].meatSet == '素食'){
					this.detailList[i].meatSet='葷食';
				}else{
					
				}
				this.detailList[i].defaultMeatSet = !this.detailList[i].defaultMeatSet;
			}else if('addRice'==e){
				this.detailList[i].isAddRice = !this.detailList[i].isAddRice;
			}
		},

		/**
		 * 变更日明细
		 */
		changeDetail(e){
			let dt = e==undefined?new Date():new Date(e.fulldate.replace(/-/g, '/'))
			let sym = dt.getFullYear()+""+dt.getMonth();
			if(this.selectYearMonth==sym){
				this.loadWeeks(dt);
				this.detail({"fulldate":this.formatDate(new Date())})
			}else{
				let se = this.getMonthSE(dt);
				//获取当月订单数据
				this.loadOrderData(se[0],se[1],1);
				this.selectYearMonth = dt.getFullYear()+""+dt.getMonth()
			}
			//显示明细
		},
		//根据选择显示周一到周五订单，然后根据日期去历史订单数据数据里查找
		//1、有找着则添加近明细数据，历史数据则无法修改。未来数据则可以取消；
		//2、没有找到：已过订餐时间就显示未预定，未来时间需要生成订单供员工订餐
		detail(e) {
			this.detailList=[];
			//选中周期内是否有订单
			for(let i = 0;i<this.selectdWeeks.length;i++){
				let curDt = this.selectdWeeks[i];
				let index =  this.array_find(this.orders,curDt);
				if(index>=0){
					this.detailList.push(this.orders[index]);
				}else{
					var defaultOrder = this.makeDefalutOrder(this.selectdWeeks[i]);
					if(defaultOrder){
						this.detailList.push(defaultOrder);
					}
				}
			}
		},
		//创建默认订单
		makeDefalutOrder(dt){
			//比较日期是否是过去，是则不创建
			let makeDt = new Date(Date.parse(dt));
			let curTime = new Date(this.formatDate(new Date())+" 09:30:00");
			if(makeDt<curTime){
				return;
			}
			let defaultAddr = uni.getStorageSync("defaultAddr");
			let defaultMeatSet = uni.getStorageSync("defaultMeatSet");
			let isAddRice = uni.getStorageSync("isAddRice");
			return {"orderNumber":"","orderUseDate":dt,orderItemDtos:[{"prodName":"","skuName":""}],"isAddRice":isAddRice?1:0,"addr":!defaultAddr?"新仁":"新樂","meatSet":!defaultMeatSet?"葷食":"素食",status:2}
		},
		//是否包含
		array_find(arr,dt){
			if(!arr||arr.length==0){
				return -1;
			}
			for(var i = 0;i<arr.length;i++){
				let orderUseDate = this.formatDate(new Date(arr[i].orderUseDate.replace(/-/g, '/')));
				if(orderUseDate==dt){
					return i
				}
			}
			return -1
		},
		monthSwitch(e) {
			// console.log('monthSwitchs 返回:', e);
			let dt = new Date(e.year,e.month-1)
			this.selectYearMonth = dt.getFullYear()+""+dt.getMonth();
			this.selectdDayStr=this.formatDate(dt);
			this.loadWeeks(dt);
			let se = this.getMonthSE(dt);
			//获取当月订单数据
			this.loadOrderData(se[0],se[1],1);
			// console.log(se)
		},
		/**
		 * 提交订单
		 */
		submitOrder:function(e,index){
		  var ths = this;
			let item = this.detailList[index];
			uni.showLoading({
			  mask: true
			});
			//加载订单列表
			var params = {
			  url: "/p/order/confirmAndSubmit",
			  method: "POST",
			  data: {
				orderItem:{
					prodId:78,
					// skuId:1,
					prodCount:1,
					shopId:1,
					orderUseDate:[e.orderUseDate]
				},
				orderUsedate:[e.orderUseDate],
				att1:e.meatSet,//套餐
				att2:e.addr,//厂区
				isAddRice:e.isAddRice?1:0,//1:加饭;0:不加飯
			  },
			  callBack: (res)=> {
				// console.log(res);
				//获取当月订单数据
				this.loadOrderData(this.monthSE[0],this.monthSE[1],1);
			    
				uni.hideLoading();
			  }
			};
			http.request(params);
			
		},
		/**
		 * 加载订单数据
		 */
		loadOrderData: function (startDate,endDate,current) {
		  var ths = this;
		  uni.showLoading({
		    mask: true
		  });
		  //加载订单列表
		  var params = {
		    url: "/p/myOrder/myOrderByDate",
		    method: "GET",
		    data: {
		      current: current,
		      size: 31,
		      startDate: startDate,
			  endDate: endDate,
			  status: 2
		    },
		    callBack: (res)=> {
		      // console.log(res);
		      var list = [];
		      if (res.current == 1) {
		        list = res.records;
		      } else {
		        list = ths.orders;
		        Array.prototype.push.apply(list, res.records);
		      }
			  this.orders = list;
			  //动态打卡
			  this.info = {
				lunar: true,
				range: true,
				insert: false,
				selected: []
			  }
			  for (var i = 0; i < list.length; i++) {
				let makeDt = new Date(list[i].orderUseDate.replace(/-/g, '/'));
				// let curTime = new Date(this.formatDate(new Date())+" 09:30:00");
				 
			  	this.info.selected.push({
					date: this.formatDate(makeDt),
					info: '已訂'
			  	}) 
			  }

			  this.pages = res.pages;
			  this.current = res.current;
			  this.detail();
		      uni.hideLoading();
		    }
		  };
		  http.request(params);
		},
		/**
		 * 取消订单
		 */
		cancelOrder: function (e) {
		  var ordernum = e.orderNumber;
		  var ths = this;
		  uni.showModal({
		    title: '提示',
		    content: '確定要取消此訂餐？',
		    confirmColor: "#3e62ad",
		    cancelColor: "#3e62ad",
		    cancelText: '否',
		    confirmText: '是',
		
		    success(res) {
		      if (res.confirm) {
		        uni.showLoading({
		          mask: true
		        });
		        var params = {
		          url: "/p/myOrder/cancel/" + ordernum,
		          method: "PUT",
		          data: {},
		          callBack: function (res) {
		            // console.log(res);
				    ths.loadOrderData(ths.monthSE[0],ths.monthSE[1],1);
		            uni.hideLoading();
		          }
		        };
		        http.request(params);
		      } else if (res.cancel) {//console.log('用户点击取消')
		      }
		    }
		
		  });
		}
	}
}
</script>

<style>
	@import "./index.css";
</style>