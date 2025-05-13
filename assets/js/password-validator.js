document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input_field");
    const inputIcon = document.querySelector(".input_icon");
    const passwordStrengthBox = document.querySelector(".password-strength");
    const strengthIndicatorIcon = document.getElementById("password-strength-icon");
    const strengthIndicatorText = document.getElementById("password-strength-text");
    
    // Strength Classes
    const strengthClasses = {
        weak: {
            icon: "assets/svg/not-met.svg",
            text: "Weak",
            color: "#f64f63"
        },

        moderate: {
            icon: "assets/svg/moderate.svg",
            text: "Moderate",
            color: "#f8b324"
        },

        strong: {
            icon: "assets/svg/met.svg",
            text: "Strong",
            color: "#0c6b37"
        }
    };

    // Toggle The Password Visibility
    inputIcon.addEventListener("click", togglePasswordVisibility);
    inputIcon.addEventListener("keydown", (e) => {
        if (e.key === "Enter") togglePasswordVisibility();
    });

    function togglePasswordVisibility() {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        inputIcon.src = isPassword ? "assets/svg/dont-reveal.svg" : "assets/svg/reveal.svg";
    }

    // Strength Checker
    input.addEventListener("input", () => {
        const password = input.value;
        passwordStrengthBox.classList.toggle("password-strength--visibility", password.length > 0);
        checkStrength(password);
    });

    function checkStrength(password) {
        let strength = 0;
        strength += validateRule(/[a-z]/, "lower-and-upper-case", password);
        strength += validateRule(/[A-Z]/, "lower-and-upper-case", password);
        strength += validateRule(/\d/, "number", password);
        strength += validateRule(/[\W_]/, "special-character", password);
        strength += validateRule(/.{8,}/, "eight-characters", password);

        // Update The Strength Level Icons
        let strengthLevel = "weak";
        if (strength <= 2) {
            strengthLevel = "weak";
        } else if (strength <= 4) {
            strengthLevel = "moderate";
        } else if (strength > 4) {
            strengthLevel = "strong";
        }

        updateStrengthUI(strengthLevel);
    }

    function validateRule(regex, ruleClass, password) {
        const rulePassed = regex.test(password);
        const liItem = document.querySelector(`.${ruleClass}`);
        const img = liItem?.querySelector("img");

        if (rulePassed) {
            img.src = "assets/svg/met.svg";
            liItem.classList.add("rule-passed");
            return 1;
        } else {
            img.src = "assets/svg/not-met.svg";
            liItem.classList.remove("rule-passed");
            return 0;
        }
    }

    function updateStrengthUI(level) {
        strengthIndicatorIcon.src = strengthClasses[level].icon;
        strengthIndicatorText.textContent = strengthClasses[level].text;
        strengthIndicatorText.style.color = strengthClasses[level].color;
    }
});