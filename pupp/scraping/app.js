const puppeteer = require('puppeteer')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://www.johancruijffarena.nl/calendar.htm')

  // const result = await page.evaluate(() => {
  //   const tables = document.querySelectorAll("table")
  //   return tables.length
  // })

  // browser.close()
  // return result
  const result = page.evaluate(() => {
    const data = []
    const tables = document.querySelectorAll("table")
    for(let i = 0; i < tables.length; i++){
      data.push(tables[i].children[0].children[0].children[0].innerText)
    }

    return data
  })
  return result
}

module.exports = 