"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const xlsx_1 = tslib_1.__importDefault(require("xlsx"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const getFilePath = (filePath) => path_1.default.resolve(process.cwd(), filePath);
const sourceFile = xlsx_1.default.readFile(getFilePath('src/source/source.xlsx'));
const mapJson = {};
const reg = /^http.*/;
// 源文件只考虑两列，建立从A[n] => B[n]的映射关系
const sourceMap = {};
sourceFile.SheetNames.forEach((n) => {
    let sheet = sourceFile.Sheets[n];
    for (let row = 2; row < 120; row++) {
        const propText = sheet[`A${row}`];
        const valText = sheet[`B${row}`];
        if (propText && reg.test(propText.v)) {
            sourceMap[propText.v.trim()] = valText && valText.v;
        }
    }
});
const targetFiles = fs_extra_1.default.readdirSync(getFilePath('src/target'));
// 遍历target目录
targetFiles.forEach((fileName) => {
    mapJson[fileName] = [];
    const targetFile = xlsx_1.default.readFile(getFilePath(`src/target/${fileName}`));
    targetFile.SheetNames.forEach((n) => {
        let sheet = targetFile.Sheets[n];
        let i = 2;
        // 遍历英文cell和中文cell，找到匹配项，替换
        // 替换之后生成json文件和替换后的xlsx文件
        while (true) {
            let cn = sheet[`B${i}`];
            let en = sheet[`D${i}`];
            if (sourceMap[cn && cn.v.trim()]) {
                xlsx_1.default.utils.sheet_add_aoa(sheet, [[sourceMap[cn.v]]], { origin: `B${i}` });
                // console.log(`B${i}`, sourceM
                mapJson[fileName].push({
                    fileName,
                    cell: `B${i}`,
                    sourceUrl: cn.v,
                    targetUrl: sourceMap[cn.v]
                });
            }
            if (sourceMap[en && en.v.trim()]) {
                xlsx_1.default.utils.sheet_add_aoa(sheet, [[sourceMap[en.v]]], { origin: `D${i}` });
                mapJson[fileName].push({
                    fileName,
                    cell: `D${i}`,
                    sourceUrl: en.v,
                    targetUrl: sourceMap[en.v],
                });
            }
            if (!cn && !en) {
                xlsx_1.default.writeFile(targetFile, getFilePath(`dist/${fileName}`));
                return;
            }
            i++;
        }
    });
});
fs_extra_1.default.writeFile('dist/map.json', JSON.stringify(mapJson, null, 2));
//# sourceMappingURL=index.js.map