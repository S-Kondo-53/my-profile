/**
 * Flowing Background JavaScript
 * ReactのFlowingBackgroundコンポーネントをHTML/CSS/JavaScriptに変換
 */

class FlowingBackground {
    constructor() {
        this.flowLayers = [];
        this.geometricShapes = [];
        this.windowHeight = window.innerHeight;
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.createBackgroundHTML();
        this.setupElements();
        this.bindEvents();
        this.updateBackground();
        this.isInitialized = true;
    }

    createBackgroundHTML() {
        // 既存の背景要素があれば削除
        const existing = document.getElementById('flowing-background');
        if (existing) existing.remove();

        const backgroundHTML = `
            <div id="flowing-background" class="flowing-background">
                <!-- Primary Diagonal Stripes - Left to Right -->
                <div class="flow-layer" data-speed="-300" data-opacity="0.1,0.25,0.2,0.1">
                    ${this.generateDiagonalStripes([
                        { left: '-10%', top: '5%', width: '80%', height: '4px', rotation: '25deg', opacity: 0.3 },
                        { left: '15%', top: '23%', width: '80%', height: '4px', rotation: '25deg', opacity: 0.26 },
                        { left: '40%', top: '41%', width: '80%', height: '4px', rotation: '25deg', opacity: 0.22 },
                        { left: '65%', top: '59%', width: '80%', height: '4px', rotation: '25deg', opacity: 0.18 },
                        { left: '90%', top: '77%', width: '80%', height: '4px', rotation: '25deg', opacity: 0.14 },
                        { left: '115%', top: '95%', width: '80%', height: '4px', rotation: '25deg', opacity: 0.1 }
                    ], '#1662a9')}
                </div>

                <!-- Secondary Diagonal Stripes - Right to Left -->
                <div class="flow-layer" data-speed="-400" data-opacity="0.15,0.3,0.25,0.15">
                    ${this.generateDiagonalStripes([
                        { right: '-15%', top: '15%', width: '70%', height: '2px', rotation: '-20deg', opacity: 0.25 },
                        { right: '13%', top: '35%', width: '70%', height: '2px', rotation: '-20deg', opacity: 0.22 },
                        { right: '41%', top: '55%', width: '70%', height: '2px', rotation: '-20deg', opacity: 0.19 },
                        { right: '69%', top: '75%', width: '70%', height: '2px', rotation: '-20deg', opacity: 0.16 },
                        { right: '97%', top: '95%', width: '70%', height: '2px', rotation: '-20deg', opacity: 0.13 }
                    ], '#4a9eff')}
                </div>

                <!-- Downward Diagonal Flow Lines -->
                <div class="flow-layer" data-speed="-250" data-opacity="0.08,0.2,0.18,0.08">
                    ${this.generateGradientLines([
                        { left: '10%', top: '20%', width: '60%', height: '6px', rotation: '35deg', opacity: 0.2 },
                        { left: '40%', top: '45%', width: '60%', height: '6px', rotation: '35deg', opacity: 0.17 },
                        { left: '70%', top: '70%', width: '60%', height: '6px', rotation: '35deg', opacity: 0.14 },
                        { left: '100%', top: '95%', width: '60%', height: '6px', rotation: '35deg', opacity: 0.11 }
                    ])}
                </div>

                <!-- Diagonal Cascade Pattern -->
                <div class="flow-layer" data-speed="-280" data-opacity="0.05,0.18,0.15,0.05">
                    ${this.generateCascadePattern()}
                </div>

                <!-- Strong Diagonal Visual Flow -->
                <div class="flow-layer" data-speed="-320" data-opacity="0.12,0.28,0.24,0.12">
                    ${this.generateStrongDiagonalFlow()}
                </div>

                <!-- Geometric Accent Elements -->
                <div class="flow-layer" data-speed="-350" data-opacity="0.1,0.22,0.25,0.1">
                    ${this.generateParallelograms()}
                </div>

                <!-- Angular Chevron Pattern -->
                <div class="flow-layer" data-speed="-260" data-opacity="0.08,0.2,0.22,0.08">
                    ${this.generateAngularChevrons()}
                </div>

                <!-- Diagonal Grid Pattern -->
                <div class="flow-layer" data-speed="-200" data-opacity="0.05,0.15,0.18,0.05">
                    ${this.generateDiagonalGrid()}
                </div>

                <!-- Stylish Geometric Accents -->
                ${this.generateStylishAccents()}

                <!-- Subtle Connecting Diagonal Lines -->
                <div class="flow-layer" data-speed="-150" data-opacity="0.03,0.12,0.15,0.03">
                    ${this.generateConnectingLines()}
                </div>

                <!-- Final Diagonal Flow Elements -->
                <div class="flow-layer" data-speed="-380" data-opacity="0,0.2,0.16,0">
                    ${this.generateFinalFlow()}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', backgroundHTML);
    }

    generateDiagonalStripes(stripes, color) {
        return stripes.map((stripe, i) => {
            const positioning = stripe.left ? `left: ${stripe.left};` : `right: ${stripe.right};`;
            return `
                <div class="diagonal-line" style="
                    --line-color: ${color};
                    ${positioning}
                    top: ${stripe.top};
                    width: ${stripe.width};
                    height: ${stripe.height};
                    transform: rotate(${stripe.rotation});
                    opacity: ${stripe.opacity};
                "></div>
            `;
        }).join('');
    }

    generateGradientLines(lines) {
        return lines.map((line, i) => `
            <div class="diagonal-line" style="
                background: linear-gradient(to right, #1662a9, #4a9eff, transparent);
                left: ${line.left};
                top: ${line.top};
                width: ${line.width};
                height: ${line.height};
                transform: rotate(${line.rotation});
                opacity: ${line.opacity};
            "></div>
        `).join('');
    }

    generateCascadePattern() {
        const patterns = [];
        for (let i = 0; i < 7; i++) {
            patterns.push(`
                <div class="geometric-shape parallelogram" style="
                    left: ${5 + i * 15}%;
                    top: ${10 + i * 15}%;
                    width: 100px;
                    height: 3px;
                    background: linear-gradient(to right, rgba(22, 98, 169, ${0.18 - i * 0.02}), rgba(74, 158, 255, ${0.12 - i * 0.015}));
                    transform: rotate(${15 + i * 2}deg);
                "></div>
            `);
        }
        return patterns.join('');
    }

    generateStrongDiagonalFlow() {
        return [
            { left: '15%', top: '25%', opacity: 0.25 },
            { left: '50%', top: '55%', opacity: 0.21 },
            { left: '85%', top: '85%', opacity: 0.17 }
        ].map(flow => `
            <div class="diagonal-line" style="
                background: linear-gradient(to right, transparent, #1662a9, #4a9eff);
                left: ${flow.left};
                top: ${flow.top};
                width: 50%;
                height: 8px;
                transform: rotate(30deg);
                opacity: ${flow.opacity};
            "></div>
        `).join('');
    }

    generateParallelograms() {
        const shapes = [];
        for (let i = 0; i < 4; i++) {
            shapes.push(`
                <div class="geometric-shape parallelogram" style="
                    left: ${20 + i * 25}%;
                    top: ${30 + i * 20}%;
                    width: 120px;
                    height: 50px;
                    background: linear-gradient(45deg, rgba(22, 98, 169, ${0.12 - i * 0.02}), rgba(74, 158, 255, ${0.08 - i * 0.015}));
                    border: 1px solid rgba(22, 98, 169, ${0.15 - i * 0.03});
                "></div>
            `);
        }
        return shapes.join('');
    }

    generateAngularChevrons() {
        const chevrons = [];
        for (let i = 0; i < 4; i++) {
            chevrons.push(`
                <svg class="geometric-shape" style="
                    left: ${25 + i * 20}%;
                    top: ${15 + i * 22}%;
                    width: 36px;
                    height: 60px;
                    transform: rotate(15deg);
                " viewBox="0 0 36 60">
                    <defs>
                        <linearGradient id="angularChevronGradient${i}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#1662a9" stop-opacity="0.25" />
                            <stop offset="50%" stop-color="#4a9eff" stop-opacity="0.18" />
                            <stop offset="100%" stop-color="#a5a5a5" stop-opacity="0.08" />
                        </linearGradient>
                    </defs>
                    <path d="M18 5 L28 20 L18 35 L8 20 Z" fill="url(#angularChevronGradient${i})" fill-opacity="${0.15 - i * 0.025}" />
                    <path d="M18 25 L28 40 L18 55 L8 40 Z" fill="url(#angularChevronGradient${i})" fill-opacity="${0.1 - i * 0.02}" />
                </svg>
            `);
        }
        return chevrons.join('');
    }

    generateDiagonalGrid() {
        const gridLines = [];
        for (let i = 0; i < 5; i++) {
            gridLines.push(`
                <div class="diagonal-line" style="
                    --line-color: #1662a9;
                    left: ${0 + i * 30}%;
                    top: ${40 + i * 10}%;
                    width: 25%;
                    height: 2px;
                    transform: rotate(45deg);
                    opacity: ${0.12 - i * 0.02};
                "></div>
            `);
        }
        return gridLines.join('');
    }

    generateStylishAccents() {
        return `
            <div class="geometric-shape slanted-rect animate-float" style="
                --rotation: 15deg;
                top: 16.67%;
                right: 20%;
                width: 64px;
                height: 128px;
                background: linear-gradient(135deg, rgba(22, 98, 169, 0.08) 0%, transparent 70%);
            " data-speed="-300" data-opacity="0,0.2,0"></div>
            <div class="geometric-shape diamond animate-float" style="
                --rotation: -20deg;
                top: 40%;
                left: 12.5%;
                width: 80px;
                height: 64px;
                background: linear-gradient(45deg, rgba(74, 158, 255, 0.1) 0%, transparent 60%);
            " data-speed="-220" data-opacity="0,0.18,0.2,0"></div>
            <div class="geometric-shape pentagon animate-float" style="
                --rotation: 25deg;
                top: 60%;
                right: 33.33%;
                width: 48px;
                height: 96px;
                background: linear-gradient(60deg, rgba(22, 98, 169, 0.06) 0%, transparent 80%);
            " data-speed="-180" data-opacity="0,0.15,0.18,0"></div>
        `;
    }

    generateConnectingLines() {
        return [
            { left: '30%', top: '50%', opacity: 0.1 },
            { left: '55%', top: '65%', opacity: 0.08 },
            { left: '80%', top: '80%', opacity: 0.06 }
        ].map(line => `
            <div class="diagonal-line" style="
                --line-color: #4a9eff;
                left: ${line.left};
                top: ${line.top};
                width: 30%;
                height: 1px;
                transform: rotate(50deg);
                opacity: ${line.opacity};
            "></div>
        `).join('');
    }

    generateFinalFlow() {
        return [
            { left: '40%', top: '60%', opacity: 0.15 },
            { left: '80%', top: '80%', opacity: 0.12 }
        ].map(flow => `
            <div class="geometric-shape chevron-shape" style="
                left: ${flow.left};
                top: ${flow.top};
                width: 35%;
                height: 12px;
                background: linear-gradient(to right, #1662a9, #4a9eff, transparent);
                transform: rotate(40deg);
                opacity: ${flow.opacity};
            "></div>
        `).join('');
    }

    setupElements() {
        this.flowLayers = document.querySelectorAll('.flow-layer');
        this.geometricShapes = document.querySelectorAll('.geometric-shape[data-speed]');
    }

    bindEvents() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleScroll() {
        requestAnimationFrame(() => this.updateBackground());
    }

    handleResize() {
        this.windowHeight = window.innerHeight;
        this.updateBackground();
    }

    updateBackground() {
        const scrollPercent = window.pageYOffset / Math.max(document.documentElement.scrollHeight - this.windowHeight, 1);
        const scrollProgress = Math.max(0, Math.min(1, scrollPercent));

        this.updateFlowLayers(scrollProgress);
        this.updateGeometricShapes(scrollProgress);
    }

    updateFlowLayers(scrollProgress) {
        this.flowLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0;
            const opacityStops = layer.dataset.opacity ? layer.dataset.opacity.split(',').map(Number) : [0.1, 0.3, 0.2, 0.1];
            
            const translateY = scrollProgress * speed;
            const opacity = this.interpolateOpacity(scrollProgress, opacityStops);
            
            layer.style.transform = `translateY(${translateY}px)`;
            layer.style.opacity = opacity;
        });
    }

    updateGeometricShapes(scrollProgress) {
        this.geometricShapes.forEach(shape => {
            const speed = parseFloat(shape.dataset.speed) || 0;
            const opacityStops = shape.dataset.opacity ? shape.dataset.opacity.split(',').map(Number) : [0, 0.2, 0];
            
            const translateY = scrollProgress * speed;
            const opacity = this.interpolateOpacity(scrollProgress, opacityStops);
            
            const rotation = getComputedStyle(shape).getPropertyValue('--rotation') || '0deg';
            shape.style.transform = `translateY(${translateY}px) rotate(${rotation})`;
            shape.style.opacity = opacity;
        });
    }

    interpolateOpacity(progress, stops) {
        if (stops.length === 4) {
            // [0, 0.2, 0.8, 1] keyframes
            if (progress <= 0.2) {
                return this.lerp(stops[0], stops[1], progress / 0.2);
            } else if (progress <= 0.8) {
                return this.lerp(stops[1], stops[2], (progress - 0.2) / 0.6);
            } else {
                return this.lerp(stops[2], stops[3], (progress - 0.8) / 0.2);
            }
        } else if (stops.length === 3) {
            // [0, 0.3, 1] keyframes
            if (progress <= 0.3) {
                return this.lerp(stops[0], stops[1], progress / 0.3);
            } else {
                return this.lerp(stops[1], stops[2], (progress - 0.3) / 0.7);
            }
        }
        return stops[0] || 0.1;
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        const element = document.getElementById('flowing-background');
        if (element) element.remove();
        this.isInitialized = false;
    }
}

// 全ページで使用できるようにグローバル関数として定義
window.FlowingBackgroundUtils = {
    instance: null,
    
    init() {
        if (!this.instance) {
            this.instance = new FlowingBackground();
        }
        return this.instance;
    },
    
    destroy() {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
    },
    
    reinit() {
        this.destroy();
        return this.init();
    }
};

// DOMContentLoadedで自動初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.FlowingBackgroundUtils.init();
    });
} else {
    window.FlowingBackgroundUtils.init();
}