'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Trash2, X } from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import { GlassCard, SectionHeader, ImageUpload, FieldLabel, AddButton, DeleteButton, ItemRow, PublishToggle, StatusBadge, EmptyState } from '../shared';
import { LocalizedInput, LanguageTabs } from '../LanguageTabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function BlogModule() {
  const { data, addBlogPost, updateBlogPost, deleteBlogPost } = useAdminData();
  const { blogPosts } = data;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');

  const editingPost = blogPosts.find((p) => p.id === editingId);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Blog Manager"
        subtitle="Manage articles, featured images, and content"
        icon={FileText}
        action={<AddButton onClick={addBlogPost} label="Add Article" />}
      />

      {blogPosts.length === 0 ? (
        <EmptyState icon={FileText} title="No articles yet" description="Write your first blog post." action={<AddButton onClick={addBlogPost} label="Add Article" />} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard hover className="cursor-pointer group" >
                  <div onClick={() => setEditingId(post.id)}>
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-background/50">
                      {post.featuredImageUrl ? (
                        <img src={post.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <StatusBadge published={post.published} />
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">{post.title.en || 'Untitled'}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{post.excerpt.en}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{post.publishedAt}</span>
                      <div className="flex gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] text-gold/70 border-gold/20">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
          {editingPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Edit Article
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <PublishToggle
                    published={editingPost.published}
                    onChange={(v) => updateBlogPost(editingPost.id, { published: v })}
                  />
                  <DeleteButton onClick={() => { deleteBlogPost(editingPost.id); setEditingId(null); }} />
                </div>

                <ImageUpload
                  value={editingPost.featuredImageUrl}
                  onChange={(url) => updateBlogPost(editingPost.id, { featuredImageUrl: url })}
                  label="Featured Image"
                />

                <div className="flex items-center justify-end">
                  <LanguageTabs />
                </div>

                <LocalizedInput
                  value={editingPost.title}
                  onChange={(v) => updateBlogPost(editingPost.id, { title: v })}
                  label="Title"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Slug</FieldLabel>
                    <Input
                      value={editingPost.slug}
                      onChange={(e) => updateBlogPost(editingPost.id, { slug: e.target.value })}
                      className="bg-background/50"
                      placeholder="article-slug"
                    />
                  </div>
                  <div>
                    <FieldLabel>Author</FieldLabel>
                    <Input
                      value={editingPost.author}
                      onChange={(e) => updateBlogPost(editingPost.id, { author: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Publish Date</FieldLabel>
                    <Input
                      type="date"
                      value={editingPost.publishedAt}
                      onChange={(e) => updateBlogPost(editingPost.id, { publishedAt: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <FieldLabel>Tags</FieldLabel>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {editingPost.tags.map((tag) => (
                        <Badge key={tag} className="bg-gold/10 text-gold border border-gold/20">
                          {tag}
                          <button onClick={() => updateBlogPost(editingPost.id, {
                            tags: editingPost.tags.filter((t) => t !== tag),
                          })}>
                            <X className="h-3 w-3 ml-1" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag..."
                        className="bg-background/50 h-9 text-xs"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newTag.trim()) {
                            updateBlogPost(editingPost.id, { tags: [...editingPost.tags, newTag.trim()] });
                            setNewTag('');
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (newTag.trim()) {
                            updateBlogPost(editingPost.id, { tags: [...editingPost.tags, newTag.trim()] });
                            setNewTag('');
                          }
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <LocalizedInput
                  value={editingPost.excerpt}
                  onChange={(v) => updateBlogPost(editingPost.id, { excerpt: v })}
                  label="Excerpt"
                  textarea
                />

                <LocalizedInput
                  value={editingPost.content}
                  onChange={(v) => updateBlogPost(editingPost.id, { content: v })}
                  label="Content"
                  textarea
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
