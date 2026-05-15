<template>
    <header class="app-header">
        <h1>Освітній портал</h1>
        <p>Сучасні знання для вашого розвитку</p>
        
        <nav class="main-nav">
            <RouterLink to="/" class="nav-link">Головна</RouterLink>
            <RouterLink to="/courses" class="nav-link">Курси</RouterLink>
            <RouterLink to="/profile" class="nav-link">
                Профіль
                <span v-if="enrolledCount > 0" class="badge">{{ enrolledCount }}</span>
            </RouterLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCoursesStore } from '@/stores/courses'
import { computed } from 'vue'

const coursesStore = useCoursesStore()
const enrolledCount = computed(() => coursesStore.enrolledCount)
</script>

<style scoped>
.app-header {
    background-color: #1B4F72;
    color: white;
    padding: 1.5rem 2rem;
    text-align: center;
    border-radius: 12px;
    margin-bottom: 2rem;
}

.app-header h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
}

.main-nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    position: relative;
}

.nav-link:hover {
    background-color: #2ECC71;
    color: #1B4F72;
}

.router-link-active {
    background-color: #2ECC71;
    color: #1B4F72;
}

.badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #2ECC71;
    color: #1B4F72;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 50%;
}
</style>