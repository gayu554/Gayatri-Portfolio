console.log("Welcome to Gayatri's Portfolio!");


// ===============================
// Navigation
// ===============================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const sectionId = link.getAttribute("href");

        const section = document.querySelector(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});


// ===============================
// Footer Year
// ===============================

const year = new Date().getFullYear();

const footer = document.querySelector("footer p");

if (footer) {
    footer.textContent = "© " + year + " Gayatri Gavhane";
}


// ===============================
// Load Projects from MySQL
// ===============================

fetch("http://localhost:5000/api/projects")

    .then(function(response) {
        return response.json();
    })

    .then(function(projects) {

        const container =
            document.getElementById("projects-container");

        container.innerHTML = "";

        projects.forEach(function(project) {

            const projectCard =
                document.createElement("div");

            projectCard.className = "project-card";

            projectCard.innerHTML =
                "<h3>" + project.title + "</h3>" +

                "<p>" +
                project.description +
                "</p>" +

                "<p><strong>Technologies:</strong> " +
                project.technologies +
                "</p>" +

                "<p>" +

                "<a href='" +
                project.github_link +
                "' target='_blank'>GitHub</a>" +

                "&nbsp;&nbsp;" +

                "<a href='" +
                project.live_link +
                "' target='_blank'>Live Project</a>" +

                "</p>";

            container.appendChild(projectCard);

        });

    })

    .catch(function(error) {

        console.log(
            "Error loading projects:",
            error
        );

    });


// ===============================
// Contact Form
// ===============================

const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("message").value;

        fetch("http://localhost:5000/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })

        })

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {

            alert(data.message);

            contactForm.reset();

        })

        .catch(function(error) {

            console.log("Error:", error);

            alert("Message could not be sent.");

        });

    });

}


// ===============================
// Add Project
// ===============================

const projectForm =
    document.getElementById("project-form");

if (projectForm) {

    projectForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const project = {

            title:
                document.getElementById("project-title").value,

            description:
                document.getElementById("project-description").value,

            technologies:
                document.getElementById("project-technologies").value,

            github_link:
                document.getElementById("project-github").value,

            live_link:
                document.getElementById("project-live").value
        };


        fetch("http://localhost:5000/api/projects", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(project)

        })

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {

            alert(data.message);

            projectForm.reset();

            location.reload();

        })

        .catch(function(error) {

            console.log("Error:", error);

            alert("Project could not be added.");

        });

    });

}