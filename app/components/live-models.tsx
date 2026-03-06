'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.kolbo.ai/api';
const ASSETS_BASE = process.env.NEXT_PUBLIC_ASSETS_BASE || 'https://api.kolbo.ai/assets';
const CACHE_KEY = 'kolbo_docs_models';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// SDK type → backend endpoint mapping
const TYPE_ENDPOINTS: Record<string, string> = {
  image: '/image-models',
  image_edit: '/image-models',
  video: '/models/video?generationType=all',
  video_from_image: '/models/video?generationType=all',
  music: '/music-models',
  speech: '/txt-Speech',
  sound: '/txt-Speech', // sound models are in the same endpoint
};

// SDK type → model type filter
const SDK_TYPE_FILTER: Record<string, string[]> = {
  image: ['text_to_img'],
  image_edit: ['image_editing'],
  video: ['text_to_video', 'img_to_video'],
  video_from_image: ['img_to_video'],
  music: ['music_gen', 'music_generator'],
  speech: ['text_to_speech'],
  sound: ['text_to_sound'],
};

interface ModelItem {
  identifier: string;
  name: string;
  provider: string;
  credit: number;
  types: string[];
  recommended?: boolean;
  newModel?: boolean;
  supportedAspectRatios?: string[];
  supportedDurations?: number[];
  avatar?: string;
}

