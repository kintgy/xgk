<template>
  <search-form-content :form-items="items" :fields="fields" :fetch-data="fetchUsers">
    <template #buttons>
      <el-button @click="selected = {}">添加用户</el-button>
    </template>
    <template #operations>
      <el-table-column
          label="操作"
          min-width="150"
          fixed="right"
          header-align="center"
          align="center"
      >
        <template #default="scope">
          <el-link type="primary"
                   :underline="false"
                   @click="selected = scope.row">编辑
          </el-link>
        </template>
      </el-table-column>
    </template>
  </search-form-content>
  <edit-user
      v-if="selected !== undefined"
      :user="selected"
      :role-list="roles"
      @close="selected=undefined"/>
</template>

<script setup>
import SearchFormContent from "@/components/SearchFormContent";
import api from "@/request/api/admin/user";
import EditUser from "@/views/admin/user/manager/EditUser";
import {onMounted, ref} from "vue";

const fields = [
  {id: "userName", label: "用户名"},
  {id: "name", label: "姓名"},
]
const items = {
  name: {label: '用户名/姓名'}
}

const selected = ref(undefined)

const fetchUsers = async params => {
  return await api.manager.index(params)
}

const roles = ref([])
onMounted(async () => {
  let res = await api.role.index({page: 1, limit: 10000})
  roles.value = res && res.data ? res.data : []
})
</script>

<style scoped>

</style>