// ==UserScript==
// @name         Manage multi Discord accounts
// @namespace    http://tampermonkey.net/
// @version      6.2
// @description  Discord accounts
// @author       AARR
// @match        https://discord.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @license      You can modify as long as you credit me
// ==/UserScript==

(function() {
    'use strict';
 
    const maxTokens = 50;
    let currentGroup = GM_getValue('currentGroup', 'A');
    let isBoxVisible = false;
 
 
    const toggleImage = document.createElement('img');
    toggleImage.src = 'https://i.imgur.com/RbbQDhI.png';
    toggleImage.style.position = 'fixed';
    toggleImage.style.width = '30px';
    toggleImage.style.height = '30px';
    toggleImage.style.cursor = 'pointer';
    toggleImage.style.zIndex = '1001';
    toggleImage.style.left = '75px';
    toggleImage.style.bottom = '156px';
    document.body.appendChild(toggleImage);
 
    toggleImage.addEventListener('click', () => {
    isBoxVisible = !isBoxVisible;
    mainContainer.style.display = isBoxVisible ? 'block' : 'none';
    saveToggleImageVisibility();
});
 
 
function saveToggleImageVisibility() {
    GM_setValue('isBoxVisible', isBoxVisible);
}
 
 
 
 
    const container = document.createElement('div');
    container.innerHTML = `
        <div id="mainContainer" style="position: fixed; bottom: 200px; right: 10px; background-color: #2f3136; color: #ffffff; padding: 10px; border-radius: 5px; z-index: 1000; width: 175px; height: 29px; overflow-y: auto;">
            <button id="toggleButton" style="width: 100%; margin-bottom: 10px; padding: 10px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">Token Login</button>
            <div id="content" style="display: none;">
                <h2 style="margin: 0 0 10px 0;">AARR Multi Token Login V6.3</h2>
               
                <div id="groupButtons" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <button id="groupA" style="width: 30%; height: 30px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer;">A</button>
                    <button id="groupB" style="width: 30%; height: 30px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer;">B</button>
                    <button id="groupC" style="width: 30%; height: 30px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer;">C</button>
                </div>
               <div style="display: flex; align-items: center; margin-bottom: 10px;">
    <input type="checkbox" id="newTabCheckbox" style="margin-right: 5px; width: 20px; height: 15px;">
    <label for="newTabCheckbox" style="margin: 0;">open new tab</label>
</div>
                <button id="saveButton" style="width: 100%; margin-bottom: 10px; padding: 10px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">📝Save token File</button>
                <button id="loadButton" style="width: 100%; margin-bottom: 10px; padding: 10px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">🗒️Load token File</button>
                <input id="fileInput" type="file" accept=".txt" style="display: none;">
                <button id="hideButton" style="width: 100%; margin-bottom: 10px; padding: 10px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">👁️‍🗨️Hide/Show Inputs</button>
                <h5 style="margin: 0 0 10px 0;">Invite URL</h5>
                <input type="text" id="urlInput" placeholder="redirect login invite URL" style="width: 100%; margin-bottom: 5px; display: block; background-color: #2f3136; color: #32CD32; border: 1px solid #32CD32; padding: 5px;">
                <button id="reloginButton" style="width: 100%; margin-bottom: 10px; padding: 10px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">🔄Relogin</button>
                <button id="autoLoginButton" style="width: 100%; margin-bottom: 10px; padding: 20px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">🟢Auto Token Switch Login</button>
                <h5 style="margin: 0 0 10px 0;">Channel URL</h5>
                <input type="text" id="channelUrlInput" placeholder="Channel/Message URL" style="width: 100%; margin-bottom: 5px; display: block; background-color: #2f3136; color: #32CD32; border: 1px solid #32CD32; padding: 5px;">
                <button id="channelAccessButton" style="width: 100%; margin-bottom: 10px; padding: 10px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">📌Channel access</button>
                <h5 style="margin: 0 0 10px 0;">⚠️don't logout, token will reset</h5>
                <label style="display: block; margin-bottom: 10px;">
                <div id="tokenInputsContainer">
                    ${Array.from({ length: maxTokens }, (_, i) => `
                        <input type="text" id="tokenInput${i + 1}" placeholder="Token ${i + 1}" style="width: 100%; margin-bottom: 5px; display: block; background-color: #2f3136; color: #32CD32; border: 1px solid #32CD32; padding: 5px;">
                        <button id="contactButton${i + 1}" style="width: 100%; margin-bottom: 5px; padding: 10px; background-color: #575757; color: #ffffff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">🐥Login ${i + 1}</button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
       document.body.appendChild(container);
 
    const toggleButton = document.getElementById('toggleButton');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');
    const hideButton = document.getElementById('hideButton');
    const autoLoginButton = document.getElementById('autoLoginButton');
    const reloginButton = document.getElementById('reloginButton');
    const channelAccessButton = document.getElementById('channelAccessButton');
    const fileInput = document.getElementById('fileInput');
    const tokenInputsContainer = document.getElementById('tokenInputsContainer');
    const content = document.getElementById('content');
    const mainContainer = document.getElementById('mainContainer');
    const urlInput = document.getElementById('urlInput');
    const channelUrlInput = document.getElementById('channelUrlInput');
    const groupAButton = document.getElementById('groupA');
    const groupBButton = document.getElementById('groupB');
    const groupCButton = document.getElementById('groupC');
    const newTabCheckbox = document.getElementById('newTabCheckbox');
 
    toggleButton.addEventListener('click', toggleContainer);
    saveButton.addEventListener('click', saveTokensToFile);
    loadButton.addEventListener('click', () => fileInput.click());
    hideButton.addEventListener('click', toggleTokenInputs);
    autoLoginButton.addEventListener('click', autoLogin);
    reloginButton.addEventListener('click', () => relogin(false));
    channelAccessButton.addEventListener('click', () => channelAccess());
    fileInput.addEventListener('change', loadTokensFromFile);
    groupAButton.addEventListener('click', () => switchGroup('A'));
    groupBButton.addEventListener('click', () => switchGroup('B'));
    groupCButton.addEventListener('click', () => switchGroup('C'));
    newTabCheckbox.addEventListener('change', () => GM_setValue('newTabCheckbox', newTabCheckbox.checked));
 
    const buttons = [toggleButton, saveButton, loadButton, hideButton, autoLoginButton, reloginButton, channelAccessButton];
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            if (button === autoLoginButton) {
                button.style.backgroundColor = '#4d7aa1';
            } else {
                button.style.backgroundColor = '#228B22';
            }
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#575757';
        });
    });
 
    function switchGroup(group) {
        saveToLocalStorage();
        currentGroup = group;
        GM_setValue('currentGroup', currentGroup);
        loadFromLocalStorage();
        updateGroupButtonStyles();
    }
 
    function updateGroupButtonStyles() {
        const groupButtons = [groupAButton, groupBButton, groupCButton];
        groupButtons.forEach(button => {
            if (button.textContent === 'A') {
                button.style.backgroundColor = (currentGroup === 'A') ? '#a62828' : '#575757';
            } else if (button.textContent === 'B') {
                button.style.backgroundColor = (currentGroup === 'B') ? '#287abd' : '#575757';
            } else if (button.textContent === 'C') {
                button.style.backgroundColor = (currentGroup === 'C') ? '#c99a16' : '#575757';
            }
        });
    }
 
    let isMinimized = GM_getValue('isMinimized', true);
    function toggleContainer() {
        isMinimized = !isMinimized;
        content.style.display = isMinimized ? 'none' : 'block';
        mainContainer.style.height = isMinimized ? '29px' : '727px';
        mainContainer.style.top = isMinimized ? 'auto' : '5%';
        mainContainer.style.bottom = isMinimized ? '105px' : 'auto';
        toggleButton.style.padding = '10px';
        toggleButton.textContent = isMinimized ? 'Token Login' : '⛔Minimize';
        GM_setValue('isMinimized', isMinimized);
    }
 
    let areInputsVisible = GM_getValue('areInputsVisible', true);
    function toggleTokenInputs() {
        areInputsVisible = !areInputsVisible;
        const tokenInputs = tokenInputsContainer.querySelectorAll('input[type="text"]');
        tokenInputs.forEach(input => {
            input.style.display = areInputsVisible ? 'block' : 'none';
        });
        GM_setValue('areInputsVisible', areInputsVisible);
    }
 
    function login(token) {
        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.contentWindow.localStorage.token = `"${token}"`;
        document.body.removeChild(iframe);
        setTimeout(() => {
            const redirectLink = formatURL(urlInput.value.trim());
            if (redirectLink) {
                if (newTabCheckbox.checked) {
                    window.open(redirectLink, '_blank');
                } else {
                    window.location.href = redirectLink;
                }
            } else {
                if (newTabCheckbox.checked) {
                    window.open("https://discord.com/app", '_blank');
                } else {
                    window.location.href = "https://discord.com/app";
                }
            }
        }, 1000);
    }
 
    function relogin() {
        const lastClickedButtonId = localStorage.getItem(`${currentGroup}_lastClickedButton`);
        if (lastClickedButtonId) {
            const lastClickedButton = document.getElementById(lastClickedButtonId);
            if (lastClickedButton) {
                const token = document.getElementById(`tokenInput${lastClickedButtonId.replace('contactButton', '')}`).value.trim();
                reloginToken(token);
            }
        } else {
            alert('No previously used token found. Please use a token first.');
        }
    }
 
    function channelAccess() {
        const lastClickedButtonId = localStorage.getItem(`${currentGroup}_lastClickedButton`);
        if (lastClickedButtonId) {
            const lastClickedButton = document.getElementById(lastClickedButtonId);
            if (lastClickedButton) {
                const token = document.getElementById(`tokenInput${lastClickedButtonId.replace('contactButton', '')}`).value.trim();
                channelAccessToken(token);
            }
        } else {
            alert('No previously used token found. Please use a token first.');
        }
    }
 
    function reloginToken(token) {
        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.contentWindow.localStorage.token = `"${token}"`;
        document.body.removeChild(iframe);
        setTimeout(() => {
            const redirectLink = formatURL(urlInput.value.trim());
            if (redirectLink) {
                window.location.href = redirectLink;
            } else {
                window.location.href = "https://discord.com/app";
            }
        }, 1000);
    }
 
    function channelAccessToken(token) {
        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.contentWindow.localStorage.token = `"${token}"`;
        document.body.removeChild(iframe);
        setTimeout(() => {
            const channelURL = formatChannelURL(channelUrlInput.value.trim());
            if (channelURL) {
                window.location.href = channelURL;
            } else {
                window.location.href = 'https://discord.com/app';
            }
        }, 1000);
    }
 
    function formatURL(url) {
        if (!url) {
            return '';
        }
 
        if (url.startsWith('discord.gg/')) {
            return `https://${url}`;
        } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://discord.gg/${url}`;
        }
 
        return url;
    }
 
    function formatChannelURL(url) {
        if (!url) {
            return '';
        }
 
        if (url.startsWith('https://discord.com/channels/')) {
            return url;
        } else {
            return `https://discord.com/channels/${url}`;
        }
    }
 
    function saveToLocalStorage() {
        const tokens = [];
        for (let i = 1; i <= maxTokens; i++) {
            const tokenInput = document.getElementById(`tokenInput${i}`);
            tokens.push(tokenInput.value);
            GM_setValue(`${currentGroup}_tokenInput${i}`, tokenInput.value);
        }
        GM_setValue(`${currentGroup}_urlInput`, urlInput.value);
        GM_setValue(`${currentGroup}_channelUrlInput`, channelUrlInput.value);
        GM_setValue('newTabCheckbox', newTabCheckbox.checked);
    }
 
    function loadFromLocalStorage() {
        for (let i = 1; i <= maxTokens; i++) {
            const tokenInput = document.getElementById(`tokenInput${i}`);
            const savedToken = GM_getValue(`${currentGroup}_tokenInput${i}`, '');
            tokenInput.value = savedToken;
 
            const contactButton = document.getElementById(`contactButton${i}`);
            if (tokenInput.value.trim() === '') {
                contactButton.disabled = true;
                contactButton.style.backgroundColor = '#000000';
                contactButton.removeEventListener('mouseover', buttonMouseOver);
                contactButton.removeEventListener('mouseout', buttonMouseOut);
            } else {
                contactButton.disabled = false;
                const isGreen = GM_getValue(`${currentGroup}_contactButton${i}_isGreen`, false);
                contactButton.style.backgroundColor = isGreen ? '#228B22' : '#575757';
                contactButton.addEventListener('mouseover', buttonMouseOver);
                contactButton.addEventListener('mouseout', buttonMouseOut);
            }
        }
        const savedURL = GM_getValue(`${currentGroup}_urlInput`, '');
        urlInput.value = savedURL;
        const savedChannelURL = GM_getValue(`${currentGroup}_channelUrlInput`, '');
        channelUrlInput.value = savedChannelURL;
        newTabCheckbox.checked = GM_getValue('newTabCheckbox', false);
    }
 
    function saveTokensToFile() {
        const tokens = [];
        for (let i = 1; i <= maxTokens; i++) {
            const tokenInput = document.getElementById(`tokenInput${i}`);
            tokens.push(tokenInput.value);
        }
        const blob = new Blob([tokens.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tokens_${currentGroup}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
 
    function loadTokensFromFile(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const tokens = e.target.result.split('\n');
                tokens.forEach((token, index) => {
                    const tokenInput = document.getElementById(`tokenInput${index + 1}`);
                    if (tokenInput) {
                        tokenInput.value = token.trim();
                        GM_setValue(`${currentGroup}_tokenInput${index + 1}`, token.trim());
                        updateButtonState(tokenInput, `contactButton${index + 1}`);
                    }
                });
            };
            reader.readAsText(file);
        }
    }
 
    function autoLogin() {
        const lastClickedButtonId = localStorage.getItem(`${currentGroup}_lastClickedButton`);
        if (lastClickedButtonId) {
            const lastClickedButtonIndex = parseInt(lastClickedButtonId.replace('contactButton', ''), 10);
            const nextButtonIndex = lastClickedButtonIndex + 1;
            if (nextButtonIndex <= maxTokens) {
                const nextButton = document.getElementById(`contactButton${nextButtonIndex}`);
                if (nextButton) {
                    nextButton.click();
                }
            } else {
                alert('No more tokens available for auto login. Returning to the first token.');
                const firstButton = document.getElementById('contactButton1');
                if (firstButton) {
                    firstButton.click();
                }
            }
        } else {
            const firstButton = document.getElementById('contactButton1');
            if (firstButton) {
                firstButton.click();
            }
        }
    }
 
    function buttonMouseOver(event) {
        event.target.style.backgroundColor = '#228B22';
    }
 
    function buttonMouseOut(event) {
        const index = event.target.id.replace('contactButton', '');
        const isGreen = GM_getValue(`${currentGroup}_contactButton${index}_isGreen`, false);
        if (!isGreen) {
            event.target.style.backgroundColor = '#575757';
        }
    }
 
    function updateButtonState(tokenInput, buttonId) {
        const contactButton = document.getElementById(buttonId);
        if (tokenInput.value.trim() === '') {
            contactButton.disabled = true;
            contactButton.style.backgroundColor = '#000000';
            contactButton.removeEventListener('mouseover', buttonMouseOver);
            contactButton.removeEventListener('mouseout', buttonMouseOut);
        } else {
            contactButton.disabled = false;
            contactButton.style.backgroundColor = '#575757';
            contactButton.addEventListener('mouseover', buttonMouseOver);
            contactButton.addEventListener('mouseout', buttonMouseOut);
        }
    }
 
    for (let i = 1; i <= maxTokens; i++) {
        const contactButton = document.getElementById(`contactButton${i}`);
        const tokenInput = document.getElementById(`tokenInput${i}`);
 
        updateButtonState(tokenInput, `contactButton${i}`);
 
        contactButton.addEventListener('click', () => {
            const token = tokenInput.value.trim();
            if (token) {
                login(token);
 
                localStorage.setItem(`${currentGroup}_lastClickedButton`, `contactButton${i}`);
 
                for (let j = 1; j <= maxTokens; j++) {
                    const btn = document.getElementById(`contactButton${j}`);
                    btn.style.backgroundColor = '#575757';
                    GM_setValue(`${currentGroup}_contactButton${j}_isGreen`, false);
                }
 
                contactButton.style.backgroundColor = '#228B22';
                GM_setValue(`${currentGroup}_contactButton${i}_isGreen`, true);
 
                localStorage.setItem(`${currentGroup}_lastUsedToken`, token);
            } else {
                alert('Please enter a valid token!');
            }
        });
 
        tokenInput.addEventListener('input', () => {
            saveToLocalStorage();
            updateButtonState(tokenInput, `contactButton${i}`);
        });
    }
 
    window.addEventListener('load', () => {
        loadFromLocalStorage();
        const isMinimized = GM_getValue('isMinimized', true);
        areInputsVisible = GM_getValue('areInputsVisible', true);
        isBoxVisible = GM_getValue('isBoxVisible', false);
        content.style.display = isMinimized ? 'none' : 'block';
        mainContainer.style.display = isBoxVisible ? 'block' : 'none';
        mainContainer.style.height = isMinimized ? '29px' : '727px';
        mainContainer.style.top = isMinimized ? 'auto' : '5%';
        mainContainer.style.bottom = isMinimized ? '105px' : 'auto';
        toggleButton.style.padding = '10px';
        toggleButton.textContent = isMinimized ? 'Token Login' : '⛔Minimize';
 
        const tokenInputs = tokenInputsContainer.querySelectorAll('input[type="text"]');
        tokenInputs.forEach(input => {
            input.style.display = areInputsVisible ? 'block' : 'none';
        });
 
        const lastClickedButtonId = localStorage.getItem(`${currentGroup}_lastClickedButton`);
        if (lastClickedButtonId) {
            const lastClickedButton = document.getElementById(lastClickedButtonId);
            if (lastClickedButton) {
                lastClickedButton.style.backgroundColor = '#228B22';
            }
        }
 
        updateGroupButtonStyles();
    });
 
    window.addEventListener('beforeunload', saveToLocalStorage);
})();

