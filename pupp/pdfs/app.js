const puppeteer = require("puppeteer")

async function getPage(){
  try{
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://vschool.io")
    // const data = await page.screenshot({path: "./test-png", type: "png"})
    // const data = await page.pdf({path: "./pdf-test", scale: 1, printBackground: true, width: 1300})
    const data = await page.click(".HeroImage__ImagesContainer-sc-9kq9xt-9")
    console.log(data)

    await browser.close()
  }
  catch(err){
    console.log(err)
  }
}

getPage()