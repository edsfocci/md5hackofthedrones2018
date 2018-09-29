'use strict'

let log = console.log.bind(console),
  buffer,
  counter=1,
  context,
  chunks,
  id = val => document.getElementById(val),
  ul = id('ul'),
  optInBtn = id('optInBtn'),
  source,
  start = id('start'),
  stop = id('stop'),
  stream,
  recorder,
  processor,
  media;


optInBtn.onclick = e => {
  let mv = id('mediaAudio'),
      mediaOptions = {
        audio: {
          tag: 'audio',
          type: 'audio/ogg',
          ext: '.ogg',
          options: {audio: true}
        }
      };
  media = mediaOptions.audio;
  navigator.mediaDevices.getUserMedia(media.options).then(_stream => {
    stream = _stream;
    id('permissions').style.display = 'none';
    id('btns').style.display = 'inherit';
    start.removeAttribute('disabled');
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
      chunks.push(e.data);
      if(recorder.state == 'inactive') {
        makeLink();
        submit();
      }
    };
    context = new AudioContext();
    source = context.createMediaStreamSource(stream);
    processor = context.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = function(e) {
      // Do something with the data, i.e Convert this to WAV
      buffer.push(e.inputBuffer);
      console.log(e.inputBuffer);
    };

    log('got media successfully');
  }).catch(log);
}

start.onclick = e => {
  start.disabled = true;
  stop.removeAttribute('disabled');
  chunks=[];
  buffer =[];
  recorder.start();
}


stop.onclick = e => {
  stop.disabled = true;
  recorder.stop();
  start.removeAttribute('disabled');
}



function makeLink() {
  let blob = new Blob(chunks, {type: media.type })
    , url = URL.createObjectURL(blob)
    , li = document.createElement('li')
    , mt = document.createElement(media.tag)
    , hf = document.createElement('a')
  ;
  mt.controls = true;
  mt.src = url;
  hf.href = url;
  hf.download = `audio_file${media.ext}`;
  hf.innerHTML = `download ${hf.download}`;
  li.classList.add('mt-2')
  li.classList.add('mr-3')
  li.appendChild(mt);
  li.appendChild(hf);
  ul.appendChild(li);
}


function submit() {
  let blob = new Blob(chunks, {type: media.type });
  var reader = new window.FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function() {

    var fd = new FormData();
    base64data = reader.result;
    fd.append('file', base64data, 'audio.ogg');

    $.ajax({
      type: 'POST',
      url: '/',
      data: fd,
      cache: false,
      processData: false,
      contentType: false,
      enctype: 'multipart/form-data'
    }).done(function(data) {
      console.log(data);
    });
  }

}
