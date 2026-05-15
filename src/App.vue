<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
    <footer class="app-footer">
        <p>&copy; 2026 Освітній портал. Усі права захищено.</p>
    </footer>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<style>
@import '@/assets/main.css';

.app-footer {
    background-color: #1B4F72;
    color: white;
    text-align: center;
    padding: 1.5rem;
    border-radius: 12px;
    margin-top: 2rem;
}
</style>