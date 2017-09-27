const fs = require('fs');
const Remarkable = require('remarkable'); //https://github.com/jonschlinkert/remarkable
const hljs = require('highlightjs'); //https://www.npmjs.com/package/highlightjs


/**
 * Simple static class that extends the Remarkable API and adds the highligh method.
 * @class MarkdownToHTML
 * @extends {Remarkable} 
 */
class MarkdownToHTML extends Remarkable {

    constructor() {
        super({ highlight: MarkdownToHTML.highlight });
    }

    /**
     * Used to highlight code sections.
     * @static
     * @param {string} str - The code string. 
     * @param {string} lang - The language to use e.g. javascript.
     * @returns {string} - The generated code after highlighting it.
     * @memberof MarkdownToHTML
     */
    static highlight(str, lang) {
        // console.log(str, lang);
        if (lang && hljs.getLanguage(lang)) {
            try {
                // console.log(hljs.highlight(lang, str).value);
                return hljs.highlight(lang, str).value
            } catch (err) { }
        }
        try {
            return hljs.highlightAuto(str).value
        } catch (err) { }
        return ''
    }
}

/* let markdownCode = `
# Remarkable rulezz!
\`\`\`js
let x = 33;
\`\`\`
`; */
let markdownCode = fs.readFileSync('D:\\BoostNote Folder\\dist\\Test 1\\Boostnote is amazing.md', 'utf8');

let md = new MarkdownToHTML();
console.log(md.render(markdownCode));