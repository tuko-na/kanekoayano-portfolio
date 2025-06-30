import { client } from "@/libs/client";
import { AccordionItem } from "@/components/AccordionItem";

// --- 型定義（変更なし） ---
type Tour = {
  id: string;
  tourTitle: string;
  tourDescription?: any;
};

type Live = {
  id:string;
  title: string;
  date: string;
  endDate?: string;
  venue: string;
  description?: any;
  tour?: Tour;
};

type GroupedTour = {
  tourId: string;
  tourTitle: string;
  tourDescription?: any;
  lives: Live[];
};

export default async function LivePage() {
  // ★★★ 修正箇所1：取得順を昇順に変更 ★★★
  const allLives: Live[] = await client.getAllContents({
    endpoint: "live",
    queries: { depth: 2, orders: "date" }, // "-date" から "date" に変更
  });

  // --- データを整理するロジック（変更なし） ---
  const groupedTours: Record<string, GroupedTour> = {};
  const standaloneLives: Live[] = [];

  allLives.forEach(live => {
    if (live.tour) {
      if (!groupedTours[live.tour.id]) {
        groupedTours[live.tour.id] = {
          tourId: live.tour.id,
          tourTitle: live.tour.tourTitle,
          tourDescription: live.tour.tourDescription,
          lives: [],
        };
      }
      groupedTours[live.tour.id].lives.push(live);
    } else {
      standaloneLives.push(live);
    }
  });

  const tourList = Object.values(groupedTours);

  // ★★★ 修正箇所2：ツアーの並び替えロジックを修正 ★★★
  tourList.sort((a, b) => {
    // 各ツアーの最終日を取得 (allLivesが昇順なので、配列の最後が最新の日付)
    const finalDayA = a.lives[a.lives.length - 1];
    const finalDayB = b.lives[b.lives.length - 1];
    
    const dateA = finalDayA.endDate || finalDayA.date;
    const dateB = finalDayB.endDate || finalDayB.date;

    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });
  
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('ja-JP');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Live</h1>
      
      {/* 単発ライブ・フェスを先に表示（自動で古い順に並んでいる） */}
      {standaloneLives.length > 0 && (
         <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Event / Festival</h2>
          <div className="border-t border-border">
            {standaloneLives.map(live => (
              <AccordionItem key={live.id} title={live.title}>
                <p>日程: {formatDate(live.date)}{live.endDate && ` ~ ${formatDate(live.endDate)}`}</p>
                <p>会場: {live.venue}</p>
                {live.description && (
                  <div
                    className="prose mt-2"
                    dangerouslySetInnerHTML={{ __html: live.description }}
                  />
                )}
              </AccordionItem>
            ))}
          </div>
        </div>
      )}

      {/* ツアーを後に表示 */}
      <div className="space-y-8">
        {tourList.map(tour => (
          <AccordionItem
            key={tour.tourId}
            title={<h2 className="text-2xl font-semibold">{tour.tourTitle}</h2>}
          >
            {tour.tourDescription && (
              <div
                className="prose mb-4"
                dangerouslySetInnerHTML={{ __html: tour.tourDescription }}
              />
            )}
            {/* ツアー内の日程も自動で古い順に並んでいる */}
            <ul className="space-y-2">
              {tour.lives.map(live => (
                <li key={live.id} className="border-t border-border pt-2">
                  <p><strong>{live.title}</strong></p>
                  <p>日程: {formatDate(live.date)}{live.endDate && ` ~ ${formatDate(live.endDate)}`}</p>
                  <p>会場: {live.venue}</p>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}