/**
 * UX MODE — Inspector overlay não-destrutivo
 * Envolve qualquer página e injeta camadas de inspeção.
 * Não altera nenhum componente da página original.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

/* ── Tipos ── */
interface TooltipInfo {
  x: number; y: number
  width: number; height: number
  fontFamily: string; fontSize: string
  fontWeight: string; color: string; tag: string
}

export interface UxTokens {
  maxWidth?: string
  contentWidth?: string
  gutter?: string
  sectionPy?: string
  h1?: string
  h2?: string
  h3?: string
  body?: string
  label?: string
  colors?: { hex: string; label: string }[]
  extras?: { key: string; value: string }[]
}

/* ── Inspector de elementos ── */
function InspectorTooltip() {
  const [info, setInfo] = useState<TooltipInfo | null>(null)
  const [pinned, setPinned] = useState<HTMLElement | null>(null)

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLElement
    if (el.closest('[data-ux-overlay]')) return
    if (pinned) return
    el.setAttribute('data-ux-hover', '')
  }, [pinned])

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLElement
    el.removeAttribute('data-ux-hover')
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLElement
    if (el.closest('[data-ux-overlay]')) return
    if (pinned === el) {
      pinned.removeAttribute('data-ux-pinned')
      setPinned(null); setInfo(null); return
    }
    if (pinned) pinned.removeAttribute('data-ux-pinned')
    e.stopPropagation()
    const rect = el.getBoundingClientRect()
    const style = window.getComputedStyle(el)
    const rawFont = style.fontFamily.split(',')[0].replace(/['"]/g, '').trim()
    el.setAttribute('data-ux-pinned', '')
    setPinned(el)
    setInfo({
      x: rect.right < window.innerWidth / 2 ? rect.right + 8 : rect.left - 228,
      y: Math.min(rect.top, window.innerHeight - 300),
      width: Math.round(rect.width), height: Math.round(rect.height),
      fontFamily: rawFont,
      fontSize: Math.round(parseFloat(style.fontSize)) + 'px',
      fontWeight: style.fontWeight, color: style.color,
      tag: el.tagName.toLowerCase(),
    })
  }, [pinned])

  const handleDocClick = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLElement
    if (el.closest('[data-ux-overlay]')) return
    if (pinned && pinned !== el) {
      pinned.removeAttribute('data-ux-pinned')
      setPinned(null); setInfo(null)
    }
  }, [pinned])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && pinned) {
        pinned.removeAttribute('data-ux-pinned')
        setPinned(null); setInfo(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pinned])

  useEffect(() => {
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('click', handleDocClick)
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('click', handleDocClick)
    }
  }, [handleMouseOver, handleMouseOut, handleClick, handleDocClick])

  if (!info) return null

  return (
    <div data-ux-overlay="" className="fixed z-[300] pointer-events-none" style={{ left: info.x, top: info.y }}>
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl p-4 w-[220px] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[#1B3A8F] font-mono text-[10px] font-bold uppercase">&lt;{info.tag}&gt;</span>
          <span className="text-white/30 font-mono text-[9px]">UX Inspector</span>
        </div>
        <div className="border-t border-white/10 pt-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider">Width</span>
            <span className="text-white font-mono text-[11px] font-bold">{info.width}px</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider">Height</span>
            <span className="text-white font-mono text-[11px] font-bold">{info.height}px</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider">Font</span>
            <span className="text-[#71cc98] font-mono text-[11px] font-bold truncate max-w-[120px]">{info.fontFamily}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider">Size</span>
            <span className="text-white font-mono text-[11px] font-bold">{info.fontSize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider">Weight</span>
            <span className="text-white font-mono text-[11px] font-bold">{info.fontWeight}</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
          <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider">Color</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border border-white/20 flex-shrink-0" style={{ background: info.color }} />
            <span className="text-white font-mono text-[10px]">{info.color}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Painel lateral de tokens ── */
function WireGuide({ tokens, cleanPath }: { tokens: UxTokens; cleanPath?: string }) {
  const t = tokens
  return (
    <div data-ux-overlay="" className="fixed top-20 right-4 z-[200] bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-[176px] hidden xl:block text-[9px] font-mono">
      <p className="font-bold text-gray-500 uppercase tracking-widest mb-3">UX MODE</p>
      <ul className="space-y-1.5 text-gray-500">
        <li className="text-[8px] font-bold text-gray-400 uppercase pt-1">Frame</li>
        {t.maxWidth     && <li><span className="text-gray-800 font-bold">page-w:</span> {t.maxWidth}</li>}
        {t.contentWidth && <li><span className="text-gray-800 font-bold">content:</span> {t.contentWidth}</li>}
        {t.gutter       && <li><span className="text-gray-800 font-bold">gutter:</span> {t.gutter}</li>}
        {t.sectionPy    && <li><span className="text-gray-800 font-bold">section py:</span> {t.sectionPy}</li>}

        <li className="text-[8px] font-bold text-gray-400 uppercase pt-2 border-t border-gray-100">Typography</li>
        {t.h1    && <li><span className="text-gray-800 font-bold">H1:</span> {t.h1}</li>}
        {t.h2    && <li><span className="text-gray-800 font-bold">H2:</span> {t.h2}</li>}
        {t.h3    && <li><span className="text-gray-800 font-bold">H3:</span> {t.h3}</li>}
        {t.body  && <li><span className="text-gray-800 font-bold">Body:</span> {t.body}</li>}
        {t.label && <li><span className="text-gray-800 font-bold">Label:</span> {t.label}</li>}

        {t.colors && t.colors.length > 0 && (
          <>
            <li className="text-[8px] font-bold text-gray-400 uppercase pt-2 border-t border-gray-100">Colors</li>
            {t.colors.map(c => (
              <li key={c.hex} className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm flex-shrink-0 border border-gray-100" style={{ background: c.hex }} />
                <span>{c.label}</span>
              </li>
            ))}
          </>
        )}

        {t.extras && t.extras.length > 0 && (
          <>
            <li className="text-[8px] font-bold text-gray-400 uppercase pt-2 border-t border-gray-100">Extra</li>
            {t.extras.map(e => (
              <li key={e.key}><span className="text-gray-800 font-bold">{e.key}:</span> {e.value}</li>
            ))}
          </>
        )}
      </ul>

      {cleanPath && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <a href={cleanPath} className="block text-center text-[9px] font-bold text-[#1B3A8F] uppercase tracking-widest hover:underline">
            → Clean page
          </a>
        </div>
      )}
    </div>
  )
}

/* ── Barra de status inferior ── */
function UxStatusBar({ tokens, cleanPath }: { tokens: UxTokens; cleanPath?: string }) {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(barRef.current, { y: 40, opacity: 0, duration: 0.5, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])
  return (
    <div ref={barRef} data-ux-overlay="" className="fixed bottom-0 left-0 right-0 z-[200] bg-[#0a0a0a] border-t border-white/10 px-6 py-2 flex items-center justify-between">
      <div className="flex items-center gap-6 text-[10px] font-mono">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1B3A8F] animate-pulse" />
          <span className="text-white/60">UX MODE · SANCTUM BJJ</span>
        </span>
        {tokens.maxWidth && (
          <span className="text-white/40">max-w: {tokens.maxWidth} · content: {tokens.contentWidth}</span>
        )}
        {tokens.body && (
          <span className="text-white/40 hidden md:block">{tokens.body}</span>
        )}
      </div>
      <div className="flex items-center gap-4 text-[10px] font-mono">
        {cleanPath && (
          <a href={cleanPath} className="text-[#1B3A8F] hover:underline">→ {cleanPath} (clean)</a>
        )}
        <a href="/" className="text-white/40 hover:text-white/60">→ / (home)</a>
      </div>
    </div>
  )
}

/* ── Grid de 12 colunas (tecla G) ── */
function ColumnGridOverlay({
  primaryColor = '#1B3A8F',
  contentWidth = '1280px',
  gutter = '80px',
}: {
  primaryColor?: string
  contentWidth?: string
  gutter?: string
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let visible = false
    const handle = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'g') return
      visible = !visible
      if (overlayRef.current) overlayRef.current.style.opacity = visible ? '1' : '0'
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[150] pointer-events-none opacity-0 transition-opacity duration-200"
      style={{ maxWidth: '1440px', margin: '0 auto' }}
    >
      <div
        className="mx-auto h-full"
        style={{
          maxWidth: contentWidth,
          padding: `0 ${gutter}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px',
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full"
            style={{
              background: `${primaryColor}0f`,
              borderLeft: `1px solid ${primaryColor}25`,
              borderRight: `1px solid ${primaryColor}25`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] font-mono px-3 py-1.5 rounded-full">
        12-column grid · gap: 24px · press G to close
      </div>
    </div>
  )
}

/* ── Hint de atalhos ── */
function KeyHint() {
  return (
    <div data-ux-overlay="" className="fixed top-20 left-4 z-[200] bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 hidden xl:flex xl:flex-col gap-1.5">
      {[
        { key: 'click', label: 'inspect element' },
        { key: 'Esc',   label: 'close inspector' },
        { key: 'G',     label: 'column grid' },
      ].map(({ key, label }) => (
        <p key={key} className="text-[9px] font-mono text-gray-400">
          <kbd className="bg-gray-100 border border-gray-300 rounded px-1 py-0.5 text-[9px] font-mono">{key}</kbd>{' '}
          {label}
        </p>
      ))}
    </div>
  )
}

/* ── Wrapper principal ── */
export default function UxModeWrapper({
  children,
  tokens = {},
  cleanPath,
  primaryColor,
}: {
  children: React.ReactNode
  tokens?: UxTokens
  cleanPath?: string
  primaryColor?: string
}) {
  const pc = primaryColor ?? tokens.colors?.[0]?.hex ?? '#1B3A8F'

  return (
    <div className="pb-10">
      {children}

      <WireGuide tokens={tokens} cleanPath={cleanPath} />
      <UxStatusBar tokens={tokens} cleanPath={cleanPath} />
      <ColumnGridOverlay
        primaryColor={pc}
        contentWidth={tokens.contentWidth}
        gutter={tokens.gutter?.split(' ')[0]}
      />
      <KeyHint />
      <InspectorTooltip />

      <style>{`
        section {
          outline: 1px dashed ${pc}26;
          outline-offset: -1px;
        }
        [data-ux-hover]:not([data-ux-overlay] *) {
          outline: 1px solid ${pc}66 !important;
          outline-offset: 1px;
          cursor: crosshair !important;
        }
        [data-ux-pinned]:not([data-ux-overlay] *) {
          outline: 2px solid ${pc} !important;
          outline-offset: 1px;
        }
      `}</style>
    </div>
  )
}
