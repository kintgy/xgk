<template>
  <el-table
    :data="tableData"
    :show-summary="showSummary"
    :summary-method="summaryTotal"
    :cell-class-name="formatStatus"
    :span-method="mergeCell"
    class="data-table"
    border
  >
    <el-table-column
      v-if="tableType"
      :type="tableType"
      width="55"
    ></el-table-column>
    <template v-for="(field, index) in tableFields" :key="field.id">
      <el-table-column
        v-if="field.id"
        header-align="center"
        :prop="field.id"
        :sortable="field.sortable"
        :align="field.align ? field.align : 'center'"
        show-overflow-tooltip
        :min-width="field.width ? field.width : 150"
        :fixed="field.fixed ? field.fixed : index === 0 ? 'left' : null"
      >
        <template #header>
          {{ field.label }}
          <el-tooltip
            v-if="field.tips"
            class="item"
            effect="dark"
            :content="field.tips"
            placement="top"
          >
            <el-icon>
              <info-filled></info-filled>
            </el-icon>
          </el-tooltip>
        </template>
        <template #default="scope">
          <template v-if="field.id === 'file'">
            <a
              v-if="Array.isArray(scope?.row?.[field.id]) && scope.row[field.id].length"
              :href="scope.row[field.id]?.[0].url"
              :download="scope.row[field.id]?.[0].name"
            >
              在线查看
<!--              {{ scope.row[field.id]?.[0].name }}-->
            </a>
<!--            <span-->
<!--                v-if="scope.row[field.id].length"-->
<!--                @click="downloadFile(scope.row[field.id])"-->
<!--            >-->
<!--              下载-->
<!--&lt;!&ndash;              {{ scope.row[field.id]?.[0].name }}&ndash;&gt;-->
<!--            </span>-->
          </template>
          <template
            v-else-if="
              typeof (field.content
                ? field.content(scope.row[field.id])
                : scope.row[field.id]) === 'object'
            "
          >
            <el-space>
              <el-tag
                v-for="fieldData in field.content
                  ? field.content(scope.row[field.id])
                  : scope.row[field.id]"
                :key="fieldData"
                size="small"
              >
                {{ fieldData }}
              </el-tag>
            </el-space>
          </template>
          <template v-else-if="field.format">
            {{ field.format(scope.row[field.id]) }}
          </template>
          <template v-else>{{ scope.row[field.id] }}</template>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        header-align="center"
        :label="field.label"
        :align="field.align ? field.align : 'center'"
        show-overflow-tooltip
        :min-width="field.width ? field.width : 150"
        :fixed="field.fixed ? field.fixed : index === 0 ? 'left' : null"
      >
        <el-table-column
          v-for="item in field.items"
          :key="item.id"
          header-align="center"
          :prop="item.id"
          :label="item.label"
          :align="item.align ? item.align : 'center'"
          show-overflow-tooltip
          :min-width="item.width ? item.width : 150"
          :fixed="item.fixed ? item.fixed : index === 0 ? 'left' : null"
        >
        </el-table-column>
      </el-table-column>
    </template>
    <slot name="operations"></slot>
  </el-table>
</template>

<script setup>
import { defineProps } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";

defineProps({
  tableData: { type: Array },
  tableFields: { default: [] },
  formatStatus: { type: Function },
  summaryTotal: { type: Function },
  showSummary: { default: false },
  mergeCell: { type: Function },
  tableType: { default: "" },
});

// const downloadFile = async(file) => {
//   fetch(file[0].url)
//       .then((res) => res.blob())
//       .then((blob) => {
//         // 将链接地址字符内容转变成blob地址
//         const a = document.createElement("a");
//         a.href = URL.createObjectURL(blob);
//         console.log(a.href);
//         a.download = file[0].name; // 下载文件的名字
//         document.body.appendChild(a);
//         a.click();
//       });
// };

</script>
