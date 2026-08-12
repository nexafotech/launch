document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const inputLine = document.getElementById('input-line');
    const terminalBody = document.getElementById('terminal-body');

    // =========================================
    // MATRIX RAIN
    // =========================================
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const chars = 'NEXAFOTECH01アイウエオカキクケコサシスセソ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 106, 0, 0.3)';
        ctx.font = `${fontSize}px JetBrains Mono`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
    }
    drawMatrix();

    // =========================================
    // HELPERS
    // =========================================
    function scroll() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function addLine(html, className = '') {
        const div = document.createElement('div');
        div.className = `line ${className}`;
        div.innerHTML = html;
        output.appendChild(div);
        scroll();
    }

    function addAscii(text) {
        const div = document.createElement('div');
        div.className = 'line ascii-line';
        div.textContent = text;
        output.appendChild(div);
    }

    function wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    // =========================================
    // BOOT SEQUENCE
    // =========================================
    async function boot() {
        // Hide cursor during boot
        inputLine.style.display = 'none';

        await wait(600);
        addLine('<span class="comment">// NEXAFO TECH LAUNCH TERMINAL v2.1</span>');
        await wait(300);
        addLine('<span class="comment">// Secure. Intelligent. Built With Us.</span>');
        await wait(400);
        addLine('');

        // Big ASCII Logo - single pre block, clean characters
        const logoBlock = document.createElement('pre');
        logoBlock.className = 'ascii-block';
        logoBlock.textContent = 
`    _   __  ______  _  __  ___    ______ ____
   / | / / / ____/ | |/ / /   |  / ____// __ \\
  /  |/ / / __/    |   / / /| | / /_   / / / /
 / /|  / / /___   /   | / ___ |/ __/  / /_/ /
/_/ |_/ /_____/  /_/|_|/_/  |_/_/     \\____/

            ______ ______ ______ __  __
           /_  __// ____// ____// / / /
            / /  / __/  / /    / /_/ /
           / /  / /___ / /___ / __  /
          /_/  /_____/ \\____//_/ /_/`;
        output.appendChild(logoBlock);
        scroll();
        await wait(500);
        addLine('');
        addLine('<span class="info">Initializing system modules...</span>');
        await wait(400);
        addLine('<span class="success">✓</span> <span class="info">Network interface  </span><span class="success">CONNECTED</span>');
        await wait(250);
        addLine('<span class="success">✓</span> <span class="info">Security protocol  </span><span class="success">ENABLED</span>');
        await wait(250);
        addLine('<span class="success">✓</span> <span class="info">DNS resolution     </span><span class="success">ACTIVE</span>');
        await wait(250);
        addLine('<span class="success">✓</span> <span class="info">Target endpoint    </span><span class="white">nexafotech.com</span>');
        await wait(400);
        addLine('');
        addLine('<span class="warn">⚠ Awaiting operator confirmation...</span>');
        await wait(300);

        // Show input line with "start" prompt
        inputLine.style.display = 'flex';
        inputLine.innerHTML = `
            <span class="prompt">▶</span>
            <span class="typing-cmd">./launch --confirm</span>
        `;
        scroll();

        // Wait for click anywhere or Enter
        await new Promise(resolve => {
            function handler() {
                document.removeEventListener('click', handler);
                document.removeEventListener('keydown', handler);
                resolve();
            }
            document.addEventListener('click', handler);
            document.addEventListener('keydown', handler);
        });

        // Start countdown
        inputLine.style.display = 'none';
        addLine('<span class="cmd">$ ./launch --confirm</span>');
        await wait(300);
        addLine('');
        addLine('<span class="success bold">LAUNCH SEQUENCE INITIATED</span>');
        await wait(400);
        addLine('');

        await countdown();
    }

    // =========================================
    // COUNTDOWN
    // =========================================
    async function countdown() {
        // Create fixed elements for number and progress bar
        const numLine = document.createElement('div');
        numLine.className = 'line';
        numLine.innerHTML = '<span class="big-number">5</span>';
        output.appendChild(numLine);

        const barLine = document.createElement('div');
        barLine.className = 'line';
        barLine.innerHTML = '<span class="progress-text">[░░░░░░░░░░░░░░░░░░░░] 0%</span>';
        output.appendChild(barLine);
        scroll();

        for (let i = 5; i >= 1; i--) {
            const filled = 5 - i;
            const total = 5;
            const bar = '█'.repeat(filled * 4) + '░'.repeat((total - filled) * 4);

            // Update in place
            numLine.innerHTML = `<span class="big-number">${i}</span>`;
            barLine.innerHTML = `<span class="progress-text">[${bar}] ${Math.round((filled / total) * 100)}%</span>`;
            scroll();

            if (i > 1) {
                await wait(1200);
            }
        }

        await wait(600);
        addLine('');

        // Final progress
        addLine('<span class="progress-text">[████████████████████] 100%</span>');
        await wait(300);
        addLine('');
        addLine('<span class="success bold">ALL SYSTEMS GO</span>');
        await wait(300);

        // Launch banner
        const banner = document.createElement('div');
        banner.className = 'line';
        banner.innerHTML = '<div class="launch-banner"><span class="cmd bold">▸ ENTERING NEXAFOTECH.COM — ACCESS GRANTED</span></div>';
        output.appendChild(banner);
        scroll();

        await wait(1500);
        window.location.href = "https://www.nexafotech.com";
    }

    // =========================================
    // START
    // =========================================
    boot();
});
