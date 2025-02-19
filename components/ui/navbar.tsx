"use client"
import { usePathname } from "next/navigation"
import { Settings } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import NavLink from '@/components/nav-link'
import ThemeSettings from '@/components/theme-settings'
import VisitorChip from '@/components/visitor-chip'

const navVariants = {
  collapsed: { height: 48 },
  expanded: { height: 240 }
}

const contentVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

export default function Navbar() {
    const pathname = usePathname()
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)

    const isHomePage = pathname === '/'

    // Improved route matching
    const getActiveState = (path: string) => {
      if (path === '/') return pathname === '/'
      if (path === '/posts') return pathname.startsWith('/posts')
      return pathname === path
    }

    const handleSettingsClick = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsSettingsOpen(prev => !prev)
    }

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
          const target = event.target as HTMLElement
          if (target.closest('[role="listbox"]') || target.closest('[data-radix-select-viewport]')) {
            return
          }
          setIsSettingsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
      const handleScroll = () => {
        if (isSettingsOpen) {
          setIsSettingsOpen(false)
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [isSettingsOpen])

    if (!mounted) return null

    return (
      <motion.div
        className="w-full fixed top-0 z-50 pt-3 sm:pt-5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="container px-4 mx-auto relative">
          <div className="flex justify-center">
            <motion.nav
              ref={navRef}
              initial="collapsed"
              animate={isSettingsOpen ? "expanded" : "collapsed"}
              variants={navVariants}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
              className="w-full max-w-[300px] flex items-start shadow-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 overflow-hidden rounded-lg sm:rounded-xl"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isSettingsOpen ? (
                  <motion.div
                    key="settings"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <ThemeSettings onClose={() => setIsSettingsOpen(false)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="nav"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center px-1.5 py-1.5 w-full"
                  >
                    <div className="flex items-center space-x-1">
                      <NavLink href="/" active={getActiveState("/")}>Home</NavLink>
                      <NavLink href="/posts" active={getActiveState("/posts")}>Posts</NavLink>
                      <NavLink href="/about" active={getActiveState("/about")}>About</NavLink>
                    </div>
                    <div className="ml-auto flex items-center">
                      <div className="w-px h-6 mx-2 bg-zinc-300 dark:bg-zinc-700" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-600 dark:text-zinc-300 rounded-lg hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors duration-200"
                        onClick={handleSettingsClick}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="sr-only">Open settings</span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          </div>
    {isHomePage && (
      <motion.div
        className="absolute right-4 top-1 md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <VisitorChip />
      </motion.div>
    )}
  </div>
</motion.div>
)};
