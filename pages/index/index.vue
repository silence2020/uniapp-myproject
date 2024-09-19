<template>
	<view>
		<!-- 顶部导组件 -->
		<navbar></navbar>
		<!-- 公告栏 -->
		<view style="margin-top: 130rpx;">
			<view class="weui-cell" style="background: #fff9eb;">
				<view class="weui-cell__hd">
					<image src="../../static/images/ic_myapp.png"
						style="display:block;width:40rpx;height:40rpx;margin-right:14rpx;"></image>
				</view>
				<view class="weui-cell__bd">
					<text style="color: #be9719;font-size: 13px;">点击右上角“添加到我的小程序”，方便下次找到！</text>
				</view>
				<view class="weui-cell__ft">
					<image src="../../static/images/modal_closer.png" style="display: block;width: 15px;height: 15px;">
					</image>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view v-if="slides && slides.length > 0" class="index-swiper">
			<swiper autoplay circular interval="4000" duration="500">
				<block v-for="(item,index) in slides" :key="index">
					<swiper-item>
						<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue';
	//uniapp的api获取app对象
	const app = getApp()
	//轮播图数据
	const slides = ref([])
	onLoad(() => {
		app.globalData.utils.getUserInfo()
		app.globalData.utils.request({
			url: '/app/init',
			success: res => {
				console.log(res)
				const {id} = res.data.area
				// 通过id获取当前地区的页面数据
				app.globalData.utils.request({
					url: '/Index/index',
					data: {
						aid: id
					},
					success: ({data}) => {
						console.log(data)
						slides.value = data.slides
					}
				})
			}
		})
	})
</script>

<style>
	page {
		background-color: #fff;
	}
	
	.index-swiper {
		padding: 20rpx 20rpx 0 20rpx;
		overflow: hidden;
		
	}
	.index-swiper swiper {
		height: 320rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}
	.index-swiper swiper-item image {
		width: 100%;
		height: 100%;
	}
</style>