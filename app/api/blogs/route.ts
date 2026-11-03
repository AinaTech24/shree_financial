import { NextResponse } from "next/server";
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
  }
}
