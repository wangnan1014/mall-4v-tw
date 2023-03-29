<template>
	<!--pages/user/user.wxml-->
	<view class="container">
		<!-- 用户信息 -->
		<!-- # indef MP-wei -->
		<!-- <view class="userinfo">
    <view class="userinfo-avatar">
      <open-data type="userAvatarUrl"></open-data>
    </view>
    <view class="userinfo-name">
      <open-data type="userNickName"></open-data>
    </view>
  </view>
  <view class="binding-phone">
    <text class="show-tip">绑定手机号后可查看订单和领取优惠券，</text>
    <text class="gotobinding" @tap="toBindingPhone">去绑定</text>
  </view> -->

		<view class="userinfo" v-if="isAuthInfo">
			<view class="userinfo-con">
				<view class="userinfo-avatar">
					<!-- <open-data type="userAvatarUrl"></open-data> -->
					<image :src="loginResult.pic ? (loginResult.pic.indexOf('http') === -1 ? picDomain + loginResult.pic : loginResult.pic) : '../../static/images/icon/head04.png'"></image>
				</view>
				<view class="userinfo-name">
					<view>{{loginResult.nickName ? "("+loginResult.realName+")"+loginResult.nickName : "用戶昵稱"}}</view>
					
					
					<view>{{loginResult.nickName ? loginResult.deptName : ""}}</view>
					<!-- <open-data type="userNickName"></open-data> -->
				</view>
			</view>
		</view>

		<view class="userinfo-none" v-if="!isAuthInfo">
			<view class="default-pic" @tap="toLogin">
				<image src="../../static/images/icon/head04.png"></image>
			</view>
			<view class="none-login" @tap="toLogin">
				<button class="unlogin">未登錄</button>
				<button class="click-login">點擊登錄賬號</button>
			</view>
		</view>
		<!-- end 用户信息 -->

		<view class="list-cont">

			<!-- 订单状态 -->
			<!-- <view class="total-order">
				<view class="order-tit">
					<text style="font-weight:bold">我的訂單</text>
					<view class="checkmore" @tap="toOrderListPage" data-sts="0">
						<text>查看全部 </text>
						<text class="arrowhead"></text>
					</view>
				</view>
				<view class="procedure">
					<view class="items" @tap="toOrderListPage" data-sts="7">
						<image src="/static/images/icon/toPay.png"></image>
						<text>已訂餐</text>
						<text class="num-badge" v-if="orderAmount.unPay>0">{{orderAmount.unPay}}</text>
					</view>
					 <view class="items" @tap="toOrderListPage" data-sts="2">
						<image src="/static/images/icon/toDelivery.png"></image>
						<text>待送餐</text>
						<text class="num-badge" v-if="orderAmount.payed>0">{{orderAmount.payed}}</text>
					</view> 
					<view class="items" @tap="toOrderListPage" data-sts="3">
						<image src="/static/images/icon/toTake.png"></image>
						<text>待收货</text>
						<text class="num-badge" v-if="orderAmount.consignment>0">{{orderAmount.consignment}}</text>
					</view> 
					<view class="items" @tap="toOrderListPage" data-sts="8">
						<image src="/static/images/icon/toComment.png"></image>
						<text>已使用</text>
					</view>
				</view>
			</view> -->
			<!--end 订单状态 -->

<!-- 			<view class="prod-col">
				<view class="col-item" @tap="myCollectionHandle">
					<view v-if="loginResult" class="num">{{collectionCount}}</view>
					<view v-else class="num">--</view>
					<view class="tit">我的收藏</view>
				</view> -->
				<!-- <view class="col-item" @tap="handleTips">
					<view v-if="loginResult" class="num">5</view>
					<view v-else class="num">--</view>
					<view class="tit">我的消息</view>
				</view>
				<view class="col-item" @tap="handleTips">
					<view v-if="loginResult" class="num">3</view>
					<view v-else class="num">--</view>
					<view class="tit">我的足迹</view>
				</view> 
			</view>
