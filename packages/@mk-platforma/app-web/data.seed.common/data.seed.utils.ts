import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { PostGenerator_context as PostGenerator_context } from "./data.gen.utils"
import { Post_api_create_input } from "~/domain/post/Post.api.cu.input"
import { z } from "zod"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import Post_api_create from "~/domain/post/Post.api.create"
import { Comment, Image } from "~/drizzle/drizzle.schema"
import { Category } from "~/domain/category/Category.schema"
import { Category_code } from "~/domain/category/Category.types"

type WithImages = { images?: { url: string; isMain?: boolean }[] }

export function data_initial_post_gen_base<TPost extends WithImages>(
  { locations, users }: PostGenerator_context,
  post: TPost,
) {
  return {
    description: generateArray(() => "opis oglasa ", 30).join(""),
    location: faker.helpers.arrayElement(locations),
    contact: faker.helpers.arrayElement([faker.phone.number(), faker.internet.email()]),
    comments: generateArray(
      () => ({
        content: generateArray(() => "komentar ", 20).join(""),
        author_id: faker.helpers.arrayElement(users)!.id,
      }),
      faker.datatype.number({ min: 0, max: 7 }),
    ),
    title: faker.lorem.words(),
    user_id: faker.helpers.arrayElement(users).id,

    ...post,

    images: post.images && post_gen_images_addIsMain(post.images),
  }
}

function post_gen_images_addIsMain(images: { url: string; isMain?: boolean }[]) {
  if (!images?.length) return []
  const images_mapped = images.map(image => ({
    ...image,
    isMain: image.isMain || false,
  }))
  const hasMain = images_mapped.some(image => image.isMain)
  if (!hasMain) {
    const randomItem = faker.helpers.arrayElement(images_mapped)
    randomItem.isMain = true
  }
  return images_mapped
}

type data_seed_post = Omit<z.infer<typeof Post_api_create_input>, "images"> & {
  user_id: number
  comments: { content: string; author_id: number }[]
  images?: { url: string }[]
}

async function data_seed_post_insert(db: Drizzle_instance, post: data_seed_post) {
  const images_created = post.images?.length
    ? await db.insert(Image).values(post.images).returning()
    : undefined

  const ctx = { user: { id: post.user_id }, db }
  const post_created = await Post_api_create(ctx, {
    ...post,
    images: images_created,
  })

  if (!post.comments?.length) return

  const comments_mapped = post.comments.map(c => ({
    ...c,
    post_id: post_created.id,
  }))
  await db.insert(Comment).values(comments_mapped)
}

export async function data_initial_post_insert_many(db: Drizzle_instance, posts: data_seed_post[]) {
  for (const post of posts) {
    await data_seed_post_insert(db, post)
  }
}

export type Data_initial_Category_insert_single_props = {
  code: Category_code
  parent_id?: number
  label_hr: string
  icon_mui: string
  children?: Omit<Data_initial_Category_insert_single_props, "children">[]
}

export async function data_initial_categories_insert(
  db: Drizzle_instance,
  _categories: Data_initial_Category_insert_single_props[],
) {
  for (const category of _categories) {
    const category_inserted = await db
      .insert(Category)
      .values(category)
      .returning()
      .then(c => c[0])

    if (!category.children) continue

    const children_mapped = category.children.map(c => ({ ...c, parent_id: category_inserted.id }))
    await db.insert(Category).values(children_mapped)
  }
}
