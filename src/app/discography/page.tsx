import { client } from "@/libs/client";
import Link from "next/link"; // Next.jsのリンクコンポーネント
import Image from "next/image"; // Next.jsの画像コンポーネント

// microCMSから返ってくるデータの型
type JacketImage = {
  url: string;
  height: number;
  width: number;
};

type Discography = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  releaseDate: string;
  jacketImage: JacketImage;
  category: string[];
};

// APIレスポンス全体の型
type ApiResponse = {
  contents: Discography[];
  totalCount: number;
  offset: number;
  limit: number;
};

export default async function DiscographyPage() {
  // microCMSからデータを取得
  const data: ApiResponse = await client.get({ endpoint: "discographies", queries: { limit: 100 } });

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">ディスコグラフィー</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {data.contents.map((album) => (
          <li key={album.id}>
            <Link href={`/discography/${album.slug}`}>
              <Image
                src={album.jacketImage.url}
                alt={`${album.title}のジャケット写真`}
                width={500}
                height={500}
                className="w-full h-auto object-cover aspect-square"
              />
              <p className="mt-2 text-center">{album.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}