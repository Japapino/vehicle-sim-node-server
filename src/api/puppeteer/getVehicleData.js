import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

chromium.setHeadlessMode = true;

chromium.setGraphicsMode = false;

export async function POST() {
  // Optional: Load any fonts you need. Open Sans is included by default in AWS Lambda instances
  await chromium.font(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
  );

    const page = await browser.newPage();
    await page.goto("https://example.com");
    const pageTitle = await page.title();
    await browser.close();

  return response.json({
    test: true,
  });
}
