'use client';

import { Upload, X, GripVertical, ArrowUp, ArrowDown, Plus, Trash2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function GlassCard({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'glass rounded-xl p-5 transition-all duration-300',
        hover && 'hover:border-gold/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 border border-gold/20">
            <Icon className="h-5 w-5 text-gold" />
          </div>
        )}
        <div>
          <h2
            className="text-lg font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

export function ImageUpload({
  value,
  onChange,
  label,
  className,
  aspect = 'aspect-video',
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
          {label}
        </label>
      )}

      <div className="relative group">
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-lg border border-input bg-background/50',
            aspect
          )}
        >
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onChange('')}
                >
                  <X className="h-4 w-4 mr-1" /> Remove
                </Button>
              </div>
            </>
          ) : (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer gap-2 text-muted-foreground hover:text-gold transition-colors">
              <Upload className="h-8 w-8" />

              <span className="text-xs">Upload image</span>

              <input
                type="text"
                placeholder="Paste image URL..."
                className="absolute bottom-2 w-[90%] rounded-md border border-input bg-background/80 px-2 py-1 text-xs text-center text-foreground"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onChange(e.target.value)}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export function PublishToggle({
  published,
  onChange,
  label = 'Published',
}: {
  published: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={published} onCheckedChange={onChange} />
      <span
        className={cn(
          'text-xs font-medium',
          published ? 'text-gold' : 'text-muted-foreground'
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <Badge className="bg-gold/15 text-gold border-gold/30 hover:bg-gold/20">
      Published
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="text-muted-foreground border-border"
    >
      Draft
    </Badge>
  );
}

export function FeaturedBadge({ featured }: { featured: boolean }) {
  return featured ? (
    <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/30 hover:bg-chart-2/20">
      <Star className="h-3 w-3 mr-1 fill-current" /> Featured
    </Badge>
  ) : null;
}

export function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="border-gold/20 text-gold hover:bg-gold/10 hover:text-gold hover:border-gold/40"
    >
      <Plus className="h-4 w-4 mr-2" /> {label}
    </Button>
  );
}

export function DeleteButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant="ghost"
      className={cn(
        'text-destructive/70 hover:text-destructive hover:bg-destructive/10 h-8 w-8',
        className
      )}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

export function ReorderButtons({
  onUp,
  onDown,
  className,
}: {
  onUp: () => void;
  onDown: () => void;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <button
        onClick={onUp}
        className="text-muted-foreground hover:text-gold transition-colors"
      >
        <ArrowUp className="h-3 w-3" />
      </button>

      <button
        onClick={onDown}
        className="text-muted-foreground hover:text-gold transition-colors"
      >
        <ArrowDown className="h-3 w-3" />
      </button>
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
      {children}
    </label>
  );
}

export function ItemRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn('glass rounded-xl p-4', className)}
    >
      {children}
    </motion.div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/5 border border-gold/10 mb-4">
        <Icon className="h-8 w-8 text-gold/40" />
      </div>

      <h3 className="text-sm font-medium text-foreground mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-xs text-muted-foreground max-w-sm mb-4">
          {description}
        </p>
      )}

      {action}
    </div>
  );
}

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange?: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange?.(star)}
          disabled={!onChange}
          className={cn(
            'transition-colors',
            onChange && 'cursor-pointer hover:scale-110',
            star <= value
              ? 'text-gold'
              : 'text-muted-foreground/30'
          )}
        >
          <Star
            className={cn(
              'h-4 w-4',
              star <= value && 'fill-current'
            )}
          />
        </button>
      ))}
    </div>
  );
}