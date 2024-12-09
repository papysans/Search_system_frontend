<template>
    <div class="history-tags">
        <div class="history-header">
            <h3>历史搜索</h3>
            <button v-if="tags.length > 0" @click="clearAll" class="clear-all-btn">清除全部</button>
        </div>
        <div class="tag-container">
            <div v-for="tag in tags" :key="tag.query || tag" class="tag-wrapper">
                <span @click="selectTag(tag)" class="tag">
                    {{ tag.query || tag }}
                </span>
                <button @click="deleteTag(tag)" class="delete-btn">&times;</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    tags: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['select-tag', 'delete-tag', 'clear-history'])

const selectTag = (tag) => {
    // If tag is an object with query and major, use both
    const query = typeof tag === 'object' ? tag.query : tag
    const major = typeof tag === 'object' ? tag.major : ''
    emit('select-tag', { query, major })
}

const deleteTag = (tag) => {
    emit('delete-tag', tag)
}

const clearAll = () => {
    emit('clear-history')
}
</script>

<style scoped>
.history-tags {
    margin-bottom: 2rem;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag-wrapper {
    display: inline-flex;
    align-items: center;
    background-color: #edf2f7;
    border-radius: 9999px;
    padding-left: 1rem;
    transition: all 0.2s;
}

.tag-wrapper:hover {
    background-color: #e2e8f0;
    transform: translateY(-1px);
}

h3 {
    font-size: 1rem;
    color: #4a5568;
    font-weight: 600;
}

.tag {
    color: #4a5568;
    font-size: 0.875rem;
    cursor: pointer;
}

.delete-btn {
    border: none;
    background: none;
    color: #718096;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    border-radius: 0 9999px 9999px 0;
    transition: all 0.2s;
}

.delete-btn:hover {
    background-color: #cbd5e0;
    color: #e53e3e;
}

.clear-all-btn {
    border: none;
    background: none;
    color: #718096;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.2s;
}

.clear-all-btn:hover {
    background-color: #e2e8f0;
    color: #e53e3e;
}
</style>