# 🟢 Node.js-crawling
Node.js-crawling-practice
> Node.js crawling을 하기 위해 연습한 내용입니다.


- Node.js에서 axios, cheerio 모듈을 이용하여 인프런 웹 사이트 크롤링 하기

> **크롤링 이란?** <br>
: 웹 페이지를 그대로 가져와서 거기서 원하는 데이터를 추출해내는 것을 말한다. <br>
: 특정 페이지를 분석한다고 생각하면 된다. <br>
: 이 사이트에 직접 들어가지 않더라도 그 웹 사이트의 데이터를 가져올 수 있도록 하는 것! <br>
> 

(1) `inflearn-crawling`  폴더 만들기 

(2) `package.json` & `axios, cheerio` 모듈 설치하기 

```bash
npm init -y
npm install axios cheerio
```

(2) `inflearn.js` 파일 만들기 

```jsx
const axios = require("axios");
const cheerio = require("cheerio");

//검색할 키워드 
const getHTML = async(keyword) => {
	try {
		return await axios.get("https://www.inflearn.com/courses?s=" + encodeURI(keyword)
	}catch(err) {
		console.log(err);
	}
}

const parsing = async (keyword) => {
	const html = await getHTML(keyword);
	//console.log(html);
	const $ = cheerio.load(html.data);
	const $courseList = $(".course_card_item");
	
	let courses = [];
	$courseList.each((inx,node) => {
		const title = $(node).find(".course_title").text();
		//console.log($(node).find(".course_title"));
		courses.push({
			title : $(node).find(".course_title:eq(0)").text(),
			instructor: $(node).find(".instructor").text(),
			price: $(node).find(".price").text(),
			rating: $(node).find(".star_solid").css("width"),
			img: $(node).find(".card-image > figure > img").attr("src")
		})
	});
	
	console.log(courses);
}

parsing("자바스크립트") 
```

- [`https://www.inflearn.com/courses?s=자바스크립트`](https://www.inflearn.com/courses?s=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8) 
: 인프런 에서 자바스크립트 단어를 검색했을 때

(3) 실행하기
```bash
node inflearn.js
```


---

# 🟢 UniversityNames Crawling
```json
{
  "name": "uni_name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.5.0",
    "cheerio": "^1.0.0-rc.12",
    "exceljs": "^4.3.0",
    "iconv-lite": "^0.6.3",
    "xlsx": "^0.18.5"
  }
}

```

### 1. 모든 내용 크롤링하기 
```javascript
const axios = require('axios');
const cheerio = require('cheerio');

// 크롤링할 웹 페이지 URL
const url = 'https://apply.jinhakapply.com/SmartRatio';

// Axios를 사용하여 웹 페이지 가져오기
axios.get(url)
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);

            // 원하는 내용을 추출하거나 조작할 수 있습니다.
            // 예를 들어, 전체 페이지 내용을 출력하려면 다음과 같이 합니다.
            console.log($.html());

            // 또는 특정 태그 내용을 가져오려면 다음과 같이 합니다.
            // 예를 들어, 모든 <p> 태그 내용을 출력하려면 다음과 같이 합니다.
            $('#nowResults > li:nth-child(1)').each((index, element) => {
                console.log($(nth - child(1)).text());
            });

        } else {
            console.error('웹 페이지에 접근할 수 없습니다. 상태 코드:', response.status);
        }
    })
    .catch((error) => {
        console.error('오류 발생:', error);
    });
```
![image](https://github.com/oiosu/Node.js-crawling/assets/99783474/aaac5ce9-d818-45e8-9684-d6251c76af93)


### 2. 대학명만 가져오기 
> 대학 : 4년제 대학
> 지역 : 서울, 경기

```javascript
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
```
![image](https://github.com/oiosu/Node.js-crawling/assets/99783474/37a3e2e8-c6d1-46b5-b301-61f7504239a4)




