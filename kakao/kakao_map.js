function createMap() {
    
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); 

    // var mapTypeControl = new kakao.maps.MapTypeControl();
    // // 지도 타입 컨트롤을 지도에 표시합니다
    // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    // var zoomControl = new kakao.maps.ZoomControl();
    // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    return map;
}

function addMarker({name, x, y}) {

    // Marker 위치
    let position = new kakao.maps.LatLng(x, y);
    let markerImage = createMarkerImage();
    let markerDragImage = createMarkerDragImage();
    
    let marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: name,
        image: markerImage,
        draggable: true
    });
    

    // let infoWindow = createInfoWindow({name, x, y});
    // infoWindow.open(map, marker);

//    marker.setMap(map);
    // marker.setDraggable(true);

    // 도착 마커에 dragstart 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'dragstart', function() {
        // 도착 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
        marker.setImage(markerDragImage);
    });

    kakao.maps.event.addListener(marker, 'dragend', function() {
        // 도착 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
        marker.setImage(markerImage);
    });

    return marker;
}

function createMarkerImage() {
    // Marker 이미지
    const imageSrc = '/images/marker.png';
    const markerWidth = 48;
    const markerHeight = 48;
    const markerSize = new kakao.maps.Size(markerWidth, markerHeight);
    const imageOption = {offset: new kakao.maps.Point(markerWidth/2, markerHeight)};


    let markerImage = new kakao.maps.MarkerImage(imageSrc, markerSize, imageOption);

    return markerImage
}

function createMarkerDragImage() {
    // Marker 이미지
    const imageSrc = '/images/marker.png';
    const markerWidth = 48;
    const markerHeight = 48;
    const markerSize = new kakao.maps.Size(markerWidth, markerHeight);
    const imageOption = {offset: new kakao.maps.Point(markerWidth/2, markerHeight)};


    let markerImage = new kakao.maps.MarkerImage(imageSrc, markerSize, imageOption);

    return markerImage
}


function createInfoWindow({name, x, y}) {
    
    let iwContent = `<div style="padding:20px;">${name}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    let iwPosition = new kakao.maps.LatLng(x, y); //인포윈도우 표시 위치입니다
    let iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성하고 지도에 표시합니다
    let infoWindow = new kakao.maps.InfoWindow({
        position : iwPosition, 
        content : iwContent,
        removable : iwRemoveable
    });

    return infoWindow;
}