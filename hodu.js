/*
//Show more 버튼
const catImage = document.querySelector('.catImage');
const showMoreBtn = document.getElementById('showMoreBtn');

let pageToPatch =0;

showMoreBtn.addEventListener('click', ()=>{fetchimages(pageToPatch += 1)});

//데이터 불러오기
async function fetchimages(page){
    try{
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=3`);

        if(!response.ok){
            throw new Error('네트워크 응답에 문제가 있습니다');
        }

        const datas = await response.json();
        console.log(datas);
        makeImageList(datas);
    }catch(error){
        console.error(error);
    }
}

function makeImageList(datas){
    datas.forEach((data)=>{
        catImage.insertAdjacentHTML('beforeend', `<li class="img_width"><img src="${data.download_url}" alt=""></li>`)
    });
}
 */

/* cataas api 이용*/
// Show more 버튼
const catImage = document.querySelector('.catImage');
const showMoreBtn = document.getElementById('showMoreBtn');
let skip = 0;

showMoreBtn.addEventListener('click', ()=>{fetchImages(skip+=3)});

async function fetchImages(skip){
    try{
        const response = await fetch(`https://cataas.com/api/cats?limit=3&skip=${skip}`);
        if(!response.ok){
            throw new Error('네트워크에 문제가 있습니다.');
        }

        const cats = await response.json();
        console.log(cats);
        makeImageList(cats);
    }catch(error){
        console.error(error);
    }
}

function makeImageList(cats){
    cats.forEach((cat)=>{
        catImage.insertAdjacentHTML("beforeend", `<li><img src="https://cataas.com/cat/${cat._id}" alt="catImage"></li>`)
    })
}


//모달
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('#modalBtn');
const subscribeBtn = document.querySelector('#subscribeBtn');

subscribeBtn.addEventListener('click', (event)=>{
    modal.style.display = 'flex';
    event.preventDefault()
})
modalBtn.addEventListener('click', ()=>{
    modal.style.display = 'none';

})

//스크롤바
const scrollTop = document.querySelector('#scrollBtn');

scrollTop.addEventListener('click', () => {
    window.scroll({
        top: 0, left: 0, behavior: "smooth"
    })
})

//지도
const mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(33.4425, 126.5715), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption);
const mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


const markerPosition  = new kakao.maps.LatLng(33.4425, 126.5715);
const marker = new kakao.maps.Marker({
    position: markerPosition
});

marker.setMap(map);