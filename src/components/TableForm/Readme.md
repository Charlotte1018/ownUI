```vue
<template>
    <div class="wrapper">
        <charlotte-table-form :check='true' :no='true' :data='tableData' :columns="testColumns"></charlotte-table-form>
    </div>
</template>
<script>
export default {
  data() {
    return { 
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      testColumns: [
        {
          prop: "date",
          label: "订单号"
          // width: "150"
        },
        {
          prop: "name",
          label: "银行单号",
          // width: "150",
          required: false
        },
        {
          prop: "isBack",
          label: "是否创建",
          // width: "400",
          required: true,
          radios: [
            {
              options: [
                {
                  value: "是",
                  label: "0"
                },
                {
                  value: "否",
                  label: "1"
                }
              ]
            }
          ]
        },
        {
          prop: "file",
          label: "是否删除",
          required: true,
          selects: [
            {
              size: "mini",
              options: [
                {
                  value: "0",
                  label: "是"
                },
                {
                  value: "1",
                  label: "否"
                }
              ]
            }
          ]
        },
        {
          prop: "input",
          label: "类型",
          inputs: [
            {
              size: "mini",
              placeholder: "请输入",
              suffixIcon: "el-icon-search"
            }
          ]
        },
        {
          prop: "address",
          label: "资料",
          // minWidth: 200,
          links: [
            {
              type: 1, // 0-指定label,1-prop字段内容
              transfer: 0,
              label: "邮件详情",
              class: "a-blue",
              click: this.downLoad
            }
          ]
        },
        {
          prop: "",
          label: "操作",
          align: "center",
          width: 180,
          fixed: "right",
          showOverflowTooltip: true,
          cmds: [
            {
              type: "primary",
              label: "修改",
              cmd: this.modify,
              showMethod: () => true
            },
            {
              type: "primary",
              label: "删除",
              class: 'danger',
              cmd: this.delete,
              showMethod: () => true
            }
          ]
        }
      ]
     }
  },
  methods: {
    downLoad() {
      this.$message.info('下载成功')
    },
    modify() {
      this.$message.success('修改成功')
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
