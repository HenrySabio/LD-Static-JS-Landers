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