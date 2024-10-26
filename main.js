(function() {
    'use strict';
    const gui = document.createElement('div');
    gui.style.position = 'fixed';
    gui.style.top = '10px';
    gui.style.right = '10px';
    gui.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gui.style.padding = '10px';
    gui.style.borderRadius = '8px';
    gui.style.color = 'white';
    gui.style.zIndex = '10000';
    gui.style.fontFamily = 'Arial, sans-serif';
    gui.style.cursor = 'move';

    let isDragging = false;
    let offsetX, offsetY;
    let guiVisible = true;

    gui.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - gui.getBoundingClientRect().left;
        offsetY = e.clientY - gui.getBoundingClientRect().top;
        gui.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            gui.style.left = `${e.clientX - offsetX}px`;
            gui.style.top = `${e.clientY - offsetY}px`;
            gui.style.right = 'auto';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        gui.style.cursor = 'move';
    });
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'q') {
            guiVisible = !guiVisible;
            gui.style.display = guiVisible ? 'block' : 'none';
        }
    });

    const silly = [
        { label: 'finish game', action: () => window.endGame(), key: '\\' },
        { label: 'show what does what (tools)', action: () => window.inventoryHints = true, key: '=' },
        { label: 'skip padlock', action: () => window.puzzleSuccess(true), key: ']' },
        { label: 'orangutan', action: () => {
            const listItems = document.querySelectorAll('li.tooltip.ui-draggable.ui-draggable-handle');
            listItems.forEach(listItem => {
                const img = listItem.querySelector('img');
                if (img) {
                    img.src = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSQMWFsos1_jjOXuZT3MjVo1xaJ9ng-FO8VhNX8qQbY1OxH2wRI';
                }
            });
        }, key: '-' }
    ];

    silly.forEach(({ label, action, key }) => {
        const button = document.createElement('button');
        button.innerText = label.toLowerCase();
        button.style.margin = '5px';
        button.style.padding = '5px 10px';
        button.style.fontSize = '14px';
        button.style.cursor = 'pointer';
        button.addEventListener('click', action);
        gui.appendChild(button);
        document.addEventListener('keydown', (e) => {
            if (e.key === key) {
                action();
            }
        });
    });

    document.body.appendChild(gui);
})();
