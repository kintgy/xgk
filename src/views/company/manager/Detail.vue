<template>
  <el-link href="/company/manager"
           type="primary"
           :underline="false">
    <el-icon>
      <ArrowLeft/>
    </el-icon>
    返回列表
  </el-link>

  <el-row class="detail-form">
    <template v-for="field in fields" :key="field.id">
      <el-col :sm="8" :md="4" class="detail-item detail-label">
        <div v-html="field.label"/>
      </el-col>
      <el-col :sm="16" :md="20" class="detail-item detail-content">
        <div v-html="data[field.id] ? data[field.id] : ''"></div>
      </el-col>
    </template>
  </el-row>


</template>

<script setup>
import {ArrowLeft} from '@element-plus/icons-vue'
import {onMounted, ref, defineProps} from "vue";
import company from "@/request/api/company";

const props = defineProps({id: {required: true}})

const fields = [
  {id: 'name', label: '企业名称', fixed: 'left'},
  {id: 'introduction', label: '项目简介'},
  {id: 'mainBusiness', label: '主营业务'},
  {id: 'participants', label: '参与人员'},
  {id: 'actions', label: '后续动作'},
  {id: 'remark', label: '备注'},
  {id: 'location', label: '公司所在地'},
  {id: 'interview', label: '访谈情况'},
  {id: 'timePoint', label: '回溯时点'},
  {id: 'projectType', label: '项目归类'},
  {id: 'source', label: '项目来源'},
  {id: 'financing', label: '融资情况'},
  {id: 'financials', label: '财务情况'},
  {id: 'createdTime', label: '创建时间'},
  {id: 'createdBy', label: '创建人'},
  {id: 'updatedTime', label: '修改时间'},
  {id: 'updatedBy', label: '修改人'},
]

const data = ref({})
onMounted(async () => {
  if (props.id) {
    data.value = await company.manager.detail(props.id)
  }
})

</script>

<style scoped>
.detail-form {
  padding: 20px 0;
}

.detail-form .detail-item {
  border: 1px solid var(--el-border-color-light);
  padding: 10px;
}

.detail-form .detail-label {
  display: flex;
  justify-content: center;
}

</style>