export default ({ env }) => ({
    transformer: {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
            requestTransforms: {
                wrapBodyWithDataKey: true,
            },
            contentTypeFilter: {
                mode: 'allow',
                uids: {
                    'api::product.product': true,
                    'api::category.category': true,
                },
            },
            plugins: {
                ids: {
                    slugify: true,
                },
            },
        },
    },
    // 'rest-cache': {
    //     config: {
    //         provider: {
    //             name: 'memory',
    //             options: {
    //                 max: 32767,
    //                 maxAge: 3600,
    //             },
    //         },
    //         strategy: {
    //             contentTypes: [
    //                 // list of Content-Types UID to cache
    //                 'api::developer.developer',
    //                 'api::publisher.publisher',
    //                 'api::category.category',
    //                 'api::product.product',
    //                 'api::feedback.feedback',
    //                 'api::bought.bought',
    //             ],
    //         },
    //     },
    // },
    upload: {
        config: {
            providerOptions: {
                localServer: {
                    maxage: 300000,
                },
            },
            sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
        },
    },
    'strapi-plugin-populate-deep': {
        config: {
            defaultDepth: 3, // Default is 5
        },
    },
    io: {
        enabled: true,
        config: {
            IOServerOptions: {
                cors: { origin: 'http://localhost:5000', methods: ['GET'] },
            },
            contentTypes: {
                bought: '*',
            },
            events: [
                {
                    name: 'connection',
                    handler: ({ strapi }, socket) => {
                        strapi.log.info(
                            `[io] new connection with id ${socket.id}`
                        )
                    },
                },
            ],
        },
    },
})
