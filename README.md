## Moeketsi Isaac Rooi Motloung - Personal Portfolio Website

Welcome to my personal portfolio website! This platform showcases my journey as an aspiring Web Designer and Developer, highlighting my skills, projects, and providing an easy way to get in touch. The site features a clean, responsive design with interactive elements and a functional contact form.

### ✨ Live Demo
https://moeketsi200.github.io/Bio-web-app/

📁 Project Structure
├── index.html          # Main single-page site
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   └── ... (all image files)
│   └── php/
│       └── send_mail.php
└── README.md

### 🚀 Features

*   **Modern & Responsive Design:** Optimized for various devices and screen sizes.
*   **Single-Page Navigation:** Smooth scrolling and active link highlighting for easy navigation between sections (Home, About, Skills, Projects, CV, Contact).
*   **Interactive Elements:** Dynamic text slideshow, scroll-reveal animations for skill cards, and a captivating particle background.
*   **Project Showcase:** Dedicated section to display key projects with images and descriptions.
*   **Detailed CV Section:** An overview of education, work experience, and certifications.
*   **Functional Contact Form:** Allows visitors to send messages directly.

### 🛠️ Technologies Used

*   **Frontend:**
    *   **HTML5:** Semantic structure and content organization.
    *   **CSS3:** Styling, responsive layouts (Flexbox, Grid), animations, and modern UI effects.
    *   **JavaScript:** Interactivity, dynamic content, slideshow, scroll animations, and particle background.
    *   **React:** Mentioned in skills, indicating familiarity with component-based UI development.
*   **Backend:**
    *   **PHP:** Handles the contact form submission and email sending using PHPMailer.
    *   **Composer:** Manages PHP dependencies (PHPMailer, Dotenv).
    *   **.env:** For secure environment variable management (e.g., SMTP credentials).
*   **Tools & Concepts:**
    *   **Git & GitHub:** Version control and collaborative development.
    *   **Responsive Web Design:** Ensuring optimal viewing across devices.
    *   **Web Design Principles:** Focus on user experience and aesthetics.

### 🏃 How to Run the Project Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/moeketsi200/Bio-web-app.git
    cd Bio-web-app
    ```
2.  **Set up PHP dependencies (for contact form):**
    *   Ensure you have Composer installed.
    *   From the project root, run:
        ```bash
        composer install
        ```
3.  **Configure Environment Variables (for email sending):**
    *   Create a `.env` file in the project root (`Bio-web-app/.env`).
    *   Add your SMTP server details to this file (e.g., from Gmail, SendGrid, etc.):
        ```
        SMTP_HOST="your.smtp.host"
        SMTP_USER="your_email@example.com"
        SMTP_PASS="your_email_password_or_app_password"
        SMTP_PORT="587" # or 465 for SMTPS
        ```
    *   *Note: For Gmail, you'll likely need to generate an App Password as direct password access is often blocked.*
4.  **Serve the project with a PHP-enabled web server:**
    *   **Option A: PHP's built-in server (easiest for development):**
        ```bash
        php -S localhost:8000
        ```
    *   **Option B: XAMPP, MAMP, WAMP, or Apache:**
        *   Place the `Bio-web-app` folder in your web server's document root (e.g., `htdocs` for XAMPP, `www` for MAMP).
        *   Start your Apache (and MySQL if applicable) services.
        *   Access in your browser at `http://localhost/Bio-web-app/` (or similar, depending on your server setup).
5.  **Open your browser:** Navigate to `http://localhost:8000` (for Option A) or `http://localhost/Bio-web-app/` (for Option B) to view the website.


⚠️ The contact form requires PHP and will not work if opened directly without a server.

### 📧 Contact

You can reach me through the contact form on the website or via the details provided in my CV page.
*   **Email:** mahxmotloung438@gmail.com
*   **LinkedIn:** https://www.linkedin.com/in/moeketsi-isaac-rooi-motloung-02bb07231
*   **GitHub:** https://github.com/moeketsi200

### 📄 License

This project is intended for personal and educational use, showcasing my skills and projects.
