const END_POINT = `${process.env.END_POINT}/graphql`

const headersList = {
  "Content-Type": "application/json",
}

export const getProductByTagId = async (id: number) => {
  const gqlBody = {
    query: `{
 products(where: {tagId: ${id}}) {
   nodes {
     ... on SimpleProduct {
       name
       regularPrice
       salePrice
       image {
         mediaItemUrl
       }
       link
     }
   }
 }
}`
  }
  const response = await fetch(END_POINT, {
    headers: headersList,
    method: 'POST',
    body: JSON.stringify(gqlBody)
  }).then(res => res.json())

  console.log(response.data.data.products.nodes);
}

export const getCarouselImages = async () => {
  const gqlBody = {
    query: `{
  mediaItems(where: {search: "carousel"}) {
    nodes {
      title
      mediaItemUrl
    }
  }
}`
  }
  const response = await fetch(END_POINT, {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(gqlBody)
  }).then(res => res.json())
  const carouselImages = response.data.mediaItems.nodes.map((item: {
    title: string,
    mediaItemUrl: string
  }) => {
    return item.mediaItemUrl
  }).sort()
  return carouselImages
}

export const getCourses = async () => {
  const gqlBody = {
    query: `{
      products {
        nodes {
          ... on SimpleProduct {
            productId
            name
            image {
              mediaItemUrl
            }
            productTags {
              nodes {
                name
                id
                slug
              }
            }
            price
            salePrice
            slug
            status
          }
        }
      }
    }`
  }
  const response = await fetch(END_POINT, {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(gqlBody)
  }).then(res => res.json())
  const courses = response.data.products.nodes
    .filter((course: any) =>
      course.productTags.nodes.map((n: any) => n.slug).includes('course')
    )
    .map((course: any) => {
      return {
        id: course.productId,
        name: course.name,
        status: course.status,
        price: course.price,
        salePrice: course.salePrice,
        image: course.image.mediaItemUrl,
        slug: course.slug,
      }
    })
  return courses
}
