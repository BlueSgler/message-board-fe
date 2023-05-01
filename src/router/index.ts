import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      component: () => import('@/views/home/home.vue'),
      children: [
        {
          path: '',
          redirect(to) {
            return to.fullPath + '/messageBoard'
          },
        },
        {
          path: 'messageBoard',
          component: () => import('@/components/MessageBoard.vue')
        },
        {
          path: 'photowall',
          component: () => import('@/components/PhotoWall.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login.vue')
    }

  ],
});

export default router;
