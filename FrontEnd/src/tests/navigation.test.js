import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { createDriver, By, until } from './testConfig.js';

let driver;

describe('Navigation Tests', () => {

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await driver.quit();
    });

    it('should navigate to Home page', async () => {
        await driver.get(process.env.BASE_URL);
        
        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.include('Home'); 
    });

    it('should navigate to Add Book page', async () => {
        await driver.get(process.env.BASE_URL);
        await driver.findElement(By.linkText('Add Book')).click();

        await driver.wait(until.urlContains('/add'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/add');
    });

    it('should navigate to Add Issuance page', async () => {
        await driver.get(process.env.BASE_URL);
        await driver.findElement(By.linkText('Add Issuance')).click();

        await driver.wait(until.urlContains('/issuanceadd'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/issuanceadd');
    });

    it('should navigate to About Members page', async () => {
        await driver.get(process.env.BASE_URL);
        await driver.findElement(By.linkText('About Members')).click();

        await driver.wait(until.urlContains('/mem'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/mem');
    });

});
