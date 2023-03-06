<template>
<!--pages/category/category.wxml-->

<view class="container">
<!-- 头部标题 -->

<!-- 	<view class="box-bg">
		<uni-nav-bar shadow title="訂單統計" />
	</view> -->
<!-- 滚动内容区 -->
	<view class="content ">
		
			<view class='head-count'>
				
				<uni-row class="example-body">
					<uni-col :span="24" style="padding-left:15upx;margin-top: 15upx;">
						<view class=""  @tap="date">
							<text style="font-size: 84upx;" >{{yue}} </text>
							<text >{{'  月'}}</text>
							<uni-icons type="bottom" size="15"></uni-icons>
						</view>
					</uni-col>
				</uni-row>
				<uni-row class="example-body" style="text-align: center;">
					<uni-col :span="24" style="padding-left:15upx;margin-top: 10upx;">
						<view class="" style=""  >
							<text>{{'訂餐天数：'+dayCount+' 天，預計費用：'}}</text>
							<text >{{amoumt}}</text>
							<text>{{" 元"}}</text>
						</view>
					</uni-col>
				</uni-row>
				<uni-row class="example-body" style="text-align: center;">
					<uni-col>
						<view class="" style="padding-left:15upx;margin-top: 10upx; " >
							<text>{{'取餐次數：'+orderUsed+' 次，未取次數：'}}</text>
							<text >{{orderNotUsed}}</text>
							<text>{{" 次"}}</text>
						</view>
					</uni-col>
				</uni-row>
				</uni-section>
			</view>
			<uni-section title="訂單分析" type="line" class="example-head">
			<scroll-view scroll-y="true" >
				
			<block v-for="(item, index) in detailList" :key="index">
				<uni-card style="margin:10upx" :title="'日期：'+formatDate(new Date(item.orderUseDate.replace(/-/g, '/')))" :isFull="true" sub-title="" extra="35 元" >
					<uni-tag :inverted="true" :text="item.prodName+'   '" type="primary"  ></uni-tag>
					<!-- <uni-tag style="margin-left: 10upx;" :inverted="true" text="已使用" type="primary"  ></uni-tag> -->

				</uni-card>
			</block>
			<view v-if="!detailList || !detailList.length" class="ca-empty">
				<uni-nav-bar shadow title="暫無記錄" />
			</view>
			</scroll-view>
			</uni-section>
    </view>
	<view class="content " style="height: 100upx;">
		
	</view>
	<view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="date-select">
				<view class="btn u-f u-f-jsb" style="display: flex;justify-content:space-between;">
					<view class="btn-left" @tap="concel">
						取消
					</view>
					<view class="btn-right" @tap="confirm">
						確定
					</view>
				</view>
				<picker-view class="picker-view" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<!-- <picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column> -->
				</picker-view>
			</view> 
		</uni-popup>
	</view>

</view>
</template>

<script module="wxs" lang="wxs" src="../../wxs/number.wxs"></script>

<script>
// pages/category/category.js
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");

