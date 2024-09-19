<template>
	<view>
		<navbar></navbar>
		<view style="margin-top: 130rpx;">
			<view class="weui-cell" style="background: #fff9eb;">
				<view class="weui-cell__hd">
					<image src="../../static/images/ic_myapp.png" style="display:block;width:40rpx;height:40rpx;margin-right:14rpx;"></image>
				</view>
				<view class="weui-cell__bd">
					<text style="color: #be9719;font-size: 13px;">点击右上角“添加到我的小程序”，方便下次找到！</text>
				</view>
				<view class="weui-cell__ft">
					<image src="../../static/images/modal_closer.png" style="display: block;width: 15px;height: 15px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app' 
	//uniapp的api获取app对象
	const app = getApp()
	onLoad(()=>{
		app.globalData.utils.getUserInfo()
	})
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
