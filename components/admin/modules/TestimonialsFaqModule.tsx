'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, HelpCircle, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import { GlassCard, SectionHeader, FieldLabel, AddButton, DeleteButton, ReorderButtons, ItemRow, PublishToggle, StatusBadge, StarRating, EmptyState } from '../shared';
import { LocalizedInput, LanguageTabs } from '../LanguageTabs';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function TestimonialsFaqModule() {
  const {
    data, addTestimonial, updateTestimonial, deleteTestimonial,
    addFAQ, updateFAQ, deleteFAQ, reorderFAQs,
  } = useAdminData();
  const [tab, setTab] = useState('testimonials');

  return (
    <div className="space-y-6">
      <SectionHeader title="Testimonials & FAQ" subtitle="Manage client reviews and frequently asked questions" icon={MessageSquare} />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted/50 border border-border/50">
          <TabsTrigger value="testimonials" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            Testimonials ({data.testimonials.length})
          </TabsTrigger>
          <TabsTrigger value="faq" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            FAQ ({data.faqs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex justify-end">
            <AddButton onClick={addTestimonial} label="Add Testimonial" />
          </div>
          {data.testimonials.length === 0 ? (
            <EmptyState icon={MessageSquare} title="No testimonials yet" description="Add your first client review." action={<AddButton onClick={addTestimonial} label="Add Testimonial" />} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {data.testimonials.map((t) => (
                  <ItemRow key={t.id}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-bold">
                            {t.clientName.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{t.clientName || 'Unnamed'}</p>
                            <p className="text-xs text-muted-foreground">{t.clientTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <PublishToggle published={t.published} onChange={(v) => updateTestimonial(t.id, { published: v })} />
                          <DeleteButton onClick={() => deleteTestimonial(t.id)} />
                        </div>
                      </div>
                      <StarRating value={t.rating} onChange={(v) => updateTestimonial(t.id, { rating: v })} />
                      <div className="flex items-center justify-end">
                        <LanguageTabs />
                      </div>
                      <LocalizedInput
                        value={t.text}
                        onChange={(v) => updateTestimonial(t.id, { text: v })}
                        label="Review Text"
                        textarea
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <FieldLabel>Client Name</FieldLabel>
                          <Input
                            value={t.clientName}
                            onChange={(e) => updateTestimonial(t.id, { clientName: e.target.value })}
                            className="bg-background/50 h-9"
                          />
                        </div>
                        <div>
                          <FieldLabel>Client Title</FieldLabel>
                          <Input
                            value={t.clientTitle}
                            onChange={(e) => updateTestimonial(t.id, { clientTitle: e.target.value })}
                            className="bg-background/50 h-9"
                          />
                        </div>
                      </div>
                    </div>
                  </ItemRow>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="flex justify-end">
            <AddButton onClick={addFAQ} label="Add FAQ" />
          </div>
          {data.faqs.length === 0 ? (
            <EmptyState icon={HelpCircle} title="No FAQs yet" description="Add your first question and answer." action={<AddButton onClick={addFAQ} label="Add FAQ" />} />
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {[...data.faqs].sort((a, b) => a.order - b.order).map((faq) => (
                  <ItemRow key={faq.id}>
                    <div className="flex items-start gap-3">
                      <ReorderButtons onUp={() => reorderFAQs(faq.id, 'up')} onDown={() => reorderFAQs(faq.id, 'down')} className="mt-1" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-4 w-4 text-gold/50" />
                            <StatusBadge published={faq.published} />
                          </div>
                          <div className="flex items-center gap-2">
                            <PublishToggle
                              published={faq.published}
                              onChange={(v) => updateFAQ(faq.id, { published: v })}
                            />
                            <DeleteButton onClick={() => deleteFAQ(faq.id)} />
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <LanguageTabs />
                        </div>
                        <LocalizedInput
                          value={faq.question}
                          onChange={(v) => updateFAQ(faq.id, { question: v })}
                          label="Question"
                        />
                        <LocalizedInput
                          value={faq.answer}
                          onChange={(v) => updateFAQ(faq.id, { answer: v })}
                          label="Answer"
                          textarea
                        />
                      </div>
                    </div>
                  </ItemRow>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
