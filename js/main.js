// Portfolio Website - Vanilla JavaScript Implementation
// 元のReact/TypeScript機能をそのまま再現

class PortfolioApp {
  constructor() {
    // State管理 - 必要最小限
    this.activeSection = 'home';
    this.scrollProgress = 0;
    
    // ドラッグスクロール用状態
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    
    // キャリア画像ホバー状態
    this.hoveredCareerIndex = null;
    
    // 要素の参照
    this.progressBar = document.getElementById('progress-bar');
    this.loadingScreen = document.getElementById('loading-screen');
    this.backToTopBtn = document.getElementById('back-to-top');
    this.activitiesScroll = document.getElementById('activities-scroll');
    
    // 初期化
    this.init();
  }

  init() {
    // ローディング画面を確実に非表示にする
    this.ensureLoadingHidden();
    
    this.setupEventListeners();
    this.setupNavigation();
    this.setupScrollAnimations();
    this.setupCareerHover();
    this.setupProjectNavigation();
    this.setupActivityNavigation();
    this.setupDragScroll();
    this.setupActivitySlideButtons();
    
    // DOM読み込み後のアニメーション開始
    setTimeout(() => {
      this.startInitialAnimations();
    }, 100);
  }

  // ローディング画面を確実に非表示にする
  ensureLoadingHidden() {
    if (this.loadingScreen) {
      this.loadingScreen.style.display = 'none';
    }
    
    // メインコンテンツを表示
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.opacity = '1';
    }
  }

  // イベントリスナーの設定
  setupEventListeners() {
    // スクロールイベント
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // リサイズイベント
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Back to topボタン（要素が存在する場合のみ）
    if (this.backToTopBtn) {
      this.backToTopBtn.addEventListener('click', this.scrollToTop.bind(this));
    }
  }

  // ナビゲーション設定
  setupNavigation() {
    // ヘッダーナビゲーション
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const section = e.target.dataset.section;
        this.scrollToSection(section);
      });
    });
    
    // 縦ナビゲーション
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const section = e.target.dataset.section;
        this.scrollToSection(section);
      });
    });
  }

  // スクロールアニメーション設定
  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animated-element');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // 要素の種類に応じてアニメーションクラスを追加
          const rect = entry.boundingClientRect;
          const elementCenter = rect.left + rect.width / 2;
          const screenCenter = window.innerWidth / 2;
          
          if (elementCenter < screenCenter) {
            entry.target.classList.add('animate-left');
          } else {
            entry.target.classList.add('animate-right');
          }
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Scroll arrows animation
    const scrollArrows = document.querySelectorAll('.scroll-arrow');
    const scrollArrowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);
    
    scrollArrows.forEach(el => scrollArrowObserver.observe(el));
    
    // Connecting line animations
    const connectingLines = document.querySelectorAll('.connecting-line');
    const connectingLineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 少し遅延をつけて自然な感じにする
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, 200);
        }
      });
    }, {
      threshold: 0.5, // connecting-lineが50%見えた時点でアニメーション開始
      rootMargin: '0px 0px -100px 0px'
    });
    
    connectingLines.forEach(el => connectingLineObserver.observe(el));
  }

  // キャリアセクションのホバー効果
  setupCareerHover() {
    const careerItems = document.querySelectorAll('.career-item');
    const careerImages = document.querySelectorAll('.career-img.hover-img');
    const defaultImg = document.querySelector('.career-img.default-img');
    const careerOverlay = document.querySelector('.career-overlay');
    const careerTitleOverlay = document.querySelector('.career-title-overlay h4');
    
    const careerTitles = [
      '実車試験期間の短縮化、新規製品設計',
      'サーモカメラによる外観故障検知技術開発',
      '3次元計測含む摩耗測定・\nデータ管理アプリ開発',
      '画像処理による外観検知技術・\nデータ管理アプリ開発'
    ];
    
    careerItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        this.hoveredCareerIndex = index;
        
        // 全ての画像を非表示
        careerImages.forEach(img => img.style.opacity = '0');
        defaultImg.style.opacity = '0';
        
        // 対応する画像を表示
        const targetImg = careerImages[index];
        if (targetImg) {
          targetImg.style.opacity = '1';
        }
        
        // オーバーレイとタイトルを表示
        careerOverlay.style.opacity = '1';
        document.querySelector('.career-title-overlay').style.opacity = '1';
        document.querySelector('.career-title-overlay').style.transform = 'translateY(0)';
        careerTitleOverlay.textContent = careerTitles[index];
      });
      
      item.addEventListener('mouseleave', () => {
        this.hoveredCareerIndex = null;
        
        // デフォルト画像を表示
        careerImages.forEach(img => img.style.opacity = '0');
        defaultImg.style.opacity = '1';
        
        // オーバーレイを非表示
        careerOverlay.style.opacity = '0';
        document.querySelector('.career-title-overlay').style.opacity = '0';
        document.querySelector('.career-title-overlay').style.transform = 'translateY(20px)';
      });
    });
  }

  // プロジェクトナビゲーション設定
  setupProjectNavigation() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const projectType = e.currentTarget.dataset.project;
        this.navigateToProjectPage(projectType);
      });
    });
  }

  // アクティビティナビゲーション設定
  setupActivityNavigation() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
      const activityType = item.dataset.activity;
      if (activityType) {
        item.addEventListener('click', () => {
          this.navigateToActivityPage(activityType);
        });
      }
    });
  }

  // シンプルなプロジェクトページ遷移
  navigateToProjectPage(projectType) {
    let targetPage = '';
    switch(projectType) {
      case 'thermal-project':
        targetPage = 'html/thermal-project.html';
        break;
      case 'mobile-project':
        targetPage = 'html/mobile-project.html';
        break;
      case 'detection-project':
        targetPage = 'html/detection-project.html';
        break;
    }
    
    if (targetPage) {
      window.location.href = targetPage;
    }
  }

  // シンプルなアクティビティページ遷移
  navigateToActivityPage(activityType) {
    if (activityType === 'alive-activity') {
      // alive-activity.htmlに遷移
      window.location.href = 'html/alive-activity.html';
    } else if (activityType === 'design-activity') {
      // design-activity.htmlに遷移
      window.location.href = 'html/design-activity.html';
    } else {
      // 他のアクティビティページは準備中
      alert(`アクティビティの詳細ページは準備中です。`);
    }
  }

  // ドラッグスクロール設定
  setupDragScroll() {
    if (!this.activitiesScroll) return;
    
    this.activitiesScroll.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.activitiesScroll.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    this.activitiesScroll.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.activitiesScroll.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  handleMouseDown(e) {
    this.isDragging = true;
    this.startX = e.pageX - this.activitiesScroll.offsetLeft;
    this.scrollLeft = this.activitiesScroll.scrollLeft;
    this.activitiesScroll.style.cursor = 'grabbing';
  }

  handleMouseLeave() {
    this.isDragging = false;
    this.activitiesScroll.style.cursor = 'grab';
  }

  handleMouseUp() {
    this.isDragging = false;
    this.activitiesScroll.style.cursor = 'grab';
  }

  handleMouseMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    const x = e.pageX - this.activitiesScroll.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.activitiesScroll.scrollLeft = this.scrollLeft - walk;
  }

  // アクティビティスライドボタン設定
  setupActivitySlideButtons() {
    const prevButton = document.getElementById('activity-prev');
    const nextButton = document.getElementById('activity-next');
    
    if (!prevButton || !nextButton || !this.activitiesScroll) return;
    
    // ボタンクリックイベント
    prevButton.addEventListener('click', () => {
      this.slideActivities('prev');
    });
    
    nextButton.addEventListener('click', () => {
      this.slideActivities('next');
    });
    
    // スクロールイベントでボタンの状態を更新
    this.activitiesScroll.addEventListener('scroll', () => {
      this.updateSlideButtonStates();
    });
    
    // 初期状態を設定
    setTimeout(() => {
      this.updateSlideButtonStates();
    }, 100);
  }

  // アクティビティをスライドさせる
  slideActivities(direction) {
    if (!this.activitiesScroll) return;
    
    const activityItems = this.activitiesScroll.querySelectorAll('.activity-item');
    if (activityItems.length === 0) return;
    
    const containerWidth = this.activitiesScroll.clientWidth;
    const currentScroll = this.activitiesScroll.scrollLeft;
    const scrollPadding = 32; // activities-scrollのpadding-left
    
    let targetScroll;
    
    if (direction === 'prev') {
      // 現在表示されているアイテムの中で最も左にあるアイテムを特定
      let currentFirstVisibleIndex = -1;
      
      for (let i = 0; i < activityItems.length; i++) {
        const item = activityItems[i];
        const itemLeft = item.offsetLeft;
        
        if (itemLeft >= currentScroll + scrollPadding - 10) { // 10px余裕を持たせる
          currentFirstVisibleIndex = i;
          break;
        }
      }
      
      // 前のアイテムの左端を表示
      const prevIndex = Math.max(0, currentFirstVisibleIndex - 1);
      const prevItem = activityItems[prevIndex];
      targetScroll = Math.max(0, prevItem.offsetLeft - scrollPadding);
      
    } else {
      // 現在表示されているアイテムの中で最も右にあるアイテムを特定
      let currentLastVisibleIndex = -1;
      
      for (let i = activityItems.length - 1; i >= 0; i--) {
        const item = activityItems[i];
        const itemRight = item.offsetLeft + item.offsetWidth;
        
        if (itemRight <= currentScroll + containerWidth + 10) { // 10px余裕を持たせる
          currentLastVisibleIndex = i;
          break;
        }
      }
      
      // 次のアイテムの左端を表示
      const nextIndex = Math.min(activityItems.length - 1, currentLastVisibleIndex + 1);
      const nextItem = activityItems[nextIndex];
      const maxScroll = this.activitiesScroll.scrollWidth - containerWidth;
      targetScroll = Math.min(maxScroll, nextItem.offsetLeft - scrollPadding);
    }
    
    if (targetScroll !== undefined) {
      this.activitiesScroll.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  // スライドボタンの状態を更新
  updateSlideButtonStates() {
    const prevButton = document.getElementById('activity-prev');
    const nextButton = document.getElementById('activity-next');
    
    if (!prevButton || !nextButton || !this.activitiesScroll) return;
    
    const currentScroll = this.activitiesScroll.scrollLeft;
    const maxScroll = this.activitiesScroll.scrollWidth - this.activitiesScroll.clientWidth;
    
    // 前へボタンの状態
    if (currentScroll <= 0) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }
    
    // 次へボタンの状態
    if (currentScroll >= maxScroll - 1) { // 1px余裕を持たせる
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
  }

  // スクロールイベントハンドラー
  handleScroll() {
    this.updateScrollProgress();
    this.updateActiveSection();
    this.updateBackToTopButton();
  }

  // スクロール進行状況更新
  updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    this.scrollProgress = Math.min(progress, 100);
    this.progressBar.style.width = `${this.scrollProgress}%`;
  }

  // アクティブセクション更新
  updateActiveSection() {
    const sections = ['home', 'about', 'personality', 'career', 'project', 'strength', 'activities', 'vision', 'contact'];
    const scrollPosition = window.pageYOffset + 100;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollBottom = window.pageYOffset + windowHeight;
    const isNearBottom = documentHeight - scrollBottom < 200;

    if (isNearBottom) {
      this.setActiveSection('contact');
      return;
    }

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        
        if (section === 'contact') {
          if (scrollPosition >= offsetTop) {
            this.setActiveSection(section);
            break;
          }
        } else {
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            this.setActiveSection(section);
            break;
          }
        }
      }
    }
  }

  // アクティブセクション設定
  setActiveSection(section) {
    if (this.activeSection === section) return;
    
    this.activeSection = section;
    
    // ナビゲーションアイテム更新
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.section === section);
    });
    
    document.querySelectorAll('.nav-dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.section === section);
    });
  }

  // Back to Topボタン更新
  updateBackToTopButton() {
    const isHome = this.activeSection === 'home';
    this.backToTopBtn.classList.toggle('visible', !isHome);
  }

  // セクションにスクロール
  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  // トップにスクロール
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  // リサイズハンドラー
  handleResize() {
    // レスポンシブ対応のための処理
    this.updateScrollProgress();
  }

  // 初期アニメーション開始
  startInitialAnimations() {
    // ヘッダーアニメーション
    const header = document.querySelector('.header');
    header.style.animation = 'slideDown 0.6s ease-out';
    
    // ホームセクションアニメーション
    const homeBg = document.querySelector('.home-bg-image');
    const homeText = document.querySelector('.home-text-content');
    const homeTitle = document.querySelector('.home-title');
    const geometricLines = document.querySelectorAll('.geometric-line');
    
    // アニメーション順序実行
    setTimeout(() => {
      if (homeBg) homeBg.style.animation = 'slideInRight 1.2s ease-out';
    }, 0);
    
    setTimeout(() => {
      if (homeText) homeText.style.animation = 'slideInLeft 1s ease-out';
    }, 300);
    
    setTimeout(() => {
      if (homeTitle) homeTitle.style.animation = 'fadeInUp 0.8s ease-out';
    }, 600);
    
    setTimeout(() => {
      geometricLines.forEach((line, index) => {
        if (line.classList.contains('horizontal')) {
          line.style.animation = 'drawLine 1s ease-out forwards';
        } else {
          line.style.animation = 'drawLineVertical 0.8s ease-out forwards';
        }
      });
    }, 1200);
  }
}

