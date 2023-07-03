import { Page, expect } from "@playwright/test"

type Post = {
  title: string
  description: string
  contact: string
  category: string
  location: string
}

export default function Post_crud_test_helper_create(page: Page) {
  return {
    form: {
      fill: async function (post: Post) {
        const form = page.getByTestId("Post_form")
        await form.locator("[name='title']").fill(post.title)
        await form.locator("[name='description']").fill(post.description)
        await form.locator("[name='contact']").fill(post.contact)

        await form.locator("[name='category']").click()
        await page.locator(".category-dropdown-popper").getByText(post.category).click()

        await form.locator("[name='location']").click()
        await page.locator(".location-dropdown-popper").getByText(post.location).click()

        return {
          submit: () => form.locator("button[type=submit]").click(),
        }
      },
      expect: async function (post: Post) {
        const form = page.getByTestId("Post_form")
        expect(form.locator("[name='title']")).toHaveValue(post.title)
        expect(form.locator("[name='contact']")).toHaveValue(post.contact)
        expect(form.locator("[name='description']")).toHaveValue(post.description)
        expect(form.locator("[name='category']")).toHaveValue(post.category)
        expect(form.locator("[name='location']")).toHaveValue(post.location)
      },
    },
    details: {
      expect: async function (post: Post) {
        const post_component = page.getByTestId("Post_single_details")
        await expect(post_component).toContainText(post.title)
        await expect(post_component).toContainText(post.description)
        await expect(post_component).toContainText(post.contact)
        await expect(post_component).toContainText(post.location)
      },
    },
    list: {
      expectItem: async function (post: Post, id: number) {
        const post_list_item = page.getByTestId(`Post_listItem-${id}`)
        await expect(post_list_item).toContainText(post.title)
        await expect(post_list_item).toContainText(post.location)
        return post_list_item
      },
    },
  }
}