/** Resolve avatar field to a full URL */
function resolveAvatarUrl(avatar?: string): string | null {
  if (!avatar) return null;
  if (avatar.startsWith('http')) return avatar;
  // Strip @assets/ prefix if present
  const filename = avatar.replace(/^@assets\//, '');
  return `${ASSETS_BASE}/${filename}`;
}

function getCached(sdkType: string): ModelItem[] | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}_${sdkType}`);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function setCache(sdkType: string, data: ModelItem[]) {
  try {
    localStorage.setItem(`${CACHE_KEY}_${sdkType}`, JSON.stringify({ data, ts: Date.now() }));
  } catch { /* ignore quota errors */ }
}

async function fetchModels(sdkType: string): Promise<ModelItem[]> {
  const cached = getCached(sdkType);
  if (cached) return cached;

  const endpoint = TYPE_ENDPOINTS[sdkType];
  if (!endpoint) return [];

  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    const json = await res.json();

    // Normalize different response formats
    let raw: any[] = [];
    if (json.data?.all) {
      // Video endpoint returns { data: { all: [...] } }
      raw = json.data.all;
    } else if (Array.isArray(json.data)) {
      raw = json.data;
    } else if (Array.isArray(json)) {
      raw = json;
    }

    // Flatten grouped models (some have subModels)
    const flat: any[] = [];
    for (const m of raw) {
      if (m.subModels?.length) {
        for (const sub of m.subModels) flat.push(sub);
      } else {
        flat.push(m);
      }
    }

    // Filter by SDK type and dedupe
    const typeFilter = SDK_TYPE_FILTER[sdkType] || [];
    const seen = new Set<string>();
    const models: ModelItem[] = [];

    for (const m of flat) {
      if (m.isHidden || m.deletedAt) continue;
      const id = m.identifier;
      if (!id || seen.has(id)) continue;

      // Check type match
      const mTypes = Array.isArray(m.type) ? m.type : [m.type];
      if (typeFilter.length > 0 && !mTypes.some((t: string) => typeFilter.includes(t))) continue;

      seen.add(id);
      models.push({
        identifier: id,
        name: m.name || id,
        provider: m.provider || m.group || '—',
        credit: m.credit ?? 0,
        types: mTypes,
        recommended: m.recommended,
        newModel: m.newModel,
        supportedAspectRatios: m.supportedAspectRatios,
        supportedDurations: m.supportedDurations,
        avatar: m.avatar || m.imageUrl,
      });
    }

    // Sort: recommended first, then by name
    models.sort((a, b) => {
      if (a.recommended !== b.recommended) return a.recommended ? -1 : 1;
      if (a.newModel !== b.newModel) return a.newModel ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    setCache(sdkType, models);
    return models;
  } catch (err) {
    console.error('Failed to fetch models:', err);
    return [];
  }
}

/** Live model table that fetches from the public API */
export function LiveModels({ type, showDurations, showAspectRatios }: {
  type: string;
  showDurations?: boolean;
  showAspectRatios?: boolean;
}) {
  const [models, setModels] = useState<ModelItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels(type).then(m => { setModels(m); setLoading(false); });
  }, [type]);

  if (loading) {
    return (
      <div style={{ padding: '16px 0' }}>
        <div style={{
          height: 200, borderRadius: 8,
          background: 'var(--fd-muted, #f4f4f5)', opacity: 0.5,
          animation: 'pulse 2s infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--fd-muted-foreground, #71717a)', fontSize: 14,
        }}>
          Loading {type} models...
        </div>
      </div>
    );
  }

  if (models.length === 0) {
    return <p style={{ color: 'var(--fd-muted-foreground)', fontSize: 14 }}>No models available for this type.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <p style={{ fontSize: 13, color: 'var(--fd-muted-foreground, #71717a)', marginBottom: 8 }}>
        {models.length} models available · Updated live from API
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--fd-border, #e4e4e7)' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Model</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Identifier</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Provider</th>
            <th style={{ textAlign: 'right', padding: '8px 12px', fontWeight: 600 }}>Credits</th>
            {showDurations && <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Durations</th>}
            {showAspectRatios && <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Aspect Ratios</th>}
          </tr>
        </thead>
        <tbody>
          {models.map((m) => {
            const avatarUrl = resolveAvatarUrl(m.avatar);
            return (
              <tr key={m.identifier} style={{ borderBottom: '1px solid var(--fd-border, #e4e4e7)' }}>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt=""
                        width={20}
                        height={20}
                        style={{ borderRadius: 4, flexShrink: 0 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                    <span>
                      {m.name}
                      {m.recommended && <span style={{ marginLeft: 6, fontSize: 11, background: 'var(--fd-primary, #2563eb)', color: 'white', padding: '1px 6px', borderRadius: 4 }}>recommended</span>}
                      {m.newModel && <span style={{ marginLeft: 6, fontSize: 11, background: '#10b981', color: 'white', padding: '1px 6px', borderRadius: 4 }}>new</span>}
                    </span>
                  </span>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <code style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, background: 'none', border: 'none', color: '#fff', whiteSpace: 'nowrap' }}>{m.identifier}</code>
                </td>
                <td style={{ padding: '8px 12px', color: 'var(--fd-muted-foreground, #71717a)' }}>{m.provider}</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                  {m.credit}{(type === 'video' || type === 'video_from_image') ? '/sec' : ''}
                </td>
                {showDurations && (
                  <td style={{ padding: '8px 12px', color: 'var(--fd-muted-foreground)', fontSize: 13 }}>
                    {m.supportedDurations?.join(', ') || '—'}s
                  </td>
                )}
                {showAspectRatios && (
                  <td style={{ padding: '8px 12px', color: 'var(--fd-muted-foreground)', fontSize: 13 }}>
                    {m.supportedAspectRatios?.join(', ') || '—'}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Shows total model count, fetched live */
export function LiveModelCount({ type }: { type?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (type) {
      fetchModels(type).then(m => setCount(m.length));
    } else {
      // Fetch all types in parallel
      Promise.all(
        Object.keys(TYPE_ENDPOINTS).map(t => fetchModels(t))
      ).then(results => {
        const seen = new Set<string>();
        let total = 0;
        for (const models of results) {
          for (const m of models) {
            if (!seen.has(m.identifier)) { seen.add(m.identifier); total++; }
          }
        }
        setCount(total);
      });
    }
  }, [type]);

  return <span>{count !== null ? count : '…'}</span>;
}
