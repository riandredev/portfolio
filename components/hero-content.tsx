import ResumeButton from "@/components/ui/resume-button"

export default function HeroContent() {
  return (
    <div className="flex-1 space-y-6 sm:space-y-8 pointer-events-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light font-geist">
        <span className="font-serif italic">Riandre</span>{' '}
        <span className="font-serif italic bg-gradient-to-br from-zinc-900 to-blue-600 dark:from-white dark:to-blue-400 text-transparent bg-clip-text">
          van der Voorden
        </span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl font-manrope text-zinc-700 dark:text-zinc-300 max-w-xl">
        Hi! I&apos;m <span className="font-medium">Riandre</span>, a software engineer
        with a passion for creating engaging user experiences. Currently {' '}
        <a href="#" className="underline underline-offset-4 transition-colors cursor-default">
          Freelancing
        </a>.
      </p>
      <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 justify-center sm:justify-start">
        <ResumeButton />
      </div>
    </div>
  )
}
