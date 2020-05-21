<template>
  <div>
    <el-button :type='type' @click.prevent="onClick">
      搜索
    </el-button>
  </div>
</template>

<script>
import '../../index'
import VueTypes from 'vue-types'
import PropTypes from '@znck/prop-types'
import loggerMixin from '../../mixins/loggerMixin'
/**
 * 常用的操作按钮
 * @example ../../../docs/Button.md
 * @displayName button
 */
export default {
	name: 'Button',
	mixins: [loggerMixin],
	props: {
		/**
		 * Gets called when the user clicks on the button
		 * 
		 */
		onClick: {
			type: Function,
			default: event => {
				console.log('You have clicked me!', event.target)
			}
		}
	},
	computed: {
	}
}
</script>

<style lang='less' scope>
</style>
