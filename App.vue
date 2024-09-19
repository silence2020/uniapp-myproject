<script>
	import utils from './common/js/utils'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		/* 全局引入，固定写法 */
		globalData: {
			utils: utils
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './app.css'
</style>
