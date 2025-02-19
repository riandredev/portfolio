'use client'
import { ArrowUpRight, Heart, Copy, Check } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const email = 'ri4ndre@gmail.com'

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault()
    if (timeoutId) clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Only start closing if we're not moving to the popover content
    if (!e.relatedTarget || !(e.relatedTarget as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
      const timeout = setTimeout(() => setIsOpen(false), 300)
      setTimeoutId(timeout)
    }
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/riandre' },
    { name: 'GitHub', href: 'https://github.com/riandredev' },
    { name: 'Mastodon', href: 'https://mastodon.social/@riandre' },
  ]

  return (
    <footer className={`w-full border-t border-zinc-200 dark:border-zinc-800 z-50 ${className}`}>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* Get in touch section */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-light">Get in touch</h3>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors select-none cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  {email}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-[150px] p-0.5 select-none pointer-events-auto"
                align="start"
                side="top"
                sideOffset={0}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={(e) => e.preventDefault()}
              >
                <Button
                  variant="ghost"
                  onClick={handleCopyEmail}
                  className="w-full h-8 px-3 flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </Button>
              </PopoverContent>
            </Popover>
          </div>

          {/* Social links */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-light">Connect</h3>
            <div className="flex flex-col space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and location with heart */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 gap-4 sm:gap-0">
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-left">
            © {new Date().getFullYear()} Riandre van der Voorden. All rights reserved.
          </p>
          <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            <Heart fill="gray" strokeWidth={0} className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Gauteng, South Africa
          </p>
        </div>
      </div>
    </footer>
  )
}
