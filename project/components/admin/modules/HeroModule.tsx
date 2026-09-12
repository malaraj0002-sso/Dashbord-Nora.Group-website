'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import {
  GlassCard,
  SectionHeader,
  ImageUpload,
  FieldLabel,
  AddButton,
  DeleteButton,
  ReorderButtons,
  ItemRow,
  PublishToggle,
  StatusBadge,
} from '../shared';
import { LocalizedInput, LanguageTabs } from '../LanguageTabs';
import { Input } from '@/components/ui/input';

export function HeroModule() {
  const {
    data,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    reorderHeroSlides,
  } = useAdminData();

  const { heroSlides } = data;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Hero & Slider Manager"
        subtitle="Manage homepage hero slides with images, titles, and CTAs"
        icon={ImageIcon}
        action={<AddButton onClick={addHeroSlide} label="Add Slide" />}
      />

      <div className="space-y-4">
        <AnimatePresence>
          {[...heroSlides]
            .sort((a, b) => a.order - b.order)
            .map((slide) => (
              <ItemRow key={slide.id}>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <ReorderButtons
                      onUp={() => reorderHeroSlides(slide.id, 'up')}
                      onDown={() => reorderHeroSlides(slide.id, 'down')}
                    />
                  </div>

                  <div className="w-48 shrink-0">
                    <ImageUpload
                      value={slide.imageUrl}
                      onChange={(url) =>
                        updateHeroSlide(slide.id, { imageUrl: url })
                      }
                      label="Slide Image"
                      aspect="aspect-video"
                    />

                    {slide.imageUrl && (
                      <div className="mt-2 flex items-center justify-between">
                        <StatusBadge published={slide.published} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gold">
                        Slide #{slide.order + 1}
                      </span>

                      <div className="flex items-center gap-3">
                        <PublishToggle
                          published={slide.published}
                          onChange={(v) =>
                            updateHeroSlide(slide.id, { published: v })
                          }
                        />

                        <DeleteButton
                          onClick={() => deleteHeroSlide(slide.id)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <LanguageTabs />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <LocalizedInput
                        value={slide.title}
                        onChange={(v) =>
                          updateHeroSlide(slide.id, { title: v })
                        }
                        label="Title"
                      />

                      <LocalizedInput
                        value={slide.subtitle}
                        onChange={(v) =>
                          updateHeroSlide(slide.id, { subtitle: v })
                        }
                        label="Subtitle"
                        textarea
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <LocalizedInput
                          value={slide.ctaText}
                          onChange={(v) =>
                            updateHeroSlide(slide.id, { ctaText: v })
                          }
                          label="CTA Button Text"
                        />

                        <div>
                          <FieldLabel>CTA Link</FieldLabel>

                          <Input
                            value={slide.ctaLink}
                            onChange={(e) =>
                              updateHeroSlide(slide.id, {
                                ctaLink: e.target.value,
                              })
                            }
                            className="bg-background/50 h-10"
                            placeholder="/projects"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ItemRow>
            ))}
        </AnimatePresence>

        {heroSlides.length === 0 && (
          <GlassCard className="text-center py-12">
            <ImageIcon className="h-10 w-10 text-gold/30 mx-auto mb-3" />

            <p className="text-sm text-muted-foreground">
              No hero slides yet. Click &quot;Add Slide&quot; to create one.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}