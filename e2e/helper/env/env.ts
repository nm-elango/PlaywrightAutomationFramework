import * as dotenv from 'dotenv'

export const getEnv = () => {
    console.log(`Region = ${process.env.REGION}`);
    if (process.env.REGION) {
        dotenv.config({
            override: true,
            path: `e2e/helper/env/.env.${process.env.REGION}`
        });
    } else {
        console.log(`In ENV else block`);
        dotenv.config({
            override: true,
            path: `e2e/helper/env/.env`
        });
    }
};