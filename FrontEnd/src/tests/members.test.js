import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { createDriver, By, until } from './testConfig.js';

let driver;

describe('Members List Tests', () => {

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await driver.quit();
    });

    it('should display members list', async () => {
        await driver.get(`${process.env.BASE_URL}/mem`);

        const members = await driver.findElements(By.className('member-item'));
        expect(members.length).to.be.greaterThan(0);
    });

});
