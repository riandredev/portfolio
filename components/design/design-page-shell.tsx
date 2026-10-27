import DesignMasonryGallery from '@/components/design/design-masonry-gallery'
import DesignPageHeader from '@/components/design/design-page-header'

export default function DesignPageShell() {
  return (
    <div className="design-page-shell relative w-full px-3 pb-20 pt-[5.5rem] sm:px-5 sm:pb-24 sm:pt-24 md:px-8 md:pt-28 lg:px-12">
      <div className="mx-auto w-full max-w-[88rem]">
        <DesignPageHeader />
        <DesignMasonryGallery />
      </div>
    </div>
  )
}
