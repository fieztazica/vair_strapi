export default [
    'strapi::errors',
    'strapi::security',
    {
        name: 'strapi::cors',
        config: {
            enabled: true,
            origin: [
                'http://0.0.0.0:1337',
                'http://localhost:1337',
                'https://strapi.vair.nyte.tk',
                'https://vair.nyte.tk',
            ],
            methods: ['*'],
            headers: [
                'Strapi-Transformer-Ignore',
                'Content-Type',
                'Authorization',
                'Origin',
                'Accept',
            ],
            keepHeaderOnError: true,
        },
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    {
        name: 'strapi::body',
        config: {
            formLimit: '256mb', // modify form body
            jsonLimit: '256mb', // modify JSON body
            textLimit: '256mb', // modify text body
            formidable: {
                maxFileSize: 250 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
            },
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
]
