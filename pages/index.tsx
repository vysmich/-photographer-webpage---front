import Hero from "../src/components/Hero";
import MainCategoriesBanner from "../src/components/MainCategoriesBanner";
import AboutBanner from "../src/components/AboutBanner";

import { GetStaticProps} from 'next'

import homepageGql from "../src/query/HomepageGql";

interface hero {

}

export default function Home<{hero}>({ hero, mainCategoriesBanner, aboutBanner }) {
  return (
    <div>
      <Hero heroData={hero} />
      <MainCategoriesBanner mainCategoriesBannerData={mainCategoriesBanner} />
      <AboutBanner aboutBannerData={aboutBanner} />
    </div>
  );
}


export const getStaticProps: GetStaticProps = async (context) => {
 return homepageGql(context);
}
