import { createRouter, createWebHistory } from "vue-router";
import Main from '@/pages/Main';
import setOptions from '@/pages/SetOptions';

const routes = [
    {
        path: '',
        component: setOptions
    },
    {
        path: '/mine',
        component: Main,
    }
]

const router = createRouter({
    routes, 
    history: createWebHistory(),
})



export default router;