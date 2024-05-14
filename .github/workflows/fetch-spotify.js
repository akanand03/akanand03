const SpotifyWebApi = require('spotify-web-api-node');

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: 'e3845d4f9db44b7db126f18004e2eefe',
  clientSecret: 'eab4a0ae37e64544b0b386dd725c92f4',
  redirectUri: 'http://localhost:8888/callback'
});

// Your Spotify access token
const accessToken = 'YOUR_ACCESS_TOKEN';

// Set access token
spotifyApi.setAccessToken(accessToken);

// Fetch currently playing track
spotifyApi.getMyCurrentPlayingTrack()
  .then((response) => {
    const currentlyPlaying = response.body.item;
    if (currentlyPlaying) {
      const songName = currentlyPlaying.name;
      const artistName = currentlyPlaying.artists.map(artist => artist.name).join(', ');
      const albumName = currentlyPlaying.album.name;
      const songInfo = `🎵 Currently Playing: ${songName} by ${artistName} (${albumName})`;
      
      // Write song info to README.md
      const fs = require('fs');
      fs.writeFileSync('README.md', songInfo);
    } else {
      const offlineMessage = '⚠️ Not currently playing any song';
      
      // Write offline message to README.md
      const fs = require('fs');
      fs.writeFileSync('README.md', offlineMessage);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
