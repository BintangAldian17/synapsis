"use client";
import "@ant-design/v5-patch-for-react-19";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { ClientProviders } from "./queryClient";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientProviders>
      <AntdRegistry layer>
        <ConfigProvider theme={theme}>
          <App>{children}</App>
        </ConfigProvider>
      </AntdRegistry>
    </ClientProviders>
  );
};

export default Providers;
