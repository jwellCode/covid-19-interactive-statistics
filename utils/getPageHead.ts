interface Head {
  instance: Vue
  title?: string
  description?: string
  image?: string
}

export const getPageHead = ({ instance, title, description, image }: Head) => {
  const meta = [
    {
      hid: "og:url",
      name: "og:url",
      content: instance.$config.baseUrl + instance.$route.path,
    },
  ]

  if (title)
    meta.push({
      hid: "og:title",
      name: "og:title",
      content: title,
    })

  if (description)
    meta.push(
      {
        hid: "description",
        name: "description",
        content: description,
      },
      {
        hid: "og:description",
        name: "og:description",
        content: description,
      }
    )

  if (image)
    meta.push({
      hid: "og:image",
      name: "og:image",
      content: instance.$config.baseUrl + image,
    })

  return { title, meta }
}
