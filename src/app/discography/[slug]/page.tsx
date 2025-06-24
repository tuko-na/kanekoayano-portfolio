import { client } from "@/libs/client";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// --- 型定義 ---
type JacketImage = {
  url: string;
  height: number;
  width: number;
};

type Track = {
  trackTitle: string;
  diskNumber?: number;
  trackNumber?: number;
};

type Discography = {
  id: string;
  title: string;
  slug: string;
  releaseDate: string;
  jacketImage: JacketImage;
  category: string[];
  trackList: Track[];
};

// --- Propsの型定義 ---
type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const awaitedParams = await props.params;

  const response = await client.getList<Discography>({
    endpoint: "discographies",
    queries: { filters: `slug[equals]${awaitedParams.slug}`, depth: 2 },
  });
  const data = response.contents[0];

  if (!data) {
    return { title: "Not Found" };
  }

  return {
    title: `${data.title} | カネコアヤノ Fan Site`,
  };
}

export async function generateStaticParams() {
  const data = await client.get({ endpoint: "discographies", queries: { fields: "slug" } });

  return data.contents.map((content: { slug: string }) => ({
    slug: content.slug,
  }));
}

export default async function DiscographyDetailPage(props: Props) {
  const awaitedParams = await props.params;

  const response = await client.getList<Discography>({
    endpoint: "discographies",
    queries: { filters: `slug[equals]${awaitedParams.slug}`, depth: 2 },
  });

  const data = response.contents[0];

  if (!data) {
    notFound();
  }

  const groupByDisc = (trackList: Track[]) => {
    if (!Array.isArray(trackList)) {
      return {};
    }
    return trackList.reduce((acc, track) => {
      const disc = track.diskNumber || 1;
      if (!acc[disc]) {
        acc[disc] = [];
      }
      acc[disc].push(track);
      return acc;
    }, {} as Record<number, Track[]>);
  };

  const groupedTracks = groupByDisc(data.trackList);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={data.jacketImage.url}
            alt={`${data.title}のジャケット写真`}
            width={700}
            height={700}
            className="w-full h-auto object-cover aspect-square shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b pb-2">収録曲</h2>
          {Object.keys(groupedTracks).length > 0 ? (
            Object.keys(groupedTracks).map((disc) => (
              <div key={disc} className="mb-4">
                {Object.keys(groupedTracks).length > 1 && (
                  <h3 className="text-lg font-bold">Disc {disc}</h3>
                )}
                <ol className="list-decimal list-inside">
                  {groupedTracks[Number(disc)].map((track, index) => (
                    // ★★★ ここが修正箇所です ★★★
                    <li key={`${disc}-${track.trackNumber || index}`} className="p-1">
                      {track.trackTitle}
                    </li>
                  ))}
                </ol>
              </div>
            ))
          ) : (
            <p>収録曲情報はありません。</p>
          )}
        </div>
      </div>
    </div>
  );
}