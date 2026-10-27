export type Memory = {
  id: string
  image: string
  alt: string
  when: string
  title: string
  /** Journal paragraphs */
  body: string[]
  /** Spotify track ID (30s preview when available) */
  spotifyTrackId: string
  /** Optional `object-position` for the photo crop (default center). */
  imageObjectPosition?: string
}

/**
 * Edit copy and swap `spotifyTrackId` / images in /public/life/ anytime.
 * Odysseo collage: tile sources in content/life-sources/odysseo/ — rebuild with `npm run optimize:life-images`.
 * Track ID: Spotify → Share → Copy link → id after `track/`.
 *
 * Order: newest first (top of the list = most recent on /about).
 */
export const memories: Memory[] = [
  {
    id: 'cape-town',
    image: '/life/memory-cape-town.jpg',
    alt: 'Residential street with STOP marking and mountain view under blue sky in Cape Town, South Africa',
    when: 'February 2026',
    title: 'Muizenberg, Cape Town',
    body: [
      'I was in Muizenberg for AIMS, helping on their website on-site. The week was full-on and it ended well, they were happy with where we landed.',
      'One evening I walked near my stay and stopped at this road. It just kept going toward the mountain. Felt like a good close to the trip.',
    ],
    spotifyTrackId: '6XK6Zw6JkFsHXzAcMWNiIr',
  },
  {
    id: 'odysseo-oceanarium',
    image: '/life/memory-odysseo.jpg',
    alt: 'Four-photo collage at the shark tunnel at Odysseo Oceanarium, Mauritius',
    when: 'January 2026',
    title: 'Odysseo Oceanarium, Mauritius',
    body: [
      'One of the last things we did in Mauritius. My girlfriend and I walked through the place slowly, it was calm, just tanks and low light and time to breathe.',
      'I was taking her photo and asked her to look behind her and there was a shark swimming past. She’s a shark lover so she was completely stunned. The collage is that moment in a few frames.',
    ],
    spotifyTrackId: '6oYkwjI1TKP9D0Y9II1GT7',
  },
  {
    id: 'ssr-botanical-garden',
    image: '/life/memory-ssr-botanical.jpg',
    alt: 'Two white ducks on a shaded path among palms at Sir Seewoosagur Ramgoolam Botanical Garden, Mauritius',
    when: 'January 2026',
    title: 'Sir Seewoosagur Ramgoolam Botanical Garden, Mauritius',
    body: [
      'We loved this place. Slow peaceful walk through the gardens shade, birds and these ducks waddling along without a care in the world.',
      'There’s a lot of history here, too. Monuments and ancient trees are worth a stop. It was one of the quietest afternoons we had in Mauritius.',
    ],
    spotifyTrackId: '2BnTUxzWAcv0qerzESIunY',
  },
  {
    id: 'chamarel-waterfall',
    image: '/life/memory-chamarel.jpg',
    alt: 'Twin waterfalls plunging into a green gorge at Chamarel, Mauritius',
    when: 'January 2026',
    title: 'Chamarel Waterfall, Mauritius',
    body: [
      'About an hour in the car to get here. The drive was part of it, with the windows down, the breeze, and green everywhere.',
      'The waterfall itself was worth the trip. Gorgeous spot, and a good reminder of how different another country’s nature feels from home.',
    ],
    spotifyTrackId: '2LawezPeJhN4AWuSB0GtAU',
  },
  {
    id: 'mauritius',
    image: '/life/memory-mauritius.jpg',
    alt: 'Tamil Surya Oudya Sangam Temple with protective netting over the tower, Grand Baie, Mauritius',
    when: 'January 2026',
    title: 'Grand Baie, Mauritius',
    body: [
      'We were walking to the supermarket and passed this on the way. Tamil Surya Oudya Sangam Temple, bright against the wall and the sky.',
      'The net over the tower is there to keep monkeys and birds from sitting on it and causing trouble. I still remember the incense in the air and how different it felt from anything familiar at home.',
    ],
    spotifyTrackId: '6JRLFiX9NJSoRRKxowlBYr',
  },
  {
    id: 'mon-choisy-beach',
    image: '/life/memory-mon-choisy-framed.jpg',
    alt: 'Couple on the beach with turquoise water and cloudy sky at Mon Choisy Public Beach, Mauritius',
    when: 'January 2026',
    title: 'Mon Choisy Public Beach, Mauritius',
    body: [
      'Our first beach in Mauritius. We found a quieter stretch not many people seemed to use. Peaceful, clear water, good weather.',
      'We came back to swim here a few times. In some spots you can even see coral from the shore. This photo is from one of those afternoons.',
    ],
    spotifyTrackId: '2MLHyLy5z5l5YRp7momlgw',
  },
  {
    id: 'pretoria-zoo',
    image: '/life/memory-pretoria-zoo.jpg',
    alt: 'Flamingos and pigeons at the water at National Zoological Garden, Pretoria, South Africa',
    when: 'February 2025',
    title: 'National Zoological Garden, Pretoria, South Africa',
    body: [
      'We went to Pretoria zoo on a Sunday morning. Not many people around, which made it feel calm. We saw a lot of animals, but unfortunately no elephants.',
      'I liked these flamingos all together in one spot. I do not see flamingos often, so this stuck with me.',
    ],
    spotifyTrackId: '6Hu6dzwlvoyg3zBUC8k4BK',
  },
  {
    id: 'walter-sisulu-botanical',
    image: '/life/memory-walter-sisulu-botanical.jpg',
    alt: 'Calico cat Ombre on a mossy rock among greenery at Walter Sisulu National Botanical Garden, South Africa',
    when: 'January 2025',
    title: 'Walter Sisulu National Botanical Garden, South Africa',
    body: [
      'This is Ombre, a cat who lives in the gardens. She was on this rock when we found her, calm and used to people walking past.',
      'She had kittens with her too. It was amazing to see them and their mother moving through the grass together. One of those small moments that made the whole visit feel special.',
    ],
    spotifyTrackId: '7vggqxNKwd6xdRoYS0pQtM',
  },
  {
    id: 'nosy-iranja',
    image: '/life/memory-nosy-iranja.jpg',
    alt: 'White sandbar and turquoise water at Nosy Iranja, Madagascar',
    when: 'July 2024',
    title: 'Nosy Iranja, Madagascar',
    body: [
      'One of the clearest beaches I have ever seen. Stand in the water and you can see your feet, clear like glass. The sandbar and the colour of the sea still feel unreal when I think back.',
      'The sun absolutely grilled me that day, but it was great fun anyway. I do not think I will ever forget this place.',
    ],
    spotifyTrackId: '1tqNjCuAIoG1kyBfs8DfZE',
  },
  {
    id: 'nosy-komba',
    image: '/life/memory-nosy-komba.jpg',
    alt: 'Black-and-white ruffed lemur on a shoulder in Nosy Komba, Madagascar',
    when: 'July 2024',
    title: 'Nosy Komba, Madagascar',
    body: [
      'We walked through the trees at Nosy Komba feeding lemurs bananas. They were bold, climbing on whoever stood still long enough.',
      'At one point I had three on my shoulders at once. My girlfriend was a little upset because they never jumped on hers. I personally think it is because she is a little short, haha.',
    ],
    spotifyTrackId: '51R2M1JgyFfRS3e6v5wCt3',
  },
  {
    id: 'nosy-be',
    image: '/life/memory-nosy-be.jpg',
    alt: 'Stone steps through lush greenery in Nosy Be, Madagascar',
    when: 'June - July 2024',
    title: 'Nosy Be, Madagascar',
    body: [
      'These stairs led up to where we were staying. Everything around it was green, with native birds and monkeys in the trees if you looked up long enough.',
      'The humidity was really high, but I remember how it felt to be there more than the heat.',
    ],
    spotifyTrackId: '679sVn8IvjSfGJuKTIK6hP',
  },
]
