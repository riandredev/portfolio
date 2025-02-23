'use client'

import { Moon, Sun, Monitor, Settings, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useThemeStore } from '@/store/theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGraphics } from '@/context/graphics-context'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface ThemeSettingsProps {
  onClose?: () => void;
}

export default function ThemeSettings({ onClose }: ThemeSettingsProps) {
  const [mounted, setMounted] = useState(false)
  // Use next-themes hook directly instead of store for theme switching
  const { theme: currentTheme, setTheme: setNextTheme } = useTheme()
  const { enable3D, setEnable3D, showSpotifyChip, setShowSpotifyChip } = useThemeStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (value: string) => {
    setNextTheme(value) // Use next-themes setTheme directly
  }

  if (!mounted) return null

  return (
    <div className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <Settings className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          <h2 className="text-sm font-medium">Settings</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
        >
          <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 px-1">Appearance</h3>
        <div className="relative">
          <Select value={currentTheme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-full bg-white dark:bg-zinc-800/50">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light" className="text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </div>
              </SelectItem>
              <SelectItem value="dark" className="text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </div>
              </SelectItem>
              <SelectItem value="system" className="text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span>System</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 px-1">Graphics</h3>
        <div className="flex items-center justify-between px-1">
          <Label htmlFor="3d-toggle" className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
            3D Lanyard Effect
          </Label>
          <Switch
            id="3d-toggle"
            checked={enable3D}
            onCheckedChange={setEnable3D}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 px-1">My Spotify activity</label>
        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Show what I’m listening to</span>
          <Switch
            checked={showSpotifyChip}
            onCheckedChange={setShowSpotifyChip}
          />
        </div>
      </div>
    </div>
  )
}
