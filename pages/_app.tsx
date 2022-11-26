import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";

import "../styles/globals.css";
import {
  AuthProvider,
  CategoryProvider,
  CustomerProvider,
  ProductProvider,
  SupplierProvider,
  UiProvider,
} from "../context";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}>
        <ProductProvider>
          <CustomerProvider>
            <CategoryProvider>
              <SupplierProvider>
                <UiProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UiProvider>
              </SupplierProvider>
            </CategoryProvider>
          </CustomerProvider>
        </ProductProvider>
      </SWRConfig>
    </AuthProvider>
  );
}

export default MyApp;
