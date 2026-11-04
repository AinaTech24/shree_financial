import { NextResponse } from "next/server";
import { fetchLiveBlogs } from "@/lib/live-blogs";

export async function GET(request: Request) {
  // Prevent build-time external fetch rejections during Next.js SSG prerender phase
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return NextResponse.json([]);
  }

  try {
    const articles = await fetchLiveBlogs();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Failed to fetch live blogs", error);
    return NextResponse.json([]);
  }
}
