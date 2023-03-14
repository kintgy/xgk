<template>
  <detail v-if="$route.params.id" :id="$route.params.id"></detail>
  <search-form-content v-else :form-items="items" :fields="fields" :fetch-data="fetchData">
    <template #buttons>
      <template v-if="$store.getters.userInfo.routes.indexOf('/company/manager/add') >= 0">
        <upload-file
            :btn-text="'BP上传'"
            action="/company/import"
            :example="'BP示例文件.xlsx'"
            @close="refreshPage"/>
        <el-button type="primary"
                   style="margin-left: 10px"
                   :underline="false"
                   @click="selected = {}">新增
        </el-button>
      </template>

    </template>
    <template #operations>
      <el-table-column
          v-if="showOperate"
          label="操作"
          min-width="80"
          fixed="right"
          header-align="center"
          align="center"
      >
        <template #default="scope">
          <el-link
              v-if="$store.getters.userInfo.routes.indexOf('/company/manager/get/:id') >= 0"
              :underline="false"
              :href="`/company/manager/get/${scope.row.id}`">查看
          </el-link>
          <el-link type="primary"
                   v-if="$store.getters.userInfo.routes.indexOf('/company/manager/edit') >= 0"
                   :underline="false"
                   @click="selected = scope.row">编辑
          </el-link>
          <el-link type="danger"
                   v-if="$store.getters.userInfo.routes.indexOf('/company/manager/delete') >= 0"
                   :underline="false"
                   @click="deleteItem(scope.row)">删除
          </el-link>
        </template>
      </el-table-column>
    </template>
  </search-form-content>
  <edit-company
      v-if="selected !== undefined"
      :company="selected"
      @close="selected=undefined"/>
</template>

<script setup>
import SearchFormContent from "@/components/SearchFormContent";
import company from "@/request/api/company";
import {computed, ref} from "vue";
import UploadFile from "@/components/UploadFile";
import Detail from "@/views/company/manager/Detail";
import {ElMessage, ElMessageBox} from "element-plus";
import EditCompany from "@/views/company/manager/EditCompany";

const fields = [
  {id: 'name', label: '企业名称'},
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
const items = {
  name: {label: '企业名称'}
}

const selected = ref(undefined)

const showOperate = computed(() => {
  return true
})

const fetchData = async params => {
  return await company.manager.index(params)
}

const deleteItem = row => {
  ElMessageBox.confirm('确定删除项目：' + row.name + '?',
      '删除项目',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
    company.manager.delete(row.id).then(res => {
      if (res) {
        ElMessage.success('删除成功')
        location.reload()
      } else {
        ElMessage.error('删除失败')
      }
    })
  }).catch(() => {
  })
}

const refreshPage = () => {
  location.reload()
}
</script>

<style scoped>

</style>