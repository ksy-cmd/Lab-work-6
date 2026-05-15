<template>
    <div class="course-card" @click="goToDetail">
        <div class="course-image">
            <img :src="course.imageUrl || 'https://picsum.photos/id/100/300/200'" :alt="course.title">
        </div>
        <div class="course-info">
            <h3>{{ course.title }}</h3>
            <p class="subject">{{ course.subject }}</p>
            <div class="details">
                <span class="level" :class="levelClass">{{ levelIcon }} {{ course.level }}</span>
                <span class="duration">⏱️ {{ course.duration }} тижнів</span>
            </div>
            <p class="description">{{ truncateText(course.description, 80) }}</p>
            <div class="actions">
                <button 
                    v-if="!isEnrolled" 
                    @click.stop="handleEnroll" 
                    class="btn-enroll"
                >
                    Записатися
                </button>
                <button 
                    v-else 
                    @click.stop="handleUnenroll" 
                    class="btn-unenroll"
                >
                    Відписатися
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Course } from '@/types'
import { useCoursesStore } from '@/stores/courses'

const props = defineProps<{
    course: Course
}>()

const emit = defineEmits<{
    (e: 'enroll', id: number): void
    (e: 'unenroll', id: number): void
}>()

const router = useRouter()
const coursesStore = useCoursesStore()

const isEnrolled = computed(() => coursesStore.isEnrolled(props.course.id))

const levelClass = computed(() => {
    switch (props.course.level) {
        case 'Початковий': return 'level-beginner'
        case 'Середній': return 'level-intermediate'
        default: return 'level-advanced'
    }
})

const levelIcon = computed(() => {
    switch (props.course.level) {
        case 'Початковий': return '🌱'
        case 'Середній': return '📚'
        default: return '🏆'
    }
})

function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

function goToDetail() {
    router.push({ name: 'course-detail', params: { id: props.course.id } })
}

function handleEnroll() {
    emit('enroll', props.course.id)
}

function handleUnenroll() {
    emit('unenroll', props.course.id)
}
</script>

<style scoped>
.course-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.course-image img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.course-info {
    padding: 1rem;
}

.course-info h3 {
    margin: 0 0 0.5rem;
    color: #1B4F72;
    font-size: 1.2rem;
}

.subject {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.details {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    font-size: 0.85rem;
}

.level {
    padding: 0.2rem 0.5rem;
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
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 1rem;
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.btn-enroll, .btn-unenroll {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
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
</style>