<template>
  <div>
    <div>
      <el-table
        v-loading.lock="loading"
        ref="table"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :height="height"
        :max-height="maxHeight"
        :fit="fit"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :row-ket="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :size="size"
        @select="(selection, row) => emitEventHandler('select', selection, row)"
        @select-all="selection => emitEventHandler('select-all', selection)"
        @selection-change="selection => emitEventHandler('selection-change', selection)"
        @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
        @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
        @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
        @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
        @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
        @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
        @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
        @header-click="(column, event) => emitEventHandler('header-click', column, event)"
        @filter-change="filters => emitEventHandler('filter-change', filters)"
        @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
        @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
        @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)"
      >
        <slot name="prepend" />
        <el-table-column v-if="check" :align="headerAlign" type="selection" width="55"></el-table-column>
        <el-table-column v-if="no" type="index" width="50" label="序号" :align="headerAlign"></el-table-column>
        <el-table-column
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          :column-key="column.columnKey"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :minWidth="column.minWidth"
          :fixed="column.fixed"
          :render-header="column.renderHeader"
          :sortable="column.sortable"
          :sort-method="column.sortMethod"
          :resizable="column.resizable"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.showOverflowTooltip?false:true"
          :align="column.align || headerAlign"
          :header-align="headerAlign || column.headerAlign || column.align"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :selectable="column.selectable"
          :reserve-selection="column.reserveSelection"
          :filters="column.filters"
          :filter-placement="column.filterPlacement"
          :filter-multiple="column.filterMultiple"
          :filter-method="column.filterMethod"
          :filtered-value="column.filteredValue"
        >
          <template slot="header">
            <i v-if="column.required" class="required">*</i>
            <span>{{column.label}}</span>
          </template>
          <template slot-scope="scope" :scope="newSlotScope ? 'scope' : false ">
            <span v-if="column.filter">{{ Vue.filter(column['filter'])(scope.row[column.prop]) }}</span>
            <span v-else-if="column.cmds">
              <el-button
                class="button"
                v-for="(cmd, cmdIndex) in column.cmds"
                :key="cmdIndex"
                size="mini"
                :type="cmd.type"
                :class="cmd.class"
                @click="cmd.cmd(scope.row)"
                v-show="true"
              >{{cmd.transfer==1?cmd.transferLabel[scope.row[cmd.transferKey]]:cmd.label}}</el-button>
            </span>
            <span v-else-if="column.selects">
              <el-select
                v-model="scope.row[column.prop]"
                v-for="(select, selectIndex) in column.selects"
                :key="selectIndex"
                :size="select.size"
                placeholder="请选择"
                :style="(select.width ? `width: ${select.width}px;` : 'width: 100%')"
                clearable
              >
                <el-option
                  v-for="(option, index) in select.options"
                  :key="index"
                  :value="option.value"
                  :label="option.label"
                ></el-option>
              </el-select>
            </span>
            <span
              v-else-if="column.radios"
              v-for="(radio, radioIndex) in column.radios"
              :key="radioIndex"
            >
              <el-radio-group
                v-for="(option, index) in radio.options"
                :key="index"
                v-model="scope.row[column.prop]"
              >
                <el-radio :label="option.label">{{option.value}}</el-radio>
              </el-radio-group>
            </span>
            <span v-else-if="column.inputs">
              <el-input
                :size="input.size"
                v-for="(input, inputIndex) in column.inputs"
                :key="inputIndex"
                v-model="scope.row[column.prop]"
                :placeholder="input.placeholder"
                :suffix-icon="input.suffixIcon"
                :prefix-icon="input.prefixIcon"
                clearable
              ></el-input>
            </span>
            <span v-else-if="column.links">
              <!--超链接-->
              <a
                :class="link.class"
                :title="link.title"
                v-for="(link, linkIndex) in column.links"
                :key="linkIndex"
                size="small"
                @click="link.click(scope.row)"
              >
                <span v-if="link.ishtml">
                  <span v-html="link.html"></span>
                </span>
                <span
                  v-else
                >{{link.type==0?(link.transfer==1?link.transferLabel:link.label):scope.row[column.prop]}}</span>
              </a>
            </span>
            <span
              v-else-if="column.formatter"
            >{{column.formatter ? column.formatter(scope.row) : column.prop}}</span>
            <span
              v-else
            >{{ column.render ? column.render(scope.row) : initColValue(scope.row,column.prop) }}</span>
          </template>
        </el-table-column>
        <slot name="opetation"></slot>
      </el-table>
      <div v-if="showPagination" class="bottom-pagination" style="margin: 20px 0 0px 0;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageIndex"
          :page-sizes="pageSizes"
          :page-size="pagination.pageSize"
          :layout="paginationLayout"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 表格和表单的结合
 * @example ../../../docs/Button.md
 * @displayName charlotte-table-form
 */
