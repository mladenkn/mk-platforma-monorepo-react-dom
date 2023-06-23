import { asNonNil, undefinedToNullsDeep } from "@mk-libs/common/common"
import ss_props_get_create_full from "~/ss.props"
import User_profile_edit from "~/domain/user/User.profile.edit"

export const getServerSideProps = ss_props_get_create_full({ authenticate: true }, async ctx => ({
  props: {
    user_initial: undefinedToNullsDeep(asNonNil(ctx.user)),
  },
}))

export default User_profile_edit
