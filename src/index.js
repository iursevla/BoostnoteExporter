const fs = require('fs');
const { MarkdownToHTML } = require('./MarkdownToHTML');
const phantom = require('phantom'); // https://github.com/amir20/phantomjs-node

class CLI {

    constructor(markdownCode) {
        this.md = new MarkdownToHTML();
        this.markdownToHTML(markdownCode);
    }

    markdownToHTML(markdownCode) {
        let html = this.md.render(markdownCode);
        console.log(html);
        this.renderPDF(html);
    }

    //Problem with images otherwise works great
    async renderPDF(htmlCode) {
        const phantomInstance = await phantom.create();

        const page = await phantomInstance.createPage();
        await page.property('viewportSize', { width: 1024, height: 600 });
        page.setContent(htmlCode, '');

        //Verify if htmlCode contains images

        /*     await page.render('stackoverflow.pdf')
            console.log(`File created at [./stackoverflow.html]`);
            await phantomInstance.exit(); */
        let numImgs = this._numImagesInHtmlCode(htmlCode);
        if (numImgs === 0) {
            console.log("0 images");
            await page.render('stackoverflow.pdf');
            await phantomInstance.exit();
        } else {
            console.log(`Has ${numImgs} images.`)
            setTimeout(() => {
                page.render('stackoverflow.pdf').then((page) => {
                    phantomInstance.exit();
                }).catch(e => console.log(e));
            }, 500 * numImgs);
        }
    }

    _numImagesInHtmlCode(htmlCode) {
        return (htmlCode.match(/<img/g) || []).length;
    }
}
let markdownCode = fs.readFileSync('D:\\BoostNote Folder\\dist\\Test 1\\Boostnote is amazing.md', 'utf8');

new CLI(markdownCode);

/* let markdownCode = `
# Remarkable rulezz!
\`\`\`js
let x = 33;
\`\`\`
`;  */