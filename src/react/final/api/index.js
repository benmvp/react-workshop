import { formatUrl } from 'url-lib'

export const getResults = async ({
  searchQuery,
  rating = 'G',
  limit = 10,
  offset = 0,
}) => {
  try {
    const resp = await fetch(
      formatUrl(
        'https://api.giphy.com/v1/gifs/search?api_key=7B4oce3a0BmGU5YC22uOFOVg7JJtWcpH',
        {
          q: searchQuery,
          rating,
          limit,
          offset,
          lang: 'en',
        },
      ),
    )
    const data = await resp.json()

    return data.data.map((item) => ({
      url: item.url,
      imageUrl: item.images.preview.mp4,
    }))
  } catch (ex) {
    console.error(ex)
  }
  return []
}
