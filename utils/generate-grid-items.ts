import fs from 'fs';
import path from 'path';
import puppeteer, { Browser } from 'puppeteer';
import $ from 'cheerio';

const DATA_URL = 'https://tretton37.com/meet';

const parseHtmlDocument = (html: string) => {
    let ninjas = [];

    $('div .ninja-summary', html).each((i, item) => {
        const flagAndCity = $(item).find('span').first().text();
        const name = $(item).find('a').contents().first().text();
        const avatar = $(item).find('img').attr('src');

        const ninja = {
            name,
            flagAndCity,
            avatar
        }
        ninjas = [...ninjas, ninja]
    });

    return { ninjas };
}

const get37Content = async (dataUrl: string) => {
    const outputPath = `${path.resolve()}/ninjasData`;

    if (fs.existsSync(`${outputPath}/ninjasData.json`)) {
        return;
    }

    let browser: Browser;

    try {
        browser = await puppeteer.launch();
        const newPage = await browser.newPage();
        const htmlContent = await newPage.goto(dataUrl).then(() => newPage.content());
        const ninjas = parseHtmlDocument(htmlContent);
    
        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath);
        }
    
        fs.writeFileSync(
            `${outputPath}/ninjasData.json`,
            JSON.stringify(ninjas)
          );
    
        return ninjas;
    }
    finally {
        await browser.close();
    }
}

get37Content(DATA_URL);