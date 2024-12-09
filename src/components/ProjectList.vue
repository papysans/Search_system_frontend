<template>
    <div class="project-list">
        <table class="project-table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>题目</th>
                    <th>题目类型</th>
                    <th>题目来源</th>
                    <th>指导教师</th>
                    <th>学生姓名</th>
                    <th>年级专业班级</th>
                    <th>实践完成情况</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(project, index) in projects" :key="project.id" class="project-item">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ project.title }}</td>
                    <td>{{ project.projectType }}</td>
                    <td>{{ project.source }}</td>
                    <td>
                        {{ project.supervisor.name }}
                        <span class="academic-title">({{ project.supervisor.title }})</span>
                    </td>
                    <td>{{ project.studentName }}</td>
                    <td>
                        <div>{{ project.grade }}</div>
                        <div>{{ project.major }}</div>
                        <div>{{ project.className }}</div>
                    </td>
                    <td>{{ project.practiceCompletion ? '是' : '否' }}</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <button @click="changePage(-1)" :disabled="currentPage === 1">上一页</button>
            <span>第 {{ currentPage }} 页</span>
            <button @click="changePage(1)" :disabled="currentPage === totalPages">下一页</button>
            <select v-model="pageSize" @change="changePageSize">
                <option :value="15">15条/页</option>
                <option :value="30">30条/页</option>
                <option :value="50">50条/页</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { searchProjects } from '../services/api'

const projects = ref([])
const currentPage = ref(1)
const pageSize = ref(15)
const totalProjects = ref(0)
const totalPages = ref(0)
const loading = ref(false)

// 搜索条件
const searchQuery = ref('')
const selectedMajor = ref('')

// 加载项目数据
const loadProjects = async () => {
  try {
    loading.value = true
    const result = await searchProjects({
      query: searchQuery.value,
      major: selectedMajor.value,
      page: currentPage.value,
      pageSize: pageSize.value
    })
    
    projects.value = result.projects
    totalProjects.value = result.total
    totalPages.value = result.totalPages
  } catch (error) {
    console.error('加载项目失败:', error)
  } finally {
    loading.value = false
  }
}

// 切换页码
const changePage = async (delta) => {
  const newPage = currentPage.value + delta
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage
    await loadProjects()
  }
}

// 修改每页显示数量
const changePageSize = async () => {
  currentPage.value = 1
  await loadProjects()
}

// 监听搜索条件变化
watch([searchQuery, selectedMajor], () => {
  currentPage.value = 1
  loadProjects()
})

// 组件挂载时加载第一页数据
onMounted(() => {
  loadProjects()
})

defineExpose({
  loadProjects,
  searchQuery,
  selectedMajor
})
</script>

<style scoped>
.project-list {
    width: 100%;
    overflow-x: auto;
}

.project-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.project-table th,
.project-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.project-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
}

.project-table tr:hover {
    background-color: #f5f5f5;
}

.academic-title {
    color: #666;
    font-size: 0.9em;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.pagination button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    border-radius: 4px;
}

.pagination button:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.pagination select {
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>