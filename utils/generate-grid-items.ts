import fs from 'fs';
import path from 'path';
import puppeteer, { Browser } from 'puppeteer';
import $ from 'cheerio';

const DATA_URL: string = 'https://tretton37.com/meet';

type Ninja = {
    name: string,
    flagAndCity: string,
    avatar: string
}

type Ninjas = {
    ninjas: Ninja[]
}

const parseHtmlDocument = (html: string): Ninjas => {
    let ninjas = [];

    // use Cheerio to parse things in the html from Puppeteer
    $('div .ninja-summary', html).each((i, item) => {
        const flagAndCity = $(item).find('span').first().text();
        const name = $(item).find('a').contents().first().text();
        const avatar = $(item).find('img').attr('src');

        const ninja: Ninja = {
            name,
            flagAndCity,
            avatar
        }
        ninjas = [...ninjas, ninja]
    });

    return { ninjas };
}

const get37Content = async (dataUrl: string) => {
    const outputPath: string = `${path.resolve()}/ninjasData`;

    // don't run the heavy async calls if the file is already generated
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
    // TODO: add error handling
    finally {
        await browser.close();
    }
}

get37Content(DATA_URL);