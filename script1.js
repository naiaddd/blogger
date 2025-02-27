document.addEventListener("DOMContentLoaded", function () { //wait for page to load before running any code inside function

    const links = document.querySelectorAll(".preview-link"); // declares constant "links" as a
    const popup = document.querySelector(".preview-popup");


    links.forEach(link => { // for loop iterating over all links in links
        link.addEventListener("mouseenter", async (event) => { // listen for when mouse moves over a link
            const url = link.getAttribute("data-url"); // get url

            try {
                const response = await fetch(url); // gets content of url
                const text = await response.text(); // wait until downloaded, and convert content to text
                const parser = new DOMParser(); // instances DOMParser tool to convert HTML to plaintext
                const doc = parser.parseFromString(text, "text/html"); // applies DOMParser instance to text constant


                const previewText = doc.querySelector("p")?.innerText || "Test preview";

                popup.innerHTML = previewText;
                popup.style.display = "block";
                popup.style.top = event.pageY + 10 + "px";
                popup.style.left = event.pageX + 10 + "px";
            } catch (error) {
                console.error("Failed to fetch preview: ", error); // print error logs
            }
        });

        link.addEventListener("mouseleave", () => { // remove popup when mouse moves away
            popup.style.display = "none";

        });


        link.addEventListener("mousemove", (event) => {
            popup.style.top = event.pageY + 10 + "px";
            popup.style.left = event.pageX + 10 + "px";
        });
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const lastUpdated = new Date(document.lastModified);
    document.getElementById("last-updated").textContent = lastUpdated.toLocaleString();
});




window.onload = function() {

    const alertMessage = document.getElementById("alert-message");
    alertMessage.classList.add("hidden");
    alertMessage.style.visibility = "hidden";
}

function copyEmail() {
    const emailText = document.getElementById("email").textContent;
    navigator.clipboard.writeText(emailText).then(() => {
        const alertMessage = document.getElementById("alert-message");

        // Make the alert message visible
        alertMessage.classList.remove("hidden");
        alertMessage.style.opacity = 1;
        alertMessage.style.visibility = "visible";

        // Fade the alert message after 2 seconds
        setTimeout(() => {
            alertMessage.style.opacity = 0;
            setTimeout(() => {
                alertMessage.classList.add("hidden");
            }, 1000);  // Wait for fade-out to complete before hiding it
        }, 2000);  // Keep the alert visible for 2 seconds
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
}
