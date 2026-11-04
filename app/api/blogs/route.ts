import { NextResponse } from "next/server";
<<<<<<< HEAD
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
=======
import { fetchLiveBlogs } from "@/lib/blogs";

export async function GET(request: Request) {
  // Accessing request URL marks route as dynamic per request
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 32;

  try {
    const articles = await fetchLiveBlogs();
    return NextResponse.json({ articles: articles.slice(0, limit) });
  } catch (error) {
    return NextResponse.json({ articles: [] }, { status: 500 });
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
  }
}
