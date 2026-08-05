import type { AnniversaryContent } from "@/src/types/anniversary";

export const anniversaryContent: AnniversaryContent = {
  profile: {
    yourName: "[YOUR NAME]",
    herName: "[HER NAME]",
    initials: "YH",
  },
  dates: {
    relationshipStart: "2025-08-05T00:00:00",
    anniversaryDisplay: "[ANNIVERSARY DATE]",
  },
  seo: {
    title: "[YOUR NAME] & [HER NAME] — Our First Year",
    description: "A private celebration of one beautiful year together.",
    noindex: true,
    socialPreviewImage: "/images/social-preview.svg",
  },
  intro: {
    lines: ["365 days.", "Countless memories.", "One beautiful story."],
    revealLine: "Happy One Year, [HER NAME].",
    buttonLabel: "Open Our Story",
  },
  audio: {
    src: "/music/our-song.mp3",
    label: "Our Song",
  },
  hero: {
    eyebrow: "[ANNIVERSARY DATE] — Our First Anniversary",
    heading: "A year with you has felt like my favorite dream.",
    supportingText:
      "Every laugh, every late-night conversation, every quiet moment, and every adventure became part of the most beautiful year of my life.",
    featuredImage: "/images/featured-couple.jpg",
    featuredImageAlt: "A romantic portrait celebrating your first anniversary together.",
    scrollLabel: "Scroll to continue our story",
  },
  story: {
    title: "How it all began",
    message:
      "I still remember the beginning—not because everything was perfect, but because something about you already felt different. Somewhere between our first conversations and all the moments that followed, you became my favorite person.",
    prompts: [
      {
        label: "Where we first met",
        value: "[EDIT THIS: Where we first met]",
      },
      {
        label: "Our first conversation",
        value: "[EDIT THIS: What we first talked about]",
      },
      {
        label: "My first impression of her",
        value: "[EDIT THIS: Your first impression]",
      },
      {
        label: "The moment I realized she was special",
        value: "[EDIT THIS: The moment it became real]",
      },
    ],
    photos: [
      {
        src: "/images/story-01.jpg",
        alt: "A treasured memory from your early days together.",
        note: "The beginning",
      },
      {
        src: "/images/story-02.jpg",
        alt: "A candid moment of joy together.",
        note: "A laugh I still hear",
      },
      {
        src: "/images/story-03.jpg",
        alt: "A quiet intimate snapshot of your love.",
        note: "Where love became home",
      },
    ],
  },
  timeline: [
    {
      id: "met",
      date: "[DATE]",
      title: "The day we met",
      description:
        "The day our paths crossed and everything quietly began to change.",
      location: "[LOCATION]",
      image: "/images/timeline-01.jpg",
      imageAlt: "A memory from the day you met.",
      icon: "sparkles",
    },
    {
      id: "first-date",
      date: "[DATE]",
      title: "Our first proper date",
      description:
        "Nervous smiles, endless conversation, and that feeling of wanting time to pause.",
      location: "[LOCATION]",
      image: "/images/timeline-02.jpg",
      imageAlt: "A memory from your first proper date.",
      icon: "heart",
    },
    {
      id: "first-photo",
      date: "[DATE]",
      title: "Our first photograph together",
      description:
        "One frame that now holds the beginning of so many more memories.",
      image: "/images/timeline-03.jpg",
      imageAlt: "Your first photo together.",
      icon: "camera",
    },
    {
      id: "adventure",
      date: "[DATE]",
      title: "Our favorite adventure",
      description:
        "A day of wandering, laughing, and collecting moments we still replay.",
      location: "[LOCATION]",
      image: "/images/timeline-04.jpg",
      imageAlt: "A favorite adventure memory.",
      icon: "map",
    },
    {
      id: "challenge",
      date: "[DATE]",
      title: "A difficult moment we overcame",
      description:
        "A chapter that taught us how strong we are when we choose each other.",
      image: "/images/timeline-05.jpg",
      imageAlt: "A meaningful moment of support and strength.",
      icon: "shield",
    },
    {
      id: "anniversary",
      date: "[ANNIVERSARY DATE]",
      title: "Our first anniversary",
      description:
        "365 days later, and my heart still finds new ways to love you.",
      image: "/images/timeline-06.jpg",
      imageAlt: "A celebratory first-anniversary portrait.",
      icon: "gem",
    },
  ],
  gallery: [
    {
      id: "memory-01",
      src: "/images/memory-01.jpg",
      alt: "A smiling candid memory together.",
      caption: "The smile I never get tired of.",
      date: "[DATE]",
    },
    {
      id: "memory-02",
      src: "/images/memory-02.jpg",
      alt: "A quiet candid day together.",
      caption: "One of those ordinary days that became unforgettable.",
      date: "[DATE]",
    },
    {
      id: "memory-03",
      src: "/images/memory-03.jpg",
      alt: "A playful memory together.",
      caption: "Us, being completely ourselves.",
      date: "[DATE]",
    },
    {
      id: "memory-04",
      src: "/images/memory-04.jpg",
      alt: "A meaningful intimate memory.",
      caption: "A moment I wish I could live twice.",
      date: "[DATE]",
    },
    {
      id: "memory-05",
      src: "/images/memory-05.jpg",
      alt: "A warm affectionate portrait.",
      caption: "My favorite place has always been next to you.",
      date: "[DATE]",
    },
    {
      id: "memory-06",
      src: "/images/memory-06.jpg",
      alt: "A stylish portrait together.",
      caption: "Still my favorite view.",
      date: "[DATE]",
    },
    {
      id: "memory-07",
      src: "/images/memory-07.jpg",
      alt: "A memory from an evening together.",
      caption: "Golden hour, golden heart.",
      date: "[DATE]",
    },
    {
      id: "memory-08",
      src: "/images/memory-08.jpg",
      alt: "A travel memory full of joy.",
      caption: "You made every place feel like home.",
      date: "[DATE]",
    },
    {
      id: "memory-09",
      src: "/images/memory-09.jpg",
      alt: "A cozy day together.",
      caption: "Quiet love, loud meaning.",
      date: "[DATE]",
    },
    {
      id: "memory-10",
      src: "/images/memory-10.jpg",
      alt: "A portrait filled with laughter.",
      caption: "The kind of happiness I prayed for.",
      date: "[DATE]",
    },
    {
      id: "memory-11",
      src: "/images/memory-11.jpg",
      alt: "A spontaneous outing memory.",
      caption: "An ordinary day that became art.",
      date: "[DATE]",
    },
    {
      id: "memory-12",
      src: "/images/memory-12.jpg",
      alt: "A final cherished memory in this collection.",
      caption: "Forever starts in moments like this.",
      date: "[DATE]",
    },
  ],
  reasons: [
    "The way you make ordinary days feel special",
    "Your kindness when nobody is watching",
    "The way your eyes change when you are excited",
    "How safe and understood I feel with you",
    "Your laugh, especially the uncontrollable one",
    "The way you believe in me",
    "How we can be silly and serious together",
    "The comfort of simply sitting beside you",
    "Your strength during difficult moments",
    "The way you remember tiny details",
    "How you inspire me to become better",
    "The fact that loving you feels like home",
  ],
  surpriseReason: "And the biggest reason? Because you are completely, beautifully you.",
  loveNotes: [
    {
      id: "nickname",
      label: "The first nickname you gave me",
      memory: "[EDIT THIS MEMORY]",
    },
    {
      id: "inside-joke",
      label: "Our funniest inside joke",
      memory: "[EDIT THIS MEMORY]",
    },
    {
      id: "song",
      label: "The song that became ours",
      memory: "[EDIT THIS MEMORY]",
    },
    {
      id: "food",
      label: "The food we always order",
      memory: "[EDIT THIS MEMORY]",
    },
    {
      id: "name",
      label: "The way you say my name",
      memory: "[EDIT THIS MEMORY]",
    },
    {
      id: "conversation",
      label: "Our longest late-night conversation",
      memory: "[EDIT THIS MEMORY]",
    },
    {
      id: "habit",
      label: "A small habit of yours that I secretly adore",
      memory: "[EDIT THIS MEMORY]",
    },
  ],
  loveLetter: `My love,

A year ago, I could not have imagined how much one person could change the rhythm of my life. You entered my world and slowly made it warmer, brighter, softer, and more meaningful.

This year gave us laughter, long conversations, unexpected adventures, small disagreements, quiet comfort, and memories I will carry with me for the rest of my life. Through every version of this year, I kept finding new reasons to choose you.

Thank you for your patience, your honesty, your affection, and the beautiful way you care. Thank you for making space for all parts of me. Thank you for being the person I want to tell everything to.

I do not love you only for our happiest moments. I love you for the way we continue to understand each other, forgive each other, support each other, and grow together.

Our first year will always be special to me, but what excites me most is knowing that this is only the beginning.

Happy anniversary, my love.

Forever yours,
[YOUR NAME]`,
  soundtrack: [
    {
      id: "song-01",
      title: "[REPLACE] Song title one",
      artist: "[REPLACE] Artist name",
      meaning: "The track that sounds exactly like our late-night drives.",
      coverImage: "/images/song-01.jpg",
      coverImageAlt: "Album cover placeholder for song one.",
      previewSrc: "/music/song-01.mp3",
    },
    {
      id: "song-02",
      title: "[REPLACE] Song title two",
      artist: "[REPLACE] Artist name",
      meaning: "The melody that always takes me back to your smile.",
      coverImage: "/images/song-02.jpg",
      coverImageAlt: "Album cover placeholder for song two.",
      previewSrc: "/music/song-02.mp3",
    },
    {
      id: "song-03",
      title: "[REPLACE] Song title three",
      artist: "[REPLACE] Artist name",
      meaning: "Our soft, rainy-evening soundtrack.",
      coverImage: "/images/song-03.jpg",
      coverImageAlt: "Album cover placeholder for song three.",
    },
    {
      id: "song-04",
      title: "[REPLACE] Song title four",
      artist: "[REPLACE] Artist name",
      meaning: "The one that feels like our future in a chorus.",
      coverImage: "/images/song-04.jpg",
      coverImageAlt: "Album cover placeholder for song four.",
      externalUrl: "https://example.com/replace-with-your-link",
    },
  ],
  futureDreams: [
    {
      id: "dates",
      title: "More spontaneous dates",
      description: "The kind where we pick a direction and let the day surprise us.",
    },
    {
      id: "trip",
      title: "A trip we have always talked about",
      description: "Passport stamps, shared playlists, and sunsets with your hand in mine.",
    },
    {
      id: "learn",
      title: "Learning something new together",
      description: "Because growing beside you makes everything feel possible.",
    },
    {
      id: "milestones",
      title: "Celebrating more milestones",
      description: "Quiet victories, big dreams, and every chapter in between.",
    },
    {
      id: "support",
      title: "Supporting each other's dreams",
      description: "Being each other's calm in every season.",
    },
    {
      id: "home",
      title: "Building a life filled with laughter and peace",
      description: "A home made from love, patience, and shared wonder.",
    },
  ],
  futurePromise:
    "I cannot promise that every day will be perfect. But I can promise that I will keep choosing us.",
  finalSurprise: {
    titleLines: ["One year down.", "A lifetime of choosing you to go."],
    question: "Will you keep writing this story with me?",
    primaryButton: "Yes, always.",
    secondaryButton: "Obviously yes.",
    celebrationMessage: "Best answer ever. I love you, [HER NAME]. Happy anniversary.",
    celebrationImage: "/images/final-photo.jpg",
    celebrationImageAlt: "A final romantic memory together.",
  },
  privacyGate: {
    enabled: false,
    password: "our-story",
    hint: "Use a short phrase only the two of you would know.",
    disclaimer:
      "This is a lightweight privacy gate for a personal surprise site, not strong authentication.",
  },
};
