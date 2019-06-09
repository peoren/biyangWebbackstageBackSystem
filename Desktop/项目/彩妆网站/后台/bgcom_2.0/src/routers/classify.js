export default[
    {
        path:'/classify',
        name:'classify',
        component:() => import('@/views/classify/classify.vue')
    },
    {
        path:'/classifyadd/:id',
        name:'classifyadd',
        component:() => import('@/views/classify/add.vue')
    },
    {
        path:'/classifydlter/:id',
        name:'classifydlter',
        component:() => import('@/views/classify/dlter.vue')
    }
]