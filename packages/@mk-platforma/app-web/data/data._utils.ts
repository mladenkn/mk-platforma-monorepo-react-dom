export function post_id_getNext() {
  post_id_getNext.last = post_id_getNext.last + 1
  return post_id_getNext.last
}
post_id_getNext.last = 0

export function comment_id_getNext() {
  comment_id_getNext.last = comment_id_getNext.last + 1
  return comment_id_getNext.last
}
comment_id_getNext.last = 0

export function post_image_id_getNext() {
  post_image_id_getNext.last = post_image_id_getNext.last + 1
  return post_image_id_getNext.last
}
post_image_id_getNext.last = 0
