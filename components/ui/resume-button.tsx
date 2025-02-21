'use client'
import { Download } from 'lucide-react'
import { Button } from './button'
import { useState } from 'react'

export default function ResumeButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      variant="outline"
      size="lg"
      className="group relative overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open('/riandre-resume.pdf', '_blank')}
    >
      <span className={`flex items-center gap-2 transition-transform duration-300 ${isHovered ? '-translate-y-9' : 'translate-y-0'}`}>
        Download Resume
        <Download className="w-4 h-4" />
      </span>
      <span className={`absolute flex items-center gap-2 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-9'}`}>
        View PDF
        <span className="text-xs opacity-60">(64KB)</span>
      </span>
    </Button>
  )
}
