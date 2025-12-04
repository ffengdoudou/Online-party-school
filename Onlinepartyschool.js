// ==UserScript==
// @name        网上党校刷课
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  取消视频自动暂停功能，添加倍速控制，自动播放下一个视频
// @author       枫斗
// @match        https://wsdx.zafu.edu.cn/zsdy/play*
// @match        https://wsdx.zafu.edu.cn/zsdy/play?*
// @match        https://wsdx.zafu.edu.cn/zsdy/play#*
// @match        https://wsdx.zafu.edu.cn/zsdy/play?v_id=*
// @match        https://wsdx.zafu.edu.cn/zsdy/play?r_id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zafu.edu.cn
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function () {
        const video = document.querySelector('video');
        const videoList = document.querySelectorAll('.video_lists > ul > li');
        video.play();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createMiniSpeedControl);
        } else {
            createMiniSpeedControl();
        }

        video.addEventListener('ended', function() {
            for (let i = 0; i < videoList.length; i++) {
                if (videoList[i].classList.contains('video_red1')&&i === videoList.length - 1) {
                    break;
                }
                if (videoList[i].classList.contains('video_red1')) {
                    const aTag = videoList[i+1].querySelector('a');
                    const href = aTag.getAttribute('href');
                    const currentDomain = window.location.origin;
                    const fullURL = currentDomain + href;
                    window.location.href = fullURL;
                    break;
                }
            }
        });
    });

    document.addEventListener("visibilitychange", function(event) {
        event.stopImmediatePropagation();
    }, true);

    window.loop_pause=function() {}
    
    function createMiniSpeedControl() {
        const miniPanel = document.createElement('div');
        miniPanel.id = 'mini-speed-control';
        miniPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            border-radius: 8px;
            padding: 10px;
            color: white;
            font-family: Arial, sans-serif;
            z-index: 10000;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            min-width: 120px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
            font-size: 12px;`;

        const speedDisplay = document.createElement('div');
        speedDisplay.id = 'speed-display';
        speedDisplay.textContent = `当前: ${video.playbackRate}x`;
        speedDisplay.style.cssText = `
            text-align: center;
            margin-bottom: 8px;
            font-weight: bold;
            color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
            padding: 4px;
            border-radius: 4px;
        `;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
        `;

        for (let i = 1; i <= 6; i++) {
            const button = document.createElement('button');
            button.textContent = i + 'x';
            button.dataset.speed = i;
            button.style.cssText = `
                padding: 4px 2px;
                border: none;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                cursor: pointer;
                font-size: 10px;
                transition: all 0.2s ease;
            `;
            
            button.addEventListener('mouseenter', () => {
                button.style.background = 'rgba(255, 107, 107, 0.3)';
                button.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                if (!button.classList.contains('active')) {
                    button.style.background = 'rgba(255, 255, 255, 0.1)';
                }
                button.style.transform = 'scale(1)';
            });
            
            button.addEventListener('click', function() {
                const speed = parseFloat(this.dataset.speed);
                video.playbackRate = speed;
                updateSpeedDisplay(speed);
                highlightActiveButton(this);
            });
            
            buttonsContainer.appendChild(button);
        }
        miniPanel.appendChild(speedDisplay);
        miniPanel.appendChild(buttonsContainer);
        document.body.appendChild(miniPanel);
        function updateSpeedDisplay(speed) {
            speedDisplay.textContent = `当前: ${speed.toFixed(1)}x`;
        }
        function highlightActiveButton(activeButton) {
            const buttons = buttonsContainer.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
                btn.style.border = 'none';
            });
            activeButton.classList.add('active');
            activeButton.style.background = '#ff6b6b';
            activeButton.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        }
        updateSpeedDisplay(video.playbackRate);
        video.addEventListener('ratechange', () => {
            updateSpeedDisplay(video.playbackRate);
        });
        return miniPanel;
    }   
})();