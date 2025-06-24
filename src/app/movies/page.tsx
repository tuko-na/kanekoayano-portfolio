import { client } from "@/libs/client";
import Image from "next/image";
import type { MicroCMSListResponse } from "microcms-js-sdk";

// ムービーデータの型定義
type Movie = {
  id: string;
  title: string;
  youtubeUrl: string;
  releaseDate: string;
};

// YouTubeのURLからビデオIDを抽出するヘルパー関数
const getYoutubeVideoId = (url: string): string | null => {
  try {
    const videoUrl = new URL(url);
    if (videoUrl.hostname === 'youtu.be') {
      return videoUrl.pathname.slice(1);
    }
    if (videoUrl.hostname === 'www.youtube.com' || videoUrl.hostname === 'youtube.com') {
      return videoUrl.searchParams.get('v');
    }
  } catch (error) {
    console.error("Invalid URL:", error);
  }
  return null;
};

export default async function MoviesPage() {
  const data: MicroCMSListResponse<Movie> = await client.getList({
    endpoint: "movies",
    queries: { orders: "-releaseDate", limit: 100 } // 公開日の新しい順で並べる
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Movies</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.contents.map((movie) => {
          const videoId = getYoutubeVideoId(movie.youtubeUrl);

          // videoIdが取得できない場合は、その項目を表示しない
          if (!videoId) return null;

          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

          return (
            <li key={movie.id}>
              <a href={movie.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={thumbnailUrl}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <p className="mt-2 font-sans">{movie.title}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}