
const subjectInput = document.getElementById('subject');
const resultText = document.getElementById('finalPrompt');
const gallery = document.getElementById('imageGallery');
const generateBtn = document.getElementById('generateBtn');

const authEmail = document.getElementById('authEmail');
const authPass = document.getElementById('authPassword');
const valDropdown = document.getElementById('validationDropdown');
const emailCheck = document.getElementById('emailCheck');
const passCheck = document.getElementById('passCheck');
const continueBtn = document.getElementById('continueBtn');



subjectInput.addEventListener('input', function() {
    const currentSubject = subjectInput.value.trim();

    if (currentSubject === "") {
        resultText.innerText = "Your prompt will appear here...";
        resultText.style.color = "#64748b"; 
        gallery.innerHTML = ""; 
    }
});


generateBtn.addEventListener('click', function() {
    const subject = subjectInput.value.trim();
    const style = document.getElementById('style').value;

    if (subject === "") {
        alert("Hey! Please enter a subject to generate a prompt.");
        return;
    }

    const generatedPrompt = `${subject}, ${style}, high resolution, masterpiece, trending on artstation, sharp focus, 8k.`;

    // Update UI
    resultText.innerText = generatedPrompt;
    resultText.style.color = "#0f172a"; 
    updateGallery();
});


function updateGallery() {
    gallery.innerHTML = ""; 
    for (let i = 0; i < 4; i++) {
        const randomID = Math.floor(Math.random() * 1000);
        const img = document.createElement('img');
        img.src = `https://picsum.photos/400/400?random=${randomID}`;
        img.alt = "AI Preview Result";
        gallery.appendChild(img);
    }
}


function validateAuth() {
    const emailValue = authEmail.value;
    const passValue = authPass.value;

    if (emailValue.length > 0 || passValue.length > 0) {
        valDropdown.classList.add('show');
    } else {
        valDropdown.classList.remove('show');
    }


    if (emailValue.includes('@') && emailValue.includes('.')) {
        emailCheck.innerText = "✔ Email is valid";
        emailCheck.classList.add('valid');
    } else {
        emailCheck.innerText = "✖ Invalid Email";
        emailCheck.classList.remove('valid');
    }

    if (passValue.length >= 6) {
        passCheck.innerText = "✔ Password looks good";
        passCheck.classList.add('valid');
    } else {
        passCheck.innerText = "✖ Password too short (6+ chars)";
        passCheck.classList.remove('valid');
    }
}


authEmail.addEventListener('input', validateAuth);
authPass.addEventListener('input', validateAuth);


continueBtn.addEventListener('click', function() {
    
    if (emailCheck.classList.contains('valid') && passCheck.classList.contains('valid')) {
        
        const modalCard = document.querySelector('.modal-card');
        modalCard.classList.add('success-fade'); 
        
        setTimeout(() => {
            toggleModal('');
            modalCard.classList.remove('success-fade'); 
            alert("Successfully Logged In!");
            

            authEmail.value = "";
            authPass.value = "";
            valDropdown.classList.remove('show');
        }, 500);

    } else {
        alert("Please fix the errors in the dropdown first.");
    }
});


// function toggleModal(type) {
//     const modal = document.getElementById('modal');
//     const title = document.getElementById('modalTitle');
    
//     if (type === "") {
//         modal.style.display = "none";
//     } else {
//         title.innerText = type === 'login' ? 'Welcome Back' : 'Join Promptly';
//         modal.style.display = "flex";
//     }
// }

/**
 * Opens or closes the modal based on the 'type' passed.
 * @param {string} type - 'login', 'signup', or '' (to close)
 */
function toggleModal(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    
    if (!modal) return; // Safety check

    if (type === "" || type === undefined) {
        modal.style.display = "none";
    } else {
        // Sets the title based on which button was clicked
        title.innerText = type === 'login' ? 'Welcome Back' : 'Join Promptly';
        modal.style.display = "flex";
    }
}

// Close modal if user clicks outside of the modal-card (on the overlay)
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        toggleModal('');
    }
});

// Update the Continue button logic to ensure it calls toggleModal('') correctly
continueBtn.addEventListener('click', function() {
    if (emailCheck.classList.contains('valid') && passCheck.classList.contains('valid')) {
        const modalCard = document.querySelector('.modal-card');
        modalCard.classList.add('success-fade'); 
        
        setTimeout(() => {
            toggleModal(''); // Closes the modal after success
            modalCard.classList.remove('success-fade'); 
            alert("Successfully Logged In!");

            // Reset fields
            authEmail.value = "";
            authPass.value = "";
            valDropdown.classList.remove('show');
        }, 500);
    } else {
        alert("Please fix the errors in the dropdown first.");
    }
});





document.getElementById('copyBtn').addEventListener('click', function() {
    const text = resultText.innerText;
    
    
    if (text.includes("Your prompt") || text === "") return;

    navigator.clipboard.writeText(text).then(() => {
        alert("Prompt copied to clipboard!");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });

});



const toggleBtn = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links'); // Target the actual list

toggleBtn.addEventListener('click', () => {
    // Toggle the 'active' class on the menu
    navLinks.classList.toggle('active');
    
    // Animate the hamburger bars (Optional)
    toggleBtn.classList.toggle('is-open');
});

// Close menu when a user clicks a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});