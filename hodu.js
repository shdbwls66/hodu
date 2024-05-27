/* cataas api 이용*/
// Show more 버튼
const catImage = document.querySelector('.catImage');
const showMoreBtn = document.getElementById('showMoreBtn');
let skip = 0;

showMoreBtn.addEventListener('click', ()=>{fetchImages(skip+=3)});

//데이터 불러오기
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

//불러온 데이터 출력
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

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
const mapTypeControl = new kakao.maps.MapTypeControl();

// kakao.maps.ControlPosition은 컨트롤이 표시될 위치 정의
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 줌 컨트롤을 생성
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


// 마커가 표시될 위치입니다
const markerPosition  = new kakao.maps.LatLng(33.4425, 126.5715);

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);