-->

			<view class="my-menu">
				
				<view class="memu-item" @tap="toDistCenter('showLeft')">
					<view class="i-name">
						<image src="/static/images/icon/promotion.png"></image>
						<text>個人喜好設置</text>
					</view>
					<view class="arrowhead"></view>
				</view>
				<view class="memu-item" @tap="toDistCenter('editPassword')">
					<view class="i-name">
						<image src="/static/images/icon/toTake.png"></image>
						<text>密碼修改</text>
					</view>
					<view class="arrowhead"></view>
				</view>				
			</view>
			<!--end 列表项 -->

			<view class="log-out" @tap="logout" v-if="isAuthInfo">
				<view class="log-out-n">
					<text>退出登錄</text>
				</view>
			</view>
		</view>
		<view >
			<uni-drawer ref="showLeft" mode="left" :width="300" >
					<view class="" >
						<uni-section title="個人喜好設置" type="line" >
							<uni-row class="example-body" style="margin-bottom: 10px" >
								<uni-col :span="24" style="padding-left:20px">
									<text >廠區：</text>
									<uni-tag  text="新仁" :type="!defaultAddr?'primary':''"  @click="setType('cq')" ></uni-tag>
									<uni-tag  text="新樂" :type="defaultAddr?'primary':''"  @click="setType('cq')" style="margin-left:10px"></uni-tag>
								</uni-col>
							</uni-row>
							<uni-row class="example-body" style="margin-bottom: 10px" >
								<uni-col :span="24" style="padding-left:20px">
									<text >套餐：</text>
									<uni-tag  text="葷食" :type="!defaultMeatSet?'primary':''"  @click="setType('tc')" ></uni-tag>
									<uni-tag  text="素食" :type="defaultMeatSet?'primary':''"  @click="setType('tc')" style="margin-left:10px"></uni-tag>
								</uni-col>
							</uni-row>
							<!-- </uni-row> -->
							<uni-row class="example-body" style="margin-bottom: 10px" >
							<uni-col :span="24" style="padding-left:20px"><text >加飯：</text>
								<uni-tag  text="是" :type="isAddRice?'primary':''"  @click="setType('jf')" ></uni-tag>
								<uni-tag  text="否" :type="!isAddRice?'primary':''"  @click="setType('jf')" style="margin-left:10px"></uni-tag>
							</uni-col>
							</uni-row>				
						</uni-section>					
					</view>
					
			</uni-drawer>
			<uni-drawer ref="editPassword" mode="left" :width="300" >
					<view class="" >
						<uni-section title="密碼修改" type="line" >
							<!-- <uni-row class="example-body" style="margin-bottom: 10px" >
								<uni-col :span="24" style="padding-left:20px">
									<text >原密码：</text>
									<input type="password" @input="getInputVal" data-type="oldpw" placeholder-class="inp-palcehoder" placeholder="请输入原密码"></input>
								</uni-col>
							</uni-row> -->
							<uni-row class="example-body" style="margin-bottom: 10px" >
								<uni-col :span="24" style="padding-left:20px">
									<text >新密碼：</text>
									<input type="text" @input="getInputVal" data-type="newpw" placeholder-class="inp-palcehoder" placeholder="请输入新密码"></input>
								</uni-col>
							</uni-row>
							<uni-row class="example-body" style="margin-bottom: 10px" >
								
								<uni-col :span="24" style="padding-left:20px">
									
									<text >確認密碼：</text>
									<input type="text" @input="getInputVal"  data-type="secpw" placeholder-class="inp-palcehoder" placeholder="请再次输入新密码"></input>
								</uni-col>
							</uni-row>
							<uni-row class="example-body" style="margin-bottom: 10px">
								<uni-col :span="24" style="padding-left:20px">
									<view class="error" v-if="errorTips==1"><text style ="font-size: 28rpx;	color: #e43130;">請輸入新密碼！</text></view>
									<view class="error" v-if="errorTips==2"><text style ="font-size: 28rpx;	color: #e43130;">新密碼不能與原有密碼相同</text></view>
									<view class="error" v-if="errorTips==3"><text style ="font-size: 28rpx;	color: #e43130;">新密碼與確認密碼不一致！</text></view>
									
								</uni-col>
							</uni-row>
							
							<view>
								<button class="authorized-btn" @tap="updatePwd">確認修改</button>
							</view>			
						</uni-section>
						
					</view>
					
			</uni-drawer>			
		</view>
	</view>
