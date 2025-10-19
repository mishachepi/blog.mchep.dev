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
    pageTitleSuffix: "",
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
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fafafa",
          lightgray: "rgba(0, 0, 0, 0.15)",
          gray: "rgba(0, 0, 0, 0.4)",
          darkgray: "rgba(0, 0, 0, 0.75)",
          dark: "#1a1a1a",
          secondary: "#22c55e",
          tertiary: "#16a34a",
          highlight: "rgba(34, 197, 94, 0.12)",
          textHighlight: "#22c55e44",
        },
        darkMode: {
          light: "#1a1a1a",
          lightgray: "rgba(255, 255, 255, 0.15)",
          gray: "rgba(255, 255, 255, 0.4)",
          darkgray: "rgba(255, 255, 255, 0.75)",
          dark: "#f5f5f5",
          secondary: "#22c55e",
          tertiary: "#16a34a",
          highlight: "rgba(34, 197, 94, 0.12)",
          textHighlight: "#22c55e44",
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
