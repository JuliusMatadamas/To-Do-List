import {Router} from "express";
import {readdirSync} from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName:string) => {
    // @ts-ignore
    const file : string = fileName.split('.').shift();
    return file;
}

readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if ( cleanName !== "index" ) {
        import(`./${cleanName}.route`).then((routeModule) => {
            router.use(`/${cleanName}`, routeModule.router);
        });
    }
});

export { router};