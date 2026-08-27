import { Navbar1 } from "@/block/navbar1/navbar1";
import { Hero115 } from "@/block/hero115/hero115";
import { Logos18 } from "@/block/logos18/logos18";
import { Feature43 } from "@/block/feature43/feature43";
import { Testimonial9 } from "@/block/testimonial9/testimonial9";
import { Pricing2 } from "@/block/pricing2/pricing2";
import { Cta10 } from "@/block/cta10/cta10";
import { Footer2 } from "@/block/footer2/footer2";

export default function LandingPage1() {
  return (
    <main className="flex w-full flex-col">
      <Navbar1 />
      <Hero115 />
      <Logos18 />
      <Feature43 />
      <Testimonial9 />
      <Pricing2 />
      <Cta10 />
      <Footer2 />
    </main>
  );
}
