import { object, string, minLength, nonEmpty, number, pipe, minValue, maxValue, custom } from 'valibot';



export const bookSchema = object({
    title: pipe(string(), nonEmpty('Title is required')),
    author: pipe(string(), nonEmpty('Author is required')),
    price: pipe(number(), nonEmpty('Price is required'), minValue(0, 'Price must be at least 0.')),
    genre: pipe(string(), nonEmpty('Genre is required')),
    rating: pipe(number(), nonEmpty('Rating is required'), minValue(0, 'Rating must be at least 0'),
        maxValue(5, 'Rating must be at most 5')),
    summary: pipe(string(), nonEmpty('Summary is required'), minLength(10, 'Must have at least 10 characters')),
    image: custom(
        (file) => file instanceof File && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024,
        'A book cover image is required and must be an image less than 5MB'),
})

export const editBookSchema = object({
  title: pipe(string(), nonEmpty('Title is required')),
  author: pipe(string(), nonEmpty('Author is required')),
  price: pipe(number(), nonEmpty('Price is required'), minValue(0, 'Price must be at least 0')),
  genre: pipe(string(), nonEmpty('Genre is required')),
  rating: pipe(number(), nonEmpty('Rating is required'), minValue(0, 'Rating must be at least 0'), maxValue(5, 'Rating must be at most 5')),
  summary: pipe(string(),  minLength(10, 'Must have at least 10 characters.'), nonEmpty('Summary is required'),),
  // ✅ allow string (existing image) OR File
  image: custom(
    (value) =>
      (typeof value === "string" && value.trim() !== "") ||
      (value instanceof File && value.type.startsWith("image/") && value.size <= 5 * 1024 * 1024),
    "A valid book cover image is required (existing or new file < 5MB)."
  ),
});