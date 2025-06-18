 HEAD
import { db, auth, provider } from '../firebase/firebase-js-app/src/firebase.js';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignIn, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Di setiap halaman yang butuh login
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "login.html";
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const htmlElement = document.documentElement; // Get the <html> element

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeButtonIcon(savedTheme);
    } else {
        // Default to light theme if no preference saved
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeButtonIcon('light');
    }

    // Add click listener to the toggle button
    themeToggleButton.addEventListener('click', toggleTheme);

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save preference
        updateThemeButtonIcon(newTheme);
    }

    function updateThemeButtonIcon(theme) {
        const icon = themeToggleButton.querySelector('i.bi');
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-brightness-high-fill'); // Icon for light mode
        } else {
            icon.classList.remove('bi-brightness-high-fill');
            icon.classList.add('bi-moon-fill'); // Icon for dark mode
        }
    }

    // Optional: Add a class to navbar on scroll for better visibility
    const navbar = document.getElementById('main-navbar');
    let scrolled = false;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50 && !scrolled) { // Add 'scrolled' class after scrolling down 50px
            navbar.classList.add('scrolled');
            scrolled = true;
        } else if (window.scrollY <= 50 && scrolled) { // Remove 'scrolled' class when back at top
            navbar.classList.remove('scrolled');
            scrolled = false;
        }
    });

HEAD
    // Login Google
    document.getElementById('loginBtn').onclick = async function() {
        try {
            const result = await signInWithPopup(auth, provider);
            alert('Login berhasil: ' + result.user.displayName);
            // Simpan info user jika perlu
        } catch (error) {
            alert('Login gagal: ' + error.message);
        }
    };

    // Simpan pesanan ke Firestore
    async function simpanPesanan(dataPesanan) {
        try {
            await addDoc(collection(db, "pesanan"), dataPesanan);
            alert("Pesanan berhasil disimpan!");
        } catch (e) {
            alert("Gagal simpan pesanan: " + e.message);
        }
    }

    // Register user
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
            window.location.href = "menu.html";
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    };

    // Login with email and password
    const loginForm = document.getElementById('loginForm');

    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        try {
            await firebaseSignIn(auth, emailInput.value, passwordInput.value);
            // Cek admin
            if (adminEmails.includes(auth.currentUser.email)) {
                window.location.href = "admin.html";
            } else {
                window.location.href = "menu.html";
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };
});

import { db, auth } from './firebase.js';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Hanya admin bisa akses
if (!adminEmails.includes(auth.currentUser.email)) window.location.href = "login.html";

// Ambil semua pesanan
const q = query(collection(db, "pesanan"));
const querySnapshot = await getDocs(q);
// tampilkan semua pesanan, bisa update status, dll

async function buatPesanan(dataPesanan) {
  await addDoc(collection(db, "pesanan"), {
    ...dataPesanan,
    userId: auth.currentUser.uid,
    status: "menunggu"
  });
}

async function tampilkanPesananSaya() {
  const q = query(collection(db, "pesanan"), where("userId", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  // tampilkan data ke tabel
}
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const googleButton = document.getElementById('googleSignUp');

googleButton.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        successMessage.textContent = "Registrasi dengan Google berhasil! Redirecting...";
        successMessage.style.display = 'block';
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } catch (error) {
        firebaseError.textContent = error.message;
        firebaseError.style.display = 'block';
    }
});
