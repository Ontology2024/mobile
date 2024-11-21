import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { APP_KEY } from "@/env"; // env.ts 파일에서 APP_KEY를 가져옴
import * as location from "expo-location";
import { MapSearchParams } from "@/constants/MapSearchParams";

import data from "@/assets/data/danger_zone.json";

async function getPOI(place: string): Promise<[lat: number, lon: number]> {
  try {
    const response = await fetch(
      "https://apis.openapi.sk.com/tmap/pois?" +
        new URLSearchParams({
          version: "1",
          searchKeyword: place,
          searchType: "all",
          page: "1",
          count: "1",
          resCoordType: "WGS84GEO",
          multiPoint: "N",
          searchtypCd: "A",
          reqCoordType: "WGS84GEO",
          poiGroupYn: "N",
        }),
      {
        headers: {
          Accept: "application/json",
          appKey: APP_KEY,
        },
      }
    );
    const {
      searchPoiInfo: {
        pois: {
          poi: [{ noorLat, noorLon }],
        },
      },
    } = await response.json();

    return [noorLat, noorLon];
  } catch (error) {
    console.error("Error fetching POIs:", error);
    throw error;
  }
}

export default function Tmap() {
  const webviewRef = useRef<WebView>(null);
  const [initalized, setInitalized] = useState(false);
  const { start, dest } = useContext(MapSearchParams);

  // 현재 위치 실시간 업데이트
  useEffect(() => {
    if (!initalized) return;
    let subscription: location.LocationSubscription | null = null;

    (async () => {
      const { granted } = await location.requestForegroundPermissionsAsync();
      if (granted) {
        subscription = await location.watchPositionAsync(
          {
            accuracy: location.Accuracy.Low, // 높은 정확도
          },
          ({ coords: { latitude, longitude } }) => {
            if (webviewRef.current) {
              webviewRef.current.injectJavaScript(
                `updateMarkerPos(37.2429616, 127.0800525);`
              );
            }
          }
        );
      }
    })();

    return () => subscription?.remove();
  }, [initalized]);

  // 방향 실시간 업데이트
  useEffect(() => {
    if (!initalized) return;
    let subscription: location.LocationSubscription | null = null;

    (async () => {
      const { granted } = await location.requestForegroundPermissionsAsync();
      if (granted) {
        subscription = await location.watchHeadingAsync((newHeading) => {
          const heading = newHeading.trueHeading || newHeading.magHeading;
          if (webviewRef.current) {
            webviewRef.current.injectJavaScript(
              `updateMarkerHeading(${heading});`
            );
          }
        });
      }
    })();

    return () => subscription?.remove();
  }, [initalized]);

  useEffect(() => {
    if (!initalized || !start || !dest) return;

    const controller = new AbortController();
    let isCancelled = false;

    (async () => {
      try {
        const [[startLat, startLon], [destLat, destLon]] = await Promise.all([
          getPOI(start),
          getPOI(dest),
        ]);

        const response = await fetch(
          "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              appKey: APP_KEY,
            },
            body: JSON.stringify({
              startX: startLon,
              startY: startLat,
              endX: destLon,
              endY: destLat,
              startName: "출발지",
              endName: "목적지",
            }),
            signal: controller.signal,
          }
        );
        const { features } = await response.json();

        if (!isCancelled && webviewRef.current) {
          webviewRef.current.injectJavaScript(`
            drawLine(${JSON.stringify(
              features
                .filter(({ geometry: { type } }) => type === "LineString")
                .map(
                  ({
                    geometry: {
                      coordinates: [lat, lon],
                    },
                  }) => [lat, lon]
                )
                .flat(1)
                .slice(0, -1)
            )});
            map.setCenter(new Tmapv3.LatLng(${startLat}, ${startLon}));
            map.setZoom(20);
          `);

          const points: [lat: number, lon: number][] = features
            .filter(({ geometry: { type } }) => type === "Point")
            .map(
              ({
                geometry: {
                  coordinates: [lat, lon],
                },
              }) => [lon, lat]
            );

          webviewRef.current.injectJavaScript(`
            drawLine(${JSON.stringify([
              points[points.length - 2].slice().reverse(),
              points[points.length - 1].slice().reverse(),
            ])});
            drawDestMarker(${points[points.length - 1][0]}, ${
            points[points.length - 1][1]
          });
          `);

          points
            .slice(0, -1)
            .forEach(([lat, lon]) =>
              webviewRef.current!.injectJavaScript(`drawPoint(${lat}, ${lon});`)
            );
        }
      } catch (error) {
        console.error("Error drawing route:", error);
      }
    })();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [initalized, start, dest]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html: TMAP_VIEW }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webview}
        contentInset={{ top: -2, right: 0, bottom: 0, left: 0 }}
        scrollEnabled={false}
        onLoad={async () => {
          if (webviewRef.current === null) return;

          const { granted } =
            await location.requestForegroundPermissionsAsync();

          if (granted) {
            const {
              coords: { latitude, longitude, heading },
            } = await location.getCurrentPositionAsync();

            webviewRef.current.injectJavaScript(
              `init(${latitude}, ${longitude}, ${heading ?? 0});`
            );
          }
        }}
        onMessage={() => {
          setInitalized(true);

          if (webviewRef.current) {
            for (const points of data) {
              webviewRef.current.injectJavaScript(`
                registerArea(${JSON.stringify(points)}); 
              `);
            }

            webviewRef.current.injectJavaScript(`drawVisibleAreas();`);
          }
        }}
      />
    </View>
  );
}

