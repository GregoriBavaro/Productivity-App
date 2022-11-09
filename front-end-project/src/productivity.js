// Selectors
const container = document.querySelector(".productivity-container");

// Custom CreateElement Function

let createElement= (initObj)=> {
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



container.innerHTML = `
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
`

let searchBoxWrap = createElement({Tag: "div", classList: "wrap", childNodes: [container]});
let inputTextFieldDiv = createElement({Tag: "div", classList: "search", childNodes: [searchBoxWrap]});
let inputTextField = createElement({Tag: "input", classList: "searchTerm", attributes: [{key: "type", value: "text"}], placeholder: "Search articles", attributes: [{key: "type", value: "text"}], childNodes: [inputTextFieldDiv]});
let submitButton = createElement({Tag: "button", classList: "searchButton", attributes: [{key: "type", value: "submit"}], innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>`, childNodes: [inputTextFieldDiv]});



// Swiper CreateElements

let swiperForArticles = createElement({Tag: "div", classList: "swiper-popular-articles gallery-articles", childNodes: [container]});
let swiperWrapperProductivity = createElement({Tag: "div", classList: "swiper-wrapper fsm-container justify-swiper", childNodes: [swiperForArticles]});
swiperWrapperProductivity.setAttribute("id", "fms-container")
let swiperSlideProductivity =[];
let pngWrapper =[];
let textHeadline =[];



// Loop for CreateElements swiper-slides

for(let i = 0; i < 12; i++) {
    swiperSlideProductivity.push(createElement({Tag: "div", classList: "swiper-slide swiper-slides-productivity scrollToArticles", childNodes: [swiperWrapperProductivity]}));
};

for(let i = 0; i < swiperSlideProductivity.length; i++) {
    swiperSlideProductivity[0].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (13).png  ">
        <h2>Maintaining healthy habits-in five simple steps</h2>
        <p class="modal-content">
        Many people have excessive levels of stress in their lives and it often affects their health, happiness, and other areas of their lives. (In fact, it’s been estimated that more than 90% of ​health problems that bring people into the doctor’s office are stress-related!) But while virtually all of us could benefit from adding healthy habits to our lifestyle, it’s harder to begin a new habit than it seems, especially when you’re already overscheduled and overstressed! The following steps can help you navigate a clear path from your good intentions to the reality of a healthier, happier lifestyle that includes less stress. Ready? Here we go!
        </br>
        </br>
        Step One: Choose Your Activity Wisely:
        </br>
        The first step in creating a healthy new habit that will be a long-term staple in your lifestyle is to choose an activity that fits well with who you are and how you live. If you don’t, you may find that you’re working against personality and lifestyle factors that are too ingrained to change, and your new healthy habit never quite takes root.
        </br>
        </br>
        Step Two: Build The New Habit into Your Schedule
        </br>
        If you don’t have a specific plan for sticking with a new habit, it’s all too easy to find that your already-packed schedule won’t allow you the ‘spare time’ necessary to do anything new very often. You’ll be too busy, too tired, or will easily find another excuse to let inertia snuff out your best intentions. That’s why a crucial next step is for you to find a specific time in your schedule that’s allotted just for your new stress management activity. Whether it’s ‘every morning before my shower’, 'during my lunch break', or ‘weeknights at 8’, you need to have a time that you know is set aside for your chosen activity so that you won’t need to continually find a reason to practice your stress relief program.
        Many people find it easiest to do things in the morning before they start their day, or at night before bed. Others find snatches of time during the day.
        </br>
        </br>
        Step Three: Enlist Support
        </br>
        You’ll find much more success if you have others who are helping you along the way. Not only will they give you support when you need it, but you’ll also have them to answer to if you feel like skipping your new stress management practice, and this will make it harder for you to make excuses and quit. One way to get support that is growing in popularity is to hire a personal coach. However, you can also get support by having a buddy start with you, or joining a class where they practice your chosen activity (like a yoga class, for example, or a meditation class). If you’d rather do it alone, you can always ask a friend to keep you accountable for the first few weeks, or keep a journal where you record your activity and success every day or at the end of each week. Whatever route you choose, it helps to have someone to keep you accountable, at least in the beginning.
        </br>
        </br>
        Step Four: Use Goals and Rewards
        </br>
        Although the great feelings you get from stress management can be their own reward, in starting any new habit, it helps to also have some more tangible rewards. For example, think of how teachers use stars and other tokens to encourage good behavior, or how you can train pets to do just about anything with a few small treats; none of us is above the power of a few good rewards, either.
        The first month or so is especially important, as that’s the approximate time it takes for a new behavior to become a habit. The rewards you give yourself are a personal choice, and you probably know what would be the best incentive for your own success, but I recommend something small and enjoyable.
        For example, when I first started going to the gym, I would reward every five gym visits with a new piece of workout clothing—that way I’d feel like I ‘earned’ the new outfits, and I’d also get the payoff of looking better in the dressing room each time I found myself there.
        </br>
        </br>
        Step Five: Check In With Yourself to Be Sure You're On The Right Track
        </br>
        As you move toward developing healthier habits, pay special attention to how you feel as you incorporate them into your life. Does your new practice seem to fit with your lifestyle and personality? Is it easy to maintain your new habit, or do you think you may need to try something new?
        If you find that you haven’t kept up with your new plans as you’ve hoped, rather than beating yourself up over it, congratulate yourself for noticing that you need to change or modify your plans—this is very important as it’s the first step in building a new plan that will better serve you! And, if you’re trudging along with it, but have decided that you really may need to try something else instead, at least you know what doesn’t work for you as well, and now you can try something else that you may end up loving.
        All in all, it’s best to learn several new stress relievers and stress management techniques anyway, to have a few options available for reducing stress in your body and mind.
        </p>
	</div>`
    swiperSlideProductivity[1].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (2).png  ">
        <h2>3 Brain Exercises to Strengthen Your Mind</h2>
        
		<p class="modal-content">
        While you might know that you need to exercise your body, did you know that it might also be important to exercise your mind? You've probably heard the old adage "use it or lose it." Many researchers do believe that this maxim applies to your brain health.
        Brain training is all the rage these days, often touted as a way to sharpen your mind and even boost intelligence. While many cognitive scientists suggest that the claims surrounding brain training are both exaggerated and misleading, there is an abundance of research suggesting that certain types of activities can be beneficial for your brain's health.
        </br>
        </br>
        Take Care of Your Body to Take Care of Your Mind
        </br>
        If you want to take care of your mind, you need to start by taking care of your body. Studies from 2006 even suggest that exercise can make you smarter and protect your brain from shrinkage as it ages.Research on mice in 2013 has even revealed that exercise can increase neurogenesis, or the formation of new brain cells, in the brain's hippocampus.3
        One study published in 2013 looked at healthy behaviors in nearly 2,300 men over the course of thirty years. Researchers looked at the participants' behaviors and cognitive abilities starting in middle age tracked their progress throughout old age.
        These healthy behaviors included not smoking, maintaining a healthy BMI, regularly exercising, consuming lots of vegetables and fruits, and consuming a low to moderate amount of alcohol.4
        So if you want to build a better mind, start by working on your physical health first. Go for a walk, start incorporating more fresh fruits and vegetables into your diet, and try to give up any bad habits like excessive alcohol consumption or tobacco use. Some of these might be more difficult than others, but your brain will thank you for years to come.
        </br>
        </br>
        Draw a Map of Your Town From Memory
        </br>
        While you might feel like you can navigate the streets of your neighborhood with your eyes closed, try challenging your brain by actually drawing a map of your town or neighborhood from memory. No cheating! Try to include major streets, major side streets, and local landmarks.
        Once you are done, compare your memory map to a real map of the area. How did you do? Are you surprised by some of the things that you missed? If you found this activity too easy, try drawing a less familiar area from memory, such as a map of the entire United States or Europe, and try to label every state or country.
        Navigating your way to the supermarket or doctor's office might seem simple and almost automatic when you are behind the wheel of your car. However, forcing yourself to remember the layout of your neighborhood as well as draw and label it helps activate a variety of areas of your brain.
        </br>
        </br>
        Learn Something New
        </br>
        This brain exercise requires a bit of commitment, but it is also one that just might give you the most bang for your buck. Learning something new is one way to keep your brain on its toes and continually introduce new challenges.
        In one study, researchers assigned older adults to learn a variety of new skills ranging from digital photography to quilting. They then did memory tests and compared the experimental groups to control groups. Those in the control groups had engaged in activities that were fun but not mentally challenging such as watching movies and listening to the radio.
        They also discovered that these memory improvements were still present when tested again a year later.
        Some things you might want to try include learning a new language, learning to play a musical instrument or learning a new hobby. Not only will you be stretching your mind, but you will also be continually learning something new as you keep expanding your skills and becoming more accomplished.
        </p>
	</div>`
    swiperSlideProductivity[2].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (3).png  ">
    <h2>How to build a healthy habits</h2>
    
    <p class="modal-content">
    We know that making healthy choices can help us feel better and live longer. Maybe you’ve already tried to eat better, get more exercise or sleep, quit smoking, or reduce stress. It’s not easy. But research shows how you can boost your ability to create and sustain a healthy lifestyle.
    “It’s frustrating to experience setbacks when you’re trying to make healthy changes and reach a goal,” says NIH behavior change expert Dr. Susan Czajkowski. “The good news is that decades of research show that change is possible, and there are proven strategies you can use to set yourself up for success.”
    Lots of things you do impact your health and quality of life, now and in the future. You can reduce your risk for the most common, costly, and preventable health problems—such as heart disease, stroke, cancer, type 2 diabetes, and obesity—by making healthy choices.
    </br>
    </br>
    Know Your Habits
    </br>
    </br>
    Regular things you do—from brushing your teeth to having a few drinks every night—can become habits. Repetitive behaviors that make you feel good can affect your brain in ways that create habits that may be hard to change. Habits often become automatic—they happen without much thought.
    “The first step to changing your behavior is to create an awareness around what you do regularly,” explains Dr. Lisa Marsch, an expert in behavior change at Dartmouth College. “Look for patterns in your behavior and what triggers the unhealthy habits you want to change.”
    Maybe you eat too much while watching TV or join a friend on smoke breaks even when you don’t want a cigarette. “You can develop ways to disrupt those patterns and create new ones,” Marsch says. For instance, eat meals with the TV off or join friends for healthy activities, like walk breaks.
    </br>
    </br>
    Make a Plan
    </br>
    </br>
    Make a plan that includes small, reasonable goals and specific actions you’ll take to move toward them.
    “If you walk by the vending machine at work and buy junk food every afternoon, try walking a different way to eliminate that decision and bring healthy snacks from home,” Czajkowski says. “Whenever possible, make the healthy choice the easy choice.”
    Consider what you think you’ll need to be successful. How can you change things around you to support your goals? You might need to stock up on healthy foods, remove temptations, or find a special spot to relax.
    Get friends and loved ones involved. Research shows that people’s health behaviors tend to mirror those of their family and friends. Invite them to join you, support you, and help you stay on track.
    It’s also important to plan for obstacles. Think about what might derail your best efforts to live healthier. How can you still make healthy choices during unexpected situations, in stressful times, or when tempted by old habits?
    </br>
    </br>
    Stay on Track
    </br>
    </br>
    Doing positive things for yourself can feel exciting and rewarding. But there will also be times when you wonder if you can stick with it.
    “Identify negative thoughts and turn them into realistic, productive ones,” Marsch advises.
    Keeping a record can help. You can use a paper journal, computer program, or mobile app to note things like your diet, exercise, stress levels, or sleep patterns. A study of people who lost at least 30 pounds and kept the weight off for at least a year found that they often tracked their progress closely.
    “Even when you think you’re about to ‘fall off the wagon,’ hold on,” Czajkowski says. “Continue to track your behavior. Sometimes when you feel like you’re failing, you can learn the most.”
    Marsch and others are working on digital technologies, like mobile apps, that could support you in a moment of weakness. Her team is also using technology to learn more about how to measure and increase the ability to monitor and control our behavior.
    “The more you practice self-control, the better you become at it,” says Dr. Leonard Epstein, who studies behavior change and decision-making at the University at Buffalo. “You develop the capacity to act and react another way.”
    </br>
    </br>
    Think About the Future
    </br>
    </br>
    Epstein has found that some people have a harder time than others resisting their impulses. He calls this “delay discounting,” where you discount, or undervalue, the larger benefits of waiting in favor of smaller immediate rewards. This can lead to things like overeating, substance abuse, drinking or shopping too much, or risky sexual behavior.
    “You can learn to postpone immediate gratification through episodic future thinking, or vividly imagining future positive experiences or rewards,” he explains. “It’s a great way to strengthen your ability to make decisions that are better for you in the long run.”
    Epstein is now studying how to use this technique to help people who are at risk for type 2 diabetes prevent the disease.
    Focusing on how a change might heal your body and enhance your life can help. When you stop smoking, your risk of a heart attack drops within 24 hours. Reducing stress can lead to better relationships. Even small improvements in your nutrition and physical activity can reduce your health risks and lengthen your life.
    </br>
    </br>
    Be Patient
    </br>
    </br>
    Sometimes when you’re trying to adopt healthier habits, other health issues can get in the way.
    “When you’re really struggling with these behaviors, ask yourself if more is going on,” Czajkowski says. “For example, mental health conditions like depression and anxiety can be tied to unhealthy behaviors.”
    A health professional can work with you to address any underlying issues to make change feel easier and to help you be more successful.
    You’re never too out of shape, too overweight, or too old to make healthy changes. Try different strategies until you find what works best for you.
    “Things may not go as planned, and that’s okay,” Czajkowski says. “Change is a process. What’s most important is to keep moving forward.”
    </p>
    </div>`
    swiperSlideProductivity[3].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (4).png  ">
    <h2>10 Foods to Energize Your Afternoon</h2>
    
		<p class="modal-content">
        Fatigue happens to the best of us. Whether it’s after a restless night’s sleep, or a mid-afternoon slump, coffee, sugar and energy drinks can feel like the easy answer. Unfortunately, that quick fix is also the quick way to crash. The good news is there are plenty of healthy options to amplify your energy.
        Focus on foods with protein, fiber, complex carbohydrates and magnesium that will take longer to digest and therefore extend your energy. Mix and match energizing snacks – like Greek yogurt and berries, or grapefruit and cottage cheese – for a more powerful punch. Drinking lots of water can also help – even mild dehydration can leave you feeling weary.
        One eight-ounce cup of coffee in the morning is perfectly fine, but skip the refills and opt for one of these 10 picks for a more nutritious boost of energy.
        </br>
        </br>
        1. Nuts
        </br>
        </br>
        In addition to energy-extending protein and fiber, nuts are full of additional nutrients to refuel your electrolyte supply. A peanut butter sandwich for lunch or a handful of almonds at snack time can keep you going during a long afternoon.
        Tip: Choose walnuts for a boost of melatonin, the chemical your body releases at night to regulate your body clock.
        2. Fruit
        </br>
        </br>
        Soothe your sweet tooth while also boosting energy with the complex healthy carbs in fruit. Melons are a particularly great choice – their high water content keeps you hydrated, another boost to energy.
        </br>
        </br>
        3. Yogurt
        </br>
        </br>
        Complex carbs and protein is one of most nutritious pairings you can find. Found in Greek yogurt or Icelandic yogurt, they combine to slow digestion for more sustained energy.
        </br>
        </br>
        4. Dairy
        </br>
        </br>
        Healthy spreadable cheeses, cottage cheese or milk can be part of a healthy, energy-boosting snack. The protein and carbs found in dairy-products is a power combo for replenishing electrolytes and a study suggests that drinking milk at night boosts muscle recovery and growth too.
        </br>
        </br>
        5. Edamame
        </br>
        </br>
        Fiber, protein, complex carbs and healthy fat are all present for a slowly digested, energy-amplifying snack. To get the most nutrition from your snack, avoid table salt and sodium-packed sauces.
        </br>
        </br>
        6. Whole Grains
        </br>
        </br>
        Complex carbs, check. Magnesium, check. Quinoa is a trendy and powerful grain – the only type with a complete protein – and classic brown rice will never go out of style.
        </br>
        </br>
        7. Beans
        </br>
        </br>
        Slowly digested protein and fiber extends the energy boost of beans, while a healthy dose of magnesium relaxes the body so it can rest.
        </br>
        </br>
        8. Lentils
        </br>
        </br>
        The combination of protein, complex carbs and fiber means even a half-cup of cooked lentils is providing a big boost of healthy energy. And they cook in a fraction of time it takes to make beans!
        </br>
        </br>
        9. Eggs
        </br>
        </br>
        Great for a powerful start to the day, the protein, iron and zinc in eggs give you energy and helps to maintain blood sugar levels at the same time.
        </br>
        </br>
        10. Tea
        </br>
        </br>
        When caffeine is the only answer, opt for green or black tea for a healthy boost to keep you going. Added bonus? The energy boosting amino acid in green tea may also protect against tiresome illness like the cold or the flu.
        </p>
	</div>`
    swiperSlideProductivity[4].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (5).png  ">
    <h2>10 tips to help you gain healthy office habits</h2>
    
		<p class="modal-content">
        Keeping in mind the main reasons to lead a healthy life, also at work, requires some effort on our part, enhancing our well-being at work is not easy and is not always in our hands. However, here are ten suggestions that can be easily within your reach so you can lead a healthy life while working.
        </br>
        </br>
        1. Take care of your diet
        </br>
        </br>
        It is as much about taking care of the specific foods we eat as it is about the way we eat. The rush, laziness and the “bad” influences with food can drag us systematically to a diet that does not benefit us. Enjoy life, sweeten it up and spice it up as much as you like, but don’t fall into a dynamic of neglect with food. Find a way to eat a healthy diet most days. Of course, eat slowly and calmly, leave stress out of mealtime.
        </br>
        </br>
        2. Don’t stiffen up, exercise
        </br>
        </br>
        Endless days in front of the computer can cause our back, legs, and body as a whole to lose the tone and agility they need. Make sure your posture is correct while working and get up from time to time. Walk, take a stroll whenever possible to make up for long periods of sitting down. 
        </br>
        </br>
        3. Watch out for time
        </br>
        </br> 
        Don’t get to the office in a rush or stay later than expected, unless it’s to resolve an issue that can’t wait. Make the most of the hours you have and distribute your tasks throughout the day as efficiently as possible. 
        </br>
        </br>
        4. Make the most of your breaks
        </br>
        </br> 
        One of the reasons to have healthy office habits is that without being well we cannot work well, and that depends to a large extent on our breaks. Have a good break time routine, take breaks in a way that is consistent with the level of fatigue you are accumulating and take that opportunity to move around, chat with colleagues, have a snack, and get away from the screen. Do not allow breaks and work to merge. 
        </br>
        </br>
        5. Have a social life 
        </br>
        </br>
        A large part of the emotional salary that is included in a particular job is the possibility of sharing space, projects, and time with other people as long as they are nice, we connect with them and the company culture contributes to team cohesion. You are not a production machine: if you feel like it and whenever appropriate, take the opportunity to interact and nurture relationships with your colleagues. 
        </br>
        </br>
        6. Keep your desk tidy
        </br>
        </br>
        To work with certain efficiency, and of course, with a high level of concentration and peace, it is vital to have our workspace clean and tidy. Make sure there are no distractions or obstacles around your work environment and that your surroundings are uncluttered. 
        </br>
        </br>
        7. Don’t interrupt without a reason
        </br>
        </br>
        Socializing and enjoying interactions with colleagues is great and positively influences our well-being. However, for all of you to work better, you must respect the work atmosphere and concentration, so when you have free time, you can enjoy it to have a chat and a laugh. To do so, try not to start small talk every now and then or make requests to your colleagues that can wait until later. 
        </br>
        </br>
        8. Watch your attitude at all times 
        </br>
        </br>
        From the moment you walk into the office until you say goodbye to your colleagues. Of course, we all get tired, angry, have bad days, and other issues which you already know. Try to have a friendly, positive, and polite attitude most of the time. It sounds silly, but having a grumpy person on the team can pollute the entire work environment.
        </br>
        </br>
        9. Use what you need 
        </br>
        </br>
        Make a comfortable and responsible use of materials and spaces. To work well you must have the necessary tools and comfort. Make use of the office and the materials at hand, ask for what is important, and can improve the quality of your performance. In general, if you have a coat rack, don’t keep your coats in the way, if there is a closet, keep your junk there, if you need to write stuff down, get a notebook, and don’t collect pieces of paper. Sometimes it’s as simple as that. 
        healthy office habits.
        </br>
        </br>
        10. Cultivate companionship
        </br>
        </br>
        Help your colleagues with what they need whenever you can and don’t make them wait unnecessarily. One of the things that contribute most to our unease is poor coordination with colleagues, selfishness, poor performance, or bad character. Don’t be like that and you will make it easier for others not to be like that with you. Be friendly and reachable.
        As you know, there are plenty of reasons to add healthy office habits to your life, even if we all find it hard to get into it. That’s okay. You can start by taking care of your psychological health with the help of experts in this area. In addition, if you are responsible for human capital management in your company and you need help to improve the quality of life of the people in your charge, we can also help you. How?
        </p>
	</div>`
    swiperSlideProductivity[5].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (6).png  ">
    <h2>Working outdoors can boost your productivity</h2>
    
		<p class="modal-content">
        How do you feel when you step outside? Refreshed? Calm? Happy? That feeling of bliss isn’t just in your head.
        At our core, humans have a biological connection to nature. This phenomenon is called biophilia. First introduced by Edward O. Wilson in 1984, the term describes how humans possess an innate tendency to seek connections with nature and other living things. It helps explain why we enjoy a sunny spot at the windowsill, a lush garden, or an ocean breeze.
        In the book Biophilic Design: Theory, Science and Practice, the authors share that connecting with nature is essential to our well-being and our ability to be productive. Incorporating elements of nature into work environments can reduce stress, enhance creativity and increase productivity. As more companies learn about the benefits of biophilic design, the outdoors is finding its way into the design of modern office buildings. This emerging architectural movement has been embraced by tech giants including Apple, Amazon, Microsoft, and Google.
        While bringing the outside in is beneficial, it’s no substitute for the real thing. The latest research confirms what we all instinctively know – that being outside just makes us feel better. Here are five science-backed benefits of spending time outside:
        </br>
        </br>
        Increased Happiness.
        </br>
        </br>
         Many studies show that our moods take a positive shift when we spend time outside. Research also suggests that spending time in nature can also reduce the risk of depression and anxiety – and may even help improve symptoms.
        Reduced inflammation.
        </br>
        </br> Spending more time outside could help naturally reduce pain.
        </br>
        </br>
         A 2012 study found that students who were asked to spend time forest bathing had lower levels of inflammation than their peers who spent time in the city.
         </br>
        </br>
        More Energetic.
        </br>
        </br>
         A series of studies published in the June 2010 issue of the Journal of Environmental Psychology reveals that being in nature makes people feel more alive. "Nature is fuel for the soul," said Richard Ryan, lead author and a professor at the University of Rochester. "Often when we feel depleted, we reach for a cup of coffee, but research suggests a better way to get energized is to connect with nature.”
         </br>
        </br>
        Improved memory.
        </br>
        </br>
         Studies have found that spending time in nature can help improve memory functions – especially short-term memory. Research from the University of Michigan found that walking in a park or even viewing pictures of nature helped improve both memory and attention span.
         </br>
        </br>
        Stress relief. 
        </br>
        </br>Spending time outside has been shown to lower stress levels and has similar effects on your brain and body as meditating. Being in a natural setting is shown to lower heart rate and blood pressure.
        </p>
	</div>`
    swiperSlideProductivity[6].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (7).png  ">
    <h2>How Junk Food Impacts your Productivity!</h2>
    
    <p class="modal-content">
    The WHO reports that “adequate nutrition can raise your productivity levels by 20 percent on average.” You’ll be better able to focus and accomplish tasks when you’ve eaten properly.

    These are just some of the 3 reasons why FAST food may be negatively impacting your success:
    </br>
    </br>
    1.Weight Gain 
    </br>
    </br>
    FAST foods are packed full of toxins, exceedingly high in trans fats, sugars and bad carbohydrates which are prime drivers of weight gain and obesity.
    Weight gain left unchecked leads to negatively impacting your productivity in general.
    </br>
    </br>
    2.Lower Energy Levels
    </br>
    </br>
    Digestion breaks down the foods you eat and converts them into energy that can either be readily used or stored for later.
    Fast foods inhibit this breakdown because they are easier to digest.
    This is why you feel a short burst of energy after having fast foods, however a crash shortly follows as these levels are not sustainable and you’re back to JUNK FOOD for more.😞
    </br>
    </br>
    3.Risk of Heart Disease and other conditions 
    </br>
    </br>
    Because fast foods are usually packed with fat, sugar and lots sodium. This will increase your risk for type 2 diabetes and heart disease.
    What you eat determines what enters your bloodstream, and your brain function is one of the most obvious exhibitors of your body’s health.
    When it’s healthy, you’re focused. The opposite happens for unhealthy eaters.
    The key to productivity is in your hands. Watch what you eat, and that will translate to results that follow in every aspect of your life.🔥
    </p>
    </div>`
    swiperSlideProductivity[7].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (8).png  ">
    <h2>Manage stress at work</h2>
    
		<p class="modal-content">
        Research has indicated that the percentage of Americans who are stressed at work is high—and it’s only getting higher. According to a survey of more than 2,000 full-time U.S. employees, ages 18-79, more than half of employees find themselves stressed during at least 60 percent of the workweek.
        Work stress has significant health consequences that range from relatively benign (like getting more colds and flus) to potentially serious (such as heart disease and metabolic syndrome).
        While stress at work is common, finding a low-stress job is hard (if not impossible). A more realistic approach is to adopt effective coping strategies to reduce stress at your current job. Here are some stress management techniques you can try if you are finding it hard to cope with work stress.
        </br>
        </br>
        Start Your Day off Right
        </br>
        </br>
        After scrambling to get the kids fed and off to school, dodging traffic and combating road rage, and gulping down coffee in lieu of a healthy breakfast, many people arrive to work already stressed. This makes them more reactive to stress in the workplace.
        You might be surprised by how affected by workplace stress you are when you have a stressful morning. When you start off the day with planning, good nutrition, and a positive attitude, you might find that the stress of your job rolls off your back more easily.
        </br>
        </br>
        Be Clear on Requirements
        A factor known to contribute to job burnout is unclear requirements for employees. If you don’t know exactly what is expected of you, or if the requirements for your role keep changing with little notice, you might become extremely stressed.
        If you find yourself never knowing if what you are doing is enough, it may help to have a talk with your supervisor. You can take the time to go over expectations and discuss strategies for meeting them. This can relieve stress for both of you!
        </p>
	</div>`
    swiperSlideProductivity[8].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (9).png  ">
    <h2>8 Strategies for Dealing With a Difficult Boss</h2>
    
		<p class="modal-content">
        A difficult boss can present a significant challenge in the workplace. In fact, the relationship with your supervisor can be the single most important relationship within the workplace, and a negative relationship with your boss can sometimes negatively impact nearly every aspect of your work life. While your first instinct may be to resign from your position, working through a difficult situation can often be the most productive option.
        There are several benefits that can come from addressing a difficult boss. A few of these benefits might include:
        </br>
        </br>
        Reduced work-related stress
        </br>
        </br>
        Reduced chance of illness
        </br>
        </br>
        Increased work satisfaction
        </br>
        </br>
        Improved relationships within the workplace
        </br>
        </br>
        Increased job productivity
        </br>
        </br>
        Increased potential to advance at work
        </br>
        </br>
        </p>
	</div>`
    swiperSlideProductivity[9].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (10).png  ">
    <h2>Staying hydrated to boost productivity</h2>
    
		<p class="modal-content">
        Everyone talks about that morning cup of coffee as a way to jumpstart the day and be productive, but what about the rest of the workday? Any grogginess you may feel right before lunch or mid-afternoon most likely is due to lack of hydration. When your total body water decreases, your body doesn’t have enough water to perform its healthy functions. It’s at this point dehydration sets in from fluid loss. Water dehydration symptoms include dry mouth, dry skin, muscle cramps, fatigue, dizziness, and confusion, among others. How do you prevent this? Drink water! It’s recommended by healthcare professionals to drink a minimum of eight glasses of water every day. A great alternative to plastic water bottles is drinking water from aluminum water bottles as this reduces plastic waste in the environment while providing fresh and clean tasting water.
        With the chaos of a jam-packed workday or weekend filled with physical activity, the goal of drinking more water may be easier said than done. However, being intentional about your water intake can have a positive impact on productivity. Intaking water throughout the day will help to keep you alert and be more focused while you work. Learn more about how hydration contributes to your health and functioning at work and ways to ensure you’re getting enough water throughout the day. 
        Boosts Brain Function
        </br>
        </br>
        Evidence shows mild dehydration can affect your mood, memory, and brain performance. A study published in the Journal of Nutrition found that even a 1.4 dehydration level resulted in headaches, lower concentration, increased perception of task difficulty, and a degraded mood, which is a commonly unknown dehydration symptom. Environmental factors like temperature can also cause your hydration levels to dip early on in the day, enough to contribute to these side effects.
        For a job that keeps you sedentary for most of the day, aim to drink at least one or two glasses of water per hour to stay hydrated. If your job requires you to be on your feet for several hours at a time or you’re working outside in warmer temperatures, consider increasing your intake to accommodate for water lost through excessive sweating, or fluid loss. Getting yourself to drink eight glasses of water a day is only a starting point to what your body may actually require to stay hydrated. 
        </br>
        </br>
        Regulates Blood Pressure
        </br>
        </br>
        Plasma is made up of approximately 90 percent water, which means severe dehydration can cause your blood to become more concentrated and lack electrolytes that aid in proper heart and muscle function. Electrolytes produce energy and allow your body to function correctly. In addition, staying hydrated helps balance blood volume and blood pressure to reduce feelings of being lightheaded or dizzy. 
        At work, coordinate water breaks with a few moments to get up and stretch or take a quick walk around the block, particularly if you’re sitting at a desk for the majority of your day. Pairing the two activities together can make it easier to remember to fill up your water bottle and lower blood pressure with exercise.
        </br>
        </br>
        Fights Fatigue During the Day
        </br>
        </br>
        Another leading water dehydration symptom is fatigue. When you’re feeling sleepy, productivity often declines. Relying on caffeinated or sugary drinks to keep your energy levels going at work can lead to crashes later on in the day. Consistently drinking water keeps your hydration at a healthy level to fight fatigue. 
        Also, skip the bag of chips or other salty snacks, which can make you feel bloated and weighed down. Instead, double up on your water intake by reaching for a piece of fruit or other hydrating snacks like sliced cucumbers or a bowl of yogurt topped with granola. Foods rich in nutrients, rather than salt and fat, will boost your brainpower and keep you more productive throughout the day. This will, also, help to stabilize body weight. 
        </br>
        </br>
        Eliminates Toxins from the Body
        </br>
        </br>
        An additional benefit of drinking water is that it rids your body of toxins and keeps your immune system healthy. This is particularly important during the cold and flu season, since it helps ward off infection. One of the key things doctors recommend when you catch a cold is to increase your fluid intake. Why? Consistently intaking fluids keeps the body properly hydrated and functioning at its optimal capacity. 
        Round out preventative care by following a balanced diet and getting plenty of rest. These, along with proper fluid hydration, will help you maintain optimal health and keep your body’s functions in good working order. Nothing impacts productivity faster than being down and out with a cold. 
        Also, regular urination of bodily fluids caused by consistent fluid intake can aid with removing unwanted toxins from within your body. Frequent dark urine is a well known sign of chronic dehydration and should be a signal for the need to increase your water consumption.
        </br>
        </br>
        Reduces Caffeine and Sugar Intake
        </br>
        </br>
        Findings from data acquired from the U.S. Department of Health and Human Services reveal that fruit drinks, soda, energy or sports drinks make up 42 percent of the average sugar intake. Committing to drinking more water as an alternative to coffee and energy drinks reduces the amount of caffeine and sugar you consume each day. 
        Too much caffeine can leave you feeling jittery, unfocused, and affect your sleep. It can also lead to water dehydration symptoms, such as headaches, nervousness, and irritability. All of these decrease productivity and effectiveness of the tasks you are able to complete. Plus, high sugar levels can lead to heart disease, an irregular heart rate, high blood pressure, obesity, and other adverse health effects over an extensive period of time. Start the habit of reaching for water when you have a thirst for something to drink or feeling low on energy. You may be surprised how much hydration plays a part in perking you up.
        </br>
        </br>
        Aids in Digestion
        </br>
        </br>
        Lunch is usually a lighter meal of the day, but poor digestion can cause you to feel sluggish, leading to an afternoon slump. Drinking water with your meal allows your body better to absorb your food’s nutrients and aid in digestion.  Rather than feeling weighed down, you’ll feel more energized to tackle the afternoon when you’ve had plenty of water to accompany your meal. 
        </p>
	</div>`
    swiperSlideProductivity[10].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (11).png  ">
    <h2>11 tips for organization and productivity</h2>
    
    <p class="modal-content">
    Staying organized and productive at work helps you stay focused and complete tasks on time.
    When you are organized and productive, you can prioritize work and excel, which aids your career progress and success. There are several options for organizing your responsibilities and tasks, depending on your work style.
    Consider the following ways to stay organized at work:
    </br>
    </br>
    1. Set goals
    </br>
    </br>
    Achievable goals can help you stay focused and productive. When you set specific goals with steps and a timeline, you can organize your work into more manageable tasks. Create both long and short-term goals and add milestones to your calendar to make sure you stay on task.
    </br>
    </br>
    2. Track progress
    </br>
    </br>
    To make sure you achieve your goals in the time you allotted, try to track your progress. Tracking progress can also help you identify when you’re most productive. For example, you might notice you accomplish more at the start of the week or in the morning. With this information, you can decide when to work on your most important tasks.
    Some approaches to tracking your progress include logging in time you worked, tallying hours used toward a project, and blocking out periods of your day when you complete tasks.
    </br>
    </br>
    3. Use an agenda
    </br>
    </br>
    An agenda is an excellent tool to evaluate your work organization and productivity. When using a planner, write down specific events and their details throughout the days, weeks, and months. This strategy keeps you aware of what meetings and due dates you have coming up in your schedule. As a result, you’re more likely to meet your goals and remember specific events.
    There are many types of agendas. Some agendas have a space for every day, while others are weekly or monthly. Think about what kind of planner would best suit you and your work. If you work on your computer often, consider using a digital plan to add events to specific dates.
    </br>
    </br>
    4. Create to-do lists
    </br>
    </br>
    To-do lists are simple yet highly effective lists to help maintain productivity throughout the day. Use to-do lists to write down important tasks you want to accomplish. Try to organize your work based on urgency. For example, you can add what you need to complete by the end of the day at the top of your list and what can wait until the next day toward the bottom.
    Consider writing your to-do lists on a sticky note or in a notebook. When using this approach, think of ways to organize your to-do list. For example, use colored pens to distinguish between items, such as a blue pen to designate a team meeting and a red pen to label urgent responsibilities.
    </br>
    </br>
    5. Practice accountability
    </br>
    </br>
    When you hold yourself accountable, you reflect on your to-do list, evaluate your progress toward goals and identify ways to improve your performance. Regularly check in with yourself to determine your progress and find areas where you can approve. You can also develop a system of accountability with your coworkers by holding regular check-ins with each other.
    </br>
    </br>
    6. Limit distractions
    </br>
    </br>
    It is much easier to concentrate on work for extended periods in an organized workspace. When you limit distractions, you maintain your focus on your current task. Limit distractions by keeping your space organized and straightforward. Keep common distractions, like your phone, in your desk or a different room.
    </br>
    </br>
    7. Incorporate a timer
    </br>
    </br>
    Keep track of how much time you spend on different tasks to see areas where you can better use your time. When you start and end a task, start and end your timer. Consider using time-keeping applications to see how much time you spend on specific tasks. At the end of the week, reflect on your use of time and be more productive. For example, you could try limiting the amount of time you spend checking your emails if you notice you don’t have much time to complete other priority tasks.
    </br>
    </br>
    8. Keep a clean environment
    </br>
    </br>
    In an organized office, you find supplies and materials efficiently, which makes your workflow more consistent. Keeping a clean environment includes putting items back where they belong, disinfecting your desk with cleaning wipes, and opening your windows for fresh air. A clean environment is a comfortable one, which makes staying productive easier.
    Decluttering your workspace is a crucial part of staying clean and organized. Once a week or month, take stock of your workspace and remove any items that you don’t use daily. Throw away any outdated to-do lists, and file away completed work.
    </br>
    </br>   
    9. Use labels
    </br>
    </br>
    Labels are a practical approach to organizing your files. Clearly label each file, and arrange them in a way that makes the most sense to you. For example, you could manage your files in alphabetical order or by year.
    Use this approach for digital files, too. Clearly labeled files and folders on your computer are much easier to locate without having to search for them for a long time.
    </br>
    </br>
    10. Sort your email
    </br>
    </br>
    Many professionals use email to communicate with each other, and as a result, you might find your email inbox full of emails. Sorting your emails avoids clutter in your inbox and helps you find essential emails faster.
    Create digital folders in your email to sort all your messages. Folders categorize your emails in the appropriate place. Labeling emails remind you to reply to senders and keep essential emails in one place.
    </br>
    </br>
    11. Take breaks
    </br>
    </br>
    Breaks are an important way to keep focus and stay productive. Breaks keep you motivated because you avoid over-working yourself in a short period. As a result, you can often work for longer. During your break, go on a short walk, or get a snack. Make sure you take your break away from your workspace to reset your focus completely.
    </p>
    </div>`
    swiperSlideProductivity[11].innerHTML = `
    <div class="fsm pied">
    <img src="vectorsProductivity/newArticles/img (12).png  ">
    <h2>7 Tips for a Stress-Free Work Day</h2>
    
		<p class="modal-content">
        The COVID-19 pandemic caused tremendous stress to everyone around the world. If you are one of the few people working in a remote setup, our mental and physical health would be a toll. It gets more stressful at home, and some don’t know how to handle it.
        It’s essential to relieving your stress. But how can you manage it during these times? Read more to find out how to avoid a super stressful workday.
        </br>
        </br>
        Plan and Stay Organized
        </br>
        </br>
        Getting less stressed throughout the day always begins with planning and organizing. Planning your day reduces the amount of stress significantly. You can do so by writing the things you need to do the next day on your to-do list before you head to bed.
        Planning also means that you have to be organized with your time. Doing so will lessen your chances of always being in a rut in the morning. It will also lessen the clutter in your workplace and mind.
        </br>
        </br>
        Create a Work-Life Balance
        </br>
        </br>
        Stress not only can affect your performance at work, but also other aspects of your personal life and health. The first thing you must prioritize is your well-being. Set boundaries for your free time and your work.
        If you are on a work-from-home setup, you can create an office space in your home. That space will solely be dedicated to work-related tasks, and once you are in that area, you have to be focused on finishing your tasks.
        Set a time for yourself, especially during the weekends. Try doing some relaxing activities, like going for a walk, reading a book, shopping, and other things that can take your mind off work.
        </br>
        </br>
        Take Time to Breathe and Practice Mindfulness
        </br>
        </br>
        We mostly feel anxious whenever we see a pile of deliverables, and their deadlines are cramped up on the same day. While we need to finish these in time to prevent getting penalties from your managers, it can be overwhelming on your end.
        Whenever you feel overwhelmed and anxious, step back from your workplace in the meantime and take deep breaths. Practicing mindfulness help calm your mind and brings back your productivity. You can also go outside and get a breath of fresh air or even meditate for 10 to 15 minutes.
        </br>
        </br>
        Get Moving
        </br>
        </br>
        Similar to the previous point, relieve stress by moving your body around! You may think you don’t have time to do regular exercise, but you can squeeze in a few reps. Do some 30-minute aerobic exercises or simply jog in place during your break time.
        Try stretching for a few minutes to prevent chronic exhaustion and keep your blood flowing throughout your body. Walk around outdoors during your break time as it helps boost your creativity.
        Get Enough Sleep and Eat Healthily
        </br>
        </br>
        Going to work with only two to three hours of sleep may seem normal for some, but it’s creating adverse effects on your body. Lack of sleep can lead to loss of focus and other serious problems. Make sure to sleep for seven to eight hours, as this helps improve your overall performance.
        Don’t forget to eat nutritious foods. Having low blood sugar in your body can also trigger anxiety and irritability, and having too much of it can make you lethargic or sluggish. Eat small meals frequently to maintain the normal blood sugar and energy level, to keep you stay focused, and also, to avoid mood swings. There are various brain foods to increase your energy throughout the day, such as nuts and fruits.
        </br>
        </br>
        Ask for Help
        </br>
        </br>
        The health of an employee affects the company’s productivity. If things get difficult at work, reach out to your colleagues. It’s always a good start to create camaraderie among your co-workers and even your manager or supervisor.
        Being open to them can help you get back on track. Also, talking to your supervisor or manager may give them an idea of the overall situation of their employees’ workplace. You don’t need to complain about every work you do, but instead, you can list all the possible ways to combat stress in the workplace.
        But when the situation gets worse and you frequently feel anxious or depressed, maybe it’s high time to consult a mental health professional. Remember that taking care of your mental health has to be the same as taking care of your physical health.
        </p>
	</div>`

    
};

// Search

function searchKeyStrokes() {
    
    var input, filter, p, txtValue;
    input = inputTextField;
    filter = input.value.toUpperCase();
    
    p = document.querySelectorAll(".modal-content");
    for (i = 0; i < p.length; i++) {
        txtValue = p[i].textContent || p[i].innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            p[i].closest(".swiper-slides-productivity").style.display = "";
            galleryArticles.update();
        } else {
           p[i].closest(".swiper-slides-productivity").style.display = "none";
           galleryArticles.update();
        }
    }

}

submitButton.addEventListener("click", function() {
    searchKeyStrokes();
});

inputTextField.addEventListener("keyup", function() {
    searchKeyStrokes();
})

// Initializing Swiper


// prevent scroll on swiper-articles for handling bugs on full screen article, and adding overflow to full screen article so the user wont scroll over the main page and only on the article itself
document.querySelector('.swiper-popular-articles').addEventListener('wheel', preventScroll, {passive: false});

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}

