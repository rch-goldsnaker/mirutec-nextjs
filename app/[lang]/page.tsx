import { getDictionary } from "@/lib/dictionary";
import LandingPage from "@/components/LandingPage";

export default async function Page({ params }: { params: Promise<{ lang: "en" | "es" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LandingPage dict={dict} lang={lang} />;
}

// Generate static params for explicit static generation
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