const TMAP_VIEW = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Tmap</title>
    <script src="https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=${APP_KEY}"></script>
    <script type="text/javascript">
      var map;
      var currentLocationMarker;

      var currentLat = 37.566481622437934;
      var currentLong = 126.98502302169841;

      var marker_s;
      var marker_e;

      // 지도 및 마커 초기화 (한 번만 실행)
      function init(lat, long, heading) {
        currentLat = lat;
        currentLong = long;
        map = new Tmapv3.Map("map_div", {
          center: new Tmapv3.LatLng(lat, long),
          width: "100vw",
          height: "2200px",
          zoom: 18,
        });
        // 마커 생성
        currentLocationMarker = new Tmapv3.Marker({
          position: new Tmapv3.LatLng(lat, long),
          iconHTML: \`
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 18 40" fill="none" id="user-marker">
              <g clip-path="url(#clip0_1127_936)">
                <path d="M0 0H26L14.383 22H11.8936L0 0Z" fill="url(#paint0_linear_1127_936)" fill-opacity="0.35"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" fill="white"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" stroke="#D9D9D9"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" stroke="black" stroke-opacity="0.2"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" stroke="#6028FF"/>
                <path d="M13 33.5455C16.615 33.5455 19.5455 30.615 19.5455 27C19.5455 23.3851 16.615 20.4546 13 20.4546C9.38509 20.4546 6.45459 23.3851 6.45459 27C6.45459 30.615 9.38509 33.5455 13 33.5455Z" fill="#D9D9D9"/>
                <path d="M13 33.5455C16.615 33.5455 19.5455 30.615 19.5455 27C19.5455 23.3851 16.615 20.4546 13 20.4546C9.38509 20.4546 6.45459 23.3851 6.45459 27C6.45459 30.615 9.38509 33.5455 13 33.5455Z" fill="black" fill-opacity="0.2"/>
                <path d="M13 33.5455C16.615 33.5455 19.5455 30.615 19.5455 27C19.5455 23.3851 16.615 20.4546 13 20.4546C9.38509 20.4546 6.45459 23.3851 6.45459 27C6.45459 30.615 9.38509 33.5455 13 33.5455Z" fill="#6028FF"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_1127_936" x1="13" y1="0" x2="13" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#6028FF" stop-opacity="0"/>
                  <stop offset="1" stop-color="#6028FF"/>
                </linearGradient>
                <clipPath id="clip0_1127_936">
                  <rect width="26" height="36" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          \`,
          iconSize: new Tmapv3.Size(60, 80),
          anchorPoint: new Tmapv3.Point(30, 40),
          map,
        });
        map.on("ConfigLoad", function() {
			    window.ReactNativeWebView.postMessage("init");
		    });
      }

      // 마커 위치 및 방향 업데이트 함수
      function updateMarkerPos(latitude, longitude) {
        currentLat = latitude;
        currentLong = longitude;

        var newPosition = new Tmapv3.LatLng(latitude, longitude);
      
        // 마커가 존재할 때만 위치 및 방향 업데이트
        if (currentLocationMarker) {
          currentLocationMarker.setPosition(newPosition);
        }
        // 맵의 중앙을 새 좌표로 이동
        if (map) {
          map.setCenter(newPosition);
        }
      }

      function updateMarkerHeading(heading) {
        // 마커가 존재할 때만 방향 업데이트
        if (currentLocationMarker) {
          document.getElementById("user-marker").style.transform = 'rotate(' + heading + 'deg)';
        }
      }
      
      function Move() {
        var lonlat = new Tmapv3.LatLng(currentLat, currentLong);
        map.setCenter(lonlat);
        map.setZoom(19);
      }

      var naviItems = [];

      function drawPoint(lat, lon) {
        naviItems.push(new Tmapv3.Circle({
          center: new Tmapv3.LatLng(lat, lon),
          radius: 6,
          fillColor: "#FFFFFF",
          fillOpacity: 1,
          strokeColor: "#4775FF",
          strokeWeight: 3,
          strokeOpacity: 1,
          map: map,
        }));
      }

      function drawLine(path) {
        for (var i = 0; i < path.length; i++) {
          path[i] = new Tmapv3.LatLng(path[i][1], path[i][0]);
        }

        naviItems.push(new Tmapv3.Polyline({
          path: path,
          strokeColor: "#4775FF",
			    strokeWeight: 15,
          strokeOpacity: 1,
			    map: map
        }));
      }

      function drawDestMarker(lat, lon) {
        naviItems.push(new Tmapv3.Marker({
          position: new Tmapv3.LatLng(lat, lon),
          color: "#000000",
          opacity: 1,
          iconSize: new Tmapv3.Size(12, 30),
          map: map,
        }));
      }

      function clearNavi() {
        for (var i =0; i< naviItems.length; i++)
          naviItems[i].setMap(null);

        naviItems = [];
      }

      var areas = []

      function registerArea(path) {
        for (var i = 0; i < path.length; i++) {
          path[i] = new Tmapv3.LatLng(path[i][0], path[i][1]);
        }

        areas.push({ polygon: null, paths: path });
      }

      var lastCall = undefined;
      function drawVisibleAreas() {
        if(lastCall && Date.now() - lastCall < 2000) return;
        else lastCall = Date.now();

        var bound = map.getBounds();

        outer: for (var i = 0; i < areas.length; i++) {
          var polygon = areas[i].polygon;
          var paths = areas[i].paths;

          for (var j = 0; j < paths.length; j++) {
            if (bound.contains(paths[j])) {
              if (polygon === null) {
                areas[i].polygon = new Tmapv3.Polygon({
                  paths: paths,
                  fillColor: "#FFA1A6",
                  fillOpacity: 0.15,
                  strokeColor: "#FFA1A6",
                  strokeWeight: 1,
                  strokeOpacity: 1,
                  map: map
                })
              }
              continue outer;
            }
          }
          
          if (polygon) {
            polygon.setMap(null);
            areas[i].polygon = null;
          }
        }
      }

      setInterval(drawVisibleAreas, 3000)
    </script>
    <style>
      button {
        position: absolute;
        bottom: 110px;
        right: 30px;
        background-color: white;
        padding: 20px;
        border: none;
        outline: none;
        border-radius: 100%;
        box-shadow: 2px 4px 20px 0px rgba(0, 0, 0, 0.15);
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
        -webkit-user-select: none;
      }
      svg {
        pointer-events: none;
        user-drag: none;
      }
    </style>
    </head>
    <body>
      <div id="map_div"></div>
      <button onclick="Move()">
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3.28169C16.9842 3.64113 20.3589 7.01581 20.7183 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20.7183C20.3589 16.9842 16.9842 20.3589 12.75 20.7183V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20.7183C7.01581 20.3589 3.64113 16.9842 3.28169 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3.28169C3.64113 7.01581 7.01581 3.64113 11.25 3.28169V2C11.25 1.58579 11.5858 1.25 12 1.25ZM11.25 4.78832C7.84488 5.13828 5.13828 7.84488 4.78832 11.25H5.5C5.91421 11.25 6.25 11.5858 6.25 12C6.25 12.4142 5.91421 12.75 5.5 12.75H4.78832C5.13828 16.1551 7.84488 18.8617 11.25 19.2117V18.5C11.25 18.0858 11.5858 17.75 12 17.75C12.4142 17.75 12.75 18.0858 12.75 18.5V19.2117C16.1551 18.8617 18.8617 16.1551 19.2117 12.75H18.5C18.0858 12.75 17.75 12.4142 17.75 12C17.75 11.5858 18.0858 11.25 18.5 11.25H19.2117C18.8617 7.84488 16.1551 5.13828 12.75 4.78832V5.5C12.75 5.91421 12.4142 6.25 12 6.25C11.5858 6.25 11.25 5.91421 11.25 5.5V4.78832Z" fill="#767985"/>
        </svg>
      </button>
    </body>
  </html>
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
