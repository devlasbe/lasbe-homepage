# 배포 전후 화면 비교

Aside에서 화면과 DOM, 오류 및 요청 상태를 캡처하고 Node로 두 배포의 차이를 보고서로 만듭니다. 별 애니메이션 때문에 소량의 픽셀 차이는 정상일 수 있으며, 차이의 원인은 사람이 확인합니다.

1. 비교할 경로는 `curl -s https://lasbe.kr/sitemap.xml`로 확인합니다.
2. Aside 브라우저 REPL에서 다음 설정을 실행합니다. `outDir`은 캡처를 저장할 절대 경로입니다.

   ```js
   globalThis.VC = {
     origin: 'https://lasbe.kr',
     label: 'prod14',
     outDir: '/절대/경로/visual-check',
     viewport: 'desktop',
     paths: ['/', '/readme'],
   };
   ```

3. `capture.aside.js` 전체를 REPL에 붙여 넣어 실행합니다. 120초 제한을 고려해 경로를 나눠 실행하고, `viewport`를 `mobile`로 바꿔 다시 실행합니다. 다른 배포도 같은 경로와 viewport를 다른 `label`로 캡처합니다. 다른 호스트는 `origin`을 바꿔 캡처합니다.
4. 저장소에서 비교합니다.

   ```sh
   node scripts/visual-check/compare.mjs /절대/경로/visual-check prod14 prod15
   ```

터미널과 `report-prod14-vs-prod15.md`에 결과가 표시됩니다. sharp를 사용할 수 있으면 `diff/<viewport>/`에 차이 이미지도 저장합니다. Performance API 대체 방식은 브라우저가 상태 코드를 제공하지 않는 요청을 0으로 기록하므로, 해당 요청의 실패 여부를 판단할 수 없습니다.

Aside CLI의 `page.on('console'/'pageerror'/'response')`는 Playwright와 같은 이벤트를 전달하지 않습니다. 콘솔은 `page.console.logs()`로 읽고, 페이지 오류는 Aside의 `_sendToTarget('Page.addScriptToEvaluateOnNewDocument', …)`로 문서 시작 시 오류·처리되지 않은 Promise 거부를 수집합니다. 응답 상태는 Performance API로 읽으며 수집 결과가 비었으면 실패합니다. 각 이동 전후 접근성 스냅샷도 출력합니다. 운영 적용 전에 별도 탭에서 경고·콘솔 오류·비동기 예외·Promise 거부가 실제 수집되는지 확인했습니다.

블로그 iframe은 연결이 계속 유지되어 `networkidle`을 충족하지 못할 수 있습니다. 탐색은 Aside의 `interactive` 상태를 기다리고, 스냅샷으로 부팅 상태를 확인한 뒤 6초 후 최종 스냅샷·화면을 저장합니다. 배포 전후 같은 방식으로 실행합니다.
