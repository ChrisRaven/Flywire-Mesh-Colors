// ==UserScript==
// @name         Restyle
// @namespace    KrzysztofKruk-FlyWire
// @version      0.2.2.1
// @description  Changes the look of some of the Flywire/Neuroglancer UI elements
// @author       Krzysztof Kruk
// @match        https://ngl.flywire.ai/*
// @match        https://proofreading.flywire.ai/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ChrisRaven/FlyWire-Restyle/main/Restyle.user.js
// @downloadURL  https://raw.githubusercontent.com/ChrisRaven/FlyWire-Restyle/main/Restyle.user.js
// @homepageURL  https://github.com/ChrisRaven/FlyWire-Restyle
// ==/UserScript==

if (!document.getElementById('dock-script')) {
  let script = document.createElement('script')
  script.id = 'dock-script'
  script.src = typeof DEV !== 'undefined' ? 'http://127.0.0.1:5501/FlyWire-Dock/Dock.js' : 'https://chrisraven.github.io/FlyWire-Dock/Dock.js'
  document.head.appendChild(script)
}

let wait = setInterval(() => {
  if (globalThis.dockIsReady) {
    clearInterval(wait)
    main()
  }
}, 100)


function main() {
  let dock = new Dock()

  dock.addAddon({
    css: generateCSS()
  })

  document.getElementsByClassName('neuroglancer-layer-side-panel')[0].addEventListener('click', e => {
    // I started with setTimeout( () => {}, 0), but looks like it's unnecessary, because of the event bubbling
    // and the order, in which handlers are called
    if (e.target.classList.contains('segment-copy-button')) {
      e.target.style.backgroundColor = 'rgb(27, 62, 102)'
    }
    else if (e.target.parentElement.classList.contains('segment-copy-button')) {
      e.target.parentElement.style.backgroundColor = 'rgb(27, 62, 102)'
    }
  })
}


