/**
 * bought controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
    'api::bought.bought',
    ({ strapi }) => ({
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

            const feedback = await strapi
                .service('api::bought.bought')
                .feedback(
                    entityId,
                    ctx.request.state.user.id,
                    comment,
                    recommend
                )

            return feedback
        },
    })
)
