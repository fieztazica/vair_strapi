export default ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
        keys: env.array('APP_KEYS'),
    },
    webhooks: {
        populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
    url: env('URL', 'https://strapi.vair.nyte.tk'),
    proxy: env.bool('IS_PROXIED', true),
})