export default {
  data() {

	  const date = new Date()
	  const years = []
	  const currentYear = date.getFullYear();
	  const year = date.getFullYear()
	  const months = []
	  const currentMonth = date.getMonth() + 1
	  const month = date.getMonth() + 1
	  const days = []
	  const day = date.getDate()

	  for (let i = date.getFullYear()-1; i <= currentYear+1; i++) {
		  years.push(i)
	  }
	  for (let i = 1; i <= 12; i++) {
		  months.push(i)
	  }
	  for (let i = 1; i <= 31; i++) {
		  days.push(i)
	  }
     return {
		 order:[
			 {
	         orderNumber:"",
			 
			 orderMonth:"",
			 "addr":!this.defaultAddr?"新仁":"新樂",
			 "meatSet":!this.defaultMeatSet?"葷食":"素食",
			 status:2,
			 cancalOrder:""
			 }
		 ],
		defaultAddr: "",//0:新仁
		defaultMeatSet:"",//0:葷食
		detailList:[],
		isAddRice:0,
		title: 'picker-view',
		years,
		currentYear,
		year,
		months,
		month,
		days,
		day,
		value: [1, month -1, day - 1],
		selectValue:[0,0,1],
		/**
		 * 解决动态设置indicator-style不生效的问题
		 */
		visible: true,
		indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
		nian:year,
		yue:month,
		ri:'',
		dayCount:'--',
		amoumt:'--',
		orderUsed:'--',
		orderNotUsed:'--',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  var ths = this; //加载分类列表
	  this.defaultMeatSet = uni.getStorageSync("defaultMeatSet")
	  this.defaultAddr = uni.getStorageSync("defaultAddr")
	  let se = this.getMonthSE();
	  //获取当月订单数据
	  this.loadOrderData(se[0],se[1],1);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  let isLoad= uni.getStorageSync("categoryLoad",true);
	  if(isLoad){
		  this.defaultMeatSet = uni.getStorageSync("defaultMeatSet")
		  this.defaultAddr = uni.getStorageSync("defaultAddr")
		  uni.setStorageSync("categoryLoad",false);
	  }
	  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
	  var ths = this; //加载分类列表
	  this.defaultMeatSet = uni.getStorageSync("defaultMeatSet")
	  this.defaultAddr = uni.getStorageSync("defaultAddr")
	  let se = this.getMonthSE();
	  //获取当月订单数据
	  this.loadOrderData(se[0],se[1],1);
	  uni.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
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
		  if(res.records){
			  let dayCount = res.records.length=='0'?'--':res.records.length;
			  let amoumt  = dayCount=='--'?'--':dayCount*35;
			  let orderUsed  = '--'
			  let orderNotUsed  = '--'
			  this.dayCount = dayCount;
			  this.amoumt = amoumt;
			  this.orderUsed = orderUsed;
			  this.orderNotUsed = orderNotUsed;
			  this.detailList = res.records;
			  this.pages = res.pages;
			  this.current = res.current;
		  }
	      uni.hideLoading();
	      }
	    };
	    http.request(params);
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
	    return year+'-'+month+'-'+day;
	  },
	bindChange: function (e) {
		  const val = e.detail.value
		  this.year = this.years[val[0]]
		  this.month = this.months[val[1]]
		  this.day = this.days[val[2]]
		  this.selectValue = e.detail.value
	},
	 
	date:function() {
		this.$refs.popup.open();
	},
	concel:function(){
		this.$refs.popup.close();
	},
	confirm:function(){
		this.nian =this.year;
		this.yue = this.month;
		this.value = this.selectValue;

		let se = this.getMonthSE(new Date(this.year,this.month-1));
		//获取当月订单数据
		this.loadOrderData(se[0],se[1],1);
		this.$refs.popup.close();
	},
	
    /**
     * 分类点击事件
     */
    onMenuTab: function (e) {
      // console.log(e);
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index; // this.getProdList(id);

      this.getProdList(this.categoryList[index].categoryId);
      this.setData({
        categoryImg: this.categoryList[index].pic,
        selIndex: index
      });
    },
  
    

    //跳转商品详情页
    toProdPage: function (e) {
      var prodid = e.currentTarget.dataset.prodid;
      uni.navigateTo({
        url: '/pages/prod/prod?prodid=' + prodid
      });
    },
	/**
	 * 按月提交订单
	 */
	submitOrder:function(e){
	  var ths = this;
		let dt = this.formatDate(new Date(this.nian,this.yue-1));
		uni.showLoading({
		  mask: true
		});
		//加载订单列表
		var params = {
		  url: "/p/order/confirmAndSubmitByMonth",
		  method: "POST",
		  data: {
			orderItem:{
				prodId:78,
				// skuId:1,
				prodCount:1,
				shopId:1,
				orderUseDate:[dt]
			},
			orderUsedate:[dt],
			att1:!ths.defaultMeatSet?'葷食':'素食',//套餐
			att2:!ths.defaultAddr?'新仁':'新樂',//厂区
			isAddRice:ths.isAddRice?true:false,//1:加饭;0:不加飯
		  },
		  callBack: (res)=> {
			// console.log(res);
			
			//获取当月订单数据
		    if(res.orderNumbers){
				uni.showToast({
					title: "訂餐成功，請到日訂頁面下拉刷新查詢明細",
					icon: "none"
				})
			}
			uni.hideLoading();
		  }
		};
		http.request(params);
		
	},
  }
};
</script>
<style>
@import "./count.css";
</style>