document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const emailValidation = document.getElementById('emailValidation');
    const passwordValidation = document.getElementById('passwordValidation');
    const registerForm = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    const btnText = document.querySelector('.btn-text');
    const successMessage = document.getElementById('successMessage');
    const resetFormBtn = document.getElementById('resetForm');
    const generatePasswordBtn = document.getElementById('generatePassword');
    const strengthSegments = [
        document.getElementById('strength-segment-1'),
        document.getElementById('strength-segment-2'),
        document.getElementById('strength-segment-3'),
        document.getElementById('strength-segment-4')
    ];
    const strengthText = document.getElementById('passwordStrengthText');

    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Asegurarse que el loader esté oculto al inicio
    loader.style.display = 'none';

    // Validación de email en tiempo real
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailValidation.textContent = '';
            emailValidation.className = 'validation-message';
            return;
        }
        
        if (emailRegex.test(email)) {
            emailValidation.textContent = '✓ Correo válido';
            emailValidation.className = 'validation-message valid';
        } else {
            emailValidation.textContent = '✗ Formato de correo inválido';
            emailValidation.className = 'validation-message invalid';
        }
    });

    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Validación de fortaleza de contraseña en tiempo real
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        updatePasswordStrength(password);
    });

    function updatePasswordStrength(password) {
        // Resetear barras
        strengthSegments.forEach(segment => {
            segment.style.backgroundColor = '#e0e0e0';
        });
        
        if (password.length === 0) {
            strengthText.textContent = '';
            passwordValidation.textContent = '';
            passwordValidation.className = 'validation-message';
            return;
        }
        
        // Validar longitud mínima
        if (password.length < 8) {
            passwordValidation.textContent = 'La contraseña debe tener al menos 8 caracteres';
            passwordValidation.className = 'validation-message invalid';
            strengthText.textContent = 'Muy débil';
            strengthText.style.color = '#b00020';
            return;
        } else {
            passwordValidation.textContent = '✓ Longitud válida';
            passwordValidation.className = 'validation-message valid';
        }
        
        // Calcular fortaleza
        let strength = 0;
        
        // Contiene letras minúsculas
        if (/[a-z]/.test(password)) strength += 1;
        // Contiene letras mayúsculas
        if (/[A-Z]/.test(password)) strength += 1;
        // Contiene números
        if (/\d/.test(password)) strength += 1;
        // Contiene caracteres especiales
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        // Actualizar barras de fortaleza
        for (let i = 0; i < strength; i++) {
            let color;
            
            switch(strength) {
                case 1:
                    color = '#f44336'; // Rojo
                    strengthText.textContent = 'Débil';
                    break;
                case 2:
                    color = '#ff9800'; // Naranja
                    strengthText.textContent = 'Moderada';
                    break;
                case 3:
                    color = '#ffc107'; // Amarillo
                    strengthText.textContent = 'Fuerte';
                    break;
                case 4:
                    color = '#4caf50'; // Verde
                    strengthText.textContent = 'Muy fuerte';
                    break;
            }
            
            strengthSegments[i].style.backgroundColor = color;
            strengthText.style.color = color;
        }
    }

    // Generador de contraseñas seguras
    generatePasswordBtn.addEventListener('click', function() {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        passwordInput.value = password;
        passwordInput.setAttribute('type', 'text');
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash');
        updatePasswordStrength(password);
    });

    // Efecto ripple en botones
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Envío del formulario
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validación final
        if (!emailRegex.test(email)) {
            emailValidation.textContent = 'Por favor ingresa un correo válido';
            emailValidation.className = 'validation-message invalid';
            return;
        }
        
        if (password.length < 8) {
            passwordValidation.textContent = 'La contraseña debe tener al menos 8 caracteres';
            passwordValidation.className = 'validation-message invalid';
            return;
        }
        
        // Mostrar loader
        btnText.style.opacity = '0';
        loader.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Simular envío al servidor
        setTimeout(() => {
            // Ocultar loader
            btnText.style.opacity = '1';
            loader.style.display = 'none';
            
            // Mostrar mensaje de éxito
            successMessage.classList.add('show');
        }, 2000);
    });

    // Resetear formulario
    resetFormBtn.addEventListener('click', function() {
        successMessage.classList.remove('show');
        registerForm.reset();
        emailValidation.textContent = '';
        emailValidation.className = 'validation-message';
        passwordValidation.textContent = '';
        passwordValidation.className = 'validation-message';
        strengthText.textContent = '';
        strengthSegments.forEach(segment => {
            segment.style.backgroundColor = '#e0e0e0';
        });
        passwordInput.setAttribute('type', 'password');
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
        submitBtn.disabled = false;
    });
});