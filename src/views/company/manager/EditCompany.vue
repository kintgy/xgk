<template>
  <el-dialog v-model="dialogShow" :width="getWidth">
    <el-form ref="formRef" label-position="top"
             :model="form"
             :rules="rules">
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name" clearable/>
      </el-form-item>
      <el-form-item label="项目简介" prop="introduction">
        <el-input type="textarea" :rows="3" v-model="form.introduction" clearable/>
      </el-form-item>
      <el-form-item label="主营业务" prop="mainBusiness">
        <el-input v-model="form.mainBusiness" clearable/>
      </el-form-item>
      <el-form-item label="参与人员" prop="participants">
        <el-input type="textarea" :rows="3" v-model="form.participants" clearable/>
      </el-form-item>
      <el-form-item label="后续动作" prop="actions">
        <el-input type="textarea" :rows="3" v-model="form.actions" clearable/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :rows="3" v-model="form.remark" clearable/>
      </el-form-item>
      <el-form-item label="公司所在地" prop="location">
        <el-input type="textarea" :rows="3" v-model="form.location" clearable/>
      </el-form-item>
      <el-form-item label="访谈情况" prop="interview">
        <el-input type="textarea" :rows="3" v-model="form.interview" clearable/>
      </el-form-item>
      <el-form-item label="回溯时点" prop="timePoint">
        <el-input type="textarea" :rows="3" v-model="form.timePoint" clearable/>
      </el-form-item>
      <el-form-item label="项目归类" prop="projectType">
        <el-input type="textarea" :rows="3" v-model="form.projectType" clearable/>
      </el-form-item>
      <el-form-item label="项目来源" prop="source">
        <el-input type="textarea" :rows="3" v-model="form.source" clearable/>
      </el-form-item>
      <el-form-item label="融资情况" prop="financing">
        <el-input type="textarea" :rows="3" v-model="form.financing" clearable/>
      </el-form-item>
      <el-form-item label="财务情况" prop="financials">
        <el-input type="textarea" :rows="3" v-model="form.financials" clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogShow=false">取消</el-button>
      <el-button @click="saveCompany" type="primary">保存</el-button>
    </template>
  </el-dialog>


</template>

<script setup>
import {onMounted, ref, defineProps} from "vue";
import company from "@/request/api/company";
import {ElMessage} from "element-plus";

const props = defineProps({company: {required: true}})
const dialogShow = ref(true)

const getWidth = ref(document.body.clientWidth > 780 ? '80%' : '100%')
const rules = {
  name: [{required: true, trigger: 'blur', message: `请输入企业名称`}],
  introduction: [{required: true, trigger: 'blur', message: `请输入项目简介`}]
}

const formRef = ref()
const form = ref({
  name: props.company.name ? props.company.name : '',
  introduction: props.company.introduction ? props.company.introduction : '',
  mainBusiness: props.company.mainBusiness ? props.company.mainBusiness : '',
  participants: props.company.participants ? props.company.participants : '',
  actions: props.company.actions ? props.company.actions : '',
  remark: props.company.remark ? props.company.remark : '',
  location: props.company.location ? props.company.location : '',
  interview: props.company.interview ? props.company.interview : '',
  timePoint: props.company.timePoint ? props.company.timePoint : '',
  projectType: props.company.projectType ? props.company.projectType : '',
  source: props.company.source ? props.company.source : '',
  financing: props.company.financing ? props.company.financing : '',
  financials: props.company.financials ? props.company.financials : '',
})
const data = ref({})
onMounted(async () => {
  if (props.id) {
    data.value = await company.manager.detail(props.id)
  }
})

const saveCompany = async () => {
  const result = await formRef.value.validate()
  if (!result) return

  const res = await company.manager.save(form.value)
  if (res) return ElMessage.success({
    message: '保存成功', duration: 1000, onClose() {
      dialogShow.value = false
      location.reload()
    }
  })
  ElMessage.error({message: '保存失败'})
}

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