</template>

<script>
	// pages/user/user.js
	var http = require("../../utils/http.js");
	var util = require("../../utils/util.js");
	var config = require("../../utils/config.js");
	import { encrypt } from '../../utils/crypto.js'

	export default {
		data() {
			let deAddr = uni.getStorageSync("defaultAddr");
			let deMeatSet = uni.getStorageSync("defaultMeatSet");
			let isAddRice = uni.getStorageSync("isAddRice");
			return {
				defaultAddr:deAddr?deAddr:0,//0:新仁
				defaultMeatSet:deMeatSet?deMeatSet:0,//0:葷食
				isAddRice:isAddRice?isAddRice:0, // 0:不加飯
				orderAmount: '',
				sts: '',
				collectionCount: 0,
				isAuthInfo: false,
				loginResult: '',
				picDomain: config.picDomain,
				errorTips: 0, // 输入错误提示:  1、密碼未輸入  2密码输入
				username: '', // 账号
				oldpw: '', // 密码
				newpw:'',//新密碼
				secpw:'', //再次確認新密碼
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			//加载订单数字
			var ths = this; // var status = ths.data.status
			ths.setData({
				loginResult: uni.getStorageSync("loginResult"),
				// isAuthInfo: Boolean(wx.getStorageSync('loginResult').userId),
				isAuthInfo: Boolean(uni.getStorageSync('loginResult').userId),
			});
			if (ths.loginResult) {
				ths.setData({
					isAuthInfo: true
				})
			} else {
				ths.setData({
					isAuthInfo: false
				})
			}
			// if (ths.isAuthInfo) {
			// 	uni.showLoading();
			// 	var params = {
			// 		url: "/p/myOrder/orderCount",
			// 		method: "GET",
			// 		data: {},
			// 		callBack: function(res) {
			// 			uni.hideLoading();
			// 			ths.setData({
			// 				orderAmount: res
			// 			});
			// 		}
			// 	};
			// 	http.request(params);
			// 	this.showCollectionCount();
			// }
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
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs["showLeft"].close()
			} else {
				this.$refs["showLeft"].open()
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			confirm:function() {},
			// 打开窗口
			showDrawer:function(e) {
				// this.$refs["showLeft"].open()
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer:function(e) {
				// this.$refs["showLeft"].close();
				 this.$refs[e].close();	
			},
			// 抽屉状态发生变化触发
			change:function(e, type) {
				this[type] = e
			},
			toDistCenter: function(e) {
				this.showDrawer(e);
			},
			toEditPassWord: function(e) {
				this.showDrawer('editPassword');
			},
			toCouponCenter: function() {
				uni.showToast({
					icon: "none",
					title: '该功能未开源'
				});
			},
			
			toAddressList: function() {
				uni.navigateTo({
					url: '/pages/delivery-address/delivery-address'
				});
			},
			// 跳转绑定手机号
			toBindingPhone: function() {
				uni.navigateTo({
					url: '/pages/binding-phone/binding-phone'
				});
			},
			toOrderListPage: function(e) {
				var sts = e.currentTarget.dataset.sts;
				uni.navigateTo({
					url: '/pages/orderList/orderList?sts=' + sts
				});
			},

			/**
			 * 查询所有的收藏量
			 */
			showCollectionCount: function() {
				var ths = this;
				uni.showLoading();
				var params = {
					url: "/p/user/collection/count",
					method: "GET",
					data: {},
					callBack: function(res) {
						uni.hideLoading();
						ths.setData({
							collectionCount: res
						});
					}
				};
				http.request(params);
			},

			/**
			 * 我的收藏跳转
			 */
			myCollectionHandle: function() {
				var url = '/pages/prod-classify/prod-classify?sts=5';
				var id = 0;
				var title = "我的收藏商品";

				if (id) {
					url += "&tagid=" + id + "&title=" + title;
				}

				uni.navigateTo({
					url: url
				});
			},

			/**
			 * 去登陆
			 */
			toLogin: function() {
				uni.navigateTo({
					url: "../accountLogin/accountLogin"
				})
			},
/**
			 * 去PC登陆
			 */
			toPcLogin: function() {
				uni.navigateTo({
					url: "../accountLogin/pcLogin"
				})
			},
			/**
			 * 退出登录
			 */
			logout: function() {
				let ths = this ;
				// 请求退出登陆接口
				http.request({
					url: '/logOut',
					method: 'post',
					callBack: res => {
						util.removeTabBadge()

						uni.removeStorageSync('loginResult');
						uni.removeStorageSync('token');

						// this.$Router.pushTab('/pages/index/index')
						uni.showToast({
							title: "退出成功",
							icon: "none"
						})

						this.setData({
							orderAmount: ''
						});
						// setTimeout(() => {
						// 	uni.switchTab({
						// 		url: "/pages/index/index"
						// 	})
						// }, 1000)
						setTimeout(() => {
							// #ifdef H5
							if (navigator.userAgent.indexOf('Windows') > -1) {  
							  ths.toPcLogin()
							}else{
							  ths.toLogin()
							}
							// #endif
							// #ifdef APP-PLUS
							 ths.toLogin()
							// #endif
							
							
						}, 1000)
					}
				})
			},
			setType(e){
				if(e=="cq"){
					this.setData({
					  defaultAddr: !this.defaultAddr
					})
					uni.setStorageSync("defaultAddr",this.defaultAddr);		
					uni.showToast({
						// zheli
						title: "設置成功",
						icon: "none"
					});
				}else if(e=="tc"){
					this.setData({
					  defaultMeatSet: !this.defaultMeatSet
					})
					uni.setStorageSync("defaultMeatSet",this.defaultMeatSet)
					uni.showToast({
						// zheli
						title: "設置成功",
						icon: "none"
					});
				}else if(e=="jf"){
					this.setData({
					  isAddRice: !this.isAddRice
					})
					uni.setStorageSync("isAddRice",this.isAddRice)
					uni.showToast({
						// zheli
						title: "設置成功",
						icon: "none"
					});
				}
				uni.setStorageSync("indexLoad",true);
				uni.setStorageSync("categoryLoad",true);
				uni.setStorageSync("countLoad",true);
				
			},
			getInputVal: function(e) {
				const type = e.currentTarget.dataset.type;
				if (type == 'newpw') {
					this.setData({
						newpw: e.detail.value
					});
				} else if (type == 'oldpw') {
					this.setData({
						oldpw: e.detail.value
					});
				}else if (type == 'secpw') {
					this.setData({
						secpw: e.detail.value
					});
				}
			},
			/**
			 * 修改密碼
			 */
			updatePwd() {
				if (this.newpw.length == 0||this.secpw.length == 0) {//舊密碼爲空 新密码 或確認新密碼爲空爲空
					this.setData({
						errorTips: 1
					})
					return
				}else if(this.newpw != this.secpw){//新密碼和二次密碼不一致
					this.setData({
						errorTips: 3
					})
					return
				}else {
					this.setData({
						errorTips: 0
					})
					uni.showLoading();
					var params = {
						url: "/user/updatePwd",
						method: "put",
						data: {
							nickName:this.loginResult.nickName,
							passWord:encrypt(this.newpw)
						},
						callBack: res => {
							
							uni.hideLoading();
							uni.showToast({
								title: "修改成功，請重新登錄",
								icon: "none",
								duration: 1500
							})
							this.closeDrawer('editPassword');
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/accountLogin/accountLogin"
								})
							}, 1800)
										
						}
					};
					http.request(params);
				}
			},
		}
	};
</script>
<style>
	@import "./user.css";
</style>
