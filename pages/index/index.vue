<template>
	<view class="content">
		<navbar titleText="首页"></navbar>
		<button style="margin-top: 130rpx;" @click="toSearch">ToSearch</button>
	</view>
</template>

<script setup>
	const toSearch = ()=>{
		uni.navigateTo({
			url:'/pages/search/index'
		})
	}
</script>

<style>
</style>
