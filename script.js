document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const weatherElement = document.getElementById('weather');
    const searchInput = document.getElementById('search');

    const OPENWEATHERMAP_API_KEY = 'd6e50ba138856be8b5668a250426b28d';

    // [fn start] updateDateTime
    function updateDateTime() {
        const now = new Date();
        const dateOptions = { 
            weekday: 'long', 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric'
        };
        const timeOptions = {
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        };
        
        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
        
        dateElement.textContent = formattedDate;
        timeElement.textContent = formattedTime;

        updateGreeting(now.getHours());
    }
    // [fn end] updateDateTime

    // [fn start] updateGreeting
    function updateGreeting(hour) {
        let greeting;
        if (hour >= 3 && hour < 12) {
            greeting = "Good morning";
        } else if (hour >= 12 && hour < 16) {
            greeting = "Good afternoon";
        } else if (hour >= 16 && hour < 20) {
            greeting = "Good evening";
        } else {
            greeting = "Good night";
        }
        greetingElement.textContent = `${greeting}, Shaurya`;
    }
    // [fn end] updateGreeting

    // [fn start] fetchWeatherForYamunanagar
    function fetchWeatherForYamunanagar() {
        const YAMUNANAGAR_LAT = 30.1290;
        const YAMUNANAGAR_LON = 77.2674;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${YAMUNANAGAR_LAT}&lon=${YAMUNANAGAR_LON}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const temperature = Math.round(data.main.temp);
                const description = data.weather[0].description;
                weatherElement.textContent = `Yamunanagar: ${temperature}°C, ${description}`;
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                weatherElement.textContent = 'Weather data unavailable';
            });
    }
    // [fn end] fetchWeatherForYamunanagar

    // [fn start] handleSearch
    function handleSearch(input) {
        const trimmedInput = input.trim().toLowerCase();
        let url = '';

        // Direct site redirections
        const directSites = {
            'instagram': 'https://www.instagram.com',
            'whatsapp': 'https://web.whatsapp.com',
            'reddit': 'https://www.reddit.com',
            'twitter': 'https://twitter.com',
            'youtube': 'https://www.youtube.com',
            'yt': 'https://www.youtube.com',
            'yt-music': 'https://music.youtube.com',
            'spotify': 'https://open.spotify.com',
            'twitch': 'https://www.twitch.tv',
            'github': 'https://github.com',
            'chatgpt': 'https://chat.openai.com',
            'copilot': 'https://copilot.microsoft.com', // Keep Copilot in direct links
            'gemini': 'https://gemini.google.com',
            'perplexity': 'https://www.perplexity.ai',
            'animagine': 'https://huggingface.co/spaces/cagliostrolab/animagine-xl-3.1',
            'cobalt': 'https://cobalt.tools',
            'v0': 'https://v0.dev'
        };

        if (directSites.hasOwnProperty(trimmedInput)) {
            url = directSites[trimmedInput];
        } else if (trimmedInput.startsWith('g/')) {
            url = `https://www.google.com/search?q=${encodeURIComponent(trimmedInput.slice(2))}`;
        } else if (trimmedInput.startsWith('b/')) {
            url = `https://search.brave.com/search?q=${encodeURIComponent(trimmedInput.slice(2))}`;
        } else if (trimmedInput.startsWith('bi/')) {
            url = `https://www.bing.com/search?q=${encodeURIComponent(trimmedInput.slice(3))}`;
        } else if (trimmedInput.startsWith('wiki/')) {
            const query = trimmedInput.slice(5);
            url = `https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/ /g, '_'))}`;
        } else if (trimmedInput.startsWith('r/')) {
            url = `https://www.reddit.com/r/${encodeURIComponent(trimmedInput.slice(2))}`;
        } else if (trimmedInput.startsWith('ig/')) {
            url = `https://www.instagram.com/${encodeURIComponent(trimmedInput.slice(3))}`;
        } else if (trimmedInput.startsWith('yt/')) {
            url = `https://www.youtube.com/results?search_query=${encodeURIComponent(trimmedInput.slice(3))}`;
        } else if (trimmedInput.startsWith('gh/')) {
            url = `https://github.com/search?q=${encodeURIComponent(trimmedInput.slice(3))}`;
        } else if (trimmedInput.startsWith('w/')) {
            url = `https://${trimmedInput.slice(2)}`;
        } else {
            // Check if the input is a valid URL or domain
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (urlPattern.test(trimmedInput)) {
                url = trimmedInput.startsWith('http') ? trimmedInput : `https://${trimmedInput}`;
            }
            // If no valid prefix or URL, do nothing
        }

        if (url) {
            window.location.href = url;
        }
    }
    // [fn end] handleSearch

    // [fn start] handleKeyPress
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleSearch(searchInput.value);
        }
    }
    // [fn end] handleKeyPress

    // [fn start] focusSearch
    function focusSearch(e) {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
    // [fn end] focusSearch

    // [fn start] toggleSidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }
    // [fn end] toggleSidebar

    // [fn start] getRandomSong
    function getRandomSong() {
        const randomIndex = Math.floor(Math.random() * songs.length);
        return musicDirectory + songs[randomIndex];
    }
    // [fn end] getRandomSong

    // [fn start] loadRandomSong
    function loadRandomSong() {
        currentSong = getRandomSong();
        backgroundMusic.src = currentSong;
    }
    // [fn end] loadRandomSong

    // [fn start] toggleMusic
    function toggleMusic() {
        isMusicEnabled = !isMusicEnabled;
        if (isMusicEnabled) {
            if (!currentSong) {
                loadRandomSong();
            }
            if (document.hasFocus()) {
                playMusic();
            }
        } else {
            pauseMusic();
        }
        updateMusicToggleIcon();
    }
    // [fn end] toggleMusic

    // [fn start] playMusic
    function playMusic() {
        backgroundMusic.play().catch(error => {
            console.error('Error playing music:', error);
        });
        isMusicPlaying = true;
    }
    // [fn end] playMusic

    // [fn start] pauseMusic
    function pauseMusic() {
        backgroundMusic.pause();
        isMusicPlaying = false;
    }
    // [fn end] pauseMusic

    // [fn start] updateMusicToggleIcon
    function updateMusicToggleIcon() {
        musicToggle.innerHTML = isMusicEnabled ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-music"></i>';
    }
    // [fn end] updateMusicToggleIcon

    updateDateTime();
    setInterval(updateDateTime, 1000);
    fetchWeatherForYamunanagar();
    setInterval(fetchWeatherForYamunanagar, 600000); // Update weather every 10 minutes

    searchInput.addEventListener('keypress', handleKeyPress);
    document.addEventListener('keydown', focusSearch);

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    hamburgerMenu.addEventListener('click', toggleSidebar);

    // Music player functionality
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isMusicPlaying = false;
    let isMusicEnabled = false;
    let currentSong = '';
    const musicDirectory = 'assets/music/';
    const songs = [
        'song1.mp3',
        'song2.mp3',
        'song3.mp3'
        // Add more song filenames here
    ];

    musicToggle.addEventListener('click', toggleMusic);

    // Play music when tab gains focus (if enabled)
    window.addEventListener('focus', () => {
        if (isMusicEnabled) {
            playMusic();
        }
    });

    // Pause music when tab loses focus
    window.addEventListener('blur', pauseMusic);

    // Play next random song when current song ends
    backgroundMusic.addEventListener('ended', () => {
        loadRandomSong();
        if (isMusicEnabled && document.hasFocus()) {
            playMusic();
        }
    });

    // Initial check for tab focus
    if (document.hasFocus() && isMusicEnabled) {
        loadRandomSong();
        playMusic();
    }
});
