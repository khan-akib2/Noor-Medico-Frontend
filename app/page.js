import Hero from "@/sections/Hero";
import WhyChooseUs from "@/sections/WhyChooseUs";
import GenuineMedicines from "@/sections/GenuineMedicines";
import ServicesOverview from "@/sections/ServicesOverview";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import ContactQuick from "@/sections/ContactQuick";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <GenuineMedicines />
      <ServicesOverview />
      <Testimonials />
      <FAQ />
      <ContactQuick />
    </>
  );
}
