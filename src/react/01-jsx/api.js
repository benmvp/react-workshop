import { formatUrl } from 'url-lib'

/**
 * @typedef {'' | 'g' | 'pg' | 'pg-13' | 'r'} RatingFiler The MPAA-style rating for a GIF
 * @typedef {'G' | 'PG' | 'PG-13' | 'R'} Rating The MPAA-style rating for a GIF
 *
 * @typedef GiphyResult
 * @type {object}
 * @property {string} id The GIF's unique ID
 * @property {string} title The title that appears on giphy.com for this GIF
 * @property {string} url The unique URL for the GIF
 * @property {Rating} rating The MPAA-style rating for the GIF
 * @property {string} previewUrl The URL for the GIF in .MP4 format
 *
 * Retrieves a list of giphy image info matching the specified search parameters
 * @param {object} [params] Search parameters
 * @param {string} [params.searchQuery=''] Search query term or phrase
 * @param {RatingFilter} [params.rating=''] Filters results by specified rating. Not specifying a rating, returns all possible ratings
 * @param {number} [params.limit=12] The maximum number of images to return
 * @param {number} [params.offset=0] Specifies the starting position of the results.
 * @returns {Promise<GiphyResult[]>} The results wrapped in a promise
 */
export const getResults = async ({
  searchQuery = '',
  rating = '',
  limit = 12,
  offset = 0,
} = {}) => {
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

    return data.data.map(({ id, title, url, images, rating }) => ({
      id,
      title,
      url,
      rating: rating.toUpperCase(),
      previewUrl: images.preview.mp4,
    }))
  } catch (ex) {
    console.error(ex)
  }
  return []
}
