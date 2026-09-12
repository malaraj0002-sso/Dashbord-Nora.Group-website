'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockData } from './mock-data';
import type {
  AdminData,
  SiteSettings,
  NavItem,
  SocialLink,
  FooterLink,
  HeroSlide,
  AboutSettings,
  AboutFeature,
  Project,
  Material,
  Service,
  ServiceStep,
  Testimonial,
  FAQItem,
  BlogPost,
  LocalizedText,
} from './types';

type AdminContextType = {
  data: AdminData;
  updateSiteSettings: (partial: Partial<SiteSettings>) => void;
  addNavItem: () => void;
  updateNavItem: (id: string, partial: Partial<NavItem>) => void;
  deleteNavItem: (id: string) => void;
  reorderNavItems: (id: string, direction: 'up' | 'down') => void;
  addSocialLink: () => void;
  updateSocialLink: (id: string, partial: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;
  addFooterLink: () => void;
  updateFooterLink: (id: string, partial: Partial<FooterLink>) => void;
  deleteFooterLink: (id: string) => void;
  addHeroSlide: () => void;
  updateHeroSlide: (id: string, partial: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  reorderHeroSlides: (id: string, direction: 'up' | 'down') => void;
  updateAboutSettings: (partial: Partial<AboutSettings>) => void;
  addAboutFeature: () => void;
  updateAboutFeature: (id: string, partial: Partial<AboutFeature>) => void;
  deleteAboutFeature: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, partial: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addMaterial: () => void;
  updateMaterial: (id: string, partial: Partial<Material>) => void;
  deleteMaterial: (id: string) => void;
  addService: () => void;
  updateService: (id: string, partial: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addServiceStep: (serviceId: string) => void;
  updateServiceStep: (serviceId: string, stepId: string, partial: Partial<ServiceStep>) => void;
  deleteServiceStep: (serviceId: string, stepId: string) => void;
  addTestimonial: () => void;
  updateTestimonial: (id: string, partial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addFAQ: () => void;
  updateFAQ: (id: string, partial: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  reorderFAQs: (id: string, direction: 'up' | 'down') => void;
  addBlogPost: () => void;
  updateBlogPost: (id: string, partial: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

const genId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const emptyLocalized: LocalizedText = { ar: '', he: '', en: '' };

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AdminData>(mockData);

  const updateSiteSettings = useCallback((partial: Partial<SiteSettings>) => {
    setData((d) => ({ ...d, siteSettings: { ...d.siteSettings, ...partial } }));
  }, []);

  const addNavItem = useCallback(() => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        navItems: [...d.siteSettings.navItems, {
          id: genId('nav'),
          label: { ...emptyLocalized },
          href: '/',
          order: d.siteSettings.navItems.length,
          visible: true,
        }],
      },
    }));
  }, []);

  const updateNavItem = useCallback((id: string, partial: Partial<NavItem>) => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        navItems: d.siteSettings.navItems.map((n) => (n.id === id ? { ...n, ...partial } : n)),
      },
    }));
  }, []);

  const deleteNavItem = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        navItems: d.siteSettings.navItems.filter((n) => n.id !== id),
      },
    }));
  }, []);

  const reorderNavItems = useCallback((id: string, direction: 'up' | 'down') => {
    setData((d) => {
      const items = [...d.siteSettings.navItems].sort((a, b) => a.order - b.order);
      const idx = items.findIndex((n) => n.id === id);
      if (idx < 0) return d;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= items.length) return d;
      [items[idx].order, items[swapIdx].order] = [items[swapIdx].order, items[idx].order];
      return { ...d, siteSettings: { ...d.siteSettings, navItems: items } };
    });
  }, []);

  const addSocialLink = useCallback(() => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        socialLinks: [...d.siteSettings.socialLinks, { id: genId('sl'), platform: '', url: '', icon: 'instagram' }],
      },
    }));
  }, []);

  const updateSocialLink = useCallback((id: string, partial: Partial<SocialLink>) => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        socialLinks: d.siteSettings.socialLinks.map((s) => (s.id === id ? { ...s, ...partial } : s)),
      },
    }));
  }, []);

  const deleteSocialLink = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        socialLinks: d.siteSettings.socialLinks.filter((s) => s.id !== id),
      },
    }));
  }, []);

  const addFooterLink = useCallback(() => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        footerLinks: [...d.siteSettings.footerLinks, { id: genId('fl'), label: { ...emptyLocalized }, href: '/' }],
      },
    }));
  }, []);

  const updateFooterLink = useCallback((id: string, partial: Partial<FooterLink>) => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        footerLinks: d.siteSettings.footerLinks.map((f) => (f.id === id ? { ...f, ...partial } : f)),
      },
    }));
  }, []);

  const deleteFooterLink = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      siteSettings: {
        ...d.siteSettings,
        footerLinks: d.siteSettings.footerLinks.filter((f) => f.id !== id),
      },
    }));
  }, []);

  const addHeroSlide = useCallback(() => {
    setData((d) => ({
      ...d,
      heroSlides: [...d.heroSlides, {
        id: genId('hero'),
        imageUrl: '',
        title: { ...emptyLocalized },
        subtitle: { ...emptyLocalized },
        ctaText: { ...emptyLocalized },
        ctaLink: '/',
        order: d.heroSlides.length,
        published: false,
      }],
    }));
  }, []);

  const updateHeroSlide = useCallback((id: string, partial: Partial<HeroSlide>) => {
    setData((d) => ({
      ...d,
      heroSlides: d.heroSlides.map((h) => (h.id === id ? { ...h, ...partial } : h)),
    }));
  }, []);

  const deleteHeroSlide = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      heroSlides: d.heroSlides.filter((h) => h.id !== id),
    }));
  }, []);

  const reorderHeroSlides = useCallback((id: string, direction: 'up' | 'down') => {
    setData((d) => {
      const items = [...d.heroSlides].sort((a, b) => a.order - b.order);
      const idx = items.findIndex((h) => h.id === id);
      if (idx < 0) return d;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= items.length) return d;
      [items[idx].order, items[swapIdx].order] = [items[swapIdx].order, items[idx].order];
      return { ...d, heroSlides: items };
    });
  }, []);

  const updateAboutSettings = useCallback((partial: Partial<AboutSettings>) => {
    setData((d) => ({ ...d, aboutSettings: { ...d.aboutSettings, ...partial } }));
  }, []);

  const addAboutFeature = useCallback(() => {
    setData((d) => ({
      ...d,
      aboutSettings: {
        ...d.aboutSettings,
        featureBanners: [...d.aboutSettings.featureBanners, {
          id: genId('af'),
          icon: 'award',
          title: { ...emptyLocalized },
          description: { ...emptyLocalized },
        }],
      },
    }));
  }, []);

  const updateAboutFeature = useCallback((id: string, partial: Partial<AboutFeature>) => {
    setData((d) => ({
      ...d,
      aboutSettings: {
        ...d.aboutSettings,
        featureBanners: d.aboutSettings.featureBanners.map((f) => (f.id === id ? { ...f, ...partial } : f)),
      },
    }));
  }, []);

  const deleteAboutFeature = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      aboutSettings: {
        ...d.aboutSettings,
        featureBanners: d.aboutSettings.featureBanners.filter((f) => f.id !== id),
      },
    }));
  }, []);

  const addProject = useCallback(() => {
    setData((d) => ({
      ...d,
      projects: [...d.projects, {
        id: genId('proj'),
        title: { ...emptyLocalized },
        category: 'Residential',
        imageUrl: '',
        galleryImages: [],
        description: { ...emptyLocalized },
        woodTypes: [],
        published: false,
        featured: false,
        completedDate: new Date().toISOString().split('T')[0],
      }],
    }));
  }, []);

  const updateProject = useCallback((id: string, partial: Partial<Project>) => {
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, ...partial } : p)),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
  }, []);

  const addMaterial = useCallback(() => {
    setData((d) => ({
      ...d,
      materials: [...d.materials, {
        id: genId('mat'),
        name: '',
        type: 'Hardwood',
        textureImageUrl: '',
        description: { ...emptyLocalized },
        specifications: {
          hardness: '', density: '', origin: '', finishType: '', durability: '',
          sustainability: '', moistureContent: '', grainPattern: '', colorTone: '',
          maintenance: '', jankaRating: '', weight: '',
        },
        published: false,
      }],
    }));
  }, []);

  const updateMaterial = useCallback((id: string, partial: Partial<Material>) => {
    setData((d) => ({
      ...d,
      materials: d.materials.map((m) => (m.id === id ? { ...m, ...partial } : m)),
    }));
  }, []);

  const deleteMaterial = useCallback((id: string) => {
    setData((d) => ({ ...d, materials: d.materials.filter((m) => m.id !== id) }));
  }, []);

  const addService = useCallback(() => {
    setData((d) => ({
      ...d,
      services: [...d.services, {
        id: genId('svc'),
        title: { ...emptyLocalized },
        icon: 'armchair',
        imageUrl: '',
        description: { ...emptyLocalized },
        steps: [],
        published: false,
      }],
    }));
  }, []);

  const updateService = useCallback((id: string, partial: Partial<Service>) => {
    setData((d) => ({
      ...d,
      services: d.services.map((s) => (s.id === id ? { ...s, ...partial } : s)),
    }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setData((d) => ({ ...d, services: d.services.filter((s) => s.id !== id) }));
  }, []);

  const addServiceStep = useCallback((serviceId: string) => {
    setData((d) => ({
      ...d,
      services: d.services.map((s) => {
        if (s.id !== serviceId) return s;
        return {
          ...s,
          steps: [...s.steps, {
            id: genId('ss'),
            stepNumber: s.steps.length + 1,
            title: { ...emptyLocalized },
            description: { ...emptyLocalized },
          }],
        };
      }),
    }));
  }, []);

  const updateServiceStep = useCallback((serviceId: string, stepId: string, partial: Partial<ServiceStep>) => {
    setData((d) => ({
      ...d,
      services: d.services.map((s) => {
        if (s.id !== serviceId) return s;
        return {
          ...s,
          steps: s.steps.map((st) => (st.id === stepId ? { ...st, ...partial } : st)),
        };
      }),
    }));
  }, []);

  const deleteServiceStep = useCallback((serviceId: string, stepId: string) => {
    setData((d) => ({
      ...d,
      services: d.services.map((s) => {
        if (s.id !== serviceId) return s;
        return { ...s, steps: s.steps.filter((st) => st.id !== stepId) };
      }),
    }));
  }, []);

  const addTestimonial = useCallback(() => {
    setData((d) => ({
      ...d,
      testimonials: [...d.testimonials, {
        id: genId('test'),
        clientName: '',
        clientTitle: '',
        avatarUrl: '',
        rating: 5,
        text: { ...emptyLocalized },
        published: false,
      }],
    }));
  }, []);

  const updateTestimonial = useCallback((id: string, partial: Partial<Testimonial>) => {
    setData((d) => ({
      ...d,
      testimonials: d.testimonials.map((t) => (t.id === id ? { ...t, ...partial } : t)),
    }));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setData((d) => ({ ...d, testimonials: d.testimonials.filter((t) => t.id !== id) }));
  }, []);

  const addFAQ = useCallback(() => {
    setData((d) => ({
      ...d,
      faqs: [...d.faqs, {
        id: genId('faq'),
        question: { ...emptyLocalized },
        answer: { ...emptyLocalized },
        order: d.faqs.length,
        published: false,
      }],
    }));
  }, []);

  const updateFAQ = useCallback((id: string, partial: Partial<FAQItem>) => {
    setData((d) => ({
      ...d,
      faqs: d.faqs.map((f) => (f.id === id ? { ...f, ...partial } : f)),
    }));
  }, []);

  const deleteFAQ = useCallback((id: string) => {
    setData((d) => ({ ...d, faqs: d.faqs.filter((f) => f.id !== id) }));
  }, []);

  const reorderFAQs = useCallback((id: string, direction: 'up' | 'down') => {
    setData((d) => {
      const items = [...d.faqs].sort((a, b) => a.order - b.order);
      const idx = items.findIndex((f) => f.id === id);
      if (idx < 0) return d;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= items.length) return d;
      [items[idx].order, items[swapIdx].order] = [items[swapIdx].order, items[idx].order];
      return { ...d, faqs: items };
    });
  }, []);

  const addBlogPost = useCallback(() => {
    setData((d) => ({
      ...d,
      blogPosts: [...d.blogPosts, {
        id: genId('blog'),
        title: { ...emptyLocalized },
        slug: '',
        excerpt: { ...emptyLocalized },
        content: { ...emptyLocalized },
        featuredImageUrl: '',
        author: 'Nora Group Team',
        publishedAt: new Date().toISOString().split('T')[0],
        published: false,
        tags: [],
      }],
    }));
  }, []);

  const updateBlogPost = useCallback((id: string, partial: Partial<BlogPost>) => {
    setData((d) => ({
      ...d,
      blogPosts: d.blogPosts.map((b) => (b.id === id ? { ...b, ...partial } : b)),
    }));
  }, []);

  const deleteBlogPost = useCallback((id: string) => {
    setData((d) => ({ ...d, blogPosts: d.blogPosts.filter((b) => b.id !== id) }));
  }, []);

  const value: AdminContextType = {
    data,
    updateSiteSettings,
    addNavItem, updateNavItem, deleteNavItem, reorderNavItems,
    addSocialLink, updateSocialLink, deleteSocialLink,
    addFooterLink, updateFooterLink, deleteFooterLink,
    addHeroSlide, updateHeroSlide, deleteHeroSlide, reorderHeroSlides,
    updateAboutSettings, addAboutFeature, updateAboutFeature, deleteAboutFeature,
    addProject, updateProject, deleteProject,
    addMaterial, updateMaterial, deleteMaterial,
    addService, updateService, deleteService, addServiceStep, updateServiceStep, deleteServiceStep,
    addTestimonial, updateTestimonial, deleteTestimonial,
    addFAQ, updateFAQ, deleteFAQ, reorderFAQs,
    addBlogPost, updateBlogPost, deleteBlogPost,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminData() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider');
  return ctx;
}