// フローティングアイコンのアニメーション管理
class FloatingIconsManager {
  constructor() {
    this.icons = document.querySelectorAll('.icon-container');
    this.init();
  }

  init() {
    this.startFloatingAnimations();
  }

  startFloatingAnimations() {
    this.icons.forEach((icon, index) => {
      // 各アイコンに固有のアニメーションを設定
      const animationDelay = index * 0.3;
      const animationDuration = 3 + (index * 0.5);
      
      icon.style.animationDelay = `${animationDelay}s`;
      icon.style.animationDuration = `${animationDuration}s`;
      
      // 可視化されたときにアニメーション開始
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '0.2';
            entry.target.style.animation = `float${index + 1} ${animationDuration}s ease-in-out infinite ${animationDelay}s`;
          }
        });
      });
      
      observer.observe(icon);
    });
  }
}

// SVGパス描画アニメーション
class SVGAnimationManager {
  constructor() {
    this.svgPaths = document.querySelectorAll('svg path');
    this.init();
  }

  init() {
    this.setupPathAnimations();
  }

  setupPathAnimations() {
    this.svgPaths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'stroke-dashoffset 2s ease-in-out';
            entry.target.style.strokeDashoffset = '0';
          }
        });
      });
      
      observer.observe(path);
    });
  }
}

