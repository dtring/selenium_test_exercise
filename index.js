const {Builder, By, Key, until} = require('selenium-webdriver');
const { get } = require('selenium-webdriver/http');
const { titleIs } = require('selenium-webdriver/lib/until');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://bidjs.com');
    await driver.sleep(2000);

    var currentUrl1 = (await driver.getCurrentUrl()).toString();
    //console.log(currentUrl1);    
    if (currentUrl1.endsWith('bidjs.com/')) {
        console.log("BidJS.com load successful");
    } else {
        console.log("BidJS.com load fail");
    }

    await driver.findElement(By.linkText('demo')).click();
    await driver.sleep(2000);
    await driver.wait(until.titleIs('Upcoming Auctions | Demonstration Auctions'), 1000);
    await (await driver.findElement(By.linkText('login'))).click();
    await driver.wait(until.titleIs('Log In | Demonstration Auctions'), 1000);

    var currentUrl2 = (await driver.getCurrentUrl()).toString();
    //console.log(currentUrl2);    
    if (currentUrl2.startsWith('https://bidjs.com/demo/#!/login')) {
        console.log("Login page load successful");
    } else {
        console.log("Login page load fail");
    }

    await driver.findElement(By.id('identifier')).sendKeys('admin_demo');
    await driver.findElement(By.id('password')).sendKeys('5unSh1ne');
    await (await driver.findElement(By.id('submit'))).click();
    await driver.sleep(2000);

    var checkLogin = (await (await driver.findElement(By.className('x-bidlogix--templated-user'))).getText());
    console.log(checkLogin);    
    if (checkLogin.startsWith('Admin_demo')) {
        console.log("Login successful");
    } else {
        console.log("Login fail");
    }

  } finally {
    await driver.quit();
  }

  console.log("test complete");

})();