<template>
	<view style=" position: relative;    height: 100%;    z-index: 2;">
		<image class="bg top" src="../../static/login_top.jpg" style ='z-index: 2'></image>
		
		<!-- 登录 -->
		<view class="login-form wrapper center" style="background-color:white;">
			<view :class="['item',errorTips==1? 'error':'']">
				<view class="account">
					<text class="input-item">工號</text>
					<input type="text" :value="principal" @input="getInputVal" data-type="account" placeholder-class="inp-palcehoder" placeholder="請輸入工號"></input>
				</view>
				<view class="error-text" v-if="errorTips==1"><text class="warning-icon">!</text>請輸入工號！</view>
			</view>
			<view :class="['item',errorTips==2? 'error':'']">
				<view class="account">
					<text class="input-item">密碼</text>
					<input type="password" :value="credentials" @input="getInputVal" data-type="password" placeholder-class="inp-palcehoder" placeholder="請輸入密碼"></input>
				</view>
				<view class="error-text" v-if="errorTips==2"><text class="warning-icon">!</text>請輸入密碼！</view>
			</view>

			<view class="item">
				<view class="" style="width: 200px;">
				<checkbox-group @change="checkboxChange" style="display: inline-flex;font-size:14px">
					<checkbox value="1" :checked="isCheck" color="#FFCC33" style="transform:scale(0.8)" />
					<view >記住密碼</view>
				</checkbox-group>	
				</view>
			</view>
			
			<button class="authorized-btn" @tap="login">登錄</button>
			<view class="center">
			
		</view>

		<view>
		</view>
		</view>
		<image class="bg bottom" src="../../static/login_buttom.jpg"></image>
		
	</view>
</template>

<script>
	var http = require("../../utils/http");
	var util = require('../../utils/util.js');
	import { encrypt } from '../../utils/crypto.js'
	import {
		AppType
	} from '../../utils/constant.js'
	export default {
		data() {
			return {
				principal: uni.getStorageSync("saveUser"), // 账号
				credentials: uni.getStorageSync("savepwd"), // 密码
				// isPersonalCenter: false, //是否从个人中心页面跳转过来
				errorTips: 0, //错误提示
				values:"1",
				isCheck:uni.getStorageSync("defaultChecked")==''?false:uni.getStorageSync("defaultChecked"),//checkedbox value
			};
		},

		components: {},
		props: {},

		computed: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			if (options.isPersonalCenter) {
				this.isPersonalCenter = options.isPersonalCenter
			}
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			//头部导航标题
			uni.setNavigationBarTitle({
				title: "用戶登錄"
			});
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},

		methods: {
			//记住密码
			checkboxChange: function (e) {
				//					uni.getStorageSync("defaultChecked")
				let v = e.detail.value;
				if(v.length>0){
					console.log(v);
					this.isCheck =true 
					uni.setStorageSync("defaultChecked",true)
				}else{
					console.log(v);
					this.isCheck =false 
					uni.setStorageSync("defaultChecked",false)
					
				}
			},
			/**
			 * 输入框的值
			 */
			getInputVal: function(e) {
				const type = e.currentTarget.dataset.type;
				if (type == 'account') {
					this.setData({
						principal: e.detail.value
					});
				} else if (type == 'password') {
					this.setData({
						credentials: e.detail.value
					});
				}
			},

			/**
			 * 登录
			 */
			login() {
				let thi = this;
				// #ifdef H5
				var ua = navigator.userAgent.toLowerCase();
				var data = {
					appType: ua.search(/MicroMessenger/i) > -1 ? AppType.MP : AppType.H5,
					principal: ua.search(/MicroMessenger/i) > -1 ? this.principal + ':' + util.getUrlKey('code') : this.principal,
					credentials: this.credentials,
					loginType: 0, //账号登录
				}
				 // #endif
				// #ifdef APP-PLUS
				var data = {
					appType: uni.getStorageSync('appType'),
					principal: this.principal,
					credentials: this.credentials,
					loginType: 0, //账号登录
				}
				// #endif
				if (this.principal.length == 0) {
					this.setData({
						errorTips: 1
					})
					return
				} else if (this.credentials.length == 0) {
					this.setData({
						errorTips: 2
					})
					return
				} else {
					this.setData({
						errorTips: 0
					})
					// #ifdef H5 || APP-PLUS
					var params = {
						url: "/login",
						method: "post",
						data: {
							"userName": this.principal,
							"passWord": encrypt(this.credentials)
						},
						callBack: res => {
							http.loginSuccess(res, () => {
								if(this.isCheck){
									uni.setStorageSync("saveUser",thi.principal);
									uni.setStorageSync("savepwd",thi.credentials);
								}else{
									uni.setStorageSync("saveUser","");
									uni.setStorageSync("savepwd","");
								}
								uni.showToast({
									title: "登錄成功",
									icon: 'none',
									complete: () => {
										setTimeout(() => {
											wx.switchTab({
											url: '/pages/index/index'
										});
										},1000)

									}
								})
							})
						},
					}
					http.request(params)
					// #endif
					// #ifdef MP-WEIXIN
					// wx.login({
					// 	success: (res) => {
					// 		var params = {
					// 			url: "/login",
					// 			method: "post",
					// 			data: {
					// 				appType: 1,
					// 				credentials: this.credentials,
					// 				loginType: 0,
					// 				principal: this.principal + ':' + res.code
					// 			},
					// 			callBack: result => {
					// 				http.loginSuccess(result)
					// 				this.$Router.pushTab('/pages/index/index')
					// 			},
					// 		}
					// 		http.request(params)
					// 	},
					// })
					// #endif
				}
			},

			/**
			 * 去注册
			 */
			toRegitser() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},

			/**
			 * 回到首页
			 */
			toIndex() {
				wx.switchTab({
					url: '/pages/index/index'
				});
				// this.$Router.pushTab('/pages/index/index')
			}

		},
		watch: {
			principal(nv, ov) {
				this.errorTips = 0
			}
		}
	};
</script>
<style>
	@import "./accountLogin.css";
.bg {
	  z-index: -1;
	  position: fixed;
	  width: 750rpx;
	  will-change: transform;
}	  
.top {
	    top: 0;
	    left: 0;
	    right: 0;
	    width: 100%;
}

.rocket {
  margin: 50rpx 28%;
  width:  400rpx;
  will-change: transform;
}
.bottom {
	    bottom: -10rpx;
	    left: 0;
	    right: 0;
	    width: 100%;
	    height: 360rpx;
	    margin-bottom: env(safe-area-inset-bottom);
}
.bottom-txt {
	    bottom: 150rpx;
	    left: 0;
	    right: 0;
	    width: 100%;
	    height: 144px;
	    margin-bottom: env(safe-area-inset-bottom);
}
.center {
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* background-color: red; */
}
.wrapper {
      padding-top: 530rpx;
      width: 90%;
    }
</style>
