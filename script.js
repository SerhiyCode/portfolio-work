
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('hidden'); 
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
        // Скролимо вниз → ховаємо
        header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
        // Скролимо вгору → показуємо
        header.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});



function hamburg() {                    
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
}

function cancel() {                    
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-500px)";
}


// copy text   contact us
document.querySelectorAll('.copy-text').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const indicator = item.querySelector('.copy-indicator');
        indicator.style.display = 'inline'; // Показати "Copy" при наведенні
    });

    item.addEventListener('mouseleave', () => {
        const indicator = item.querySelector('.copy-indicator');
        indicator.style.display = 'none'; // Сховати "Copy" при покинутті
    });

    item.addEventListener('click', () => {
        const textToCopy = item.getAttribute('data-text');
        navigator.clipboard.writeText(textToCopy).catch(err => {
            console.error('Помилка копіювання:', err);
        });
    });
});


// Object with translations
const translations = {
    ua: {        
        typewriter_words: ["Інженер (AI)", "Оператор", "Розробник", "Фронтенд-розробник"],
        hero_title: "я <span>Сергій</span>", 
        hero: "Я <span></span> ", 
        hero_desc: "Шукаю команду, яка готова почати зі мною нову подорож, і дуже чекаю на це",
        download_cv: "Завантажити CV",

        // Navigation
        nav_home: "Головна",
        nav_about: "Про мене",
        nav_skills: "Навички",
        nav_certificates: "Сертифікати",
        nav_blogs: "Блог",
        nav_contact: "Зв’язатися",

        // Title
        skills_title: "НАВИЧКИ",
        certificates_title: "Сертифікати",
        blogs_title: "Блог",
        contact_title: "Зв’яжіться зі мною",  
        city_text: "Украйна",
        form_btn: "Надіслати",
        contact_name: "Sergey",


        // Skills 
        skills_card_title: "НАВИЧКИ",        
        figma_text: "Фігма",
        html_text: "Мова розмітки гіпертексту",
        css_text: "Каскадні таблиці стилів",
        js_text: "мова програмування",
        sheets_text: "Гугл Таблиці",
        ai_text: "робота з нейронними мережами та штучним інтелектом", 
        al_text_voice: "Привіт! Це я — Сергій Хочеш почути моє голосове привітання",
        voice_btn: "Так, голосом",               
        contact_name: "Сергій"
    },

    en: {
        hero_title: "i'm <span>Sergey</span>",
        typewriter_words: ["Engineer (AI)", "Operator", "Developer", "Frontend Dev"], 
        hero_desc: "I am looking for a team that is ready to start a new journey with me, and I am looking forward to it",
        download_cv: "Download CV",

        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_certificates: "Certificates",
        nav_blogs: "Blogs",
        nav_contact: "Contact Us", 
        form_btn: "Submit",
      
        skills_title: "SKILLS",
        certificates_title: "Certificates",
        blogs_title: "Blogs",
        contact_title: "Contact Me",  
        city_text: "Ukraine",
        contact_name: "Sergey",

        skills_card_title: "SKILLS",
        figma_text: "figma",
        html_text: "HyperText Markup Language",
        css_text: "Cascading Style Sheets",
        js_text: "programming language",
        sheets_text: "google sheets",
        ai_text: "working with neural networks and AI:",    
        al_text_voice: "Hello! It's me, Sergey. Would you like to hear my voice greeting?",  
        voice_btn: "Yes, by voice"
    }       
}; 

document.addEventListener('DOMContentLoaded', () => {
    currentLang = 'en';                    
    localStorage.setItem('lang', 'en');    
    translatePage('en');                   
});



function translatePage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key]; 
        }
    });
    // змінюємо клас кнопки
    document.querySelectorAll('.translate-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.classList.contains(lang)) btn.classList.add('active');
    });
}

// перемикач
document.querySelectorAll('.translate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.classList.contains('english') ? 'en' : 'ua';
        currentLang = lang;
        localStorage.setItem('lang', lang);
        translatePage(lang);
    });
});





// Google Apps Script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzhxMEMA6jVWSAGYpo_2htmCZMSNCvxIHcdFQ6BQKA6ntq14UDPehbzW2Br455ER2Q7aw/exec'; 
  
  const form = document.forms['submit-to-google-sheet']; 
  const message = document.getElementById("message");

  form.addEventListener('submit', e => {
    e.preventDefault();
    
    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {message.innerHTML = "Thank you"}) 
    setTimeout(function() {
       message.innerHTML = "" 
    },5000) 
    form.reset()    
    .catch(error => console.error('Error!', error.message));
  }); 







// voice 
const assistant = document.querySelector('.voice-assistant');
  const bubble    = document.querySelector('.assistant-bubble');
  const myVoice   = new Audio('audio/audiocleaner..wav');
  myVoice.volume  = 1.0;

  let hasBeenShown = false;


function initVoiceButton() {
  const playBtn = bubble.querySelector('.play-voice-btn');
  if (!playBtn) return;

  const updateButtonText = () => {
    if (myVoice.paused || myVoice.ended) {
      playBtn.textContent = translations[currentLang].voice_btn;  
    }
  };

  updateButtonText();
  playBtn.disabled = false;
  playBtn.onclick = null;

  playBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    myVoice.currentTime = 0;
    myVoice.play();

    playBtn.textContent = 'is playing';
    playBtn.disabled = true;

    myVoice.onended = () => {
      updateButtonText();    
      playBtn.disabled = false;
    };
  };
} 






  assistant.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-bubble')) {
      bubble.classList.add('hidden');
      myVoice.pause();
      myVoice.currentTime = 0;
    }
  });

  // Відкриття по кліку на аватар
  document.querySelector('.assistant-avatar').addEventListener('click', (e) => {
    e.stopPropagation();
    bubble.classList.remove('hidden');
    initVoiceButton(); // ← оживляємо кнопку!
  });

  // Закриття при кліку поза ботом
  document.addEventListener('click', (e) => {
    if (!assistant.contains(e.target)) {
      bubble.classList.add('hidden');
    }
  });

  // === Автоматичне відкриття через 5 сек + скрол ===
  function showBubble() {
    if (hasBeenShown) return;
    bubble.classList.remove('hidden');
    initVoiceButton(); // ← головне тут!
    hasBeenShown = true;

    // Автоматично ховаємо через 12 сек, якщо не слухає
    setTimeout(() => {
      if (myVoice.paused && !bubble.classList.contains('hidden')) {
        bubble.classList.add('hidden');
      }
    }, 12000);
  }

  setTimeout(showBubble, 5000);

  window.addEventListener('scroll', () => {
    if ((window.scrollY + window.innerHeight) / document.body.scrollHeight > 0.3) {
      showBubble();
    }
  }, { once: true });

  // При кожному відкритті бульбашки — оновлюємо кнопку
  const observer = new MutationObserver(() => {
    if (!bubble.classList.contains('hidden')) {
      initVoiceButton();
    }
  });
  observer.observe(bubble, { attributes: true, attributeFilter: ['class'] });