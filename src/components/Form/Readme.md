```vue
<template>
    <div class="wrapper">
        <charlotte-form :formsOptions="formsOptions" :formModel="formModel" :buttons="buttons"></charlotte-form>
        <charlotte-form :inline="true" :noBtn="false" :formsOptions="formsOptions" :formModel="formModel" :buttons="buttons"></charlotte-form>
    </div>
</template>
<script>
export default {
  data() {
    return { 
      formModel: {
        input: ""
      },
      buttons: [
        {
          type: "primary",
          plain: false,
          click: this.create,
          btnText: "新建"
        },
        {
          type: "danger",
          plain: false,
          click: this.delete,
          btnText: "删除"
        }
      ],
      formsOptions: [
        {
          itemType: "select",
          model: "select",
          label: "业务",
          placeholder: "请选择",
          disabled: false,
          options: [],
          rules: [{ required: true, message: "请选择", trigger:"change" }]
        },
        {
          itemType: "input",
          model: "inputs",
          prop: "input",
          label: "商户号",
          placeholder: "请输入",
          readonly: false,
          rules: []
        },
        {
          itemType: "select",
          model: "select",
          label: "状态",
          placeholder: "请选择",
          disabled: false,
          options: [
            {
              value: 0,
              label: "待回复"
            },
            {
              value: 1,
              label: "已回复"
            },
            {
              value: 2,
              label: "驳回"
            }
          ],
          rules: [{ required: true, message: "请选择", trigger: "change" }]
        },
        {
          itemType: "input",
          model: "input",
          prop: "input",
          label: "编号",
          placeholder: "请输入",
          readonly: false,
          rules: [{ required: true, message: "请输入", trigger: "blur" }]
        }
      ]
    }
  },
  methods: {
    create() {
      this.$message.info('新建成功')
    },
    delete() {
      this.$message.error('删除成功')
    }
  }
}
</script>
<style scoped>

</style>
```
