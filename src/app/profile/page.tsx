import Image from "next/image";

// ソロ活動のテキスト
const soloText = `シンガーソングライター。\nソロ名義「カネコアヤノ」、バンド名義「kanekoayano」(vo/gt.カネコアヤノ,gt.林宏敏,ba.takuyaiizuka）で音楽活動を行っている。\n\n2016年4月に初の弾き語り作品『hug』、2017年9月には初のアナログレコード作品『群れたち』を発表。\n2018年に発表したバンドアルバム『祝祭』/ 弾き語りアルバム『祝日 ひとりでに』以降、\nバンドでレコーディングした4枚のアルバムと、同曲をソロで再レコーディングした4枚のアコースティック・アルバムをリリースしている。\n\n2018年に発表したアルバム『祝祭』は第11回CDショップ大賞2019入賞作品に選出。\n2019年に発表したアルバム『燦々』は第12回CDショップ大賞2020大賞＜青＞を受賞。\n2021年に発表したアルバム『よすが』は第14回CDショップ大賞2021に入賞し、同年に初の武道館ワンマンショー を開催。\n2023年に発表したアルバム『タオルケットは穏やかな』は第16回CDショップ大賞2024に入賞。\n同年、⽇本武道館ワンマンショー2daysを開催し、Fuji Rock Festival’23ではWhite Stageのサブヘッドライナーを務めた。\n\n2024年4月に「ラッキー/さびしくない」を配信リリース。\n8月に開催した日比谷野外音楽堂公演にて、共に活動をしていたサポートメンバーとしてが正式バンドメンバーとなることを発表。\nバンド「kanekoayano」としての活動をスタートした。`;

// バンド活動のテキスト
const bandText = `vocal/guitar. カネコアヤノ、guitar. 林宏敏、bass. takuyaiizuka\n\nカネコアヤノ率いるバンド「kanekoayano」。\n2024 年、林宏敏（guitar）、takuyaiizuka（bass）をメンバーに迎え活動を始める。\n2024 年4 月にシングル「ラッキー/ さびしくない」をリリースし、5 月にUK Tour と国内の全国13 箇所14 公演の「LivehouseTour 2024」を開催。\n2025 年4 月25 日にバンド結成後、初のアルバム『石の糸』をリリース。\n近年は海外での活動も積極的に行っており、2025 年5 月に3 度目のUK Tour、6 月には初のAUS Tour の開催。\nそして続けて同月から、国内ホールツアー「kanekoayano Hall Tour 2025 ” 石の糸”」を開催予定。`;

export default function ProfilePage() {
  // return (...) の中身を、以下のデザイン案AまたはBに置き換えます
  return (
    <div>
        <div className="container mx-auto p-4 md:p-8">
        <div className="space-y-24">
            {/* セクション1: ソロ活動 */}
            <section className="grid md:grid-cols-2 gap-8 items-start">
            <div className="md:order-2">
                <Image
                src="/image/prohead.jpg"
                alt="カネコアヤノ"
                width={800}
                height={800}
                className="w-full h-auto shadow-md"
                />
            </div>
            <div className="md:order-1">
                <h1 className="text-2xl font-bold mb-4">&lt; カネコアヤノ – Kaneko Ayano &gt;</h1>
                <p className="whitespace-pre-wrap leading-relaxed">{soloText}</p>
            </div>
            </section>

            {/* セクション2: バンド活動 */}
            <section className="grid md:grid-cols-2 gap-8 items-start">
            <div>
                <Image
                src="/image/profoot.jpg"
                alt="kanekoayano (band)"
                width={800}
                height={800}
                className="w-full h-auto shadow-md"
                />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">&lt; kanekoayano &gt;</h2>
                <p className="whitespace-pre-wrap leading-relaxed">{bandText}</p>
            </div>
            </section>
        </div>
        </div>
    </div>
  );
}