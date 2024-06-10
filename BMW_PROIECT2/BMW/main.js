function diferentaTimpului(start, end) //timpul de la lansare
{
    const diferentaTimp = end - start;
    const zile = Math.floor(diferentaTimp / (1000 * 60 * 60 * 24));
    const ore = Math.floor((diferentaTimp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((diferentaTimp % (1000 * 60 * 60)) / (1000 * 60));
    const secunde = Math.floor((diferentaTimp % (1000 * 60)) / 1000);
    return { zile, ore, minute, secunde };
}
function actualizareTimp() 
{
    const dataReferinta = new Date('December 30, 2019');
    const dataCurenta = new Date();
    const { zile, ore, minute, secunde } = diferentaTimpului(dataReferinta, dataCurenta);

    const elementText = document.querySelector("#primul_text #timp_lansare");
    elementText.textContent = `${zile} zile, ${ore} ore, ${minute} minute și ${secunde} secunde`;
}
document.addEventListener("DOMContentLoaded", () => {
    actualizareTimp();
    setInterval(actualizareTimp, 1000);
});
function scrollToTop() //buton de scroll
{
    window.scrollTo(
    {
        top: 0,
        behavior: 'smooth'
    });
}
window.onscroll = function() {scrollFunction()};
function scrollFunction() 
{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', function() { //animatia elementului din sectiunea poveste
    var textElement = document.querySelector('main h2'); 
    var position = 0;

    setInterval(function() {
        position += 1; 
        textElement.style.marginLeft = position + 'px'; 
        if (position >= window.innerWidth) {
            position = -textElement.offsetWidth; 
        }
    }, 10); 
});
window.addEventListener('scroll', function() //bara pentru scroll
{
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.height = scrolled + '%';
});
function submitForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const mailInput = document.getElementById("mail");
    const phoneInput = document.getElementById("phone");
    const msgInput = document.getElementById("alte_detalii"); 

    if (!nameInput) {
        console.error("Elementul cu ID-ul 'name' nu a fost gasit în DOM.");
        return;
    }
    if (!mailInput) {
        console.error("Elementul cu ID-ul 'mail' nu a fost gasit în DOM.");
        return;
    }
    if (!phoneInput) {
        console.error("Elementul cu ID-ul 'phone' nu a fost gasit în DOM.");
        return;
    }
    if (!msgInput) {
        console.error("Elementul cu ID-ul 'alte_detalii' nu a fost gasit în DOM.");
        return;
    }

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (nameInput.value.trim().length === 0) {
        alert("Introduceti un nume");
        return;
    }
    if (!mailRegex.test(mailInput.value)) {
        alert("Introduceti o adresa de email valida");
        return;
    }
    if (!phoneRegex.test(phoneInput.value)) {
        alert("Introduceti un numar de telefon valid format din 10 cifre");
        return;
    }
    if (msgInput.value.trim().length === 0) {
        alert("Introduceti un mesaj");
        return;
    }

    const formData = {
        name: nameInput.value,
        email: mailInput.value,
        phone: phoneInput.value,
        message: msgInput.value
    };

    fetch('localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Eroare la trimiterea formularului');
        }
        return response.json();
    })
    .then(data => {
        alert("Cererea a fost trimisa cu succes!");
        document.getElementById("formular").reset(); 
    })
    .catch(error => {
        alert(`Eroare: ${error.message}`);
    });
}
//functia pentru inimioare
function addInimioare(parentElementId)
{
    const section = document.getElementById(parentElementId);
    const starsDiv = document.createElement("div");
    starsDiv.classList.add("inimioare");

    for (let i = 1; i <= 10; i++) 
    {
        const checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = `nota-${parentElementId}-${i}`;
        checkboxInput.name = `${i}`;
        checkboxInput.style.marginLeft = "20px";

        checkboxInput.addEventListener("change", function() {
            event.stopPropagation();

            for (let i = 1; i <= 10; i++)
            {
                var checkbox = document.getElementById(`nota-${parentElementId}-${i}`);
                checkbox.checked = false;
            }
            event.target.checked = true;

            localStorage.setItem(`nota-${parentElementId}`, event.target.name);
        });
        
        const label = document.createElement("label");
        label.htmlFor = `nota-${parentElementId}-${i}`;
        label.textContent = i;

        if (localStorage.getItem(`nota-${parentElementId}`) == i)
        {
            checkboxInput.checked = true;
        }
        
        starsDiv.appendChild(checkboxInput);
        starsDiv.appendChild(label);
    }

    section.appendChild(starsDiv);
}
function changeColor(textElement) 
{
    const colors = ['magenta', 'turquoise', 'blue', 'pink', 'white', 'yellow', 'black'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const myText = document.getElementById("text-formular");
    myText.style.color = randomColor; 
}
function changeColorBorder()
{
    const myText = document.getElementById("text-formular");
    const textColor = window.getComputedStyle(myText).color;

    const myImg = document.getElementById("img-formularr");
    myImg.style.borderColor = textColor;
}
window.onload = function()
{
    addInimioare("nota-istoric");
    addInimioare("nota-aspect-exterior");
    addInimioare("nota-aspect-inteior");
    addInimioare("nota-website");
    const form = document.getElementById("formular");
    form.addEventListener("submit", submitForm);
    setInterval(changeColor, 1000);
    setInterval(changeColorBorder, 1100);
}
document.addEventListener("DOMContentLoaded", function() //galerie poze
{ 
    var imagini = document.querySelectorAll('#container-galerie img');
    var index = 0;
    
    function schimbaImagine() {
        imagini[index].classList.remove('active');
        index = (index + 1) % imagini.length;
        imagini[index].classList.add('active');
    }

    setInterval(schimbaImagine, 3000);
});