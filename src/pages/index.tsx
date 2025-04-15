import { Layout } from "@/components/Layout"

export default function Home() {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome to PocketDrop</h1>
        <p className="text-muted-foreground">
          This is your dashboard. Start adding your content here.
        </p>
      </div>
    </Layout>
  )
}
