<template>
    <div v-if="course" class="course-detail">
        <button @click="goBack" class="back-button">← Назад до курсів</button>
        
        <div class="detail-card">
            <div class="detail-image">
                <img :src="course.imageUrl || 'https://picsum.photos/id/100/600/400'" :alt="course.title">
            </div>
            <div class="detail-info">
                <h2>{{ course.title }}</h2>
                <p class="subject">{{ course.subject }}</p>
                <div class="details">
                    <span class="level" :class="levelClass">{{ levelIcon }} {{ course.level }}</span>
                    <span class="duration">⏱️ {{ course.duration }} тижнів</span>
                </div>
                <p class="description">{{ course.description }}</p>
                <div class="actions">
                    <button 
                        v-if="!isEnrolled" 
                        @click="handleEnroll" 
                        class="btn-enroll"
                    >
                        Записатися на курс
                    </button>
                    <button 
                        v-else 
                        @click="handleUnenroll" 
                        class="btn-unenroll"
                    >
                        Відписатися від курсу
                    </button>
                </div>
            </div>
        </div>
        
        <div class="what-you-learn">
            <h3>Що ви вивчите:</h3>
            <ul>
                <li>Практичні навички роботи з {{ course.title }}</li>
                <li>Сучасні підходи та методології</li>
                <li>Реальні проекти для портфоліо</li>
                <li>Підготовку до сертифікації</li>
            </ul>
        </div>
    </div>
    
    <div v-else class="not-found">
        <h2>Курс не знайдено</h2>
        <p>На жаль, курс з таким ID не існує.</p>
        <RouterLink to="/courses" class="cta-button">Повернутися до каталогу</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useCoursesStore } from '@/stores/courses'
import type { Course } from '@/types'

const route = useRoute()
const router = useRouter()
const coursesStore = useCoursesStore()

const course = ref<Course | undefined>(undefined)

onMounted(() => {
    const id = Number(route.params.id)
    if (!isNaN(id)) {
        course.value = coursesStore.getCourseById(id)
    }
})

const isEnrolled = computed(() => {
    if (!course.value) return false
    return coursesStore.isEnrolled(course.value.id)
})

const levelClass = computed(() => {
    if (!course.value) return ''
    switch (course.value.level) {
        case 'Початковий': return 'level-beginner'
        case 'Середній': return 'level-intermediate'
        default: return 'level-advanced'
    }
})

const levelIcon = computed(() => {
    if (!course.value) return ''
    switch (course.value.level) {
        case 'Початковий': return '🌱'
        case 'Середній': return '📚'
        default: return '🏆'
    }
})

function goBack() {
    router.push({ name: 'courses' })
}

function handleEnroll() {
    if (course.value) {
        coursesStore.enrollCourse(course.value.id)
    }
}

function handleUnenroll() {
    if (course.value) {
        coursesStore.unenrollCourse(course.value.id)
    }
}
</script>

<style scoped>
.course-detail {
    max-width: 1000px;
    margin: 0 auto;
}

.back-button {
    background: none;
    border: none;
    color: #1B4F72;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #F4F9F9;
}

.detail-card {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.detail-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail-info {
    padding: 2rem;
}

.detail-info h2 {
    color: #1B4F72;
    margin-bottom: 0.5rem;
}

.subject {
    color: #666;
    margin-bottom: 1rem;
}

.details {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.level {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
}

.level-beginner {
    background-color: #D5F5E3;
    color: #27AE60;
}

.level-intermediate {
    background-color: #FDEBD0;
    color: #F39C12;
}

.level-advanced {
    background-color: #FADBD8;
    color: #E74C3C;
}

.description {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.btn-enroll, .btn-unenroll {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-enroll {
    background-color: #2ECC71;
    color: #1B4F72;
}

.btn-enroll:hover {
    background-color: #27AE60;
    color: white;
}

.btn-unenroll {
    background-color: #E74C3C;
    color: white;
}

.btn-unenroll:hover {
    background-color: #C0392B;
}

.what-you-learn {
    background-color: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.what-you-learn h3 {
    color: #1B4F72;
    margin-bottom: 1rem;
}

.what-you-learn ul {
    list-style: none;
    padding: 0;
}

.what-you-learn li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
}

.what-you-learn li::before {
    content: "✅";
    position: absolute;
    left: 0;
}

.not-found {
    text-align: center;
    padding: 3rem;
    background-color: white;
    border-radius: 16px;
}

@media (max-width: 768px) {
    .detail-card {
        grid-template-columns: 1fr;
    }
    
    .detail-image img {
        height: 300px;
    }
}
</style>