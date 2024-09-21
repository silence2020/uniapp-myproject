<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="../../static/images/od_bg_icon.png" mode="widthFix"></image>
			<view class="od-jd od-jd-0">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填项订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<image class="serv-icon" :src="service.icon_image?service.icon_image_url:'../../static/images/avatar.jpg'"></image>
					</view>
					<view class="weui-cell__bd">
						<text class="serv-name">{{service.name}}</text>
					</view>
					<view class="weui-cell__ft">
						<view class="f5 ic_info" @click="handleTap">服务内容</view>
					</view>
				</view>
			</view>
		</view>
		
		<block v-if="service.stype == 10 || service.stype == 15 || service.stype == 20">
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals" range-key="name">
									<input type="text" :disabled="true" placeholder="请选择要就诊的医院" placeholder-class="vp-placeholder"
									:value="hospitals[hospital_index].name" />
								</picker>
							</view>
						</view>
					</view>
					
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" 
								:timestamp="order.starttime"
								placeholder="请选择就诊时间" />
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</block>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref, reactive, toRaw } from 'vue';
	const app = getApp()
	onLoad((options) => {
		// 获取路由参数
		console.log(options)
		main_load(options)
	})
	
	const service = ref({})
	const hospitals = ref([])
	const hospital_index= ref(0)
	//订单数据
	const order = reactive({
		price: '',
		starttime: '',
		address: {
			userName: '',
			cityName: '',
			countyName: '',
			detailInfo: ''
		}
	})
	const main_load = (options)=>{
		app.globalData.utils.request({
			url: '/Service/order',
			data: {
				svid: options.svid
			},
			success: res=>{
				console.log(res)
				service.value = res.data.service
				hospitals.value = res.data.hospitals
				//默认选中
				const hospitalsData = toRaw(hospitals.value)
				if(options.hid > 0){
					//自动选中
					for(let i=0; i<hospitalsData.length; i++){
						if(hospitalsData[i].id == options.hid){
							hospital_index.value = i
							order.price = hospitalsData[i].service_price
							break;
						}
					}
				}
			}
		})
	}
	
	const handleTap = ()=>{
		
	}
	
	const onHospitalChange = (e)=>{
		const value = parseInt(e.detail.value)
		hospital_index.value = value
		order.price = toRaw(hospitals.value)[value].service_price
	}
	
	const onStartTimeChanged = (e)=>{
		order.starttime = e.detail.value
	}
</script>

<style>
@import './index.css';
</style>