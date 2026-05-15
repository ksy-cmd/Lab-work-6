import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const CoursesView = () => import('../views/CoursesView.vue')
const CourseDetailView = () => import('../views/CourseDetailView.vue')
const ProfileView = () => import('../views/ProfileView.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/courses',
        name: 'courses',
        component: CoursesView
    },
    {
        path: '/course/:id',
        name: 'course-detail',
        component: CourseDetailView,
        props: true
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'home' }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router