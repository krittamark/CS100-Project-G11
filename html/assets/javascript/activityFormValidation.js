document.getElementById("name").addEventListener("input", (event) => {
    names = event.target.value.trim().split(" ");
    if (names.length < 2) {
        document.getElementById("nameError").innerText =
            "Please enter your first and last name.";
        document.getElementById("name").classList.add("error");
    } else {
        document.getElementById("nameError").innerText = "";
        document.getElementById("name").classList.remove("error");
    }
});

document.getElementById("studentID").addEventListener("input", (event) => {
    if (event.target.value.length != 10) {
        document.getElementById("studentIDError").innerText =
            "Please enter your 10 digit student ID.";
        document.getElementById("studentID").classList.add("error");
    } else {
        document.getElementById("studentIDError").innerText = "";
        document.getElementById("studentID").classList.remove("error");
    }
});

document.getElementById("email").addEventListener("input", (event) => {
    if (!event.target.value.endsWith("@dome.tu.ac.th")) {
        document.getElementById("emailError").innerText =
            "Please enter your university email in the format 'xxx@dome.ac.th'";
        document.getElementById("email").classList.add("error");
    } else {
        document.getElementById("emailError").innerText = "";
        document.getElementById("email").classList.remove("error");
    }
});

document.getElementById("workTitle").addEventListener("input", (event) => {
    if (event.target.value.length < 5) {
        document.getElementById("workTitleError").innerText =
            "Please enter a work/activity title with at least 5 characters.";
        document.getElementById("workTitle").classList.add("error");
    } else {
        document.getElementById("workTitleError").innerText = "";
        document.getElementById("workTitle").classList.remove("error");
    }
});

document.getElementById("startDate").addEventListener("input", (event) => {
    if (event.target.value == "") {
        document.getElementById("startDateError").innerText =
            "Please select a start date/time.";
        document.getElementById("endDate").classList.add("error");

        if (
            document.getElementById("startDate").value >
            document.getElementById("endDate").value
        ) {
            document.getElementById("startDateError").innerText =
                "Please select a start date/time that is before the end date/time.";
            document.getElementById("endDate").classList.add("error");
        }
    } else {
        document.getElementById("startDateError").innerText = "";
        document.getElementById("endDate").classList.remove("error");
    }
});

document.getElementById("endDate").addEventListener("input", (event) => {
    if (event.target.value == "") {
        document.getElementById("endDateError").innerText =
            "Please select an end date/time.";
        document.getElementById("startDate").classList.add("error");
        if (
            document.getElementById("startDate").value >
            document.getElementById("endDate").value
        ) {
            document.getElementById("endDateError").innerText =
                "Please select an end date/time that is after the start date/time.";
            document.getElementById("startDate").classList.add("error");
        }
    } else {
        document.getElementById("endDateError").innerText = "";
        document.getElementById("startDate").classList.remove("error");
    }
});

document.getElementById("location").addEventListener("input", (event) => {
    if (event.target.value.length < 5) {
        document.getElementById("locationError").innerText =
            "Please enter a location with at least 5 characters.";
        document.getElementById("location").classList.add("error");
    } else {
        document.getElementById("locationError").innerText = "";
        document.getElementById("location").classList.remove("error");
    }
});

document
    .getElementById("description")
    .addEventListener("input", (event) => {
        if (event.target.value.length < 5) {
            document.getElementById("descriptionError").innerText =
                "Please enter a description with at least 5 characters.";
            document.getElementById("description").classList.add("error");
        } else {
            document.getElementById("descriptionError").innerText = "";
            document.getElementById("description").classList.remove("error");
        }
    });

document
    .getElementById("activityImage")
    .addEventListener("input", (event) => {
        if (event.target.value == "") {
            document.getElementById("fileError").innerText =
                "Please select an image.";
        } else {
            document.getElementById("fileError").innerText = "";
        }
    });

document
    .getElementById("form")
    .addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            let response = await fetch(`${apiServer}/passport`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            let result = await response.json();

            if (result.status == "success") {
                alert("Activity created successfully.");
                window.location.href = "activity.html";
            } else {
                alert("Activity creation failed.");
            }
        } catch (error) {
            alert("Activity creation failed.");
        }
    });