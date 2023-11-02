/**
 * feedback service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService(
    'api::feedback.feedback',
    ({ strapi }) => ({
        async getFeedbackByBoughtId(boughtId) {
            return await strapi.entityService.findMany(
                'api::feedback.feedback',
                {
                    filters: {
                        bought: boughtId,
                    },
                    populate: '*',
                }
            )
        },
        async getFeedbackByProductId(productId) {
            return await strapi.entityService.findMany(
                'api::feedback.feedback',
                {
                    filters: {
                        product: productId,
                    },
                    populate: '*',
                }
            )
        },
        async getFeedbackByUserId(userId) {
            return await strapi.entityService.findMany(
                'api::feedback.feedback',
                {
                    filters: {
                        users_permissions_user: userId,
                    },
                    populate: '*',
                }
            )
        },
    })
)
