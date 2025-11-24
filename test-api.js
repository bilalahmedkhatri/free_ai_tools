// Test API Parameter Mapping
// Run this in browser console to verify parameters

const testParams = {
  text: "This is a test voiceover",
  voice_id: "af_jessica", // Use a valid voice ID from the API
  speed: 1,
  pitch: 1,
  volume: 0.8,
  tone: "neutral"
};

console.log("Testing API with params:", testParams);

fetch('/api/voiceover', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testParams),
})
.then(res => {
  console.log('Response status:', res.status);
  return res.json();
})
.then(data => {
  console.log('Response data:', data);
  if (data.error) {
    console.error('Error:', data.error);
  } else {
    console.log('Success! Audio URL:', data.audio_url);
  }
})
.catch(err => {
  console.error('Request failed:', err);
});
