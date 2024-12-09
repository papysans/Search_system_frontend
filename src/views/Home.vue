<template>
    <div class="home">
        <div class="header">
            <h1>毕业设计课题查询系统</h1>
            <UserProfile :onLogout="handleLogout" />
        </div>
        <SearchBar @search="onSearch" />
        <HistoryTags :tags="historyTags" @select-tag="onSelectTag" @delete-tag="deleteTag" @clear-history="clearHistory" />
        <ProjectList :projects="projects" :totalProjects="totalProjects" @update-page="onUpdatePage" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import HistoryTags from '../components/HistoryTags.vue'
import ProjectList from '../components/ProjectList.vue'
import UserProfile from '../components/UserProfile.vue'
import { searchProjects } from '../services/api'

const router = useRouter()
const projects = ref([])
const historyTags = ref([])
const totalProjects = ref(0)
const currentSearch = ref({})

const onSearch = async (searchParams) => {
    currentSearch.value = searchParams
    const response = await searchProjects({ ...searchParams, page: 1, pageSize: 15 })
    if (response.code === 200) {
        projects.value = response.data.projects
        totalProjects.value = response.data.pagination.total
        
        // Add search query to history if it's not empty
        if (searchParams.query) {
            const newTag = {
                query: searchParams.query,
                major: searchParams.major || ''
            }
            // Check if this exact search already exists
            const exists = historyTags.value.some(tag => 
                (typeof tag === 'object' ? tag.query === newTag.query && tag.major === newTag.major : tag === newTag.query)
            )
            if (!exists) {
                historyTags.value = [newTag, ...historyTags.value.slice(0, 9)]
                saveHistoryToStorage(historyTags.value)
            }
        }
    }
}

const onSelectTag = (searchParams) => {
    onSearch(searchParams)
}

const deleteTag = (tagToDelete) => {
    historyTags.value = historyTags.value.filter(tag => 
        typeof tag === 'object' 
            ? tag.query !== tagToDelete.query || tag.major !== tagToDelete.major
            : tag !== tagToDelete
    )
    saveHistoryToStorage(historyTags.value)
}

const onUpdatePage = async ({ page, pageSize }) => {
    const response = await searchProjects({ ...currentSearch.value, page, pageSize })
    if (response.code === 200) {
        projects.value = response.data.projects
        totalProjects.value = response.data.pagination.total
    }
}

const handleLogout = () => {
    localStorage.removeItem('user')
    router.push({ path: '/', query: { logout: 'true' } })
}

const clearHistory = () => {
    historyTags.value = []
    localStorage.removeItem('searchHistory')
}

const saveHistoryToStorage = (history) => {
    localStorage.setItem('searchHistory', JSON.stringify(history))
}

onMounted(async () => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('searchHistory')
    historyTags.value = savedHistory ? JSON.parse(savedHistory) : []
})
</script>

<style scoped>
.home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;
}

h1 {
    color: #2d3748;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
}

@media (max-width: 768px) {
    .home {
        padding: 1rem;
    }

    .header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 1.5rem;
    }
}
</style>