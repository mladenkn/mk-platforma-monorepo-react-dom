import { Page, expect } from "@playwright/test"

type Post = {
  title: string
  description: string
  contact: string
  category: string
  location: string
}

export default function Post_crud_test_helper_create(page: Page) {
  const form = {
    async fill(post: Post) {
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
    async expect(post: Post) {
      const form = page.getByTestId("Post_form")
      expect(form.locator("[name='title']")).toHaveValue(post.title)
      expect(form.locator("[name='contact']")).toHaveValue(post.contact)
      expect(form.locator("[name='description']")).toHaveValue(post.description)
      expect(form.locator("[name='category']")).toHaveValue(post.category)
      expect(form.locator("[name='location']")).toHaveValue(post.location)
    },
  }
  return {
    details: {
      async expect(post: Post) {
        const post_component = page.getByTestId("Post_single_details")
        await expect(post_component).toContainText(post.title)
        await expect(post_component).toContainText(post.description)
        await expect(post_component).toContainText(post.contact)
        await expect(post_component).toContainText(post.location)
      },
      async waitForUrl(id?: number) {
        if (id) {
          await page.waitForURL(`/post/${id}`)
          await expect(page).toHaveURL(`/post/${id}`)
        } else {
          await page.waitForURL(/\/post\/\d+$/)
          await expect(page).toHaveURL(/\/post\/\d+$/)
        }
      },
      getUrl() {
        return parseInt(page.url().match(/\/post\/(\d+)/)?.[1]!)
      },
      editLink_find(id: number) {
        return page.locator(`a[href="/post/edit/${id}"]`)
      },
    },
    list: {
      async expectItem(post: Post, id: number) {
        const post_list_item = page.getByTestId(`Post_listItem-${id}`)
        await expect(post_list_item).toContainText(post.title)
        await expect(post_list_item).toContainText(post.location)
        return post_list_item
      },
    },
    create: {
      async waitForUrl() {
        await page.waitForURL(/.*post\/create/)
        await expect(page).toHaveURL(/.*post\/create/)
      },
      form,
    },
    edit: {
      async waitForUrl(id: number) {
        await page.waitForURL(`/post/edit/${id}`)
        await expect(page).toHaveURL(`/post/edit/${id}`)
      },
      form,
    },
  }
}
