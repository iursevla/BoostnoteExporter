const Remarkable = require('remarkable');

class MarkdownToHTML {
    constructor(markdown) {
        let rm = new Remarkable();
        console.log(rm.render(markdown));
    }
}

new MarkdownToHTML("# Remarkable rulezz!")