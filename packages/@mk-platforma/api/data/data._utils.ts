export function post_id_getNext() {
  post_id_getNext.last = post_id_getNext.last + 1
  return post_id_getNext.last
}
post_id_getNext.last = 0
