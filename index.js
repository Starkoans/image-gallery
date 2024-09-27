let query = 'summer';

let url = `https://api.unsplash.com/search/photos?client_id=iZWaLWyfSLp6cn7tyCw1hlbVWfjiQ1P4KMKoPPVY7U4&query=${query}`;

const imgSection = document.querySelector('#images-container');
const searchInput = document.querySelector('#search-input');
const imagesTitle = document.querySelector('#images-title');
const searchBtn = document.querySelector('#search-btn');
const cleanSearchInput = document.querySelector('#clean-search-input');

cleanSearchInput.addEventListener('click', () => {
	console.log('click');
	query = '';
	searchInput.value = '';
	searchInput.focus();
});
searchBtn.addEventListener('click', () => {
	getData();
});
document.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		console.log(event.key);
		getData();
	}
});

document.addEventListener('input', (event) => {
	query = event.target.value;
	url = `https://api.unsplash.com/search/photos?client_id=iZWaLWyfSLp6cn7tyCw1hlbVWfjiQ1P4KMKoPPVY7U4&query=${query}`;
	console.log(event.target.value);
});

document.addEventListener('DOMContentLoaded', function (event) {
	getData();
});

async function getData() {
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	showData(data.results);
}

function showData(dataArr) {
	imgSection.innerHTML = null;
	imagesTitle.innerHTML = query;
	if (dataArr.length === 0) {
		imgSection.innerHTML = `<p>По данному запросу изображения не найдены...</p>`;
	} else {
		dataArr.forEach((imgData) => {
			let newImgBox = document.createElement('div');
			newImgBox.classList.add('img-box');
            
			newImgBox.innerHTML = `
            <div class="img-info">
                <div class='user-avatar'><img src="${imgData.user.profile_image.small}" alt="${imgData.user.username}'s Avatar"></div>
                <a href="${imgData.user.links.html}" >${imgData.user.username}</a>
            </div>
			<img alt="${imgData.alt_description}" src="${imgData.urls.regular}" class="img"/>
            `;
			let newImg = document.createElement('img');
			newImg.classList.add('img');
			newImg.src = imgData.urls.small;
			newImg.alt = imgData.alt_description;
			imgSection.append(newImgBox);
		});
	}
}
