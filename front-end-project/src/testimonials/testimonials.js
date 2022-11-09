// Selectors

const testimonialsWrapper = document.querySelector(".testimonials-wrapper");



// vars 

let swiperSlidesTestimonials = [];
let testimonialsItem = [];

// Func for creating HTML DOM Elements

let createTestimonialsElements = (initObj) => {
    var element = document.createElement(initObj.Tag);
    for (var prop in initObj) {
        if (prop === "childNodes") {
            initObj.childNodes.forEach(function (node) { node.appendChild(element); });
        }
        else if (prop === "attributes") {
            initObj.attributes.forEach(function (attr) { element.setAttribute(attr.key, attr.value) });
        }
        else element[prop] = initObj[prop];
    }
    return element;
};


// Search Box CreateElements

let testimonialsContainer = createTestimonialsElements({Tag: "div", classList: "testimonials-container", childNodes: [testimonialsWrapper]});
let sectionTitle = createTestimonialsElements({ Tag: "div", classList: "section-title", childNodes: [testimonialsContainer]});
let testimonialsH2 = createTestimonialsElements({ Tag: "h2", childNodes: [sectionTitle]}).innerHTML = "Testimonials";
let sectionSeparator = createTestimonialsElements({ Tag: "span", classList: "section-separator", childNodes: [sectionTitle]});
let testimonialsParagraph = createTestimonialsElements({ Tag: "p", childNodes: [sectionTitle]});
let testimonialsCarouselWrap = createTestimonialsElements({ Tag: "div", classList: "testimonials-carousel-wrap", childNodes: [testimonialsWrapper]});
let listeningCarouselNext = createTestimonialsElements({ Tag: "div", classList: "listing-carousel-button listing-carousel-button-next", childNodes: [testimonialsCarouselWrap]});
let listeningCarouselPrev = createTestimonialsElements({ Tag: "div", classList: "listing-carousel-button listing-carousel-button-prev", childNodes: [testimonialsCarouselWrap]});
let testimonialsCarousel = createTestimonialsElements({ Tag: "div", classList: "testimonials-carousel", childNodes: [testimonialsCarouselWrap]});
let iNext = createTestimonialsElements({ Tag: "i", classList: "next", childNodes : [listeningCarouselNext]}).innerHTML = `
<span class="material-symbols-outlined">
arrow_forward_ios
</span>`;
let iPrev = createTestimonialsElements({ Tag: "i", classList: "prev", childNodes : [listeningCarouselPrev]}).innerHTML = `
<span class="material-symbols-outlined">
arrow_back_ios
</span>`;
let swiperContainer = createTestimonialsElements({ Tag: "div", classList: "swiper-container polygon", childNodes: [testimonialsCarousel]});
let swiperWrapperTestimonials = createTestimonialsElements({ Tag: "div", classList: "swiper-wrapper", childNodes: [swiperContainer]});

for(let i = 0; i < 4; i++) {
    swiperSlidesTestimonials.push(createTestimonialsElements({ Tag: "div", classList: "swiper-slide swiper-slide-testimonials", childNodes: [swiperWrapperTestimonials]}));
}

for(let i = 0; i < swiperSlidesTestimonials.length; i ++) {
    testimonialsItem.push(createTestimonialsElements({ Tag: "div", classList: "testi-item", childNodes: [swiperSlidesTestimonials[i]] }));
} 

for(let i =0; i < testimonialsItem.length; i ++) {
    testimonialsItem[0].innerHTML = `
    <div class="testi-avatar"><img src="media/testimonials/7.jpg"></div>
    <div class="testimonials-text-before"></i></div>
    <div class="testimonials-text">
        <div class="listing-rating">
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
        </div>
        <p>As someone who really does a bad job making to do lists, this app really makes making them a breeze. Traditionally I don't make lists, or planners, etc because of the overhead in doing so; I'd rather spend that time doing the things I know I need to do. For a while now I've tried to find an app that would change that, that would make planning a breeze. After trying SEVERAL productivity apps, this one quickly rose to the top. The interface is clean and simple and adding tasks takes no time at all.</p>
        <div class="testimonials-avatar">
            <h3>Darko Dejanoski</h3>
            <h4>Senior Back-end developer</h4>
        </div>
    </div>
    <div class="testimonials-text-after"></i></div> 
    </div>`

    testimonialsItem[1].innerHTML = `
    <div class="testi-avatar"><img src="media/testimonials/4.jpg"></div>
    <div class="testimonials-text-before"></i></div>
    <div class="testimonials-text">
        <div class="listing-rating">
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
        </div>
        <p>The productivity app keeps priorities in front of you, allows you to continually add, prioritize, delegate, move, and adjust tasks, thoughts, reminders, events, etc. in whatever way makes sense to you. It's motivating to check tasks off as you go through the day. It can be as precise or as relaxed as you set it to be. It works best for me by giving me a place to capture and instantly prioritize and plan things as they pop up. I love that it keeps me accountable and motivated without forcing a rigid schedule.</p>
        <div class="testimonials-avatar">
            <h3>Darko Nikolikj</h3>
            <h4>Back-end developer</h4>
        </div>
    </div>
    <div class="testimonials-text-after"></i></div> 
    </div>`

    testimonialsItem[2].innerHTML = `
    <div class="testi-avatar"><img src="media/testimonials/6.jpg"></div>
    <div class="testimonials-text-before"></i></div>
    <div class="testimonials-text">
        <div class="listing-rating">
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
        </div>
        <p>Fantastic app for planning your day and future tasks. A very useful project management app. I love it!</p>
        <div class="testimonials-avatar">
            <h3>Todor Pelivanov</h3>
            <h4>Tennis Player</h4>
        </div>
    </div>
    <div class="testimonials-text-after"></i></div> 
    </div>`

    testimonialsItem[3].innerHTML = `
    <div class="testi-avatar"><img src="media/testimonials/5.jpg"></div>
    <div class="testimonials-text-before"></i></div>
    <div class="testimonials-text">
        <div class="listing-rating">
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
            <i>&#x1F7CA;</i>
        </div>
        <p>A great app for keeping things straight! This is the only app I've ever paid for the premium, and it's worth it. It's great even without premium, but it makes remembering daily repetitive tasks much easier. I have trouble remembering things like that, or knowing if I've already done it.</p>
        <div class="testimonials-avatar">
            <h3>Gregori Bavaro</h3>
            <h4>Front-end developer, UX/UI designer</h4>
        </div>
    </div>
    <div class="testimonials-text-after"></i></div> 
    </div>`

   

    
    
    
    
}

// Swiper

function testimonialsFunc() {
    "use strict";
   
    if ($(".testimonials-carousel").length > 0) {
        var j2 = new Swiper(".testimonials-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
            pagination: {
                el: '.tc-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.listing-carousel-button-next',
                prevEl: '.listing-carousel-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                
            }
        });
    }
}

//   Init All ------------------
$(document).ready(function () {
    testimonialsFunc();
});