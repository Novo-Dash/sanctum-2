declare function gtag(...args: unknown[]): void
declare function fbq(...args: unknown[]): void

interface Window {
  gtag: typeof gtag
  fbq: typeof fbq
  dataLayer: unknown[]
}
