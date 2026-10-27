import SiteCanvas from '@/components/site-canvas'
import HomeAboutCta from '@/components/home/home-about-cta'
import HomeIntro from '@/components/home/home-intro'
import HomeRails from '@/components/home/home-rails'
import HomeResume from '@/components/home/home-resume'
import HomeResumeDownload from '@/components/home/home-resume-download'
import PrefetchAboutAssets from '@/components/home/prefetch-about-assets'

export default function HomePage() {
  return (
    <div className="relative">
      <PrefetchAboutAssets />
      <SiteCanvas>
        <HomeIntro />
        <HomeAboutCta />
        <HomeResume />
        <HomeResumeDownload />
      </SiteCanvas>
      <HomeRails />
    </div>
  )
}
