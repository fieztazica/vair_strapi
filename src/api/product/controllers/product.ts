/**
 * product controller
 */

import { factories } from '@strapi/strapi'
import { NotFoundError } from '@strapi/utils/dist/errors'

export default factories.createCoreController(
    'api::product.product',
    ({ strapi }) => ({
        async buy(ctx, next) {
            const entityId = (ctx.request.url as string).split('/').pop()

            const bought = await strapi
                .service('api::product.product')
                .buy(entityId, ctx.state.user.id)

            return bought
        },

        async feedback(ctx, next) {
            const comment = ctx.request.body.comment
            const recommend = ctx.request.body.recommend

            if (!comment || !recommend) {
                return ctx.badRequest('body is missing', {
                    body: {
                        comment: 'string',
                        recommend: 'boolean',
                    },
                })
            }

            const entityId = (ctx.request.url as string).split('/').pop()

            const bought = await strapi
                .service('api::product.product')
                .feedback(entityId, ctx.state.user.id, comment, recommend)

            return bought
        },
    })
)
