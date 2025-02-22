import HeroCarousel from "@/components/core/HeroCarousel";
// import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";

const Home = () => {
  return (
    <>
      <PageHeader isCentered/>
      <HeroCarousel />
      
      <div className="h-screen">sad</div>
    </>
  );
};

export default Home;
