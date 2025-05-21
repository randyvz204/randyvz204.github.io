// Animation manager for dynamic background animations
const animationContainerId = "animationContainer";
let activeAnimation = "none";

// Start animations based on user selection
function startAnimation(animationType, options = {}) {
    clearAnimation();
    activeAnimation = animationType;

    const container = document.createElement("div");
    container.id = animationContainerId;
    container.style.position = "fixed"; // Changed from absolute to fixed
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    container.style.zIndex = "-1";
    container.style.pointerEvents = "none";

    document.body.appendChild(container);

    switch (animationType) {
        case "leaves":
            createLeafLayers(container);
            break;
        case "bubbles":
            createBubbleLayers(container);
            break;
        case "snow":
            createSnowLayers(container, options.snowImage);
            break;
        default:
            clearAnimation();
    }
}

// Clear existing animations
function clearAnimation() {
    const container = document.getElementById(animationContainerId);
    if (container) {
        container.remove();
    }
    // Also remove any animation styles we added
    const animationStyles = document.querySelectorAll('style[data-animation-style]');
    animationStyles.forEach(style => style.remove());
}

// Create bubble animation with layers
function createBubbleLayers(container) {
    const layers = [
        { name: "layer1", count: 8, sizeMin: 10, sizeMax: 20, duration: 15, drift: 20 },
        { name: "layer2", count: 6, sizeMin: 15, sizeMax: 30, duration: 12, drift: 30 },
        { name: "layer3", count: 4, sizeMin: 20, sizeMax: 40, duration: 9, drift: 40 }
    ];

    layers.forEach(layer => {
        const layerElement = document.createElement("div");
        layerElement.classList.add("bubble-layer", layer.name);

        for (let i = 0; i < layer.count; i++) {
            const bubble = document.createElement("div");
            const randomX = Math.random();
            const randomDirection = Math.random() * layer.drift * 2 - layer.drift;
            const size = Math.random() * (layer.sizeMax - layer.sizeMin) + layer.sizeMin;
            const delay = Math.random() * 5; // Random delay for more natural appearance
            const opacity = Math.random() * 0.4 + 0.4; // Random opacity between 0.4 and 0.8

            bubble.style.setProperty("--random-x", randomX);
            bubble.style.setProperty("--random-direction", randomDirection + "px");
            bubble.style.setProperty("--size", size + "px");
            bubble.style.setProperty("--duration", layer.duration + "s");
            bubble.style.setProperty("--delay", delay + "s");
            bubble.style.setProperty("--opacity", opacity);
            
            layerElement.appendChild(bubble);
        }

        container.appendChild(layerElement);
    });

    addBubbleAnimationStyles();
}

