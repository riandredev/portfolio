export type LifePhoto = {
  src: string
  alt: string
}

/** Home “More about me” fan only — not tied to journal order or entries. */
export const lifePhotos: [LifePhoto, LifePhoto, LifePhoto] = [
  {
    src: '/life/memory-nosy-komba.jpg',
    alt: 'Black-and-white ruffed lemur on a shoulder in Nosy Komba, Madagascar',
  },
  {
    src: '/life/fan-center-tortoise.jpg',
    alt: 'Holding a small tortoise in Nosy Be, Madagascar',
  },
  {
    src: '/life/memory-nosy-iranja.jpg',
    alt: 'White sandbar and turquoise water at Nosy Iranja, Madagascar',
  },
]
