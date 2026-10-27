export function withViewTransition(update: () => void) {
  if (typeof document !== 'undefined' && document.startViewTransition) {
    document.startViewTransition(() => {
      update()
    })
    return
  }
  update()
}
