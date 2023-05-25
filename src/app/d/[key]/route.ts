import { readdir, readFile, stat } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(
  _request: NextRequest,
  { params }: { params: { key: string } }
) {
  const { key } = params

  const directoryPath = "/tmp"

  const files = await readdir(directoryPath) //, (err, files) => {

  const filenameWithKey = files.find((file) => {
    return file.startsWith(`${key}---`)
  })

  if (!filenameWithKey) {
    return NextResponse.json({ success: false, message: "File not found" })
  }

  const filePath = path.join(directoryPath, filenameWithKey)

  const originalName = filenameWithKey.replace(`${key}---`, "")

  const res = {
    buffer: await readFile(filePath),
    stat: await stat(filePath),
  }

  const encodedName = encodeURIComponent(originalName)

  // Construct the Content-Disposition header with the encoded name
  const contentDisposition = `attachment; filename*=UTF-8''${encodedName}`

  return new NextResponse(res.buffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": contentDisposition,
      "Content-Length": res.stat.size.toString(),
    },
  })
}

export const config = {
  api: {
    responseLimit: false,
  },
}
