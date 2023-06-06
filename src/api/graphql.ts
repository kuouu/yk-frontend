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