/**
 * product service
 */

import { errors } from '@strapi/utils'
import { factories } from '@strapi/strapi'

const { NotFoundError, ForbiddenError } = errors

export default factories.createCoreService(
    'api::product.product',
    ({ strapi }) => ({
        async buy(productId, userId) {
            const product = await strapi.entityService.findOne(
                'api::product.product',
                productId,
                {
                    populate: '*',
                }
            )

            if (!product) {
                throw new NotFoundError('Product not found')
            }

            const hadBought = await strapi
                .service('api::bought.bought')
                .getUserBoughtByProduct(userId, product)

            if (hadBought) {
                throw new ForbiddenError('You bought this product!')
            }

            const bought = await strapi.entityService.create(
                'api::bought.bought',
                {
                    data: {
                        product: product.id,
                        users_permissions_user: userId,
                        total: product.price,
                        publishedAt: Date.now(),
                        bought_date: Date.now(),
                    },
                }
            )

            return { data: bought, meta: {} }
        },
    })
)
