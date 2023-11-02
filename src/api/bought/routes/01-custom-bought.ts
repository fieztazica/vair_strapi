export default {
    routes: [
        {
            method: 'POST',
            path: '/boughts/feedback/:id',
            handler: 'bought.feedback',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
}
