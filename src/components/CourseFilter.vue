<template>
    <div class="course-filter">
        <div class="filter-group">
            <label>Рівень:</label>
            <select :value="filterLevel" @change="handleLevelChange" class="filter-select">
                <option v-for="level in availableLevels" :key="level" :value="level">
                    {{ level === 'all' ? 'Всі рівні' : level }}
                </option>
            </select>
        </div>
        
        <div class="filter-group">
            <label>Пошук:</label>
            <input 
                type="text" 
                :value="searchQuery" 
                @input="handleSearchInput" 
                placeholder="Назва курсу..."
                class="filter-input"
            >
        </div>
        
        <div class="filter-stats">
            Знайдено курсів: {{ filteredCount }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCoursesStore } from '@/stores/courses'

const coursesStore = useCoursesStore()
const filterLevel = computed(() => coursesStore.filterLevel)
const searchQuery = computed(() => coursesStore.searchQuery)
const availableLevels = computed(() => coursesStore.availableLevels)
const filteredCount = computed(() => coursesStore.filteredCourses.length)

function handleLevelChange(event: Event) {
    const target = event.target as HTMLSelectElement
    coursesStore.setFilterLevel(target.value)
}

function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement
    coursesStore.setSearchQuery(target.value)
}
</script>

<style scoped>
.course-filter {
    background-color: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 2rem;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.filter-group label {
    font-weight: 600;
    color: #1B4F72;
}

.filter-select, .filter-input {
    padding: 0.5rem 1rem;
    border: 2px solid #DCE4EC;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.9rem;
}

.filter-select:focus, .filter-input:focus {
    outline: none;
    border-color: #2ECC71;
}

.filter-stats {
    margin-left: auto;
    padding: 0.5rem 1rem;
    background-color: #F4F9F9;
    border-radius: 8px;
    color: #1B4F72;
    font-weight: 600;
}

@media (max-width: 768px) {
    .course-filter {
        flex-direction: column;
        align-items: stretch;
    }
    
    .filter-stats {
        margin-left: 0;
        text-align: center;
    }
}
</style>