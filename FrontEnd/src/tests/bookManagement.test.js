import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { createDriver, By, until } from './testConfig.js';

let driver;

describe('Book Management Tests', () => {

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await driver.quit();
    });

    it('should add a book successfully', async () => {
        await driver.get(`${process.env.BASE_URL}/add`);

        await driver.findElement(By.id('title')).sendKeys('1984');
        await driver.findElement(By.id('author')).sendKeys('George Orwell');
        await driver.findElement(By.id('genre')).sendKeys('Dystopian');
        await driver.findElement(By.id('submit-btn')).click();

        await driver.wait(until.elementLocated(By.className('success-msg')), 5000);
        const message = await driver.findElement(By.className('success-msg')).getText();
        expect(message).to.include('Book added successfully');
    });

    it('should update a book successfully', async () => {
        await driver.get(`${process.env.BASE_URL}/update/book/1`);

        await driver.findElement(By.id('title')).clear();
        await driver.findElement(By.id('title')).sendKeys('Updated Title');
        await driver.findElement(By.id('submit-btn')).click();

        await driver.wait(until.elementLocated(By.className('success-msg')), 5000);
        const message = await driver.findElement(By.className('success-msg')).getText();
        expect(message).to.include('Book updated successfully');
    });

    it('should view book details', async () => {
        await driver.get(`${process.env.BASE_URL}/listBooks/1`);

        const title = await driver.findElement(By.className('book-title')).getText();
        expect(title).to.include('Updated Title');
    });

});
