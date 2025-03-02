document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const zoomOverlay = document.querySelector('.zoom-overlay');
    
    let currentIndex = 0;
    let autoSlideInterval;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.className = 'slide';
            if (index === currentIndex) {
                slide.classList.add('active');
                // Update overlay content based on active slide
                if (index === 0) {
                    zoomOverlay.classList.add('active');
                    zoomOverlay.classList.remove('live-variant', 'slot-variant');
                    zoomOverlay.querySelector('.zoom-image').src = window.innerWidth <= 768 ? 'sport_elems_mob.png' : 'sport_elems.png';
                } else if (index === 1) {
                    zoomOverlay.classList.add('active', 'live-variant');
                    zoomOverlay.classList.remove('slot-variant');
                    zoomOverlay.querySelector('.zoom-image').src = window.innerWidth <= 768 ? 'live_elems_mob.png' : 'live_elems.png';
                } else if (index === 2) {
                    zoomOverlay.classList.add('active', 'slot-variant');
                    zoomOverlay.classList.remove('live-variant');
                    zoomOverlay.querySelector('.zoom-image').src = window.innerWidth <= 768 ? 'slot_elems_mob.png' : 'slot_elems.png';
                } else {
                    zoomOverlay.classList.remove('active', 'live-variant', 'slot-variant');
                }
            } else if (index === getPrevIndex()) {
                slide.classList.add('prev');
            } else if (index === getNextIndex()) {
                slide.classList.add('next');
            }
        });

        // Handle mobile images for overlay with same animation classes
        if (window.innerWidth <= 768) {
            const activeSlide = currentIndex;
            if (activeSlide === 0) {
                zoomOverlay.querySelector('.zoom-image').src = 'sport_elems_mob.png';
            } else if (activeSlide === 1) {
                zoomOverlay.querySelector('.zoom-image').src = 'live_elems_mob.png';
            } else if (activeSlide === 2) {
                zoomOverlay.querySelector('.zoom-image').src = 'slot_elems_mob.png';
            }
        }

        dots.forEach((dot, index) => {
            dot.className = index === currentIndex ? 'dot active' : 'dot';
        });
    }

    function getPrevIndex() {
        return (currentIndex - 1 + slides.length) % slides.length;
    }

    function getNextIndex() {
        return (currentIndex + 1) % slides.length;
    }

    function nextSlide() {
        currentIndex = getNextIndex();
        updateSlides();
    }

    function prevSlide() {
        currentIndex = getPrevIndex();
        updateSlides();
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlides();
            startAutoSlide();
        });
    });

    // Initial setup
    updateSlides();
    startAutoSlide();

    // Handle mouse interactions
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Simplified zoom overlay functionality
    const zoomImage = document.querySelector('.zoom-image');

    // Modal functionality
    const policyLinks = document.querySelectorAll('.policy-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Update modal functionality to only handle responsible gaming
    policyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const modalType = link.getAttribute('data-modal');
            // Only prevent default and show modal for responsible gaming
            if (modalType === 'responsible') {
                e.preventDefault();
                document.getElementById('responsibleModal').classList.add('active');
            }
        });
    });

    function closeModal() {
        modals.forEach(modal => modal.classList.remove('active'));
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Add mobile image handling
    function handleMobileImages() {
        const isMobile = window.innerWidth <= 768;
        const slideImages = document.querySelectorAll('.slide img');
        const zoomImage = zoomOverlay.querySelector('.zoom-image');
        
        // Update carousel images
        slideImages.forEach(img => {
            const mobileSrc = img.getAttribute('data-mobile-src');
            const desktopSrc = img.getAttribute('data-desktop-src') || img.src;
            
            if (isMobile && mobileSrc) {
                img.src = mobileSrc;
            } else {
                img.src = desktopSrc;
            }
        });

        // Update overlay image based on current slide
        if (zoomOverlay.classList.contains('active')) {
            if (currentIndex === 0) {
                zoomImage.src = isMobile ? 'sport_elems_mob.png' : 'sport_elems.png';
            } else if (currentIndex === 1) {
                zoomImage.src = isMobile ? 'live_elems_mob.png' : 'live_elems.png';
            } else if (currentIndex === 2) {
                zoomImage.src = isMobile ? 'slot_elems_mob.png' : 'slot_elems.png';
            }
        }
    }

    // Initial check
    handleMobileImages();

    // Handle resize
    window.addEventListener('resize', handleMobileImages);

    // Add after DOM content loaded
    document.querySelectorAll('.auth-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('href');
            const overlay = document.querySelector('.redirect-overlay');
            
            overlay.classList.add('active');
            
            // Redirect after animation
            setTimeout(() => {
                window.location.href = href;
            }, 1500);
        });
    });

    // Add card click handlers
    document.querySelectorAll('.slide-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const overlay = document.querySelector('.redirect-overlay');
            const video = overlay.querySelector('.redirect-video');
            const spinner = overlay.querySelector('.redirect-spinner');
            
            // Set video source based on card type
            if (link.querySelector('img').src.includes('sport')) {
                video.querySelector('source').src = 'sport_transition.mov';
            } else if (link.querySelector('img').src.includes('live')) {
                video.querySelector('source').src = 'roulette_transition.mov';
            } else if (link.querySelector('img').src.includes('casino')) {
                video.querySelector('source').src = 'casino_transition.mov';
            }
            
            // Show overlay
            overlay.classList.add('active');
            spinner.style.display = 'none';
            video.classList.add('active');
            video.load();
            video.play();
            
            // Redirect after video ends or after 3 seconds if video fails
            const redirectTimeout = setTimeout(() => {
                window.location.href = href;
            }, 3000);

            video.addEventListener('ended', () => {
                window.location.href = href;
                clearTimeout(redirectTimeout);
            });
        });
    });

    // Update card click handlers with specific video files
    document.querySelectorAll('.slide-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const overlay = document.querySelector('.redirect-overlay');
            const video = overlay.querySelector('.redirect-video');
            const spinner = overlay.querySelector('.redirect-spinner');
            
            // Set video source based on card type
            if (link.querySelector('img').src.includes('sport')) {
                video.querySelector('source').src = 'sport_transition.mov';
            } else if (link.querySelector('img').src.includes('live')) {
                video.querySelector('source').src = 'roulette_transition.mov';
            } else if (link.querySelector('img').src.includes('casino')) {
                video.querySelector('source').src = 'casino_transition.mov';
            }
            
            // Show overlay and play video
            overlay.classList.add('active');
            spinner.style.display = 'none';
            video.classList.add('active');
            video.load(); // Required to load new source
            video.play();
            
            // Redirect after video ends or after 3 seconds if video fails
            const redirectTimeout = setTimeout(() => {
                window.location.href = href;
            }, 3000);

            video.addEventListener('ended', () => {
                window.location.href = href;
                clearTimeout(redirectTimeout);
            });
        });
    });

    // Update card click handlers
    document.querySelectorAll('.slide-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const overlay = document.querySelector('.redirect-overlay');
            const video = overlay.querySelector('.redirect-video');
            const spinner = overlay.querySelector('.redirect-spinner');
            
            // Set video source based on card type
            if (link.querySelector('img').src.includes('sport')) {
                video.querySelector('source').src = 'sport_transition.webm';
            } else if (link.querySelector('img').src.includes('live')) {
                video.querySelector('source').src = 'roulette_transition.webm';
            } else if (link.querySelector('img').src.includes('casino')) {
                video.querySelector('source').src = 'casino_transition.webm';
            }
            
            // Show overlay first
            overlay.classList.add('active');
            spinner.classList.remove('hidden');
            video.classList.remove('active');
            
            // Load and play video
            video.load();
            
            // When video is ready to play
            video.addEventListener('canplay', function() {
                spinner.classList.add('hidden');
                video.classList.add('active');
                video.play();
            }, { once: true });
            
            // Handle video end or error
            const redirectTimeout = setTimeout(() => {
                window.location.href = href;
            }, 3000);

            video.addEventListener('ended', () => {
                window.location.href = href;
                clearTimeout(redirectTimeout);
            });

            // Handle video error
            video.addEventListener('error', () => {
                window.location.href = href;
                clearTimeout(redirectTimeout);
            });
        });
    });

    // Update card click handlers
    document.querySelectorAll('.slide-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const overlay = document.querySelector('.redirect-overlay');
            const video = overlay.querySelector('.redirect-video');
            const spinner = document.querySelector('.redirect-spinner');
            
            // Set video source and show overlay
            if (link.querySelector('img').src.includes('sport')) {
                video.innerHTML = '<source src="sport_transition.webm" type="video/webm">';
            } else if (link.querySelector('img').src.includes('live')) {
                video.innerHTML = '<source src="roulette_transition.webm" type="video/webm">';
            } else if (link.querySelector('img').src.includes('casino')) {
                video.innerHTML = '<source src="casino_transition.webm" type="video/webm">';
            }
            
            // Show overlay
            overlay.classList.add('active');
            video.load();
            
            video.addEventListener('loadeddata', () => {
                video.classList.add('active');
                video.play();
                if (spinner) spinner.style.display = 'none';
            }, { once: true });
            
            // Handle redirect
            video.addEventListener('ended', () => {
                window.location.href = href;
            }, { once: true });
            
            // Fallback redirect
            setTimeout(() => {
                window.location.href = href;
            }, 3000);
        });
    });

    // Sadeleştirilmiş kart tıklama işleyicisi
    document.querySelectorAll('.slide-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const overlay = document.querySelector('.redirect-overlay');
            const video = document.createElement('video');
            
            video.className = 'redirect-video';
            video.muted = true;
            video.playsInline = true;
            
            // Kart tipine göre video kaynağını belirle
            let videoSource;
            if (link.querySelector('img').src.includes('sport')) {
                videoSource = 'sport_transition.webm';
            } else if (link.querySelector('img').src.includes('live')) {
                videoSource = 'roulette_transition.webm';
            } else if (link.querySelector('img').src.includes('casino')) {
                videoSource = 'casino_transition.webm';
            }

            // Video kaynağını ayarla
            video.innerHTML = `<source src="${videoSource}" type="video/webm">`;
            
            // Eski videoyu kaldır ve yenisini ekle
            const oldVideo = overlay.querySelector('.redirect-video');
            if (oldVideo) oldVideo.remove();
            overlay.insertBefore(video, overlay.firstChild);
            
            // Overlay'i göster
            overlay.classList.add('active');
            
            // Video hazır olduğunda oynat
            video.addEventListener('loadeddata', () => {
                video.play();
            }, { once: true });
            
            // Video bittiğinde yönlendir
            video.addEventListener('ended', () => {
                window.location.href = href;
            }, { once: true });
            
            // Hata veya 3 saniye sonra yönlendir
            setTimeout(() => {
                if (!video.ended) window.location.href = href;
            }, 3000);
        });
    });

    // Update auth button handlers
    document.querySelectorAll('.auth-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('href');
            const overlay = document.querySelector('.redirect-overlay');
            const video = overlay.querySelector('.redirect-video');
            const spinner = overlay.querySelector('.redirect-spinner');
            
            // Set video source based on device type
            const isMobile = window.innerWidth <= 768;
            video.querySelector('source').src = isMobile ? 'mobile_login_transition.webm' : 'desktop_login_transition.webm';
            
            // Show overlay first
            overlay.classList.add('active');
            spinner.classList.remove('hidden');
            video.classList.remove('active');
            
            // Load and play video
            video.load();
            
            // When video is ready to play
            video.addEventListener('canplay', function() {
                spinner.classList.add('hidden');
                video.classList.add('active');
                video.play();
            }, { once: true });
            
            // Handle video end or error
            const redirectTimeout = setTimeout(() => {
                window.location.href = href;
            }, 3000);

            video.addEventListener('ended', () => {
                window.location.href = href;
                clearTimeout(redirectTimeout);
            });

            // Handle video error
            video.addEventListener('error', () => {
                window.location.href = href;
                clearTimeout(redirectTimeout);
            });
        });
    });
});
