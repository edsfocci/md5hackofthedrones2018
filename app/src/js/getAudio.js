// 'use strict';
// var player = document.getElementById('player');
//
// var handleSuccess = function(stream) {
//   if (window.URL) {
//     player.src = window.URL.createObjectURL(stream);
//   } else {
//     player.src = stream;
//   }
// };
//
// // navigator.mediaDevices.getUserMedia({ audio: true, video: false })
// //     .then(handleSuccess);
//
//
// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => {
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();
//
//     const audioChunks = [];
//     mediaRecorder.addEventListener("dataavailable", event => {
//       audioChunks.push(event.data);
//     });
//
//     mediaRecorder.addEventListener("stop", () => {
//       const audioBlob = new Blob(audioChunks);
//     });
//
//     setTimeout(() => {
//       mediaRecorder.stop();
//     }, 3000);
//   });
