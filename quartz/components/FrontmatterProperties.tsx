import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { JSX } from "preact"
import { resolveRelative } from "../util/path"
import style from "./styles/frontmatterProperties.scss"

interface FrontmatterPropertiesOptions {
  /**
   * Properties to display from frontmatter
   */
  properties: string[]
}

const defaultOptions: FrontmatterPropertiesOptions = {
  properties: ["area", "progress"]
}

export default ((opts?: Partial<FrontmatterPropertiesOptions>) => {
  const options: FrontmatterPropertiesOptions = { ...defaultOptions, ...opts }

  function FrontmatterPropertiesComponent({ fileData, cfg, displayClass }: QuartzComponentProps) {
    const frontmatter = fileData.frontmatter

    if (!frontmatter) {
      return null
    }

    const propertiesToShow = options.properties.filter(prop => 
      frontmatter[prop] !== undefined && frontmatter[prop] !== null
    )

    if (propertiesToShow.length === 0) {
      return null
    }

    const processObsidianLinks = (text: string): JSX.Element[] => {
      const linkRegex = /\[\[([^\]]+)\]\]/g
      const parts: JSX.Element[] = []
      let lastIndex = 0
      let match

      while ((match = linkRegex.exec(text)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          parts.push(<span>{text.slice(lastIndex, match.index)}</span>)
        }

        // Add the link
        const linkText = match[1]
        const href = resolveRelative(fileData.slug!, linkText.toLowerCase().replace(/\s+/g, "-"))
        parts.push(
          <a href={href} class="internal">
            {linkText}
          </a>
        )

        lastIndex = match.index + match[0].length
      }

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(<span>{text.slice(lastIndex)}</span>)
      }

      return parts
    }

    const formatValue = (value: any): JSX.Element => {
      if (Array.isArray(value)) {
        const processedItems = value.map((item, index) => {
          if (typeof item === "string" && item.includes("[[")) {
            return (
              <span key={index}>
                {index > 0 && ", "}
                {processObsidianLinks(item)}
              </span>
            )
          }
          return <span key={index}>{index > 0 && ", "}{String(item)}</span>
        })
        return <span>{processedItems}</span>
      }
      
      if (typeof value === "string" && value.includes("[[")) {
        return <span>{processObsidianLinks(value)}</span>
      }
      
      return <span>{String(value)}</span>
    }

    return (
      <div class={classNames(displayClass, "frontmatter-properties")}>
        {propertiesToShow.map(property => (
          <div class="property-item" key={property}>
            <span class="property-key">{property}:</span>
            <span class="property-value">{formatValue(frontmatter[property])}</span>
          </div>
        ))}
      </div>
    )
  }

  FrontmatterPropertiesComponent.css = style

  return FrontmatterPropertiesComponent
}) satisfies QuartzComponentConstructor