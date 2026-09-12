export type LangCode = 'ar' | 'he' | 'en';

export type LocalizedText = {
  ar: string;
  he: string;
  en: string;
};

export type NavItem = {
  id: string;
  label: LocalizedText;
  href: string;
  order: number;
  visible: boolean;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string;
};

export type FooterLink = {
  id: string;
  label: LocalizedText;
  href: string;
};

export type SiteSettings = {
  logoUrl: string;
  siteName: string;
  tagline: LocalizedText;
  contactEmail: string;
  contactPhone: string;
  contactAddress: LocalizedText;
  navItems: NavItem[];
  footerCopyright: LocalizedText;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
};

export type HeroSlide = {
  id: string;
  imageUrl: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  ctaText: LocalizedText;
  ctaLink: string;
  order: number;
  published: boolean;
};

export type AboutFeature = {
  id: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type AboutSettings = {
  story: LocalizedText;
  vision: LocalizedText;
  mission: LocalizedText;
  featureBanners: AboutFeature[];
};

export type Project = {
  id: string;
  title: LocalizedText;
  category: string;
  imageUrl: string;
  galleryImages: string[];
  description: LocalizedText;
  woodTypes: string[];
  published: boolean;
  featured: boolean;
  completedDate: string;
};

export type MaterialSpec = {
  hardness: string;
  density: string;
  origin: string;
  finishType: string;
  durability: string;
  sustainability: string;
  moistureContent: string;
  grainPattern: string;
  colorTone: string;
  maintenance: string;
  jankaRating: string;
  weight: string;
};

export type Material = {
  id: string;
  name: string;
  type: string;
  textureImageUrl: string;
  description: LocalizedText;
  specifications: MaterialSpec;
  published: boolean;
};

export type ServiceStep = {
  id: string;
  stepNumber: number;
  title: LocalizedText;
  description: LocalizedText;
};

export type Service = {
  id: string;
  title: LocalizedText;
  icon: string;
  imageUrl: string;
  description: LocalizedText;
  steps: ServiceStep[];
  published: boolean;
};

export type Testimonial = {
  id: string;
  clientName: string;
  clientTitle: string;
  avatarUrl: string;
  rating: number;
  text: LocalizedText;
  published: boolean;
};

export type FAQItem = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  order: number;
  published: boolean;
};

export type BlogPost = {
  id: string;
  title: LocalizedText;
  slug: string;
  excerpt: LocalizedText;
  content: LocalizedText;
  featuredImageUrl: string;
  author: string;
  publishedAt: string;
  published: boolean;
  tags: string[];
};

export type AdminData = {
  siteSettings: SiteSettings;
  heroSlides: HeroSlide[];
  aboutSettings: AboutSettings;
  projects: Project[];
  materials: Material[];
  services: Service[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  blogPosts: BlogPost[];
};
