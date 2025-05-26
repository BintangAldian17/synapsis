import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontFamily:
      "'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

    fontSize: 14,
    fontSizeSM: 12,
    fontSizeIcon: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,

    colorPrimary: "#59A1A5",
    colorSuccess: "#59A1A5",
    colorWarning: "#D82020",
    colorError: "#D82020",

    colorBgBase: "#FFFFFF",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",
    colorBgLayout: "#F9F9F9",

    colorText: "#121212",
    colorTextSecondary: "#A7A7A7",
    colorTextTertiary: "#787878",
    colorTextQuaternary: "#1F1F1F",

    colorBorder: "#D3D3D3",
    colorBorderSecondary: "#D3D3D3",

    colorLink: "#59A1A5",
    colorLinkHover: "#59A1A5",
    colorLinkActive: "#59A1A5",

    padding: 16,
    paddingXS: 8,
    paddingSM: 12,
    paddingLG: 24,
    paddingXL: 32,

    borderRadius: 6,
    borderRadiusSM: 4,
    borderRadiusLG: 8,
  },
  components: {
    Layout: {
      bodyBg: "#FFFFFF",
      headerBg: "#FFFFFF",
      headerHeight: 64,
      headerPadding: "0 32px",
      siderBg: "#F9F9F9",
    },
    Menu: {
      itemBg: "transparent",
      itemColor: "#787878",
      itemHoverColor: "#59A1A5",
      itemHoverBg: "rgba(89, 161, 165, 0.1)",
      itemSelectedColor: "#59A1A5",
      itemSelectedBg: "rgba(89, 161, 165, 0.1)",
      itemActiveBg: "rgba(89, 161, 165, 0.1)",
      groupTitleColor: "#121212",
      groupTitleFontSize: 14,
      fontSize: 14,
      iconSize: 18,
      itemMarginBlock: 4,
      itemMarginInline: 8,
      itemPaddingInline: 12,
      subMenuItemBg: "transparent",
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Card: {
      bodyPadding: 0,
    },
    Tabs: {
      itemColor: "#A7A7A7",
      itemHoverColor: "#59A1A5",
      itemSelectedColor: "#59A1A5",
      itemActiveColor: "#59A1A5",
      inkBarColor: "#59A1A5",
      titleFontSize: 14,
    },
    Select: {
      colorBorder: "#D3D3D3",
      colorPrimaryBorderHover: "#59A1A5",
      colorPrimaryHover: "#59A1A5",
      controlHeight: 40,
    },
    Input: {
      colorBorder: "#D3D3D3",
      colorPrimaryBorderHover: "#59A1A5",
      colorPrimaryHover: "#59A1A5",
      colorTextPlaceholder: "#A7A7A7",
      controlHeight: 40,
    },
    Button: {
      colorPrimary: "#59A1A5",
      colorPrimaryHover: "#59A1A5",
      colorPrimaryActive: "#59A1A5",
    },
    Breadcrumb: {
      itemColor: "#A7A7A7",
      linkColor: "#A7A7A7",
      linkHoverColor: "#59A1A5",
      lastItemColor: "#59A1A5",
      fontSize: 14,
    },
    Table: {
      cellFontSize: 16,
      headerColor: "#1F1F1F",
      headerBg: "#FAFAFA",
      headerBorderRadius: 0,
    },
    Form: {
      itemMarginBottom: 28,
    },
  },
};

export default theme;
