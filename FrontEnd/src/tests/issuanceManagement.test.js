import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { createDriver, By, until } from './testConfig.js';

let driver;

describe('Issuance Management Tests', () => {

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await driver.quit();
    });

    it('should add an issuance successfully', async () => {
        await driver.get(`${process.env.BASE_URL}/issuanceadd`);

        await driver.findElement(By.id('memberName')).sendKeys('John Doe');
        await driver.findElement(By.id('bookTitle')).sendKeys('1984');
        await driver.findElement(By.id('submit-btn')).click();

        await driver.wait(until.elementLocated(By.className('success-msg')), 5000);
        const message = await driver.findElement(By.className('success-msg')).getText();
        expect(message).to.include('Issuance added successfully');
    });

    it('should update an issuance successfully', async () => {
        await driver.get(`${process.env.BASE_URL}/update/issuance/1`);

        await driver.findElement(By.id('memberName')).clear();
        await driver.findElement(By.id('memberName')).sendKeys('Jane Doe');
        await driver.findElement(By.id('submit-btn')).click();

        await driver.wait(until.elementLocated(By.className('success-msg')), 5000);
        const message = await driver.findElement(By.className('success-msg')).getText();
        expect(message).to.include('Issuance updated successfully');
    });

});
