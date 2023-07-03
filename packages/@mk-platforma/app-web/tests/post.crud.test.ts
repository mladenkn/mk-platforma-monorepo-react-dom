import { test, expect } from "@playwright/test"
import Post_crud_test_helper_create from "./post.crud.test.helper"
import db from "~/prisma/instance"
import { getConnectionString } from "~/cli.utils"

process.env.POSTGRES_PRISMA_URL = getConnectionString("test.local")
let newPost_id: number

test("Post CRUD", async ({ page }) => {
  const helper = Post_crud_test_helper_create(page)

  // home
  await helper.list.goto()
  await helper.list.gotoCreate()
  // end home

  const newPost = {
    title: "post 1 title",
    description: "post 1 description",
    contact: "5185184",
    category: "Hrana",
    location: "Split",
  }

  // create
  await helper.create.waitForUrl()
  const form = await helper.create.form.fill(newPost)
  await helper.create.form.expect(newPost)
  await form.submit()
  // end create

  // details
  await helper.details.waitForUrl()
  await helper.details.expect(newPost)
  // end details

  newPost_id = helper.details.getUrl()

  // list
  await helper.list.goto()
  const post_list_item = await helper.list.expectItem(newPost, newPost_id)
  await post_list_item.click()
  // end list

  // details
  await helper.details.waitForUrl(newPost_id)
  const editLink = helper.details.editLink_find(newPost_id)
  await expect(editLink).toBeVisible()
  await editLink.click()
  // end details

  // edit
  await helper.edit.waitForUrl(newPost_id)
  await helper.edit.form.expect(newPost)
  const newPost_edited = {
    title: "post 1 title edited",
    description: "post 1 description edited",
    contact: "2222",
    category: "Gadgeti",
    location: "Zagreb",
  }
  const form2 = await helper.edit.form.fill(newPost_edited)
  await helper.edit.form.expect(newPost_edited)
  await form2.submit()
  // end edit

  // details 2
  await helper.details.waitForUrl(newPost_id)
  await helper.details.expect(newPost_edited)
  // end details 2

  // list 2
  await helper.list.goto()
  const post_list_item2 = await helper.list.expectItem(newPost_edited, newPost_id)
  await post_list_item2.click()
  // end list 2

  // await helper.details.goTo(newPost_id)
  // await helper.details.delete()

  // await helper.list.waitForUrl()
  // await helper.list.expectItem_notFound(newPost_id)

  // await helper.details.goTo(newPost_id)
  // await helper.details.expectIsDeleted()
})

test.afterAll(async () => {
  newPost_id && (await db.post.delete({ where: { id: newPost_id } }))
})