export default {
  data() {
    const _this = this;
    return {
      pagination: {
        pageIndex: 1,
        pageSize: (() => {
          const { pageSizes } = _this;
          if (pageSizes.length > 0) {
            return pageSizes[1];
          }
          return 20;
        })()
      },
      total: 0,
      loading: false,
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
      cacheLocalData: []
    };
  },
  methods: {
    emitEventHandler(event) {
      // this.$emit(event, ...Array.from(arguments).slice(1));
    },
    initColValue(row, prop) {
      let result = row;
      return result[prop];
    },
    loadLocalData(data) {
      if (!data) {
        // this.emptyText = "返回数据格式错误";
        this.showPagination = false;
        return false;
      }
      const cacheData = JSON.parse(JSON.stringify(data));
      this.tableData = data;
      this.cacheLocalData = cacheData;
      this.total = cacheData.length;
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      // this.dataChangeHandler();
    },
    handleCurrentChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      // this.dataChangeHandler();
    }
  },
  props: {
    /**
		 * 表格数据
		 */
    data: [Array],
    /**
		 * 表格列配置
		 */
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
		 * 行是否可选择
		 */
    check: {
      type: Boolean,
      default: false
    },
    /**
		 * 序号是否展示
		 */
    no: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "remote"
    },
    remote: {
      type: Object,
      default: () => {
        return {};
      }
    },
    height: [String],
    maxHeight: [String],
    stripe: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    size: {
      type: String
      // default: "small"
    },
    headerAlign: {
      type: String,
      default: "center"
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    currentRowKey: [String],
    rowClassName: [String, Function],
    rowStyle: [String, Function],
    rowKey: [String, Function],
    emptyText: String,
    defaultExpandAll: Boolean,
    expandRowKeys: Array,
    defaultSort: String,
    defaultSortField: String,
    tooltipEffect: String,
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    beforeSearch: Function,
    showPagination: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [5, 10, 20, 30, 40, 50, 100];
      }
    },
    paginationLayout: {
      type: String,
      // default: "total, sizes, prev, pager, next, jumper"
      default: "prev, pager, next, sizes,total"
    },
    pageIndexKey: {
      type: String,
      default: "pageIndex"
    },
    pageSizeKey: {
      type: String,
      default: "pageSize"
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-pagination {
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
}
.button {
  font-size: 12px;
  width: 60px;
  background-color: #0074ff;
  border-radius: 2px;
}
.button:hover {
  width: 60px;
  background-color: #459aff;
  border-radius: 2px;
}
.a-blue {
  color: #0074ff;
  cursor: pointer;
}
.a-blue:hover {
  text-decoration: underline;
}
.danger {
  background: #ff0000;
  border-color: #ff0000;
  box-shadow: 2px 4px 8px #ffb8b8;
}
.danger:hover {
  background: #ff0000;
  border-color: #ff0000;
  box-shadow: 2px 4px 8px #ffb8b8;
}
.required {
  color: #ff0000;
}
</style>