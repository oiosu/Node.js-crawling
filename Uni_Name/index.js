// const axios = require('axios');
// const cheerio = require('cheerio');

// // 크롤링할 웹 페이지 URL
// const url = 'https://apply.jinhakapply.com/SmartRatio';

// // Axios를 사용하여 웹 페이지 가져오기
// axios.get(url)
//     .then((response) => {
//         if (response.status === 200) {
//             const html = response.data;
//             const $ = cheerio.load(html);

//             // 원하는 내용을 추출하거나 조작할 수 있습니다.
//             // 예를 들어, 전체 페이지 내용을 출력하려면 다음과 같이 합니다.
//             console.log($.html());

//             // 또는 특정 태그 내용을 가져오려면 다음과 같이 합니다.
//             // 예를 들어, 모든 <p> 태그 내용을 출력하려면 다음과 같이 합니다.
//             $('#nowResults > li:nth-child(1)').each((index, element) => {
//                 console.log($(nth - child(1)).text());
//             });

//         } else {
//             console.error('웹 페이지에 접근할 수 없습니다. 상태 코드:', response.status);
//         }
//     })
//     .catch((error) => {
//         console.error('오류 발생:', error);
//     });


const axios = require('axios');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');

// 크롤링할 웹 페이지 URL
const url = 'https://apply.jinhakapply.com/SmartRatio';

// Axios를 사용하여 웹 페이지 가져오기
axios.get(url)
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);

            const universityNames = [];

            $('').each((index, element) => {
                const universityName = $(element).text();
                universityNames.push(universityName);
            });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('University Names');

            universityNames.forEach((name) => {
                worksheet.addRow([name]);
            });

            const excelFilePath = 'university_names.xlsx';
            workbook.xlsx.writeFile(excelFilePath)
                .then(() => {
                    console.log(`대학 이름이 ${excelFilePath} 파일에 저장되었습니다.`);
                })
                .catch((error) => {
                    console.error('엑셀 파일 저장 중 오류 발생:', error);
                });
        } else {
            console.error('웹 페이지에 접근할 수 없습니다. 상태 코드:', response.status);
        }
    })
    .catch((error) => {
        console.error('오류 발생:', error);
    });
