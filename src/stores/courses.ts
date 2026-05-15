import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Course } from '@/types'

const mockCourses: Course[] = [
    {
        id: 1,
        title: 'JavaScript для початківців',
        subject: 'Web-розробка',
        duration: 8,
        level: 'Початковий',
        description: 'Основи JavaScript: змінні, функції, події, DOM маніпуляції.',
        imageUrl: 'https://picsum.photos/id/1/300/200'
    },
    {
        id: 2,
        title: 'React - сучасний підхід',
        subject: 'Web-розробка',
        duration: 10,
        level: 'Середній',
        description: 'Компоненти, хуки, state management, роутинг.',
        imageUrl: 'https://picsum.photos/id/2/300/200'
    },
    {
        id: 3,
        title: 'CSS Grid та Flexbox',
        subject: 'Web-розробка',
        duration: 4,
        level: 'Початковий',
        description: 'Сучасна верстка адаптивних сайтів.',
        imageUrl: 'https://picsum.photos/id/3/300/200'
    },
    {
        id: 4,
        title: 'TypeScript у проєктах',
        subject: 'Web-розробка',
        duration: 6,
        level: 'Просунутий',
        description: 'Типізація, інтерфейси, компіляція.',
        imageUrl: 'https://picsum.photos/id/4/300/200'
    },
    {
        id: 5,
        title: 'UI/UX дизайн для розробників',
        subject: 'Дизайн',
        duration: 6,
        level: 'Початковий',
        description: 'Принципи дизайну, прототипування, Figma.',
        imageUrl: 'https://picsum.photos/id/5/300/200'
    },
    {
        id: 6,
        title: 'Машинне навчання',
        subject: 'Data Science',
        duration: 14,
        level: 'Просунутий',
        description: 'Scikit-learn, нейронні мережі, TensorFlow.',
        imageUrl: 'https://picsum.photos/id/6/300/200'
    },
    {
        id: 7,
        title: 'Python для Data Science',
        subject: 'Data Science',
        duration: 12,
        level: 'Початковий',
        description: 'NumPy, Pandas, візуалізація даних.',
        imageUrl: 'https://picsum.photos/id/7/300/200'
    },
    {
        id: 8,
        title: 'Node.js та Express',
        subject: 'Web-розробка',
        duration: 8,
        level: 'Середній',
        description: 'Бекенд розробка, REST API, MongoDB.',
        imageUrl: 'https://picsum.photos/id/8/300/200'
    }
]

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>(mockCourses)
    const filterLevel = ref<string>('all')
    const searchQuery = ref<string>('')
    const enrolledCourses = ref<number[]>([])

    const filteredCourses = computed<Course[]>(() => {
        let result = courses.value

        if (filterLevel.value !== 'all') {
            result = result.filter(course => course.level === filterLevel.value)
        }

        if (searchQuery.value.trim() !== '') {
            const query = searchQuery.value.toLowerCase().trim()
            result = result.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.subject.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query)
            )
        }

        return result
    })

    const availableLevels = computed<string[]>(() => {
        const levels = courses.value.map(c => c.level)
        return ['all', ...new Set(levels)]
    })

    const enrolledCount = computed<number>(() => enrolledCourses.value.length)

    const enrolledCourseObjects = computed<Course[]>(() => {
        return courses.value.filter(course => enrolledCourses.value.includes(course.id))
    })

    function enrollCourse(courseId: number) {
        if (!enrolledCourses.value.includes(courseId)) {
            enrolledCourses.value.push(courseId)
        }
    }

    function unenrollCourse(courseId: number) {
        const index = enrolledCourses.value.indexOf(courseId)
        if (index !== -1) {
            enrolledCourses.value.splice(index, 1)
        }
    }

    function isEnrolled(courseId: number): boolean {
        return enrolledCourses.value.includes(courseId)
    }

    function getCourseById(id: number): Course | undefined {
        return courses.value.find(course => course.id === id)
    }

    function setFilterLevel(level: string) {
        filterLevel.value = level
    }

    function setSearchQuery(query: string) {
        searchQuery.value = query
    }

    return {
        courses,
        filterLevel,
        searchQuery,
        enrolledCourses,
        filteredCourses,
        availableLevels,
        enrolledCount,
        enrolledCourseObjects,
        enrollCourse,
        unenrollCourse,
        isEnrolled,
        getCourseById,
        setFilterLevel,
        setSearchQuery
    }
})