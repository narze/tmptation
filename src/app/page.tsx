"use client"

// import "@uploadthing/react/styles.css"

// import { UploadButton } from "@uploadthing/react"
// import { OurFileRouter } from "@/app/api/uploadthing/core"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <code>
        curl -F &quot;file=@/path/to/file&quot;
        &quot;https://tmptation.vercel.app/api/upload&quot;
      </code>

      <div className="flex flex-col items-center justify-center">
        File cannot be too big or it will fail.
      </div>
    </main>
  )
}
