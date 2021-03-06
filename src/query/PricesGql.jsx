import { gql } from "@apollo/client";
import client from "../../apollo-client";

async function pricesGql(context) {
  const { data } = await client.query({
    variables: { lang: context.locale },

    query: gql`
      query prices($lang: I18NLocaleCode!) {
        service(locale: $lang) {
          data {
            attributes {
              PricesHero {
                HeroHeading
                HeroImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              PricesPerex
            }
          }
        }
        priceLists(locale: $lang) {
          data {
            id
            attributes {
              priceListPerex
              priceListMoreBtn
              priceListContactBtn
              priceListContent
              price
              priceListHero {
                HeroHeading
                HeroImage {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      hero: data.service.data.attributes.PricesHero,
      perex: data.service.data.attributes.PricesPerex,
      priceLists: data.priceLists.data,
    },
  };
}

export default pricesGql;
