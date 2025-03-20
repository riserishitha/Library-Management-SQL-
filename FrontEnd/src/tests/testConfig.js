import { Builder, By, until } from 'selenium-webdriver';
import dotenv from 'dotenv';

dotenv.config();

export async function createDriver() {
    return await new Builder().forBrowser('chrome').build();
}

export { By, until };
