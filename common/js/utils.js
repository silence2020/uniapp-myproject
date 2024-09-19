class Utils {
	constructor() {
		this.baseUrl = 'https://code.itndedu.com/pz'
	}
	// 获取用户信息
	getUserInfo() {
		// 调用登录api
		uni.login({
			success: (response) => {
				console.log(response)
				this.request({
					url: '/auth/wxLogin',
					data: {
						code: response.code
					},
					success: data => {
						//console.log(data)
					}
				})
			}
		})
	}

	//封装uniapp的request
	request(option = {showLoading: false}) {
		if (!option.url) {
			return false
		}
		if (option.showLoading) {
			this.showLoading()
		}
		uni.request({
			url: this.baseUrl + option.url,
			data: option.data ? option.data : {},
			header: option.header ? option.header : {},
			method: option.method ? option.method : 'GET',
			success: (response) => {
				uni.hideLoading()
				//后端数据
				if (response.data.code == 10000) {
					if (option.success && typeof option.success == 'function') {
						option.success(response.data)
					}
				} else {
					if (option.fail && typeof option.fail == 'function') {
						option.fail(response.data)
					}
				}
			},
			// http网络异常
			fail: (response) => {
				uni.hideLoading()
				console.error(response)
			}
		})
	}

	showLoading() {
		// 应用级别的全局变量，防止多个loading重叠
		const isLoading = uni.getStorageSync('isLoading')
		if (isLoading) {
			uni.hideLoading()
			uni.setStorageSync('isLoading', false)
		}
		uni.showLoading({
			title: '加载中...',
			complete: () => {
				uni.setStorageSync('isLoading', true)
			},
			fail: () => {
				uni.setStorageSync('isLoading', false)
			}
		})
	}
}

export default new Utils()