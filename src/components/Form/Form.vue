<template>
  <div>
    <!-- 表单组建 -->
    <el-form ref="ruleForm" :model="formModel" :inline="inline" label-width="140px">
      <div class="form-bx">
        <div class="inputs">
          <el-form-item
            v-for="(form, index) in formsOptions"
            :key="index"
            :prop="form.itemType != 'daterange' ? form.prop : form.prop"
            :label="form.label"
            :class="{w100: form.w100}"
            :rules="form.rules || []"
            :label-width="form.labelWidth ? (form.labelWidth + 'px') : ''"
          >
            <el-input
              v-if="form.itemType === 'input' || form.itemType === undefined"
              v-model="formModel[form.model]"
              :placeholder="form.placeholder"
              :readonly="form.readonly"
              :autofocus="form.autofocus"
              :suffix-icon="form.suffixIcon"
              :style="(form.width ? `width: ${form.width}px;` : '')"
              clearable
            ></el-input>
            <el-input
              v-if="form.itemType === 'textarea'"
              v-model="formModel[form.model]"
              type="textarea"
              :placeholder="form.placeholder"
              :readonly="form.readonly"
              :autofocus="form.autofocus"
              :suffix-icon="form.suffixIcon"
              :style="(form.width ? `width: ${form.width}px;` : '100%')"
              clearable
            ></el-input>
            <el-select
              v-else-if="form.itemType === 'select'"
              v-model="formModel[form.model]"
              :size="form.size"
              :disabled="form.disabled"
              :placeholder="form.placeholder"
              :style="(form.width ? `width: ${form.width}px;` : 'width: 100%')"
              clearable
            >
              <el-option
                v-for="(option, index) in form.options"
                :key="index"
                :value="option.value"
                :label="option.label"
              ></el-option>
            </el-select>
            <el-date-picker
              v-else-if="form.itemType === 'datePicker'"
              v-model="formModel[form.model]"
              :disabled="form.disabled"
              :placeholder="form.placeholder"
              :type="form.type"
              :value-format="form.valueFormat"
              :style="(form.itemWidth ? `width: ${form.itemWidth}px;` : 'width: 100%')"
              @change="changeDate"
            ></el-date-picker>
            <el-date-picker
              v-else-if="form.itemType === 'daterange'"
              v-model="formModel[form.model]"
              :size="form.size"
              :type="form.type"
              :value-format="form.valueFormat"
              :disabled="form.disabled"
              :readonly="form.readonly"
              :editable="form.editable"
              :placeholder="form.placeholder"
              :style="(form.itemWidth ? `width: ${form.itemWidth}px;` : 'width: 100%')"
              :picker-options="form.pickerOptions || {}"
              :start-placeholder="form.startName == undefined? '开始日期':form.startName"
              :end-placeholder="form.endName == undefined? '结束日期':form.endName"
              @change="changeDate"
            />
          </el-form-item>
        </div>
      </div>
      <div class="step-btns" v-if="noBtn">
        <el-button class="ly-button" icon="el-icon-search" type="primary" @click="submitForm('ruleForm')">搜索</el-button>
        <el-button class="ly-button danger" type="primary" @click="resetForm('ruleForm')">清空</el-button>
        <el-button
        class="ly-button"
          v-for="(button, index) in buttons"
          :key="index"
          :class="{danger: button.danger}"
          :type="button.type"
          :plain="button.plain ? true : false"
          :size="button.size?'mini':'mini'"
          @click="button.click"
          v-show="button.showMethod === undefined ? true : button.showMethod"
        >{{ button.btnText }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
/**
 * 常用的操作按钮
 * @example ../../../docs/Button.md
 * @displayName charlotte-form
 */
export default {
  data() {
    return {
    };
  },
  methods: {
    changeDate(date) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submit", this.formModel);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formsOptions: {
      type: Array
    },
    buttons: {
      type: Array
    },
    noBtn: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less" scoped>
.step-btns {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}
</style>
