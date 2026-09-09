import { client, sanityConfigured, sanityImageUrl } from './sanity';
import { demoArtwork, demoInstructors, demoPrograms, demoSettings, demoTuition } from '../data/demo';

export type Award = { competition?: string; awardName?: string; level?: string; year?: number; date?: string; url?: string; notes?: string };
export type Instructor = {
  id: string;
  name: string;
  publicTitle?: string;
  bio?: string;
  photo?: string;
};
export type Program = {
  id: string;
  name: string;
  slug: string;
  programType?: string;
  instructor?: string;
  primaryProgram?: boolean;
  displayOrder?: number;
  summary?: string;
  details?: string;
  image?: string;
};
export type Artwork = {
  id: string;
  title: string;
  student: string;
  program?: string;
  programSlug?: string;
  category: string;
  medium?: string;
  year?: number;
  artworkDate?: string;
  className?: string;
  description?: string;
  videoUrl?: string;
  featured?: boolean;
  image: string;
  imageLarge?: string;
  alt?: string;
  awards: Award[];
};
export type SiteSettings = {
  studioName: string;
  tagline: string;
  galleryIntro: string;
  aboutHeading: string;
  aboutText: string;
  contactText: string;
  studioPhotoUrl?: string;
  wechatQrUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagram?: string;
};
export type TuitionSheet = {
  id?: string;
  program: string;
  programSlug?: string;
  primaryProgram?: boolean;
  term: string;
  current?: boolean;
  effectiveDate?: string;
  lastUpdated?: string;
  classCount?: number;
  plans: Array<{ label: string; durationMinutes?: number; semesterPrice: number; regularPrice?: number; note?: string }>;
  notes?: string[];
  registrationCta?: string;
};

const artworkQuery = `*[_type == "artwork" && defined(image.asset) && student->permissionToPublish == true] | order(coalesce(displayOrder, 9999) asc, artworkDate desc, _createdAt desc) {
  "id": _id,
  title,
  "student": student->displayName,
  "program": program->name,
  "programSlug": program->slug.current,
  category,
  medium,
  year,
  artworkDate,
  className,
  description,
  videoUrl,
  featured,
  image,
  "alt": image.alt,
  awards
}`;

export async function getArtwork(): Promise<Artwork[]> {
  if (!sanityConfigured || !client) return demoArtwork;
  const rows = await client.fetch<any[]>(artworkQuery);
  return rows.map((row) => ({
    ...row,
    image: sanityImageUrl(row.image, 900),
    imageLarge: sanityImageUrl(row.image, 1800),
    alt: row.alt || `${row.title} by ${row.student}`,
    awards: row.awards || [],
  }));
}

export async function getFeaturedArtwork(limit = 6) {
  const artwork = await getArtwork();
  const featured = artwork.filter((item) => item.featured);
  return (featured.length ? featured : artwork).slice(0, limit);
}

export async function getPrograms(): Promise<Program[]> {
  if (!sanityConfigured || !client) return demoPrograms;
  const rows = await client.fetch<any[]>(`*[_type == "program" && showOnWebsite != false] | order(coalesce(displayOrder, 9999) asc, name asc) {
    "id": _id,
    name,
    "slug": slug.current,
    programType,
    "instructor": instructor->name,
    primaryProgram,
    displayOrder,
    summary,
    details,
    featuredImage
  }`);
  return rows.map((row) => ({
    ...row,
    image: row.featuredImage ? sanityImageUrl(row.featuredImage, 1200) : undefined,
  }));
}

export async function getInstructors(): Promise<Instructor[]> {
  if (!sanityConfigured || !client) return demoInstructors;
  const rows = await client.fetch<any[]>(`*[_type == "instructor"] | order(name asc) {
    "id": _id,
    name,
    publicTitle,
    bio,
    photo
  }`);
  return rows.map((row) => ({
    ...row,
    photo: row.photo ? sanityImageUrl(row.photo, 900) : undefined,
  }));
}

export async function getTuitionSheets(): Promise<TuitionSheet[]> {
  if (!sanityConfigured || !client) return demoTuition;
  const rows = await client.fetch<any[]>(`*[_type == "tuition" && current == true] | order(coalesce(displayOrder, 9999) asc, program->displayOrder asc, term desc) {
    "id": _id,
    "program": program->name,
    "programSlug": program->slug.current,
    "primaryProgram": program->primaryProgram,
    term,
    current,
    effectiveDate,
    lastUpdated,
    classCount,
    plans,
    notes,
    registrationCta
  }`);
  return rows.length ? rows : demoTuition;
}

export async function getPrimaryTuition(): Promise<TuitionSheet> {
  const sheets = await getTuitionSheets();
  return (sheets.find((sheet) => sheet.primaryProgram) || sheets[0]) as TuitionSheet;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured || !client) return demoSettings;
  const row = await client.fetch<any>(`*[_type == "siteSettings" && _id == "siteSettings"][0]{studioName,tagline,galleryIntro,aboutHeading,aboutText,studioPhoto,wechatQr,contactText,email,phone,address,instagram}`);
  if (!row) return demoSettings;
  return {
    ...demoSettings,
    ...row,
    studioPhotoUrl: row.studioPhoto ? sanityImageUrl(row.studioPhoto, 1200) : undefined,
    wechatQrUrl: row.wechatQr ? sanityImageUrl(row.wechatQr, 900) : undefined,
  };
}
