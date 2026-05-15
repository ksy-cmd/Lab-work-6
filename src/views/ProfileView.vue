<template>
    <div class="profile-view">
        <h2>Мій профіль</h2>
        
        <div class="profile-card">
            <div class="profile-info">
                <h3>Інформація про користувача</h3>
                <p><strong>Ім'я:</strong> {{ userProfile.name }}</p>
                <p><strong>Email:</strong> {{ userProfile.email }}</p>
            </div>
            
            <div class="enrolled-courses">
                <h3>Мої курси ({{ enrolledCount }})</h3>
                
                <div v-if="enrolledCourses.length === 0" class="no-courses">
                    <p>Ви ще не записані на жоден курс.</p>
                    <RouterLink to="/courses" class="cta-link">Перейти до каталогу курсів →</RouterLink>
                </div>
                
                <div v-else class="enrolled-list">
                    <div v-for="course in enrolledCourses" :key="course.id" class="enrolled-item">
                        <img :src="course.imageUrl || 'https://picsum.photos/id/100/80/80'" :alt="course.title">
                        <div class="enrolled-info">
                            <h4>{{ course.title }}</h4>
                            <p>{{ course.subject }} • {{ course.level }} • {{ course.duration }} тижнів</p>
                        </div>
                        <button @click="handleUnenroll(course.id)" class="remove-btn">Відписатися</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="stats-card">
            <h3>Статистика навчання</h3>
            <div class="stats-grid">
                <div class="stat">
                    <span class="stat-value">{{ enrolledCount }}</span>
                    <span class="stat-label">Активних курсів</span>
                </div>
                <div class="stat">
                    <span class="stat-value">{{ totalWeeks }}</span>
                    <span class="stat-label">Всього тижнів</span>
                </div>
                <div class="stat">
                    <span class="stat-value">{{ completionRate }}%</span>
                    <span class="stat-label">Прогрес</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCoursesStore } from '@/stores/courses'
import type { UserProfile } from '@/types'

const coursesStore = useCoursesStore()

const userProfile: UserProfile = {
    name: 'Олександр Коваленко',
    email: 'oleksandr@example.com',
    enrolledCourses: []
}

const enrolledCourses = computed(() => coursesStore.enrolledCourseObjects)
const enrolledCount = computed(() => coursesStore.enrolledCount)

const totalWeeks = computed(() => {
    return enrolledCourses.value.reduce((sum, course) => sum + course.duration, 0)
})

const completionRate = computed(() => {
    if (enrolledCourses.value.length === 0) return 0
    // Приклад: 75% базового прогресу
    return 75
})

function handleUnenroll(courseId: number) {
    if (confirm('Ви впевнені, що хочете відписатися від цього курсу?')) {
        coursesStore.unenrollCourse(courseId)
    }
}
</script>

<style scoped>
.profile-view {
    max-width: 1000px;
    margin: 0 auto;
}

.profile-view h2 {
    color: #1B4F72;
    margin-bottom: 1.5rem;
}

.profile-card {
    background-color: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.profile-info {
    border-bottom: 1px solid #DCE4EC;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
}

.profile-info h3, .enrolled-courses h3, .stats-card h3 {
    color: #1B4F72;
    margin-bottom: 1rem;
}

.profile-info p {
    margin: 0.5rem 0;
    color: #555;
}

.no-courses {
    text-align: center;
    padding: 2rem;
    background-color: #F4F9F9;
    border-radius: 12px;
}

.cta-link {
    display: inline-block;
    margin-top: 1rem;
    color: #2ECC71;
    text-decoration: none;
    font-weight: 600;
}

.enrolled-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.enrolled-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #F4F9F9;
    border-radius: 12px;
    transition: transform 0.3s ease;
}

.enrolled-item:hover {
    transform: translateX(5px);
}

.enrolled-item img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
}

.enrolled-info {
    flex: 1;
}

.enrolled-info h4 {
    color: #1B4F72;
    margin-bottom: 0.25rem;
}

.enrolled-info p {
    color: #666;
    font-size: 0.85rem;
}

.remove-btn {
    padding: 0.5rem 1rem;
    background-color: #E74C3C;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.remove-btn:hover {
    background-color: #C0392B;
}

.stats-card {
    background-color: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    text-align: center;
}

.stat {
    padding: 1rem;
    background-color: #F4F9F9;
    border-radius: 12px;
}

.stat-value {
    display: block;
    font-size: 2rem;
    font-weight: 800;
    color: #1B4F72;
}

.stat-label {
    font-size: 0.85rem;
    color: #666;
}
</style>