var galleryArticles = new Swiper('.gallery-articles' , 
{ 
    direction: 'horizontal',
    loop:  false,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 1,
    allowTouchMove: true,
    keyboardControl: false,
    speed: 400,
    spaceBetween: 13,
    cssMode: true,
    centeredSlidesBounds: true,

    on: {

        slideChangeTransitionStart: function(swiper) {
            let $wrapperEl = swiper.$wrapperEl;
            let params = swiper.params;
            $wrapperEl.children(('.' + (params.slideClass) + '.' + (params.slideDuplicateClass)))
                .each(function() {
                    let idx = this.getAttribute('data-swiper-slide-index');
                    this.innerHTML = $wrapperEl.children('.' + params.slideClass + '[data-swiper-slide-index="' + idx + '"]:not(.' + params.slideDuplicateClass + ')').html();
                });
        },

        slideChangeTransitionEnd: function(swiper) {
            swiper.slideToLoop(swiper.realIndex, 0, false);
        }


    },

    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});



var fsmActual = document.createElement('div');
fsmActual.setAttribute('id', 'fsm_actual');
document.body.appendChild(fsmActual);
var $fsm = document.querySelectorAll('.fsm');;
var $fsmActual = document.querySelector('#fsm_actual');
$fsmActual.style.position = "absolute";

