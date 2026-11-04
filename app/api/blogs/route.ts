import { NextResponse } from "next/server";
import { fetchLiveBlogs } from "@/lib/blogs";

export async function GET(request: Request) {
  // Prevent build-time external fetch rejections during Next.js SSG prerender phase
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return NextResponse.json({ articles: [] });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 32;

  try {
    const articles = await fetchLiveBlogs();
    return NextResponse.json({ articles: articles.slice(0, limit) });
  } catch (error) {
    console.error("Failed to fetch live blogs", error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}