// Add styles for bubble animation
function addBubbleAnimationStyles() {
    const style = document.createElement("style");
    style.setAttribute("data-animation-style", "bubbles");
    style.innerHTML = `
        /* Bubble Layers */
        .bubble-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        }

        .bubble-layer div {
            position: absolute;
            bottom: -100px; /* Start below the screen */
            left: calc(5% + 90% * var(--random-x));
            width: var(--size);
            height: var(--size);
            background-color: var(--primary-color, rgba(139, 69, 19, var(--opacity)));
            border-radius: 50%;
            animation: rise var(--duration) linear var(--delay) infinite;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        @keyframes rise {
            0% { 
                transform: translate(0, 0) scale(0.8); 
                opacity: 0; 
            }
            10% { 
                opacity: var(--opacity); 
                transform: translate(0, 0) scale(1);
            }
            90% { 
                opacity: var(--opacity); 
            }
            100% { 
                transform: translate(var(--random-direction), calc(-100vh - 100px)) scale(0.8); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Create leaf animation with layers
function createLeafLayers(container) {
    const leafImages = [
        "leafs/leaves1.png",
        "leafs/leaves2.png",
        "leafs/leaves3.png",
        "leafs/leaves4.png"
    ];
    const layers = [
        { name: "layer1", count: 3, duration: 25, drift: 10, scaleMin: 0.5, scaleMax: 0.7 },
        { name: "layer2", count: 3, duration: 20, drift: 20, scaleMin: 0.6, scaleMax: 0.8 },
        { name: "layer3", count: 3, duration: 15, drift: 30, scaleMin: 0.7, scaleMax: 1.0 }
    ];

    layers.forEach(layer => {
        const layerElement = document.createElement("div");
        layerElement.classList.add("falling-leaves-layer", layer.name);

        for (let i = 0; i < layer.count; i++) {
            const leaf = document.createElement("img");
            const randomLeaf = leafImages[Math.floor(Math.random() * leafImages.length)];
            const randomX = Math.random();
            const scale = Math.random() * (layer.scaleMax - layer.scaleMin) + layer.scaleMin;
            const delay = Math.random() * 5;
            const rotation = Math.random() * 360;

            leaf.src = randomLeaf;
            leaf.alt = "Leaf";
            leaf.style.setProperty("--random-x", randomX);
            leaf.style.setProperty("--scale", scale);
            leaf.style.setProperty("--duration", layer.duration + "s");
            leaf.style.setProperty("--drift", layer.drift + "px");
            leaf.style.setProperty("--delay", delay + "s");
            leaf.style.setProperty("--rotation", rotation + "deg");
            
            layerElement.appendChild(leaf);
        }

        container.appendChild(layerElement);
    });

    addLeafAnimationStyles();
}

// Add styles for leaf animation
function addLeafAnimationStyles() {
    const style = document.createElement("style");
    style.setAttribute("data-animation-style", "leaves");
    style.innerHTML = `
        /* Falling Leaves Layers */
        .falling-leaves-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        }

        .falling-leaves-layer img {
            position: absolute;
            width: calc(5vw + 5vw * var(--scale));
            height: auto;
            opacity: 0;
            filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
            transform-origin: center;
        }

        /* Layer 1 (Far Background) */
        .layer1 img {
            animation: animateLayer1 var(--duration) linear var(--delay) infinite;
        }

        @keyframes animateLayer1 {
            0% { 
                top: -10%; 
                left: calc(5% + 90% * var(--random-x)); 
                transform: translateX(0) scale(var(--scale)) rotate(var(--rotation));
                opacity: 0; 
            }
            10% { 
                opacity: 0.8; 
            }
            70% { 
                opacity: 0.8;
            }
            100% { 
                top: 100%; 
                left: calc(5% + 90% * var(--random-x)); 
                transform: translateX(var(--drift)) scale(var(--scale)) rotate(calc(var(--rotation) + 180deg));
                opacity: 0; 
            }
        }

        /* Layer 2 (Middle Background) */
        .layer2 img {
            animation: animateLayer2 var(--duration) linear var(--delay) infinite;
        }

        @keyframes animateLayer2 {
            0% { 
                top: -10%; 
                left: calc(5% + 90% * var(--random-x)); 
                transform: translateX(0) scale(var(--scale)) rotate(var(--rotation));
                opacity: 0; 
            }
            10% { 
                opacity: 0.8; 
            }
            70% { 
                opacity: 0.8;
            }
            100% { 
                top: 100%; 
                left: calc(5% + 90% * var(--random-x)); 
                transform: translateX(calc(var(--drift) * 1.5)) scale(var(--scale)) rotate(calc(var(--rotation) + 270deg));
                opacity: 0; 
            }
        }

        /* Layer 3 (Foreground) */
        .layer3 img {
            animation: animateLayer3 var(--duration) linear var(--delay) infinite;
        }

        @keyframes animateLayer3 {
            0% { 
                top: -10%; 
                left: calc(5% + 90% * var(--random-x)); 
                transform: translateX(0) scale(var(--scale)) rotate(var(--rotation));
                opacity: 0; 
            }
            10% { 
                opacity: 0.8; 
            }
            70% { 
                opacity: 0.8;
            }
            100% { 
                top: 100%; 
                left: calc(5% + 90% * var(--random-x)); 
                transform: translateX(calc(var(--drift) * 2)) scale(var(--scale)) rotate(calc(var(--rotation) + 360deg));
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Create snow animation with custom image
function createSnowLayers(container, snowImage) {
    const layers = [
        { name: "layer1", count: 30, sizeMin: 5, sizeMax: 10, duration: 20, drift: 10 },
        { name: "layer2", count: 20, sizeMin: 10, sizeMax: 15, duration: 15, drift: 20 },
        { name: "layer3", count: 10, sizeMin: 15, sizeMax: 25, duration: 10, drift: 30 }
    ];

    // Default snowflake image if none provided
    const defaultSnowImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNDQ4IDI1NnEwIDI2LTE5IDQ1TDM5NyAzMzMgMzMzIDM5N3EtMTkgMTktNDUgMTl0LTQ1LTE5TDE5MSAzMzMgMTE1IDQwOXEtMTkgMTktNDUgMTl0LTQ1LTE5LTE5LTQ1IDE5LTQ1bDc2LTc2LTc2LTc2cS0xOS0xOS0xOS00NXQxOS00NSA0NS0xOSA0NSAxOWw3NiA3NiA3Ni03NnExOS0xOSA0NS0xOXQ0NSAxOSA0NSA0NS0xOSA0NWwtNzYgNzYgNzYgNzZxMTkgMTkgMTkgNDV6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==";

    layers.forEach(layer => {
        const layerElement = document.createElement("div");
        layerElement.classList.add("snow-layer", layer.name);

        for (let i = 0; i < layer.count; i++) {
            const snowflake = document.createElement("img");
            const randomX = Math.random();
            const randomDirection = Math.random() * layer.drift * 2 - layer.drift;
            const size = Math.random() * (layer.sizeMax - layer.sizeMin) + layer.sizeMin;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.5 + 0.5;

            snowflake.src = snowImage || defaultSnowImage;
            snowflake.alt = "Snowflake";
            snowflake.style.setProperty("--random-x", randomX);
            snowflake.style.setProperty("--size", size + "px");
            snowflake.style.setProperty("--duration", layer.duration + "s");
            snowflake.style.setProperty("--drift", randomDirection + "px");
            snowflake.style.setProperty("--delay", delay + "s");
            snowflake.style.setProperty("--opacity", opacity);
            
            layerElement.appendChild(snowflake);
        }

        container.appendChild(layerElement);
    });

    addSnowAnimationStyles();
}

// Add styles for snow animation
function addSnowAnimationStyles() {
    const style = document.createElement("style");
    style.setAttribute("data-animation-style", "snow");
    style.innerHTML = `
        /* Snow Layers */
        .snow-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        }

        .snow-layer img {
            position: absolute;
            top: -50px;
            left: calc(5% + 90% * var(--random-x));
            width: var(--size);
            height: var(--size);
            opacity: var(--opacity);
            animation: fall var(--duration) linear var(--delay) infinite;
        }

        @keyframes fall {
            0% { 
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            10% { 
                opacity: var(--opacity);
            }
            90% { 
                opacity: var(--opacity);
            }
            100% { 
                transform: translate(var(--drift), calc(100vh + 50px)) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}