var position = {};
var size = {};


//modal action stuffs
var openFSM = function(event) {
	var $this = event.currentTarget;
	position = $this.getBoundingClientRect();
	size = {
		width: window.getComputedStyle($this).width,
		height: window.getComputedStyle($this).height
	}
	
	$fsmActual.style.position = "absolute";
	$fsmActual.style.top = position.top + 'px';
	$fsmActual.style.left = position.left + 'px';
	$fsmActual.style.height = size.height;
	$fsmActual.style.width = size.width;
	$fsmActual.style.margin = $this.style.margin;
	
	setTimeout(function(){
		$fsmActual.innerHTML = $this.innerHTML;
		var classes = $this.classList.value.split(' ');
		for (var i = 0; i < classes.length; i++) {
			$fsmActual.classList.add(classes[i]);
		}
		$fsmActual.classList.add('growing');
		$fsmActual.style.height = '100vh';
		$fsmActual.style.width = '100vw';
		$fsmActual.style.top = '0';
		$fsmActual.style.left = '0';
		$fsmActual.style.margin = '0';
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".header").style.zIndex = "-200"
	}, 1);
	
	setTimeout(function(){
		$fsmActual.classList.remove('growing');
		$fsmActual.classList.add('full-screen')
	}, 500);
};

var closeFSM = function(event){
	var $this = event.currentTarget;
	
	$this.style.height = size.height;
	$this.style.width = size.width;
	$this.style.top = position.top + 'px';
	$this.style.left = position.left + 'px';
	$this.style.margin = '0';
	$this.classList.remove('full-screen');
	$this.classList.add('shrinking');
    document.querySelector("body").style.overflow = "overlay";
    document.querySelector("body").style.overflowX = "hidden";
    document.querySelector(".header").style.zIndex = "200"
    topOfElement = document.querySelector('#swiper').offsetTop - 50;
    window.scroll({ top: topOfElement, behavior: "smooth" }); 
	
	setTimeout(function(){
		while($this.firstChild) $this.removeChild($this.firstChild);
		var classList = $this.classList;
		while (classList.length > 0) {
			 classList.remove(classList.item(0));
		}
		$this.style = '';;
	});
};

for (var i = 0; i < $fsm.length; i++) {
	$fsm[i].addEventListener("click", openFSM);
}
$fsmActual.addEventListener("click", closeFSM);



document.querySelectorAll(".scrollToArticles").forEach((button) => { 
    button.addEventListener("click", () => {
        setTimeout(() => {
            console.log("small");
            topOfElement = document.querySelector('body').offsetTop;
            window.scroll({ top: topOfElement, behavior: "smooth" }); 
        }, 300)
        
    })
})




