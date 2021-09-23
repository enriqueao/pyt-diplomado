import * as bcrypt from "bcryptjs";
import * as randomstring from "randomstring";
import { UserCreateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";

export default {
  async setPwd(parent, args, ctx: Context) {
    const { pwd, token } = args.data;
    const password = await bcrypt.hash(pwd, 10);
    return await ctx.prisma.updateUser({ data: { password }, where: { token }});
  },
  updateUser: (parent, args: { data: any, where: any }, ctx: Context) => ctx.prisma.updateUser(args),
  createUser: (parent, { data }: { data: UserCreateInput}, ctx: Context) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(data.password, salt);
    const token = randomstring.generate(8).toUpperCase();
    data = {
      token,
      password,
      ...data
    };
    return ctx.prisma.createUser(data);
  },
};
