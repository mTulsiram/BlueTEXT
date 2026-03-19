(function() {
    'use strict';

    function initMarkdownEditor() {
        const input = document.getElementById('md-input');
        const preview = document.getElementById('md-preview');

        if (!input || !preview) return;

        // Simple vanilla regex-based markdown parser
        function parseMarkdown(md) {
            let html = md;

            // Headers
            html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
            html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
            html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

            // Bold
            html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

            // Italic
            html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

            // Links
            html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

            // Unordered Lists
            html = html.replace(/^\s*-\s+(.*)/gim, '<ul><li>$1</li></ul>');
            // Merge adjacent lists
            html = html.replace(/<\/ul>\n*<ul>/gim, '');

            // Ordered Lists
            html = html.replace(/^\s*\d+\.\s+(.*)/gim, '<ol><li>$1</li></ol>');
            // Merge adjacent lists
            html = html.replace(/<\/ol>\n*<ol>/gim, '');

            // Paragraphs (double newline)
            html = html.split(/\n\n+/).map(p => {
                if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<ol')) {
                    return p;
                }
                return `<p>${p}</p>`;
            }).join('\n');

            // Single newlines to <br> (optional, but good for simple markdown)
            html = html.replace(/\n/gim, '<br>');

            return html;
        }

        function updatePreview() {
            preview.innerHTML = parseMarkdown(input.value);
        }

        input.addEventListener('input', updatePreview);

        // Initial parse
        if(input.value) {
            updatePreview();
        }
    }

    document.addEventListener('DOMContentLoaded', initMarkdownEditor);
    document.addEventListener('pageLoaded', initMarkdownEditor);
})();