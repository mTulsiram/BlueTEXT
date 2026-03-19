(function() {
    'use strict';

    function initPasswordGenerator() {
        const resultEl = document.getElementById('pg-result');
        if (!resultEl) return;

        const lengthEl = document.getElementById('pg-length');
        const lengthVal = document.getElementById('pg-length-val');
        const upperEl = document.getElementById('pg-upper');
        const lowerEl = document.getElementById('pg-lower');
        const numbersEl = document.getElementById('pg-numbers');
        const symbolsEl = document.getElementById('pg-symbols');
        const generateBtn = document.getElementById('pg-generate-btn');
        const copyBtn = document.getElementById('pg-copy-btn');

        const randomFunc = {
            lower: getRandomLower,
            upper: getRandomUpper,
            number: getRandomNumber,
            symbol: getRandomSymbol
        };

        lengthEl.addEventListener('input', () => {
            lengthVal.textContent = lengthEl.value;
        });

        copyBtn.addEventListener('click', () => {
            const password = resultEl.innerText;
            if (!password) return;

            navigator.clipboard.writeText(password).then(() => {
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                }, 2000);
            });
        });

        generateBtn.addEventListener('click', () => {
            const length = +lengthEl.value;
            const hasLower = lowerEl.checked;
            const hasUpper = upperEl.checked;
            const hasNumber = numbersEl.checked;
            const hasSymbol = symbolsEl.checked;

            resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
        });

        function generatePassword(lower, upper, number, symbol, length) {
            let generatedPassword = '';
            const typesCount = lower + upper + number + symbol;
            const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

            if (typesCount === 0) return '';

            for (let i = 0; i < length; i += typesCount) {
                typesArr.forEach(type => {
                    const funcName = Object.keys(type)[0];
                    generatedPassword += randomFunc[funcName]();
                });
            }

            // Shuffle and trim to length
            return generatedPassword.slice(0, length).split('').sort(() => 0.5 - Math.random()).join('');
        }

        function getSecureRandomInt(max) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] % max;
        }

        function getRandomLower() {
            return String.fromCharCode(getSecureRandomInt(26) + 97);
        }

        function getRandomUpper() {
            return String.fromCharCode(getSecureRandomInt(26) + 65);
        }

        function getRandomNumber() {
            return String.fromCharCode(getSecureRandomInt(10) + 48);
        }

        function getRandomSymbol() {
            const symbols = '!@#$%^&*(){}[]=<>/,.';
            return symbols[getSecureRandomInt(symbols.length)];
        }

        // Initial generation
        generateBtn.click();
    }

    document.addEventListener('DOMContentLoaded', initPasswordGenerator);
    document.addEventListener('pageLoaded', initPasswordGenerator);
})();