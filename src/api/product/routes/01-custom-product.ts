export default {
    routes: [
        {
            method: 'POST',
            path: '/products/buy/:id',
            handler: 'product.buy',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/products/feedback/:id',
            handler: 'product.feedback',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
}
