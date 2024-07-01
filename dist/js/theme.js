/**
   * Match height
   * This script will match the height of all elements with the same data-mh-group attribute.
   * Example: <div class="match-height" data-mh-group="group-1">...</div>
   *
   * Todo: Use window.onload when transition to dynamic content complete and then seprate into a separate script file.
   *
   * ------------------------------ */

// Get all the elements you want to match heights
const elements = document.querySelectorAll(".match-height");

// Function to match the heights of elements within a group
function matchHeights(group) {
    let maxHeight = 0;
    group.forEach((element) => {
        const height = element.getBoundingClientRect().height;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    group.forEach((element) => {
        element.style.height = maxHeight + "px";
    });
}

// Group the elements by their data-mh-group attribute
const groups = {};
elements.forEach((element) => {
    const group = element.getAttribute("data-mh-group");
    if (!groups[group]) {
        groups[group] = [];
    }
    groups[group].push(element);
});

// Match the heights for each group
Object.values(groups).forEach((group) => matchHeights(group));

// Add event listener to recalculate heights on window resize
window.addEventListener("resize", () => {
    Object.values(groups).forEach((group) => {
        group.forEach((element) => {
            element.style.height = "auto";
        });
        matchHeights(group);
    });
});

// document ready
document.addEventListener("DOMContentLoaded", function () {
    // Osano footer button
    function isOsanoLoaded() {
        return typeof Osano === 'function';
    }

    const checkOsano = isOsanoLoaded(); // Check if Osano script is loaded when the DOM is ready

    if (checkOsano) {
        clearTimeout(isOsanoLoaded);

        // Osano script is loaded, display the <p> tag
        var osanoStatusElement = document.getElementById("osano_manage");
        if (osanoStatusElement) {
            osanoStatusElement.classList.add("show");
        }
    } else {
        // run this function again in 300 milliseconds
        setTimeout(isOsanoLoaded, 1000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const cta = document.querySelector('.fixed-scroll-cta');
    const chatWidget = document.querySelector('#chat-widget-container');

    if (!cta) {
        return;
    } else {
        window.addEventListener('scroll', function () {
            const scrollDistance = window.scrollY || document.documentElement.scrollTop;

            // Change this value as needed based on when you want the CTA to appear
            const triggerPoint = 320;

            if (scrollDistance > triggerPoint) {
                cta.style.bottom = '0';
                showChatWidget();
            } else if (scrollDistance <= triggerPoint) {
                cta.style.removeProperty('bottom');
                hideChatWidget();
            }
        });

        function showChatWidget() {
            if (chatWidget && (window.innerWidth < 769)) {
                chatWidget.style.transition = 'bottom 0.2s ease-in-out';
                chatWidget.style.bottom = '60px';
            }
        }

        function hideChatWidget() {
            if (chatWidget) {
                chatWidget.style.bottom = '0';
            }
        }
    }
});

if (document.querySelector('.row-multi-step-form')) {
    (function () {

        let step = document.getElementsByClassName('form-step');
        let prevBtn = document.getElementById('prev-btn');
        let nextBtn = document.getElementById('next-btn');
        let submitBtn = document.getElementById('submit-btn');
        let form = document.getElementsByTagName('form')[0];
        let preloader = document.getElementById('preloader-wrapper');
        let successDiv = document.getElementById('success');

        form.onsubmit = () => {
            return false
        }
        let current_step = 0;
        let stepCount = step.length - 1;
        step[current_step].classList.add('d-block');
        if (current_step == 0) {
            prevBtn.classList.add('d-none');
            submitBtn.classList.add('d-none');
            nextBtn.classList.add('d-inline-block');
        }


        if (document.getElementsByClassName('step-counter').length !== 0) {
            let step_counter = document.getElementsByClassName('step-counter')[0];
            step_counter.innerHTML = `Step ${current_step + 1} of ${stepCount + 1}`;

            function updateStepCounter(current_step) {
                step_counter.innerHTML = `Step ${current_step + 1} of ${stepCount + 1}`;
            }
        }


        const progress = (value) => {
            document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
        }

        nextBtn.addEventListener('click', () => {
            current_step++;
            updateStepCounter(current_step);
            let previous_step = current_step - 1;
            if ((current_step > 0) && (current_step <= stepCount)) {
                prevBtn.classList.remove('d-none');
                prevBtn.classList.add('d-inline-block');
                step[current_step].classList.remove('d-none');
                step[current_step].classList.add('d-block');
                step[previous_step].classList.remove('d-block');
                step[previous_step].classList.add('d-none');
                if (current_step == stepCount) {
                    submitBtn.classList.remove('d-none');
                    submitBtn.classList.add('d-inline-block');
                    nextBtn.classList.remove('d-inline-block');
                    nextBtn.classList.add('d-none');
                }
            } else {
                if (current_step > stepCount) {
                    form.onsubmit = () => {
                        return true
                    }
                }
            }
            progress((100 / stepCount) * current_step);
        });


        prevBtn.addEventListener('click', () => {
            if (current_step > 0) {
                current_step--;
                updateStepCounter(current_step);
                let previous_step = current_step + 1;
                prevBtn.classList.add('d-none');
                prevBtn.classList.add('d-inline-block');
                step[current_step].classList.remove('d-none');
                step[current_step].classList.add('d-block')
                step[previous_step].classList.remove('d-block');
                step[previous_step].classList.add('d-none');
                if (current_step < stepCount) {
                    submitBtn.classList.remove('d-inline-block');
                    submitBtn.classList.add('d-none');
                    nextBtn.classList.remove('d-none');
                    nextBtn.classList.add('d-inline-block');
                    prevBtn.classList.remove('d-none');
                    prevBtn.classList.add('d-inline-block');
                }
            }

            if (current_step == 0) {
                prevBtn.classList.remove('d-inline-block');
                prevBtn.classList.add('d-none');
            }
            progress((100 / stepCount) * current_step);
        });


        submitBtn.addEventListener('click', () => {
            preloader.classList.add('d-block');

            const timer = ms => new Promise(res => setTimeout(res, ms));

            timer(3000)
                .then(() => {
                    form.classList.add('loaded');
                }).then(() => {
                    step[stepCount].classList.remove('d-block');
                    step[stepCount].classList.add('d-none');
                    prevBtn.classList.remove('d-inline-block');
                    prevBtn.classList.add('d-none');
                    submitBtn.classList.remove('d-inline-block');
                    submitBtn.classList.add('d-none');
                    successDiv.classList.remove('d-none');
                    successDiv.classList.add('d-block');
                })

        });
    })();
}