export interface PersonProfile {
  yourName: string;
  herName: string;
  initials: string;
}

export interface DateConfig {
  relationshipStart: string;
  anniversaryDisplay: string;
}

export interface IntroContent {
  lines: [string, string, string];
  revealLine: string;
  buttonLabel: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  supportingText: string;
  featuredImage: string;
  featuredImageAlt: string;
  scrollLabel: string;
}

export interface StoryPrompt {
  label: string;
  value: string;
}

export interface StoryContent {
  title: string;
  message: string;
  prompts: StoryPrompt[];
  photos: {
    src: string;
    alt: string;
    note: string;
  }[];
}

export type TimelineIcon =
  | "sparkles"
  | "heart"
  | "camera"
  | "map"
  | "shield"
  | "gem";

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  location?: string;
  image: string;
  imageAlt: string;
  icon: TimelineIcon;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date: string;
}

export interface LoveNote {
  id: string;
  label: string;
  memory: string;
}

export interface SoundtrackItem {
  id: string;
  title: string;
  artist: string;
  meaning: string;
  coverImage: string;
  coverImageAlt: string;
  previewSrc?: string;
  externalUrl?: string;
}

export interface FutureDream {
  id: string;
  title: string;
  description: string;
}

export interface FinalSurpriseContent {
  titleLines: [string, string];
  question: string;
  primaryButton: string;
  secondaryButton: string;
  celebrationMessage: string;
  celebrationImage: string;
  celebrationImageAlt: string;
}

export interface SeoContent {
  title: string;
  description: string;
  noindex: boolean;
  socialPreviewImage: string;
}

export interface PrivacyGateContent {
  enabled: boolean;
  password: string;
  hint: string;
  disclaimer: string;
}

export interface AnniversaryContent {
  profile: PersonProfile;
  dates: DateConfig;
  seo: SeoContent;
  intro: IntroContent;
  audio: {
    src: string;
    label: string;
  };
  hero: HeroContent;
  story: StoryContent;
  timeline: TimelineItem[];
  gallery: GalleryImage[];
  reasons: string[];
  surpriseReason: string;
  loveNotes: LoveNote[];
  loveLetter: string;
  soundtrack: SoundtrackItem[];
  futureDreams: FutureDream[];
  futurePromise: string;
  finalSurprise: FinalSurpriseContent;
  privacyGate: PrivacyGateContent;
}
