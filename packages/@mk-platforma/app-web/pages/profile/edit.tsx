import { asNonNil, undefinedToNullsDeep } from "@mk-libs/common/common"
import create_get_ss_props from "~/create.getServerSideProps"
import User_profile_edit from "~/domain/user/User.profile.edit"

export const getServerSideProps = create_get_ss_props({}, async ctx => ({
  props: {
    user_initial: undefinedToNullsDeep(asNonNil(ctx.user)),
  },
}))

export default User_profile_edit
