/*
    SpeechRecognitionController
*/

export default function initSpeechRecognitionCtrl() {
  try {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  } catch (e) {
    console.log(`Speech Recognition not supported: ${e}`);
  }

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener('result', recognizeCmds);
  recognition.addEventListener('end', recognition.start);

  recognition.start();
}

function custemEventHandler(type, transcript) {
  const event = new CustomEvent('speechRecognize', {
    detail: {
      transcript: transcript.split(' '),
      type,
    },
  });
  document.dispatchEvent(event);
}

function recognizeCmds(e) {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  if (e.results[0].isFinal) {
    if (transcript.includes('income')) {
      custemEventHandler('inc', transcript);
    }

    if (transcript.includes('expense')) {
      custemEventHandler('exp', transcript);
    }
  }
}
