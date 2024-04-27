import Header from "@/components/layout/admin/header"
import Sidebar from "@/components/layout/admin/sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
