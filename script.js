document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and include a file
    function includeHTML(id, file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error(`Error fetching ${file}:`, error));
    }

    // Load the header, footer, and sidebar
    includeHTML('header', 'header.html');
    includeHTML('footer', 'footer.html');
    includeHTML('sidebar', 'sidebar.html');

    // Function to load the selected section
    function loadSection(sectionId) {
        includeHTML('sections', `sections/${sectionId}.html`);
        // Show login and signup buttons again when a new section is loaded
        document.querySelectorAll('.navbar .auth-buttons button').forEach(button => {
            button.style.display = 'inline-block';
        });
    }

    // Add event listeners to sidebar links
    document.addEventListener('click', function(event) {
        if (event.target.closest('.sidebar li')) {
            event.preventDefault();
            const clickedLi = event.target.closest('.sidebar li');
            const sectionId = clickedLi.querySelector('a').getAttribute('href').substring(1);
            loadSection(sectionId);

            // Remove active class from all links and add to the clicked one
            document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
            clickedLi.querySelector('a').classList.add('active');
        }
        // Handle login and signup buttons
        if (event.target.matches('.navbar .auth-buttons .login')) {
            loadSection('login');
            event.target.style.display = 'none';
        } else if (event.target.matches('.navbar .auth-buttons .signup')) {
            loadSection('signup');
            event.target.style.display = 'none';
        }
    });

    // Function to toggle the sidebar
    document.querySelector('body').addEventListener('click', function(event) {
        if (event.target.matches('.toggle-btn')) {
            collapseSidebar();
        }
    });

    // Load the default section (home)
    loadSection('home');

    // Function to collapse or expand the sidebar
    function collapseSidebar() {
        var navb = document.querySelector('.sidebar');
        var mainContent = document.querySelector('.main-content');
        var buttons = document.querySelectorAll('.sidebar ul li a');

        // Add transition effect
        navb.style.transition = 'width 0.2s';
        mainContent.style.transition = 'margin-left 0.3s';

        if (navb.classList.contains('collapsed')) {
            buttons.forEach(button => button.style.display = 'inline-block');
            navb.classList.remove('collapsed');
            mainContent.style.marginLeft = '13%';
        } else {
            buttons.forEach(button => button.style.display = 'none');
            navb.classList.add('collapsed');
            mainContent.style.marginLeft = '6%';
        }
    }
});
