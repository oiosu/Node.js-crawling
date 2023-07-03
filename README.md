# Node.js-crawling
Node.js-crawling-practice
> Node.js crawling을 하기 위해 연습한 내용입니다.


- Node.js에서 axios, cheerio 모듈을 이용하여 인프런 웹 사이트 크롤링 하기

> **크롤링 이란?** 
: 웹 페이지를 그대로 가져와서 거기서 원하는 데이터를 추출해내는 것을 말한다. 
: 특정 페이지를 분석한다고 생각하면 된다. 
: 이 사이트에 직접 들어가지 않더라도 그 웹 사이트의 데이터를 가져올 수 있도록 하는 것!
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
