'use strict'
var toWav = require('audiobuffer-to-wav');

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
  chunks = [];
  let mv = id('mediaAudio'),
      mediaOptions = {
        audio: {
          tag: 'audio',
          type: 'audio/wav',
          ext: '.wav',
          options: {audio: true}
        }
      };
  media = mediaOptions.audio;
  navigator.geolocation.getCurrentPosition(function(position){
                var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
                document.getElementById("result").innerHTML = positionInfo;
                console.log(typeof position.coords.latitude);
                console.log(typeof position.coords.longitude);
                chunks.push(position.coords.latitude);
                chunks.push(position.coords.longitude);
                console.log(`geo chunks: ${chunks}`);
  });
  navigator.mediaDevices.getUserMedia(media.options).then(_stream => {
    stream = _stream;
    var context = new AudioContext();
    var source = context.createMediaStreamSource(stream);
    var processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function(e) {
      // Do something with the data, i.e Convert this to WAV
      // console.log(e.inputBuffer);
      var wav = toWav(e.inputBuffer);
      console.log(wav);
    };

    id('permissions').style.display = 'none';
    id('btns').style.display = 'inherit';
    start.removeAttribute('disabled');
    log('got media successfully');
  }).catch(log);
}


var handleSuccess = function(stream) {
  var context = new AudioContext();
  var source = context.createMediaStreamSource(stream);
  var processor = context.createScriptProcessor(1024, 1, 1);

  source.connect(processor);
  processor.connect(context.destination);

  processor.onaudioprocess = function(e) {
    // Do something with the data, i.e Convert this to WAV
    console.log(e.inputBuffer);
  };
};

start.onclick = e => {
  start.disabled = true;
  stop.removeAttribute('disabled');
}


stop.onclick = e => {
  stop.disabled = true;
  start.removeAttribute('disabled');
}


function makeLink(geoObject) {
  chunks.push(geoObject);
  console.log(chunks);
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
