<template>
    <div class="courses-view">
        <h2>Каталог курсів</h2>
        <CourseFilter />
        
        <div v-if="filteredCourses.length === 0" class="no-results">
            😕 За вашим запитом нічого не знайдено
        </div>
        
        <div v-else class="courses-grid">
            <CourseCard 
                v-for="course in filteredCourses" 
                :key="course.id"
                :course="course"
                @enroll="handleEnroll"
                @unenroll="handleUnenroll"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import CourseCard from '@/components/CourseCard.vue'
import CourseFilter from '@/components/CourseFilter.vue'

const coursesStore = useCoursesStore()
const filteredCourses = computed(() => coursesStore.filteredCourses)

function handleEnroll(courseId: number) {
    coursesStore.enrollCourse(courseId)
}

function handleUnenroll(courseId: number) {
    coursesStore.unenrollCourse(courseId)
}
</script>

<style scoped>
.courses-view {
    max-width: 1200px;
    margin: 0 auto;
}

.courses-view h2 {
    color: #1B4F72;
    margin-bottom: 1.5rem;
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
}

.no-results {
    text-align: center;
    padding: 3rem;
    color: #999;
    font-style: italic;
}
</style>