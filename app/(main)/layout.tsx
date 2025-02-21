import Navbar from "@/components/ui/navbar"
import Footer from "@/components/footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
    </>
  )
}
