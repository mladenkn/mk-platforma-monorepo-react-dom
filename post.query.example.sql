SELECT "public"."Post"."id",
       "public"."Post"."title",
FROM "public"."Post"
WHERE (
  ("public"."Post"."id") IN
    (
      SELECT "t0"."B"
      FROM "public"."_CategoryToPost" AS "t0"
      INNER JOIN "public"."Category" AS "j0" ON ("j0"."id") = ("t0"."A")
      WHERE
      (
        ("j0"."id" = $1 OR "j0"."parent_id" = $2) AND
        "t0"."B" IS NOT NULL
      )
    )
  )
LIMIT 10