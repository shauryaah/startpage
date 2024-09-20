document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const weatherElement = document.getElementById('weather');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('search');

    const OPENWEATHERMAP_API_KEY = 'd6e50ba138856be8b5668a250426b28d';

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

    function handleSearch(e) {
        e.preventDefault();
        const input = searchInput.value.trim();
        let url = '';

        if (input.startsWith('g/')) {
            url = `https://www.google.com/search?q=${encodeURIComponent(input.slice(2))}`;
        } else if (input.startsWith('brave/')) {
            url = `https://search.brave.com/search?q=${encodeURIComponent(input.slice(6))}`;
        } else if (input.startsWith('bing/')) {
            url = `https://www.bing.com/search?q=${encodeURIComponent(input.slice(5))}`;
        } else if (input.startsWith('wiki/')) {
            const query = input.slice(5);
            url = `https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/ /g, '_'))}`;
        } else if (input.startsWith('r/')) {
            url = `https://www.reddit.com/r/${encodeURIComponent(input.slice(2))}`;
        } else if (input.startsWith('gh/')) {
            url = `https://github.com/${encodeURIComponent(input.slice(3))}`;
        } else {
            // Default to Google search if no prefix is used
            url = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
        }

        window.location.href = url;
    }

    function focusSearch(e) {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
    fetchWeatherForYamunanagar();
    setInterval(fetchWeatherForYamunanagar, 600000); // Update weather every 10 minutes

    searchForm.addEventListener('submit', handleSearch);

    // Add event listener for '/' key press
    document.addEventListener('keydown', focusSearch);

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    hamburgerMenu.addEventListener('click', toggleSidebar);
});