/**
 * bought service
 */

import { errors } from '@strapi/utils'
import { factories } from '@strapi/strapi'

const { NotFoundError, ForbiddenError } = errors

export default factories.createCoreService(
    'api::bought.bought',
    ({ strapi }) => ({
        async getUserBoughts(userId) {
            return await strapi.entityService.findMany('api::bought.bought', {
                filters: {
                    users_permissions_user: userId,
                },
                populate: '*',
            })
        },

        async getUserBoughtByProduct(userId, product) {
            const hadBought = await strapi.entityService.findMany(
                'api::bought.bought',
                {
                    filters: {
                        users_permissions_user: userId,
                        product: product.id,
                    },
                    populate: '*',
                }
            )

            return hadBought.length > 0
                ? hadBought.shift() || hadBought.pop()
                : null
        },

        async getUserBoughtByProductId(userId, productId) {
            const product = await strapi.entityService.findOne(
                'api::product.product',
                productId
            )

            if (!product) {
                throw new NotFoundError('Product not found')
            }

            const hadBought = await strapi.entityService.findMany(
                'api::bought.bought',
                {
                    filters: {
                        users_permissions_user: userId,
                        product: productId,
                    },
                    populate: '*',
                }
            )

            return hadBought.length > 0
                ? hadBought.shift() || hadBought.pop()
                : null
        },

        async feedback(boughtId, userId, comment, recommend) {
            const bought = await strapi.entityService.findOne(
                'api::bought.bought',
                boughtId,
                {
                    populate: '*',
                }
            )

            if (!bought) {
                throw new NotFoundError('You have not bought this product')
            }

            const finish = await strapi.entityService.create(
                'api::feedback.feedback',
                {
                    data: {
                        bought: boughtId,
                        users_permissions_user: userId,
                        comment: comment,
                        recommend: recommend,
                        product: bought.product.id,
                    },
                }
            )

            return { data: finish, meta: {} }
        },
    })
)
