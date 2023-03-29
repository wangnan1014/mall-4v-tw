<template>
<!--pages/category/category.wxml-->

<view class="container">
<!-- 头部标题 -->

<!-- 	<view class="box-bg">
		<uni-nav-bar shadow title="按月訂餐" />
	</view> -->
<!-- 滚动内容区 -->
	<view class="content ">
		
			<view>
				<uni-section title="選擇月份" type="line">
				<uni-row class="example-body">
					<uni-col :span="8" style="padding-left:5px">
						<view class="" @tap="date">
							<text >{{nian}}年{{yue}}月</text>
							<uni-icons type="bottom" size="15"></uni-icons>
						</view>
					</uni-col>
					<uni-col :span="12" >
						<uni-tag style="margin-left: 10rpx;" :inverted="true" :text="!defaultAddr?'新仁':'新樂'" type="primary" @click="setType('attr1')"></uni-tag>
						<uni-tag style="margin-left: 10rpx;" :inverted="true" :text="!defaultMeatSet?'葷食':'素食'" type="primary" @click="setType('attr2')"></uni-tag>
					 	<uni-tag style="margin-left: 10rpx;" :inverted="true" :text="isAddRice==0?'不加飯':'加飯'" type="primary" @click="setType('addRice')"></uni-tag>
					 </uni-col>
					<uni-col :span="4" v-show="orderMonthStatus!=null">
						<uni-tag  :text="orderMonthStatus==0?'訂餐':'取消'" :type="orderMonthStatus==0?'primary':'error'" @click="orderMonthStatus==0?submitOrder():cancalMonthOrder()"></uni-tag>
					</uni-col>
				</uni-row>
				</uni-section>
			</view>
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
	  const month = date.getMonth() + 1
	  const days = []
	  const day = date.getDate()

	  for (let i = date.getFullYear()-1; i <= date.getFullYear()+1; i++) {
		  years.push(i)
	  }
	  for (let i = 1; i <= 12; i++) {
		  months.push(i)
	  }
	  for (let i = 1; i <= 31; i++) {
		  days.push(i)
	  }	  
     return {
		orderMonthStatus:null,
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
		isAddRice:0,
		title: 'picker-view',
		years,
		currentYear,
		year,
		months,
		month,
		days,
		day,
		value: [1, month - 1, day - 1],
		selectValue:[0,0,1],
		/**
		 * 解决动态设置indicator-style不生效的问题
		 */
		visible: true,
		indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
		nian:year,
		yue:month,
		ri:''
    }
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ths = this; //加载分类列表
    this.defaultMeatSet = uni.getStorageSync("defaultMeatSet")
	this.defaultAddr = uni.getStorageSync("defaultAddr")
	this.isAddRice = uni.getStorageSync("isAddRice")
	this.getOrderStatus();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  let isLoad= uni.getStorageSync("categoryLoad",true);
	  if(isLoad){
		  this.defaultMeatSet = uni.getStorageSync("defaultMeatSet")
		  this.defaultAddr = uni.getStorageSync("defaultAddr")
		  this.isAddRice = uni.getStorageSync("isAddRice")
		  this.getOrderStatus();
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
  onPullDownRefresh: function () {},

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
		this.getOrderStatus();
		// this.ri=this.day;
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
    // 跳转搜索页
    toSearchPage: function () {
      uni.navigateTo({
        url: '/pages/search-page/search-page'
      });
    },

    getProdList(categoryId) {
      //加载分类列表
      var params = {
        url: "/prod/pageProd",
        method: "GET",
        data: {
          categoryId: categoryId
        },
        callBack: res => {
          // console.log(res);
          this.setData({
            productList: res.records
          });
        }
      };
      http.request(params);
    },

    //跳转商品详情页
    toProdPage: function (e) {
      var prodid = e.currentTarget.dataset.prodid;
      uni.navigateTo({
        url: '/pages/prod/prod?prodid=' + prodid
      });
    },
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
	 * 按月查詢狀態
	 */
	getOrderStatus:function(){
		let ths = this;
		let dt = this.formatDate(new Date(this.nian,this.yue-1));
		//加载订单列表
		var params = {
		  url: "/p/myOrder/getOrderByYearMonthStatus",
		  method: "GET",
		  data: {
			orderDt:dt,
		  },
		  callBack: (res)=> {
			console.log('用户点击取消'+res)
			ths.orderMonthStatus = res;
			uni.hideLoading();
		  }
		};
		http.request(params);
	},
	/**
	 * 按月取消訂單
	 */
	cancalMonthOrder:function(){
		let ths = this;
		let dt = this.formatDate(new Date(this.nian,this.yue-1));
		let se = this.getMonthSE(new Date(this.nian,this.yue-1));
		uni.showModal({
		  title: '提示',
		  content: '確定要取消'+this.month+'月訂餐？',
		  confirmColor: "#3e62ad",
		  cancelColor: "#3e62ad",
		  cancelText: '否',
		  confirmText: '是',
		  success(res) {
		    if (res.confirm) {
				//加载订单列表
				var params = {
				  url: "/p/myOrder/cancelByYearMonth",
				  method: "GET",
				  data: {
					orderDt:dt,
					startDate:se[0],
					endDate:se[1]
				  },
				  callBack: (res)=> {
					ths.getOrderStatus();
					uni.hideLoading();
					uni.setStorageSync("indexLoad",true)
					uni.setStorageSync("countLoad",true);
					
					uni.showToast({
						title: "取消成功",
						icon: "none"
					})
				  }
				};
				http.request(params);
			} else if (res.cancel) {
		    }  
		  }
		
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
			isAddRice:ths.isAddRice?'1':'0',//1:加饭;0:不加飯
		  },
		  callBack: (res)=> {
			// console.log(res);
			//获取当月订单数据
		    if(res.orderNumbers==""){
				uni.showToast({
					title: "您好，該月已經訂過，請勿重複訂餐",
					icon: "none"
				})
			}else if(res.orderNumbers.length>0){
				uni.showToast({
					title: "訂餐成功，請到日訂頁面查詢明細",
					icon: "none"
				})
			}
			uni.setStorageSync("indexLoad",true)
			uni.setStorageSync("countLoad",true);
			ths.getOrderStatus();
			uni.hideLoading();
		  }
		};
		http.request(params);
		
	},
	setType:function(e){
		if('attr1'==e){
			this.defaultAddr = !this.defaultAddr;
		}else if('attr2'==e){
			this.defaultMeatSet = !this.defaultMeatSet;
		}else if('addRice'==e){
			this.isAddRice = !this.isAddRice;
		}
	}
  }
};
</script>
<style>
@import "./category.css";
</style>