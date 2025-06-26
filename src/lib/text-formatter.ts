export function formatTextWithBold(text: string): string {
  // Replace **text** with <strong>text</strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace *text* with <strong>text</strong>
  formatted = formatted.replace(
    /(?<!\*)\*([^*]+?)\*(?!\*)/g,
    "<strong>$1</strong>"
  );

  // Handle code blocks
  formatted = formatted.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, language, code) => {
      const lang = language || "text";
      const escapedCode = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      return `<div class="code-block-container bg-black border border-gray-700 rounded-lg overflow-hidden">
        <div class="code-block-header flex items-center justify-between py-2 bg-black border-b border-gray-700">
          <span class="code-language text-xs font-medium text-gray-300 uppercase">${lang}</span>
          <button class="copy-code-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 rounded transition-colors duration-200 min-h-[28px] h-7 border border-gray-600" data-code="${encodeURIComponent(
            code.trim()
          )}">
            <span class="leading-none">Copy</span>
          </button>
        </div>
        <pre class="code-block px-4 text-sm bg-black overflow-x-auto"><code class="text-gray-100 font-mono">${escapedCode}</code></pre>
      </div>`;
    }
  );

  // Handle inline code
  formatted = formatted.replace(
    /`([^`]+)`/g,
    '<code class="inline-code px-1.5 py-0.5 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">$1</code>'
  );

  // Convert line breaks to <br> tags
  formatted = formatted.replace(/\n/g, "<br>");

  return formatted;
}

export function sanitizeHtml(html: string): string {
  const allowedTags = [
    "strong",
    "br",
    "code",
    "pre",
    "div",
    "span",
    "button",
    "svg",
    "rect",
    "path",
  ];
  const allowedAttributes = [
    "class",
    "data-language",
    "data-code",
    "width",
    "height",
    "viewBox",
    "fill",
    "stroke",
    "stroke-width",
    "x",
    "y",
    "rx",
    "ry",
    "d",
  ];

  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

  return html.replace(tagRegex, (match, tagName) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      return match;
    }
    return "";
  });
}
