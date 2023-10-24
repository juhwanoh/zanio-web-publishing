// 지도
let map;

// 지도에 표시된 마커들
let markers = [];

// 선택한 마커의 정보 창
let infoWindow;


function createMap() {
    
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); 

    var mapTypeControl = new kakao.maps.MapTypeControl();
    // 지도 타입 컨트롤을 지도에 표시합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

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

    setCenterBySelected();
}

function addMarker({name, x, y, selected=false}) {

    // Marker 위치
    let position = new kakao.maps.LatLng(x, y);
    let markerImage = createMarkerImage({width: 64, height: 64});
    let markerDragImage = createMarkerImage({width: 72, height: 72});
    let markerSamllImage = createMarkerImage({width: 32, height: 32});
    
    let marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: name,
        image: selected? markerImage : markerSamllImage,
        draggable: selected
    });
    
    kakao.maps.event.addListener(marker, 'click', () => {
        
        markers.forEach((m) => {
            m.setImage(markerSamllImage);
            m.setDraggable(false);
        });
        
        marker.setImage(markerImage);
        marker.setDraggable(true);
        showInfoWindow(marker);
        map.panTo(marker.getPosition());
    });
    
    kakao.maps.event.addListener(marker, 'dragstart', () => marker.setImage(markerDragImage));
    kakao.maps.event.addListener(marker, 'dragend', (mouseEvent) => {
        marker.setImage(markerImage);
        map.panTo(marker.getPosition());
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

function setBounds() {

    let bounds = new kakao.maps.LatLngBounds();
    
    for (var i = 0; i < markers.length; i++) {
        let marker = markers[i];
        bounds.extend(marker.getPosition());
    }

    map.setBounds(bounds);
}

function setCenterBySelected() {
    
    let marker = getSelectedMarker();
    if (marker) {
        map.panTo(marker.getPosition());
    }
}


function showInfoWindow(marker) {
    
    if(infoWindow) {
        infoWindow.setMap(null);
    }

    var content = 
       `
       <div class="tooltip p-4 bg-white rounded-lg shadow-md text-sm text-black">
       This is a tooltip message!
       <div class="tooltip-arrow"></div>
       <div class="tooltip-arrow-inner"></div>
   </div>
       `;

    // 인포윈도우를 생성하고 지도에 표시합니다
    infoWindow = new kakao.maps.CustomOverlay({
        map: map,
        position : marker.getPosition(), 
        content : content,
        yAnchor: 1
    });

    infoWindow.setMap(map);
}


function showInfoWindow2(marker) {
    
    if(infoWindow) {
        infoWindow.close();
    }

    let iwContent = `<div class="custom-infowindow">${marker.getTitle()}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    // 인포윈도우를 생성하고 지도에 표시합니다
    infoWindow = new kakao.maps.InfoWindow({
        position : marker.getPosition(), 
        content : iwContent,
        removable : false
    });

    infoWindow.open(map, marker);
}


///////////////////////////////////////////////////
// APP 과의 통신(APP <-- --> WEB)
///////////////////////////////////////////////////

function moveToCenter(x,y) {
    map.setCenter(new kakao.maps.LatLng(x, y));
}


function getSelectedMarker() {
    return markers.find((m) => m.getDraggable());
}

function getSelectedMarkers() {
    // draggable 속성이 true 인 marker 전체 찾는다
    return markers.filter((m) => m.getDraggable());
}

// Marker를 추가
function addMarkersOnMap(datas) {
    addMarkers(JSON.parse(datas));
}

function resizeMap(width, height) {
    $("#map").css(
        {
            "width": `${width}px`,
            "height": `${height}px`
        }
    );
}