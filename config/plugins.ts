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
                    'api::publisher.publisher': true,
                    'api::developer.developer': true,
                    'api::feedback.feedback': true,
                    'api::bought.bought': true,
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
})
