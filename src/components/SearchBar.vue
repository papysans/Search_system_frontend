<template>
    <div class="search-bar">
        <input v-model="query" type="text" placeholder="输入关键词搜索课题">
        <select v-model="selectedMajor">
            <option value="">所有专业</option>
            <option v-for="major in majors" :key="major" :value="major">{{ major }}</option>
        </select>
        <button @click="search">搜索</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMajors } from '../services/api'

const emit = defineEmits(['search'])

const query = ref('')
const selectedMajor = ref('')
const majors = ref([])

const search = () => {
    emit('search', { query: query.value, major: selectedMajor.value })
}

onMounted(async () => {
    majors.value = await getMajors()
})
</script>

<style scoped>
.search-bar {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

input[type="text"] {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
}

input[type="text"]:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

select {
    padding: 0.75rem 2rem 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background-color: white;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1em;
}

select:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

button {
    padding: 0.75rem 2rem;
    background-color: #4299e1;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #3182ce;
}

@media (max-width: 768px) {
    .search-bar {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    button {
        width: 100%;
    }
}
</style>