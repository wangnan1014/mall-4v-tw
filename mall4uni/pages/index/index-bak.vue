<template>
<!--index.wxml-->
<view class="container">
  <view class="bg-sear">
    <view class="scrolltop">
      <view class="section" @tap="toSearchPage">
        <image src="/static/images/icon/search.png" class="search-img"></image>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>

  <view class="content">
    <!-- swiper -->
    <swiper :autoplay="autoplay" :indicator-color="indicatorColor" :interval="interval" :duration="duration" :indicator-active-color="indicatorActiveColor + ' '" circular="true" class="pic-swiper" indicator-dots previous-margin="20rpx" next-margin="20rpx">
      <block v-for="(item, index) in indexImgs" :key="index">
        <swiper-item class="banner-item">
          <view class="img-box">
            <image :src="item.imgUrl" :data-prodid="item.relation" @tap="toProdPage" class="banner"></image>
          </view>
        </swiper-item>
      </block>
    </swiper>
    <!-- end swiper -->

    <view class="cat-item">
      <view class="item" @tap="toClassifyPage" data-sts="1">
        <image src="/static/images/icon/newProd.png"></image>
        <text>新品推薦</text>
      </view>
<!--      <view class="item" @tap="toClassifyPage" data-sts="1">
        <image src="/static/images/icon/timePrice.png"></image>
        <text>限時特惠</text>
      </view> -->
      <!-- <view class="item" @tap="toClassifyPage" data-sts="3">
        <image src="/static/images/icon/neweveryday.png"></image>
        <text>每日瘋搶</text>
      </view>
      <view class="item" @tap="toCouponCenter">
        <image src="/static/images/icon/newprods.png"></image>
        <text>領優惠券</text>
      </view> -->
    </view>

    <!-- 消息播放 -->
    <view v-if="news && news.length" class="message-play" @tap="onNewsPage">
      <image src="/static/images/icon/horn.png" class="hornpng"></image>
      <swiper :vertical="true" :autoplay="true" :circular="true" duration="1000" class="swiper-cont">
        <block v-for="(item, index) in news" :key="index">
          <swiper-item class="items">{{item.title}}</swiper-item>
        </block>
      </swiper>
      <text class="arrow"></text>
    </view>

  </view>
	
	<view class="updata" v-if="updata">
		<uni-section title="注意事項" type="line">
			<uni-card title="注意事項" :is-shadow="false"  type="line">
				<view> <text class="uni-body">1、每日早上09:30後，禁止訂購和取消；</text></view>
			    <view> <text class="uni-body">2、09:30分鈡前未訂餐默認為不訂餐；</text></view>
				<view> <text class="uni-body">3、09:30分鈡前可取消訂餐。</text></view>
			</uni-card>
		</uni-section>
		
		
	</view>
  
</view>
</template>

<script module="wxs" lang="wxs" src="../../wxs/number.wxs"></script>

<script>
//index.js
//获取应用实例
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp();

export default {
  data() {
    return {
      indicatorDots: true,
      indicatorColor: '#d1e5fb',
      indicatorActiveColor: '#1b7dec',
      autoplay: true,
      interval: 2000,
      duration: 1000,
      indexImgs: [],
      seq: 0,
      news: [],
      taglist: [],
      sts: 0,
      scrollTop: "",
			current: 0,
			updata: true
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.getAllData();
  },
  onShow: function () {
		//#ifdef MP-WEIXIN
    uni.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          uni.navigateTo({
            url: '/pages/login/login'
          });
        }
      }
    });
		//#endif
	http.getCartCount(); //重新计算购物车总数量
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //     wx.request({
  //       url: '',
  //       data: {},
  //       method: 'GET',
  //       success: function (res) { },
  //       fail: function (res) { },
  //       complete: function (res) {
  //         wx.stopPullDownRefresh();
  //       }
  //     })
  // },
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    var ths = this;
    setTimeout(function () {
      ths.getAllData(); // wx.hideNavigationBarLoading() //完成停止加载

      uni.stopPullDownRefresh(); //停止下拉刷新
    }, 100);
  },
  methods: {
    //事件处理函数
    bindViewTap: function () {
      uni.navigateTo({
        url: '../logs/logs'
      });
    },
    // 页面滚动到指定位置指定元素固定在顶部
    onPageScroll: function (e) {
      //监听页面滚动
      this.setData({
        scrollTop: e.scrollTop
      });
    },
    toProdPage: function (e) {
      var prodid = e.currentTarget.dataset.prodid;

      if (prodid) {
        uni.navigateTo({
          url: '/pages/prod/prod?prodid=' + prodid
        });
      }
    },
    toCouponCenter: function () {
      uni.showToast({
        icon: "none",
        title: '该功能未开源'
      });
    },
    // 跳转搜索页
    toSearchPage: function () {
      uni.navigateTo({
        url: '/pages/search-page/search-page'
      });
    },
    // //跳转商品活动页面
    // toClassifyPage: function (e) {
    //   var url = '/pages/prod-classify/prod-classify?sts=' + e.currentTarget.dataset.sts;
    //   var id = e.currentTarget.dataset.id;
    //   var title = e.currentTarget.dataset.title;

    //   if (id) {
    //     url += "&tagid=" + id + "&title=" + title;
    //   }

    //   uni.navigateTo({
    //     url: url
    //   });
    // },
    //跳转公告列表页面
    onNewsPage: function () {
      uni.navigateTo({
        url: '/pages/recent-news/recent-news'
      });
    },

    getAllData() {
      http.getCartCount(); //重新计算购物车总数量

      this.getIndexImgs();
      this.getNoticeList();
      // this.getTag();
    },

    //加载轮播图
    getIndexImgs() {
      //加载轮播图
      var params = {
        url: "/indexImgs",
        method: "GET",
        data: {},
        callBack: res => {
          this.setData({
            indexImgs: res,
            seq: res
          });
        }
      };
      http.request(params);
    },

    getNoticeList() {
      // 加载公告
      var params = {
        url: "/shop/notice/topNoticeList",
        method: "GET",
        data: {},
        callBack: res => {
          this.setData({
            news: res
          });
        }
      };
      http.request(params);
    },

    // 加载商品标题分组列表
    // getTag() {
    //   var params = {
    //     url: "/prod/tag/prodTagList",
    //     method: "GET",
    //     data: {},
    //     callBack: res => {
    //       this.setData({
    //         taglist: res
    //       });
    //       for (var i = 0; i < res.length; i++) {
				// 		this.updata = false
				// 		this.updata = true
    //         this.getTagProd(res[i].id, i);
    //       }
    //       console.log('taglist:', this.taglist)
    //     }
    //   };
    //   http.request(params);
    // },

    // getTagProd(id, index) {
    //   var param = {
    //     url: "/prod/prodListByTagId",
    //     method: "GET",
    //     data: {
    //       tagId: id,
    //       size: 6
    //     },
    //     callBack: res => {
				// 	this.updata = false
				// 	this.updata = true
    //       var taglist = this.taglist;
    //       taglist[index].prods = res.records;
    //       this.setData({
    //         taglist: taglist
    //       });
    //     }
    //   };
    //   http.request(param);
    // },

    /**
     * 跳转至商品详情
     */
    // showProdInfo: function (e) {
    //   let relation = e.currentTarget.dataset.relation;

    //   if (relation) {
    //     uni.navigateTo({
    //       url: 'pages/prod/prod'
    //     });
    //   }
    // }
  }
};
</script>
<style>
@import "./index.css";
</style>