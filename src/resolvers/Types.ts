import { Context } from '../utils'

export default {
    Order: {
        user: ({ id }, args, ctx: Context) => ctx.prisma.order({ id }).user(),
    }
}