(function() {
    'use strict';
 
    let observer;
    let isBoxVisible = false;
    let initialBoxPosition = { x: 80, y: 120 };
 
    function makeElementDraggable(el) {
        el.onmousedown = function(event) {
            event.preventDefault();
 
            let shiftX = event.clientX - el.getBoundingClientRect().left;
            let shiftY = event.clientY - el.getBoundingClientRect().top;
 
            function moveAt(pageX, pageY) {
                const newX = Math.min(Math.max(0, pageX - shiftX), window.innerWidth - el.offsetWidth);
                const newY = Math.min(Math.max(0, pageY - shiftY), window.innerHeight - el.offsetHeight);
 
                el.style.left = newX + 'px';
                el.style.top = newY + 'px';
 
 
                const backgroundX = initialBoxPosition.x - newX;
                const backgroundY = initialBoxPosition.y - newY;
                el.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
            }
 
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
 
            document.addEventListener('mousemove', onMouseMove);
 
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
 
            document.addEventListener('mouseup', onMouseUp);
        };
 
        el.ondragstart = function() {
            return false;
        };
    }
 
    function addResizeButtons(el, initialWidth, initialHeight) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.right = '5px';
        buttonContainer.style.top = '5px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.gap = '5px';
        el.appendChild(buttonContainer);
 
        const enlargeButton = document.createElement('button');
        enlargeButton.textContent = '＋';
        enlargeButton.style.padding = '2px 5px';
        enlargeButton.style.fontSize = '10px';
        enlargeButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        enlargeButton.style.color = '#ffffff';
        enlargeButton.style.border = 'none';
        enlargeButton.style.borderRadius = '3px';
        enlargeButton.style.cursor = 'pointer';
        enlargeButton.style.transition = 'color 0.3s, background-color 0.3s';
        enlargeButton.onmouseenter = () => {
            enlargeButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
            enlargeButton.style.color = '#ffffff';
        };
        enlargeButton.onmouseleave = () => {
            enlargeButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
            enlargeButton.style.color = '#ffffff';
        };
        buttonContainer.appendChild(enlargeButton);
 
        const shrinkButton = document.createElement('button');
        shrinkButton.textContent = '－';
        shrinkButton.style.padding = '2px 5px';
        shrinkButton.style.fontSize = '10px';
        shrinkButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        shrinkButton.style.color = '#ffffff';
        shrinkButton.style.border = 'none';
        shrinkButton.style.borderRadius = '3px';
        shrinkButton.style.cursor = 'pointer';
        shrinkButton.style.transition = 'color 0.3s, background-color 0.3s';
        shrinkButton.onmouseenter = () => {
            shrinkButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
            shrinkButton.style.color = '#ffffff';
        };
        shrinkButton.onmouseleave = () => {
            shrinkButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
            shrinkButton.style.color = '#ffffff';
        };
        buttonContainer.appendChild(shrinkButton);
 
        enlargeButton.addEventListener('click', () => {
            el.style.height = (el.clientHeight + 150) + 'px';
        });
 
        shrinkButton.addEventListener('click', () => {
            el.style.width = initialWidth;
            el.style.height = initialHeight;
        });
    }
 
    const initialWidth = '170px';
    const initialHeight = '320px';
 
    const container = document.createElement('div');
    container.id = 'uidContainer';
    container.style.position = 'fixed';
    container.style.top = initialBoxPosition.y + 'px';
    container.style.left = initialBoxPosition.x + 'px';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.style.color = '#ffffff';
    container.style.padding = '5px';
    container.style.borderRadius = '5px';
    container.style.zIndex = '1000';
    container.style.width = initialWidth;
    container.style.height = initialHeight;
    container.style.display = 'none';
    container.style.backgroundImage = 'url("https://i.imgur.com/xhsaLKk.png")';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundAttachment = 'fixed';
    container.style.backgroundRepeat = 'round';
    document.body.appendChild(container);
 
    makeElementDraggable(container);
    addResizeButtons(container, initialWidth, initialHeight);
 
    const title = document.createElement('h2');
    title.textContent = 'AARR Extracted UIDs';
    title.style.margin = '0 0 5px 0';
    title.style.fontSize = '15px';
    title.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.appendChild(title);
 
    const toolsLink = document.createElement('a');
    toolsLink.href = 'https://aarr-homepage.github.io/page/about5.html';
    toolsLink.target = '_blank';
    toolsLink.style.color = '#00BFFF';
    toolsLink.style.textDecoration = 'underline';
    toolsLink.style.display = 'inline-block';
    toolsLink.style.marginBottom = '10px';
    toolsLink.style.fontSize = '12px';
    toolsLink.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    toolsLink.textContent = '🔗other tools';
    container.appendChild(toolsLink);
 
    const uidList = document.createElement('ul');
    uidList.style.listStyleType = 'none';
    uidList.style.padding = '0';
    uidList.style.fontSize = '10px';
    uidList.style.height = 'calc(100% - 120px)';
    uidList.style.overflowY = 'scroll';
    uidList.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.appendChild(uidList);
 
    const startButton = document.createElement('button');
    startButton.textContent = ' Start ';
    startButton.style.marginTop = '5px';
    startButton.style.padding = '2px 5px';
    startButton.style.fontSize = '10px';
    startButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    startButton.style.color = '#ffffff';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '3px';
    startButton.style.cursor = 'pointer';
    startButton.style.transition = 'color 0.3s, background-color 0.3s';
    startButton.onmouseenter = () => {
        startButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        startButton.style.color = '#ffffff';
    };
    startButton.onmouseleave = () => {
        startButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        startButton.style.color = '#ffffff';
    };
    container.appendChild(startButton);
 
    const stopButton = document.createElement('button');
    stopButton.textContent = ' Stop ';
    stopButton.style.marginTop = '5px';
    stopButton.style.padding = '2px 5px';
    stopButton.style.fontSize = '10px';
    stopButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    stopButton.style.color = '#ffffff';
    stopButton.style.border = 'none';
    stopButton.style.borderRadius = '3px';
    stopButton.style.cursor = 'pointer';
    stopButton.style.transition = 'color 0.3s, background-color 0.3s';
    stopButton.onmouseenter = () => {
        stopButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
        stopButton.style.color = '#ffffff';
    };
    stopButton.onmouseleave = () => {
        stopButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        stopButton.style.color = '#ffffff';
    };
    container.appendChild(stopButton);
 
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.marginTop = '5px';
    resetButton.style.padding = '2px 5px';
    resetButton.style.fontSize = '10px';
    resetButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    resetButton.style.color = '#ffffff';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '3px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.transition = 'color 0.3s, background-color 0.3s';
    resetButton.onmouseenter = () => {
        resetButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
        resetButton.style.color = '#ffffff';
    };
    resetButton.onmouseleave = () => {
        resetButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        resetButton.style.color = '#ffffff';
    };
    container.appendChild(resetButton);
 
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy UIDs';
    copyButton.style.marginTop = '5px';
    copyButton.style.padding = '2px 5px';
    copyButton.style.fontSize = '10px';
    copyButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    copyButton.style.color = '#ffffff';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '3px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.transition = 'color 0.3s, background-color 0.3s';
    copyButton.onmouseenter = () => {
        copyButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        copyButton.style.color = '#ffffff';
    };
    copyButton.onmouseleave = () => {
        copyButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        copyButton.style.color = '#ffffff';
    };
    container.appendChild(copyButton);
 
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save File';
    saveButton.style.marginTop = '5px';
    saveButton.style.padding = '2px 5px';
    saveButton.style.fontSize = '10px';
    saveButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    saveButton.style.color = '#ffffff';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '3px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.transition = 'color 0.3s, background-color 0.3s';
    saveButton.onmouseenter = () => {
        saveButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        saveButton.style.color = '#ffffff';
    };
    saveButton.onmouseleave = () => {
        saveButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        saveButton.style.color = '#ffffff';
    };
    container.appendChild(saveButton);
 
    function extractUIDs() {
        const avatarElements = document.querySelectorAll('img[src*="cdn.discordapp.com/avatars/"]');
        const uids = new Set();
        avatarElements.forEach(img => {
            const url = img.src;
            const match = url.match(/avatars\/(\d+)\//);
            if (match) {
                uids.add(match[1]);
            }
        });
        return Array.from(uids);
    }
 
    function updateUIDList() {
        const uids = extractUIDs();
        uids.forEach(uid => {
            if (!Array.from(uidList.children).some(li => li.textContent === uid)) {
                const listItem = document.createElement('li');
                listItem.textContent = uid;
                listItem.style.color = 'green';
                listItem.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                uidList.appendChild(listItem);
            }
        });
    }
 
    function copyUIDsToClipboard() {
        const uids = Array.from(uidList.children).map(li => li.textContent).join('\n');
        navigator.clipboard.writeText(uids).then(() => {
        }).catch(err => {
            console.error('Failed to copy UIDs: ', err);
        });
    }
 
    function resetUIDList() {
        uidList.innerHTML = '';
        if (observer) {
            observer.disconnect();
        }
    }
 
    function saveUIDsToFile() {
        const uids = Array.from(uidList.children).map(li => li.textContent).join('\n');
        const blob = new Blob([uids], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'uids.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
 
    startButton.addEventListener('click', () => {
        if (observer) {
            observer.disconnect();
        }
        updateUIDList();
        observer = new MutationObserver(() => {
            setTimeout(updateUIDList, 1000);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
 
    stopButton.addEventListener('click', () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    });
 
    copyButton.addEventListener('click', copyUIDsToClipboard);
    resetButton.addEventListener('click', resetUIDList);
    saveButton.addEventListener('click', saveUIDsToFile);
 
    const toggleImage = document.createElement('img');
    toggleImage.src = 'https://i.imgur.com/fS8jqh3.png';
    toggleImage.style.position = 'fixed';
    toggleImage.style.width = '30px';
    toggleImage.style.height = '30px';
    toggleImage.style.cursor = 'pointer';
    toggleImage.style.zIndex = '1001';
    toggleImage.style.left = '75px';
    toggleImage.style.bottom = '57px';
 
    document.body.appendChild(toggleImage);
 
    function adjustToggleImagePosition() {
 
    }
 
    toggleImage.addEventListener('click', () => {
        isBoxVisible = !isBoxVisible;
        container.style.display = isBoxVisible ? 'block' : 'none';
    });
})();

(function() {
    'use strict';
 
    let observer;
    let isBoxVisible = false;
    let initialBoxPosition = { x: 100, y: 100 };
 
    function makeElementDraggable(el) {
        el.onmousedown = function(event) {
            event.preventDefault();
 
            let shiftX = event.clientX - el.getBoundingClientRect().left;
            let shiftY = event.clientY - el.getBoundingClientRect().top;
 
            function moveAt(pageX, pageY) {
                const newX = Math.min(Math.max(0, pageX - shiftX), window.innerWidth - el.offsetWidth);
                const newY = Math.min(Math.max(0, pageY - shiftY), window.innerHeight - el.offsetHeight);
 
                el.style.left = newX + 'px';
                el.style.top = newY + 'px';
 
                const backgroundX = initialBoxPosition.x - newX;
                const backgroundY = initialBoxPosition.y - newY;
                el.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
            }
 
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
 
            document.addEventListener('mousemove', onMouseMove);
 
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
 
            document.addEventListener('mouseup', onMouseUp);
        };
 
        el.ondragstart = function() {
            return false;
        };
    }
 
    function addResizeButtons(el, initialWidth, initialHeight) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.right = '5px';
        buttonContainer.style.top = '5px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.gap = '5px';
        el.appendChild(buttonContainer);
 
        const enlargeButton = document.createElement('button');
        enlargeButton.textContent = '＋';
        enlargeButton.style.padding = '2px 5px';
        enlargeButton.style.fontSize = '10px';
        enlargeButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        enlargeButton.style.color = '#ffffff';
        enlargeButton.style.border = 'none';
        enlargeButton.style.borderRadius = '3px';
        enlargeButton.style.cursor = 'pointer';
        enlargeButton.style.transition = 'color 0.3s, background-color 0.3s';
        enlargeButton.onmouseenter = () => {
            enlargeButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
            enlargeButton.style.color = '#ffffff';
        };
        enlargeButton.onmouseleave = () => {
            enlargeButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
            enlargeButton.style.color = '#ffffff';
        };
        buttonContainer.appendChild(enlargeButton);
 
        const shrinkButton = document.createElement('button');
        shrinkButton.textContent = '－';
        shrinkButton.style.padding = '2px 5px';
        shrinkButton.style.fontSize = '10px';
        shrinkButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        shrinkButton.style.color = '#ffffff';
        shrinkButton.style.border = 'none';
        shrinkButton.style.borderRadius = '3px';
        shrinkButton.style.cursor = 'pointer';
        shrinkButton.style.transition = 'color 0.3s, background-color 0.3s';
        shrinkButton.onmouseenter = () => {
            shrinkButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
            shrinkButton.style.color = '#ffffff';
        };
        shrinkButton.onmouseleave = () => {
            shrinkButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
            shrinkButton.style.color = '#ffffff';
        };
        buttonContainer.appendChild(shrinkButton);
 
        enlargeButton.addEventListener('click', () => {
            el.style.height = (el.clientHeight + 150) + 'px';
        });
 
        shrinkButton.addEventListener('click', () => {
            el.style.width = initialWidth;
            el.style.height = initialHeight;
        });
    }
 
    const initialWidth = '170px';
    const initialHeight = '320px';
 
    const container = document.createElement('div');
    container.id = 'channelIDContainer';
    container.style.position = 'fixed';
    container.style.top = initialBoxPosition.y + 'px';
    container.style.left = initialBoxPosition.x + 'px';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.style.color = '#ffffff';
    container.style.padding = '5px';
    container.style.borderRadius = '5px';
    container.style.zIndex = '1000';
    container.style.width = initialWidth;
    container.style.height = initialHeight;
    container.style.display = 'none';
    container.style.backgroundImage = 'url("https://i.imgur.com/ZtEYi1c.jpeg")';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundAttachment = 'fixed';
    container.style.backgroundRepeat = 'round';
    document.body.appendChild(container);
 
    makeElementDraggable(container);
    addResizeButtons(container, initialWidth, initialHeight);
 
    const title = document.createElement('h2');
    title.textContent = 'AARR Ex Channel IDs';
    title.style.margin = '0 0 5px 0';
    title.style.fontSize = '15px';
    title.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.appendChild(title);
 
    const toolsLink = document.createElement('a');
    toolsLink.href = 'https://aarr-homepage.github.io/page/about5.html';
    toolsLink.target = '_blank';
    toolsLink.style.color = '#00BFFF';
    toolsLink.style.textDecoration = 'underline';
    toolsLink.style.display = 'inline-block';
    toolsLink.style.marginBottom = '10px';
    toolsLink.style.fontSize = '12px';
    toolsLink.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    toolsLink.textContent = '🔗other tools';
    container.appendChild(toolsLink);
 
    const idList = document.createElement('ul');
    idList.style.listStyleType = 'none';
    idList.style.padding = '0';
    idList.style.fontSize = '10px';
    idList.style.height = 'calc(100% - 120px)';
    idList.style.overflowY = 'scroll';
    idList.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.appendChild(idList);
 
    const startButton = document.createElement('button');
    startButton.textContent = ' Start ';
    startButton.style.marginTop = '5px';
    startButton.style.padding = '2px 5px';
    startButton.style.fontSize = '10px';
    startButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    startButton.style.color = '#ffffff';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '3px';
    startButton.style.cursor = 'pointer';
    startButton.style.transition = 'color 0.3s, background-color 0.3s';
    startButton.onmouseenter = () => {
        startButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        startButton.style.color = '#ffffff';
    };
    startButton.onmouseleave = () => {
        startButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        startButton.style.color = '#ffffff';
    };
    container.appendChild(startButton);
 
    const stopButton = document.createElement('button');
    stopButton.textContent = ' Stop ';
    stopButton.style.marginTop = '5px';
    stopButton.style.padding = '2px 5px';
    stopButton.style.fontSize = '10px';
    stopButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    stopButton.style.color = '#ffffff';
    stopButton.style.border = 'none';
    stopButton.style.borderRadius = '3px';
    stopButton.style.cursor = 'pointer';
    stopButton.style.transition = 'color 0.3s, background-color 0.3s';
    stopButton.onmouseenter = () => {
        stopButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
        stopButton.style.color = '#ffffff';
    };
    stopButton.onmouseleave = () => {
        stopButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        stopButton.style.color = '#ffffff';
    };
    container.appendChild(stopButton);
 
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.marginTop = '5px';
    resetButton.style.padding = '2px 5px';
    resetButton.style.fontSize = '10px';
    resetButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    resetButton.style.color = '#ffffff';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '3px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.transition = 'color 0.3s, background-color 0.3s';
    resetButton.onmouseenter = () => {
        resetButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
        resetButton.style.color = '#ffffff';
    };
    resetButton.onmouseleave = () => {
        resetButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        resetButton.style.color = '#ffffff';
    };
    container.appendChild(resetButton);
 
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy CIDs';
    copyButton.style.marginTop = '5px';
    copyButton.style.padding = '2px 5px';
    copyButton.style.fontSize = '10px';
    copyButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    copyButton.style.color = '#ffffff';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '3px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.transition = 'color 0.3s, background-color 0.3s';
    copyButton.onmouseenter = () => {
        copyButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        copyButton.style.color = '#ffffff';
    };
    copyButton.onmouseleave = () => {
        copyButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        copyButton.style.color = '#ffffff';
    };
    container.appendChild(copyButton);
 
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save File';
    saveButton.style.marginTop = '5px';
    saveButton.style.padding = '2px 5px';
    saveButton.style.fontSize = '10px';
    saveButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    saveButton.style.color = '#ffffff';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '3px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.transition = 'color 0.3s, background-color 0.3s';
    saveButton.onmouseenter = () => {
        saveButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        saveButton.style.color = '#ffffff';
    };
    saveButton.onmouseleave = () => {
        saveButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        saveButton.style.color = '#ffffff';
    };
    container.appendChild(saveButton);
 
    function extractChannelIDs() {
        const channelElements = document.querySelectorAll('a[href*="/channels/"]');
        const ids = new Set();
        channelElements.forEach(link => {
            const urlParts = link.href.split('/');
            if (urlParts.length > 5) {
                ids.add(urlParts[5]);
            }
        });
        return Array.from(ids);
    }
 
    function updateChannelIDList() {
        const channelIDs = extractChannelIDs();
        channelIDs.forEach(id => {
            if (!Array.from(idList.children).some(li => li.textContent === id)) {
                const listItem = document.createElement('li');
                listItem.textContent = id;
                listItem.style.color = 'yellow';
                listItem.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                idList.appendChild(listItem);
            }
        });
    }
 
    function copyIDsToClipboard() {
        const ids = Array.from(idList.children).map(li => li.textContent).join('\n');
        navigator.clipboard.writeText(ids).then(() => {
        }).catch(err => {
            console.error('Failed to copy IDs: ', err);
        });
    }
 
    function resetIDList() {
        idList.innerHTML = '';
        if (observer) {
            observer.disconnect();
        }
    }
 
    function saveIDsToFile() {
        const ids = Array.from(idList.children).map(li => li.textContent).join('\n');
        const blob = new Blob([ids], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'channel_ids.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
 
    startButton.addEventListener('click', () => {
        if (observer) {
            observer.disconnect();
        }
        updateChannelIDList();
        observer = new MutationObserver(() => {
            setTimeout(updateChannelIDList, 1000);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
 
    stopButton.addEventListener('click', () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    });
 
    copyButton.addEventListener('click', copyIDsToClipboard);
    resetButton.addEventListener('click', resetIDList);
    saveButton.addEventListener('click', saveIDsToFile);
 
    const toggleImage = document.createElement('img');
    toggleImage.src = 'https://i.imgur.com/RaOkQOA.png';
    toggleImage.style.position = 'fixed';
    toggleImage.style.width = '30px';
    toggleImage.style.height = '30px';
    toggleImage.style.cursor = 'pointer';
    toggleImage.style.zIndex = '1001';
    toggleImage.style.left = '75px';
    toggleImage.style.bottom = '90px';
    document.body.appendChild(toggleImage);
 
    function adjustToggleImagePosition() {
 
    }
 
    window.addEventListener('resize', adjustToggleImagePosition);
    adjustToggleImagePosition();
 
    toggleImage.addEventListener('click', () => {
        isBoxVisible = !isBoxVisible;
        container.style.display = isBoxVisible ? 'block' : 'none';
    });
})();

(function() {
    'use strict';
 
    let observer;
    let isBoxVisible = false;
    let initialBoxPosition = { x: 90, y: 110 };
 
    function makeElementDraggable(el) {
        el.onmousedown = function(event) {
            event.preventDefault();
 
            let shiftX = event.clientX - el.getBoundingClientRect().left;
            let shiftY = event.clientY - el.getBoundingClientRect().top;
 
            function moveAt(pageX, pageY) {
                const newX = Math.min(Math.max(0, pageX - shiftX), window.innerWidth - el.offsetWidth);
                const newY = Math.min(Math.max(0, pageY - shiftY), window.innerHeight - el.offsetHeight);
 
                el.style.left = newX + 'px';
                el.style.top = newY + 'px';
 
                const backgroundX = initialBoxPosition.x - newX;
                const backgroundY = initialBoxPosition.y - newY;
                el.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
            }
 
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
 
            document.addEventListener('mousemove', onMouseMove);
 
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
 
            document.addEventListener('mouseup', onMouseUp);
        };
 
        el.ondragstart = function() {
            return false;
        };
    }
 
    function addResizeButtons(el, initialWidth, initialHeight) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.right = '5px';
        buttonContainer.style.top = '5px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.gap = '5px';
        el.appendChild(buttonContainer);
 
        const enlargeButton = document.createElement('button');
        enlargeButton.textContent = '＋';
        enlargeButton.style.padding = '2px 5px';
        enlargeButton.style.fontSize = '10px';
        enlargeButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        enlargeButton.style.color = '#ffffff';
        enlargeButton.style.border = 'none';
        enlargeButton.style.borderRadius = '3px';
        enlargeButton.style.cursor = 'pointer';
        enlargeButton.style.transition = 'color 0.3s, background-color 0.3s';
        enlargeButton.onmouseenter = () => {
            enlargeButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
            enlargeButton.style.color = '#ffffff';
        };
        enlargeButton.onmouseleave = () => {
            enlargeButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
            enlargeButton.style.color = '#ffffff';
        };
        buttonContainer.appendChild(enlargeButton);
 
        const shrinkButton = document.createElement('button');
        shrinkButton.textContent = '－';
        shrinkButton.style.padding = '2px 5px';
        shrinkButton.style.fontSize = '10px';
        shrinkButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        shrinkButton.style.color = '#ffffff';
        shrinkButton.style.border = 'none';
        shrinkButton.style.borderRadius = '3px';
        shrinkButton.style.cursor = 'pointer';
        shrinkButton.style.transition = 'color 0.3s, background-color 0.3s';
        shrinkButton.onmouseenter = () => {
            shrinkButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
            shrinkButton.style.color = '#ffffff';
        };
        shrinkButton.onmouseleave = () => {
            shrinkButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
            shrinkButton.style.color = '#ffffff';
        };
        buttonContainer.appendChild(shrinkButton);
 
        enlargeButton.addEventListener('click', () => {
            el.style.height = (el.clientHeight + 150) + 'px';
        });
 
        shrinkButton.addEventListener('click', () => {
            el.style.width = initialWidth;
            el.style.height = initialHeight;
        });
    }
 
    const initialWidth = '170px';
    const initialHeight = '320px';
 
    const container = document.createElement('div');
    container.id = 'messageIdContainer';
    container.style.position = 'fixed';
    container.style.top = initialBoxPosition.y + 'px';
    container.style.left = initialBoxPosition.x + 'px';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.style.color = '#ffffff';
    container.style.padding = '5px';
    container.style.borderRadius = '5px';
    container.style.zIndex = '1000';
    container.style.width = initialWidth;
    container.style.height = initialHeight;
    container.style.display = 'none';
    container.style.backgroundImage = 'url("https://i.imgur.com/HCw1ebe.jpeg")';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundAttachment = 'fixed';
    container.style.backgroundRepeat = 'round';
    document.body.appendChild(container);
 
    makeElementDraggable(container);
    addResizeButtons(container, initialWidth, initialHeight);
 
    const title = document.createElement('h2');
    title.textContent = 'AARR Ex Message IDs';
    title.style.margin = '0 0 5px 0';
    title.style.fontSize = '15px';
    title.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.appendChild(title);
 
    const toolsLink = document.createElement('a');
    toolsLink.href = 'https://aarr-homepage.github.io/page/about5.html';
    toolsLink.target = '_blank';
    toolsLink.style.color = '#00BFFF';
    toolsLink.style.textDecoration = 'underline';
    toolsLink.style.display = 'inline-block';
    toolsLink.style.marginBottom = '10px';
    toolsLink.style.fontSize = '12px';
    toolsLink.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    toolsLink.textContent = '🔗other tools';
    container.appendChild(toolsLink);
 
    const messageIdList = document.createElement('ul');
    messageIdList.style.listStyleType = 'none';
    messageIdList.style.padding = '0';
    messageIdList.style.fontSize = '10px';
    messageIdList.style.height = 'calc(100% - 120px)';
    messageIdList.style.overflowY = 'scroll';
    messageIdList.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.appendChild(messageIdList);
 
    const startButton = document.createElement('button');
    startButton.textContent = ' Start ';
    startButton.style.marginTop = '5px';
    startButton.style.padding = '2px 5px';
    startButton.style.fontSize = '10px';
    startButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    startButton.style.color = '#ffffff';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '3px';
    startButton.style.cursor = 'pointer';
    startButton.style.transition = 'color 0.3s, background-color 0.3s';
    startButton.onmouseenter = () => {
        startButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        startButton.style.color = '#ffffff';
    };
    startButton.onmouseleave = () => {
        startButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        startButton.style.color = '#ffffff';
    };
    container.appendChild(startButton);
 
    const stopButton = document.createElement('button');
    stopButton.textContent = ' Stop ';
    stopButton.style.marginTop = '5px';
    stopButton.style.padding = '2px 5px';
    stopButton.style.fontSize = '10px';
    stopButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    stopButton.style.color = '#ffffff';
    stopButton.style.border = 'none';
    stopButton.style.borderRadius = '3px';
    stopButton.style.cursor = 'pointer';
    stopButton.style.transition = 'color 0.3s, background-color 0.3s';
    stopButton.onmouseenter = () => {
        stopButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
        stopButton.style.color = '#ffffff';
    };
    stopButton.onmouseleave = () => {
        stopButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        stopButton.style.color = '#ffffff';
    };
    container.appendChild(stopButton);
 
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.marginTop = '5px';
    resetButton.style.padding = '2px 5px';
    resetButton.style.fontSize = '10px';
    resetButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    resetButton.style.color = '#ffffff';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '3px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.transition = 'color 0.3s, background-color 0.3s';
    resetButton.onmouseenter = () => {
        resetButton.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
        resetButton.style.color = '#ffffff';
    };
    resetButton.onmouseleave = () => {
        resetButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        resetButton.style.color = '#ffffff';
    };
    container.appendChild(resetButton);
 
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy IDs';
    copyButton.style.marginTop = '5px';
    copyButton.style.padding = '2px 5px';
    copyButton.style.fontSize = '10px';
    copyButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    copyButton.style.color = '#ffffff';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '3px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.transition = 'color 0.3s, background-color 0.3s';
    copyButton.onmouseenter = () => {
        copyButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        copyButton.style.color = '#ffffff';
    };
    copyButton.onmouseleave = () => {
        copyButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        copyButton.style.color = '#ffffff';
    };
    container.appendChild(copyButton);
 
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save File';
    saveButton.style.marginTop = '5px';
    saveButton.style.padding = '2px 5px';
    saveButton.style.fontSize = '10px';
    saveButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
    saveButton.style.color = '#ffffff';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '3px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.transition = 'color 0.3s, background-color 0.3s';
    saveButton.onmouseenter = () => {
        saveButton.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        saveButton.style.color = '#ffffff';
    };
    saveButton.onmouseleave = () => {
        saveButton.style.backgroundColor = 'rgba(87, 87, 87, 0.5)';
        saveButton.style.color = '#ffffff';
    };
    container.appendChild(saveButton);
 
    function extractMessageIDs() {
        const messageElements = document.querySelectorAll('[id^="chat-messages-"]');
        const messageIds = new Set();
        messageElements.forEach(message => {
            const id = message.id.substring(14);
            messageIds.add(id);
        });
        return Array.from(messageIds);
    }
 
    function updateMessageIDList() {
        const messageIds = extractMessageIDs();
        messageIds.forEach(id => {
            if (!Array.from(messageIdList.children).some(li => li.textContent === id)) {
                const listItem = document.createElement('li');
                listItem.textContent = id;
                listItem.style.color = '#3ad3e0';
                listItem.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                messageIdList.appendChild(listItem);
            }
        });
    }
 
    function copyMessageIDsToClipboard() {
        const messageIds = Array.from(messageIdList.children).map(li => li.textContent.replace(/-/g, ',')).join('\n');
        navigator.clipboard.writeText(messageIds).then(() => {
        }).catch(err => {
            console.error('Failed to copy message IDs: ', err);
        });
    }
 
    function resetMessageIDList() {
        messageIdList.innerHTML = '';
        if (observer) {
            observer.disconnect();
        }
    }
 
    function saveMessageIDsToFile() {
        const messageIds = Array.from(messageIdList.children).map(li => li.textContent.replace(/-/g, ',')).join('\n');
        const blob = new Blob([messageIds], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'message_ids.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
 
    startButton.addEventListener('click', () => {
        if (observer) {
            observer.disconnect();
        }
        updateMessageIDList();
        observer = new MutationObserver(() => {
            setTimeout(updateMessageIDList, 1000);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
 
    stopButton.addEventListener('click', () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    });
 
    copyButton.addEventListener('click', copyMessageIDsToClipboard);
    resetButton.addEventListener('click', resetMessageIDList);
    saveButton.addEventListener('click', saveMessageIDsToFile);
 
    const toggleImage = document.createElement('img');
    toggleImage.src = 'https://i.imgur.com/POHPOPN.png';
    toggleImage.style.position = 'fixed';
    toggleImage.style.width = '30px';
    toggleImage.style.height = '30px';
    toggleImage.style.cursor = 'pointer';
    toggleImage.style.zIndex = '1001';
    toggleImage.style.left = '75px';
    toggleImage.style.bottom = '123px';
    document.body.appendChild(toggleImage);
 
    function adjustToggleImagePosition() {
 
    }
 
    toggleImage.addEventListener('click', () => {
        isBoxVisible = !isBoxVisible;
        container.style.display = isBoxVisible ? 'block' : 'none';
    });
})();

