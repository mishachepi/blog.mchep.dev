import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "blog.mchep.dev",
    pageTitleSuffix: " mchep.dev",
    enableSPA: true,
    enablePopovers: true,
    // analytics: {
    //   provider: "plausible",
    // },
    locale: "en-US",
    baseUrl: "blog.mchep.dev",
    ignorePatterns: ["private", "templates", ".git", "**/.git", "**/.git/**"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Inconsolata",
        header: "Inconsolata",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8f8f8",
          lightgray: "rgba(0, 0, 0, 0.15)",
          gray: "rgba(0, 0, 0, 0.5)",
          darkgray: "rgba(0, 0, 0, 0.8)",
          dark: "#000000",
          secondary: "#00cc00",
          tertiary: "#009900",
          // highlight: "rgba(0, 204, 0, 0.15)",
          textHighlight: "#00cc0044",
        },
        darkMode: {
          light: "#121212",
          lightgray: "rgba(255, 255, 255, 0.15)",
          gray: "rgba(255, 255, 255, 0.5)",
          darkgray: "rgba(255, 255, 255, 0.8)",
          dark: "#f8f8f8",
          secondary: "#00cc00",
          tertiary: "#009900",
          // highlight: "rgba(0, 204, 0, 0.15)",
          textHighlight: "#00cc0044",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
