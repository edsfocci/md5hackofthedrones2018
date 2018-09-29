
 navigator.mediaDevices.getUserMedia({audio:true})
   .then(stream => {
     let rec = new MediaRecorder(stream);
     rec.ondataavailable = e => {
       let audioChunks.push(e.data);
       if (rec.state == 'inactive'){
         let blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
         const recordedAudio = {};
         const audioDownload = {};
         recordedAudio.src = URL.createObjectURL(blob);
         recordedAudio.controls=true;
         recordedAudio.autoplay=true;
         audioDownload.href = recordedAudio.src;
         audioDownload.download = 'mp3';
         console.log(recordedAudio.src);

         let audioDownload.innerHTML = 'download';
      }
     }
   })
   .catch(e=>console.log(e));

 startRecord.onclick = e => {
   console.log('click')
   startRecord.disabled = true;
   stopRecord.disabled=false;
   audioChunks = [];
   rec.start();
 }
 stopRecord.onclick = e => {
   console.log('click');
   startRecord.disabled = false;
   stopRecord.disabled=true;
   rec.stop();
 }