function generateCSS() {
  return /*css*/`
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&display=swap');

  :root {
    --kk-background-color-button: #1b5ba7;
  }

  input, select, textarea {
    border: 1px solid var(--kk-background-color-button);
    margin-bottom: 1px;
    background-color: #111;
    color: #dddddd;
    border-radius: 2px;
  }

  input[type="color"] {
    width: 50px;
    border-radius: 20px;
    background-color: var(--kk-background-color-button);
    position: relative;
    bottom: -12px;
    height: 25px;
  }

  input[type="color"].color-special {
    border: none;
    bottom: 0;
    width: 15px;
    border-radius: 0;
    background-color: transparent;
  }

  .neuroglancer-show-panel-borders .neuroglancer-panel {
    border: none;
  }
  
  .neuroglancer-layer-panel {
    padding-top: 3px;
  }
  
  .neuroglancer-layer-item, .neuroglancer-layer-add-button {
    margin: 1px 1px 0 1px;
    border: 1px solid #3e3e3e;
    border-radius: 4px 4px 0 0;
    border-bottom: none;
    background-color: #222;
    color: #ddd;
  }
  
  .neuroglancer-layer-item[layer-selected=true] {
    border: 1px solid #222;
    border-bottom: none;
    background-color: #4a4a4a;
  }

  .neuroglancer-layer-item[layer-selected=true]:hover {
    border-color: white;
    border-bottom: none;
  }

  .neuroglancer-layer-item:nth-child(2) {
    margin-left: 10px;
  }
  
  .neuroglancer-layer-item-label {
    display: inline-block;
    background-color: transparent;
    padding-right: 3px;
    color: #ddd;
  }

  .neuroglancer-layer-item-number {
    padding: 0 5px 0 5px;
    color: #0f0;
    background-color: transparent;
  }

  .neuroglancer-tab-view-bar {
    border-bottom: 1px solid #9f9f9f;
  }

  .neuroglancer-tab-label.neuroglancer-selected-tab-label {
    border: 1px solid #9f9f9f;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    background-color: #111;
    bottom: -1px;
    position: relative;
    padding-bottom: 4px;
  }

  .neuroglancer-tab-label {
    padding: 4px;
  }

  .neuroglancer-tab-view > .neuroglancer-stack-view {
    background-color: #111;
  }

  .neuroglancer-layer-side-panel-info-panel {
    font-family: 'Barlow';
    font-weight: 400;
  }

  .neuroglancer-voxel-coordinates-link {
    font-family: 'Roboto Mono';
    font-weight: 300;
  }

  .neuroglancer-multicut-voxel-coordinates-link {
    font-family: 'Roboto Mono';
    font-weight: 300;
  }

  .find-path-source-or-target-prefix {
    font-family: 'Roboto Mono';
    font-weight: 300;
  }

  .neuroglancer-graphoperation-toolbox button {
    border-radius: 20px;
    margin-right: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
    /* background: linear-gradient(180deg, rgb(115 178 255), rgb(0 117 255)); */
    background-color: var(--kk-background-color-button);
    padding: 5px;
    color: white;
  }

  #path-finder-color-widget {
    border-radius: 2px;
    margin-right: 3px;
    margin-top: 12px;
    margin-bottom: 10px;
    background-color: var(--kk-background-color-button);
    height: 19.677px;
    top: 5px;
  }

  .segment-button {
    min-width: 155px;
  }

  div.segment-div > .segment-color-selector {
    border: none;
    border-color: transparent;
    -webkit-appearance: none;
    background-color: transparent;
    padding: 0;
    margin: 0px;
    height: 27px;
    margin-bottom: -2px;
    width: 27px;
    bottom: 0;
  }

  /* to hide scroll, which is visible because of margin: -2px in .segment-color-selector */
  .segment-set-widget .item-container {
    padding-bottom: 2px;
  }

  div.segment-div > .segment-checkbox {
    margin-bottom: 4px;
  }

  .lightbulb {
    background-color: #111;
    border: none;
  }

  .neuroglancer-minimizable-group-fixed input[type="range"] {
    width: 110px;
  }

  .neuroglancer-render-scale-widget > canvas {
    filter: grayscale(100%);
  }

  .neuroglancer-minimizable-group-fixed {
    padding: 2px;
    color: #bbb;
  }

  .neuroglancer-minimizable-group-title {
    color: #c7c7c7;
  }

  .neuroglancer-minimizable-group-content {
    padding: 2px;
  }

  .segment-set-widget {
    padding: 2px;
  }

  .segment-set-widget svg {
    filter: invert(1);
    position: relative;
    bottom: 5px;
  }

  .segment-set-widget button {
    border-radius: 5px;
    height: 22px;
    margin: 0;
  }

  .clear-button,
  .copy-all-segment-IDs-button,
  .segment-copy-button {
    color: white;
    background-color: var(--kk-background-color-button);
    padding: 6px;
    height: 20px;
  }

  .clear-button {
    position: relative;
    bottom: -1px;
  }

  .clear-button::after {
    position: relative;
    bottom: 5px;
  }

  .eyes-symbol-for-button {
    bottom: 9px;
  }

  .segment-copy-button span:first-child {
    position: relative;
    bottom: 1px;
  }

  .neuroglancer-time-widget button {
    background-color: var(--kk-background-color-button);
    width: 45px;
    border-radius: 10px;
    color: white;
  }

  #exportToCSVButton,
  #exportToCSVButton + button,
  .neuroglancer-coordinate-transform-widget button {
    background-color: var(--kk-background-color-button);
    width: 130px;
    border-radius: 20px;
    color: white;
    padding: 8px;
  }

  .top-buttons .segment-checkbox {
    position: relative;
    bottom: 2.5px;
  }

  .neuroglancer-annotation-toolbox button,
  .neuroglancer-annotation-shortcut-button {
    background-color: var(--kk-background-color-button);
    color: white;
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 6px;
    margin: 1px;
  }

  button.neuroglancer-active-tool {
    box-shadow: none;
    background-color: orange;
  }

  button.neuroglancer-child-tool {
    box-shadow: none;
    background-color: green;
  }

  button.neuroglancer-seperator-element {
    width: 1px;
    border-radius: 0;
  }

  input.neuroglancer-color-widget {
    bottom: -1px;
    width: 25px;
    border-radius: 6px;
    margin: 0 1px 0 3px;
  }

  #path-finder-color-widget {
    width: 100%;
    position: relative;
    bottom: -12px;
    border-radius: 20px;
  }

  .overlay-content {
    background-color: var(--color-dark-bg);
    color: #DDD;
    font-family: 'Roboto';
    border-radius: 4px;
  }

  .add-layer-overlay {
    width: 50vw;
    padding: 30px;
  }

  .add-layer-name,
  .add-layer-source,
  .autocomplete-input-wrapper {
    height: 30px;
    border-color: var(--color-border);
  }

  .add-layer-overlay form > label {
    height: 30px;
    padding-top: 6px;
  }
  
  .add-layer-overlay .source-form > label {
    margin-top: 10px;
  }

  .add-layer-overlay .dialog-status {
    font-size: 13px;
    color: #AAA;
    height: auto;
    padding-top: 25px;
  }

  .add-layer-overlay .name-form button {
    background-color: var(--kk-background-color-button);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0 20px;
  }

  .autocomplete-input {
    color: #777;
  }
  `
}