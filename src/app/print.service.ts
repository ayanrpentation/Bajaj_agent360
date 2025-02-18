import { Injectable } from '@angular/core';
// import * as puppeteer from 'puppeteer';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

  // async printWebPage(url: string, outputPath: string) {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();

  //   await page.goto(url, { waitUntil: 'networkidle0' });

  //   // Set the viewport to match the screen resolution
  //   await page.setViewport({
  //     width: 1920,
  //     height: 1080,
  //     deviceScaleFactor: 1,
  //   });

  //   // Wait for any additional content to load
  //   // await page.waitForTimeout(2000); // Adjust the timeout as needed

  //   // Print the webpage to PDF
  //   await page.pdf({
  //     path: outputPath,
  //     format: 'A4',
  //     printBackground: true, // Enable printing of background colors and images
  //   });

  //   await browser.close();
  // }
}
