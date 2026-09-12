'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Trash2, X } from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import { GlassCard, SectionHeader, ImageUpload, FieldLabel, AddButton, DeleteButton, ItemRow, PublishToggle, StatusBadge, EmptyState } from '../shared';
import { LocalizedInput, LanguageTabs } from '../LanguageTabs';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const SPEC_FIELDS: { key: keyof import('@/lib/types').MaterialSpec; label: string }[] = [
  { key: 'hardness', label: 'Hardness' },
  { key: 'density', label: 'Density' },
  { key: 'origin', label: 'Origin' },
  { key: 'finishType', label: 'Finish Type' },
  { key: 'durability', label: 'Durability' },
  { key: 'sustainability', label: 'Sustainability' },
  { key: 'moistureContent', label: 'Moisture Content' },
  { key: 'grainPattern', label: 'Grain Pattern' },
  { key: 'colorTone', label: 'Color Tone' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'jankaRating', label: 'Janka Rating' },
  { key: 'weight', label: 'Weight' },
];

export function MaterialsModule() {
  const { data, addMaterial, updateMaterial, deleteMaterial } = useAdminData();
  const { materials } = data;
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingMaterial = materials.find((m) => m.id === editingId);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Materials & Finishes"
        subtitle="Manage wood library with textures, specifications, and descriptions"
        icon={Layers}
        action={<AddButton onClick={addMaterial} label="Add Material" />}
      />

      {materials.length === 0 ? (
        <EmptyState icon={Layers} title="No materials yet" description="Add your first wood material to the library." action={<AddButton onClick={addMaterial} label="Add Material" />} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {materials.map((mat) => (
              <motion.div
                key={mat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard hover className="cursor-pointer group" >
                  <div onClick={() => setEditingId(mat.id)}>
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-background/50">
                      {mat.textureImageUrl ? (
                        <img src={mat.textureImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Layers className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <StatusBadge published={mat.published} />
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{mat.name || 'Untitled'}</h3>
                    <p className="text-xs text-muted-foreground">{mat.type}</p>
                    <p className="text-[10px] text-gold/60 mt-1">{mat.specifications.origin || '—'}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
          {editingMaterial && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Edit Material
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <PublishToggle
                    published={editingMaterial.published}
                    onChange={(v) => updateMaterial(editingMaterial.id, { published: v })}
                  />
                  <DeleteButton onClick={() => { deleteMaterial(editingMaterial.id); setEditingId(null); }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUpload
                    value={editingMaterial.textureImageUrl}
                    onChange={(url) => updateMaterial(editingMaterial.id, { textureImageUrl: url })}
                    label="Texture Image"
                    aspect="aspect-square"
                  />
                  <div className="space-y-3">
                    <div>
                      <FieldLabel>Material Name</FieldLabel>
                      <Input
                        value={editingMaterial.name}
                        onChange={(e) => updateMaterial(editingMaterial.id, { name: e.target.value })}
                        className="bg-background/50"
                        placeholder="Teak"
                      />
                    </div>
                    <div>
                      <FieldLabel>Type</FieldLabel>
                      <Select
                        value={editingMaterial.type}
                        onValueChange={(v) => updateMaterial(editingMaterial.id, { type: v })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hardwood">Hardwood</SelectItem>
                          <SelectItem value="Softwood">Softwood</SelectItem>
                          <SelectItem value="Engineered">Engineered</SelectItem>
                          <SelectItem value="Veneer">Veneer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <LanguageTabs />
                </div>

                <LocalizedInput
                  value={editingMaterial.description}
                  onChange={(v) => updateMaterial(editingMaterial.id, { description: v })}
                  label="Description"
                  textarea
                />

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Specifications</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SPEC_FIELDS.map((spec) => (
                      <div key={spec.key}>
                        <FieldLabel>{spec.label}</FieldLabel>
                        <Input
                          value={editingMaterial.specifications[spec.key]}
                          onChange={(e) => updateMaterial(editingMaterial.id, {
                            specifications: {
                              ...editingMaterial.specifications,
                              [spec.key]: e.target.value,
                            },
                          })}
                          className="bg-background/50 h-9 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
