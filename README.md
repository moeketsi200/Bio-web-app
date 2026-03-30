## Moeketsi Isaac Rooi Motloung - Personal Portfolio Website

Welcome to my personal portfolio website! This platform showcases my journey as an aspiring Web Designer and Developer, highlighting my skills, projects, and providing an easy way to get in touch. The site features a clean, responsive design with interactive elements and a functional contact form.

### ✨ Live Demo
https://moeketsi200.github.io/Bio-web-app/

```
.
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── images/
│   │   └── ...               # All image files
│   ├── js/
│   │   ├── particles.js      # Background particle animation
│   │   └── script.js         # Main interactivity script
│   └── php/
│       └── send_mail.php     # PHP mailer script
├── vendor/                   # Composer dependencies (PHPMailer, DotEnv)
├── .env.example              # Example environment file for SMTP settings
├── .gitignore
├── composer.json             # PHP dependencies
├── index.html                # Main single-page site
└── README.md
```

## ✨ Features

-   **Modern UI:** A sleek, dark-themed design with a dynamic particle background.
-   **Single-Page Layout:** Smooth navigation between Home, About, Skills, Projects, CV, and Contact sections.
-   **Interactive Elements:** Includes a text slideshow, scroll-triggered animations, and a skills ticker.
-   **PHP Contact Form:** A secure contact form using PHPMailer and SMTP authentication to send emails.
-   **Responsive Design:** Fully responsive layout that adapts to all screen sizes, from mobile to desktop.

## 🛠️ Technologies Used

-   **Frontend:** HTML5, CSS3, JavaScript (ES6)
-   **Backend:** PHP
-   **Libraries:**
    -   [PHPMailer](https://github.com/PHPMailer/PHPMailer): For sending emails via SMTP.
    -   [phpdotenv](https://github.com/vlucas/phpdotenv): For managing environment variables.
-   **Tooling:**
    -   [Composer](https://getcomposer.org/): For PHP package management.
    -   Git & GitHub: For version control.

## 🚀 How to Run the Project

To run this project locally, you will need a local server environment with PHP and Composer installed (like XAMPP, MAMP, or a native LAMP/LEMP stack).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/moeketsi200/Bio-web-app.git
    cd Bio-web-app
    ```

2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

3.  **Configure Environment Variables:**
    -   Rename the `.env.example` file to `.env`.
    -   Open the `.env` file and add your SMTP server credentials. This is required for the contact form to work.
    ```
    SMTP_HOST="smtp.example.com"
    SMTP_USER="your_email@example.com"
    SMTP_PASS="your_app_password"
    SMTP_PORT=465
    ```

4.  **Run on a local server:**
    -   Place the project folder inside your web server's root directory (e.g., `htdocs` for XAMPP).
    -   Start your Apache and MySQL services.
    -   Open your browser and navigate to `http://localhost/Bio-web-app/` (or your folder name).

> **⚠️ Note:** The contact form requires a properly configured `.env` file and will not work if the site is opened directly as a file (`file:///...`).

## 📬 Contact

You can reach me through the contact form on the website or via the details provided in the CV section.

## 📄 License

This project is for personal and educational use.
