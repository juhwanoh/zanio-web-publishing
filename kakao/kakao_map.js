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

/*
    Marker DATA
    {
        name: '마커1',
        x: 33.450701,
        y: 126.570667,
        active: false,
        markerType : 'normal' or 'circle'
    }
*/

function addMarkers(datas) {

    clearMarkers();
    datas = datas || [];

    for (var i = 0; i < datas.length; i++) {
        let data = datas[i];
        let marker = addMarker(data);
        marker.setMap(map);   
        markers.push(marker);
    }
}

function addMarker({name, x, y, active=false}) {

    // Marker 위치
    let position = new kakao.maps.LatLng(x, y);
    let markerImage = createMarkerImage({width: 64, height: 64});
    let markerDragImage = createMarkerImage({width: 72, height: 72});
    let markerSamllImage = createMarkerImage({width: 32, height: 32});
    
    let marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: name,
        image: active? markerImage : markerSamllImage,
        draggable: active
    });
    
    kakao.maps.event.addListener(marker, 'click', () => {
        
        markers.forEach((marker) => {
            marker.setImage(markerSamllImage);
            marker.setDraggable(false);
        });
        
        marker.setImage(markerImage);
        marker.setDraggable(true);
    });
    
    kakao.maps.event.addListener(marker, 'dragstart', () => marker.setImage(markerDragImage));
    kakao.maps.event.addListener(marker, 'dragend', () => {
        marker.setImage(markerImage);
    });

    return marker;
}

function createMarkerImage({width=32, height=32}) {
    // Marker 이미지
    const imageSrc = '/images/marker.svg';
    const markerWidth = width;
    const markerHeight = height;
    const markerSize = new kakao.maps.Size(markerWidth, markerHeight);
    const imageOption = {offset: new kakao.maps.Point(markerWidth/2, markerHeight)};


    let markerImage = new kakao.maps.MarkerImage(imageSrc, markerSize, imageOption);

    return markerImage
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function deactiveMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i]['active'] = false;
    }
}

function redrawMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
        markers[i].setMap(map);
    }
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