// パフォーマンス最適化
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    // Intersection Observerを使用したレイジーローディング
    this.setupLazyLoading();
    
    // スクロールイベントのスロットリング
    this.setupScrollThrottling();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  setupScrollThrottling() {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // スクロール処理
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
  }
}

// アクセシビリティ管理
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIALabels();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Tab navigation enhancement
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
      
      // Escape key handling
      if (e.key === 'Escape') {
        // Close any open modals or dropdowns
      }
    });
    
    document.addEventListener('click', () => {
      document.body.classList.remove('using-keyboard');
    });
  }

  setupFocusManagement() {
    // Focus trap for modal elements
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Implement focus trapping when needed
  }

  setupARIALabels() {
    // Dynamic ARIA label updates
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        item.setAttribute('aria-current', 'page');
        navItems.forEach(other => {
          if (other !== item) {
            other.removeAttribute('aria-current');
          }
        });
      });
    });
  }
}

// DOM読み込み完了後にアプリケーション開始
document.addEventListener('DOMContentLoaded', () => {
  try {
    // メインアプリケーション初期化
    const app = new PortfolioApp();
    
    // 補助機能初期化
    const floatingIcons = new FloatingIconsManager();
    const svgAnimations = new SVGAnimationManager();
    const performance = new PerformanceManager();
    const accessibility = new AccessibilityManager();
    
    // デバッグ用のグローバル参照
    window.portfolioApp = app;
    
    console.log('Portfolio Website initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize portfolio:', error);
    
    // エラー時でもローディング画面を確実に非表示にする
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.opacity = '1';
    }
  }
});