import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import Layout from "../src/components/layout/Layout";

import layoutGql from "../src/query/LayoutGql";

import type { AppProps } from "next/app";

interface props {
  props: {
    data: {};
  };
}

function MyApp({ Component, pageProps }: AppProps, { props }: props) {
  return (
    <ApolloProvider client={client}>
      <Layout contextLocale={props.contextLocale} layoutData={props.layout}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  return await layoutGql(context.router);
};
export default MyApp;
