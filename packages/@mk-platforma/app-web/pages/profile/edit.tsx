import { asNonNil, undefinedToNullsDeep } from "@mk-libs/common/common"
import { create_get_ss_props } from "~/create.getServerSideProps"
import User_profile_edit from "~/domain/user/User.profile.edit"

export const getServerSideProps = create_get_ss_props(async (_, session) => ({
  props: {
    user_initial: undefinedToNullsDeep(asNonNil(session.user)),
  },
}))

export default User_profile_edit
