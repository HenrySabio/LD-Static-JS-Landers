window.onload = function () {
    /** FORM VALIDATION
    * ------------------------------ */

    // if form element exists
    if (document.getElementById('lead_form')) {

        const getElement = (id) => document.getElementById(id);

        // Check if an element exists, if it does return the value, if not return null
        const getInput = (id) => {
            const element = getElement(id);
            return element ? element : null;
        };

        const firstNameInput = getInput("first_name");
        const lastNameInput = getInput("last_name");
        const emailInput = getInput("email");
        const primaryPhoneInput = getInput("primary_phone");
        const injuryCauseInput = getInput("injury_cause");
        const cityInput = getInput("city");
        const stateInput = getInput("state");
        const submitButton = getElement("submit_button");

        submitButton.disabled = true;

        primaryPhoneInput.addEventListener("input", function (event) {
            // Get the current value of the primary phone field
            let formattedValue = event.target.value;
            let unformattedValue = formattedValue.replace(/\D/g, ""); // Remove all non-numeric characters

            // Format the phone number as (555) 555-5555
            const formattedPhoneNumber = unformattedValue.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "($1) $2-$3"
            );

            // Update the value of the primary phone field and the hidden unformatted field
            event.target.value = formattedPhoneNumber;
            let primaryPhoneUnformatted = document.getElementById(
                "primary-phone-unformatted"
            );
            primaryPhoneUnformatted.value = unformattedValue;
        });

        // Check if an element is not equal to null, if it does add an event listener to it with the specified event and function
        const inputListener = (inputElement, event, fn) => {
            if (inputElement !== null) {
                inputElement.addEventListener(event, fn);
            }
        };

        // Add event listeners to the input elements
        inputListener(firstNameInput, "blur", validateFirstName);
        inputListener(lastNameInput, "blur", validateLastName);
        inputListener(emailInput, "blur", validateEmail);
        inputListener(primaryPhoneInput, "blur", validatePrimaryPhone);

        // Validates dropdown select fields if they exist - ensures valid option is selected
        // Different from regular inputs because dropdowns handle values differently
        if (injuryCauseInput) {
            inputListener(injuryCauseInput, "blur", validateInjuryCause);
            inputListener(injuryCauseInput, "change", validateInjuryCause);
        }

        if (stateInput) {
            inputListener(stateInput, "blur", validateState);
            inputListener(stateInput, "change", validateState);
        }

        function validateInjuryCause() {
            const injuryCause = injuryCauseInput.value.trim();
            const injuryCauseError = document.getElementById("injury-cause-error");
            const injuryCauseContainer = injuryCauseInput.closest(".form-item"); // get the parent container
            if (injuryCause == "" || !injuryCause) {
                injuryCauseError.textContent = "Se requiere la causa de la lesión.";
                submitButton.disabled = true;
                injuryCauseContainer.classList.add("form-error"); // add the form-error class
                return false;
            } else {
                injuryCauseError.textContent = "";
                enableSubmitButtonIfValid();
                injuryCauseContainer.classList.remove("form-error"); // remove the form-error class
            }
        }

        function validateState() {
            const state = stateInput.value.trim();
            const stateError = document.getElementById("state-error");
            const stateContainer = stateInput.closest(".form-item"); // get the parent container
            if (state == "" || !state) {
                stateError.textContent = "Se requiere el estado donde ocurrió el incidente.";
                submitButton.disabled = true;
                stateContainer.classList.add("form-error"); // add the form-error class
                return false;
            } else {
                stateError.textContent = "";
                enableSubmitButtonIfValid();
                stateContainer.classList.remove("form-error"); // remove the form-error class
            }
        }

        function validateFirstName() {
            const firstName = firstNameInput.value.trim();
            const firstNameError = document.getElementById("fname-error");
            const firstNameContainer = firstNameInput.closest(".form-item"); // get the parent container
            if (firstName === "") {
                firstNameError.textContent = "Se requiere el primer nombre.";
                submitButton.disabled = true;
                firstNameContainer.classList.add("form-error"); // add the form-error class
            } else if (/\d/.test(firstName)) {
                firstNameError.textContent = "El nombre no puede contener números.";
                submitButton.disabled = true;
                firstNameContainer.classList.add("form-error"); // add the form-error class
            } else {
                firstNameError.textContent = "";
                enableSubmitButtonIfValid();
                firstNameContainer.classList.remove("form-error"); // remove the form-error class
            }
        }

        function validateLastName() {
            const lastName = lastNameInput.value.trim();
            const lastNameError = document.getElementById("lname-error");
            const lastNameContainer = lastNameInput.closest(".form-item"); // get the parent container
            if (lastName === "") {
                lastNameError.textContent = "Se requiere apellido.";
                submitButton.disabled = true;
                lastNameContainer.classList.add("form-error"); // add the form-error class
            } else if (/\d/.test(lastName)) {
                lastNameError.textContent = "El nombre no puede contener números.";
                submitButton.disabled = true;
                lastNameContainer.classList.add("form-error"); // add the form-error class
            } else {
                lastNameError.textContent = "";
                enableSubmitButtonIfValid();
                lastNameContainer.classList.remove("form-error"); // remove the form-error class
            }
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            const emailError = document.getElementById("email-error");
            const emailContainer = emailInput.closest(".form-item"); // get the parent container
            if (email === "") {
                emailError.textContent = "Correo electronico es requerido.";
                submitButton.disabled = true;
                emailContainer.classList.add("form-error"); // add the form-error class
            } else if (!isValidEmail(email)) {
                emailError.textContent = "Introduzca un correo electrónico válido.";
                submitButton.disabled = true;
                emailContainer.classList.add("form-error"); // add the form-error class
            } else {
                emailError.textContent = "";
                enableSubmitButtonIfValid();
                emailContainer.classList.remove("form-error"); // remove the form-error class
            }
        }

        function validatePrimaryPhone() {
            const primaryPhone = primaryPhoneInput.value.trim();
            const primaryPhoneError = document.getElementById("primary-phone-error");
            const primaryPhoneContainer = primaryPhoneInput.closest(".form-item"); // get the parent container
            if (primaryPhone === "") {
                primaryPhoneError.textContent = "Se requiere teléfono principal.";
                submitButton.disabled = true;
                primaryPhoneContainer.classList.add("form-error"); // add the form-error class
            } else if (!isValidPhone(primaryPhone)) {
                primaryPhoneError.textContent = "Enter a valid phone number.";
                submitButton.disabled = true;
                primaryPhoneContainer.classList.add("form-error"); // add the form-error class
            } else {
                primaryPhoneError.textContent = "";
                enableSubmitButtonIfValid();
                primaryPhoneContainer.classList.remove("form-error"); // remove the form-error class
            }
        }

        function enableSubmitButtonIfValid() {
            // Check for existence and trim if the input exists
            const trimIfExist = (input) => input ? input.value.trim() : "";

            // Check for existence and validity of email and phone
            const isEmailValid = (email) => email && isValidEmail(email);
            const isPhoneValid = (phone) => phone && isValidPhone(phone);

            // Extract values or set to an empty string if the inputs don't exist
            const firstName = trimIfExist(firstNameInput);
            const lastName = trimIfExist(lastNameInput);
            const email = trimIfExist(emailInput);
            const primaryPhone = trimIfExist(primaryPhoneInput);
            const injuryCause = trimIfExist(injuryCauseInput);
            const state = trimIfExist(stateInput);

            // Check conditions for enabling the submit button
            if (
                firstName !== "" &&
                lastName !== "" &&
                email !== "" &&
                isEmailValid(email) &&
                primaryPhone !== "" &&
                isPhoneValid(primaryPhone) &&
                (
                    (!injuryCauseInput || (injuryCauseInput && injuryCause !== "")) ||
                    (!stateInput || (stateInput && state !== ""))
                )
            ) {
                submitButton.disabled = false;
            }
        }

        // Check if an email address is valid
        function isValidEmail(email) {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
            return emailRegex.test(email);
        }

        // Check if a phone number is valid
        function isValidPhone(phone) {
            const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            return phoneRegex.test(phone);
        }

    }
};

// Universal logic for leadVar populated as hidden inputs to be used for all forms
// All forms must have 2 divs with the following IDs: dynamicInputs, serializedLeadVars
function populateDynamicInputs() {
    let dynamicVars = signalVars;
    // get current URL and add it to dynamicVars
    dynamicVars['Landing_Page'] = window.location.href;

    for (let key in dynamicVars) {
        if (dynamicVars.hasOwnProperty(key)) {
            let input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = dynamicVars[key];
            document.getElementById('dynamicInputs').appendChild(input);
        }
    }

    createSerializedInput(dynamicVars);
}

function createSerializedInput(data) {
    const serializedData = JSON.stringify(data);

    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "serializedLeadVars";
    input.value = serializedData;
    document.getElementById('serializedLeadVars').appendChild(input);
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById('dynamicInputs')) {
        setTimeout(function () {
            populateDynamicInputs();
        }, 2000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#lead_form'); // Replace with your form ID or selector

    const urlParams = new URLSearchParams(window.location.search);
    // TODO: delete references to devMode when testing is complete
    const devMode = urlParams.get('dev_mode');
    devMode == 'logs' && console.log('devMode is in logs mode - form submission will log output instead');
    devMode == 'no-cors' && console.log('devMode is in no-cors mode - form submission will submit without CORS mode - expect redirect to fail');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // const url = 'https://api.walkeradvertising.com/api/WebHookGenericPost_v2';
        // const url = `${window.location.origin}/submit-form`;
        const url = '/netlify/functions/submit-form';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Consolidate Type of Legal Problem
        const typeOfLegalProblem = data['injury_cause'] || data['Type_Of_Legal_Problem'] || data['Type_Of_Accident'] || null;

        // Consolidate Case Details
        const comments = data['comments'] || data['case_details'] || null;

        // Strip phone number of non-numeric characters
        const primaryPhone = data['primary_phone'].replace(/\D/g, '');

        // Lead Value Calculation
        let leadValue = 235;
        const injuryCause = typeOfLegalProblem;
        const state = data['state'] || null;

        if (
            ['auto_accident', 'bicycle_accident', 'motorcycle_accident', 'pedestrian_accident', 'rideshare_accident', 'truck_accident'].includes(injuryCause) && state
        ) {
            const tier1States = ['CA', 'NV'];
            const tier2States = ['FL', 'TX'];
            const tier3States = ['AZ', 'CO', 'CT', 'DC', 'GA', 'IA', 'IL', 'IN', 'LA', 'MD', 'NY', 'NJ', 'PA', 'SC', 'TN', 'UT', 'VA', 'WA'];
            const tier4States = ['AK', 'AL', 'AR', 'DE', 'HI', 'ID', 'KS', 'KY', 'MA', 'ME', 'MN', 'MO', 'MS', 'MT', 'ND', 'NE', 'NH', 'NM', 'OH', 'OK', 'OR', 'RI', 'SD', 'VT', 'WI', 'WV', 'WY'];

            if (tier1States.includes(state)) {
                leadValue = 750;
            } else if (tier2States.includes(state)) {
                leadValue = 575;
            } else if (tier3States.includes(state)) {
                leadValue = 390;
            } else if (tier4States.includes(state)) {
                leadValue = 235;
            }
        } else if (['slip_and_fall', 'dog_bite'].includes(injuryCause)) {
            leadValue = state === 'CA' ? 250 : 40;
        } else if (injuryCause === 'workers_comp') {
            leadValue = state === 'CA' ? 200 : 16;
        }

        // Create walker_data object
        const walkerData = {
            ad_placement: data['ad_placement'],
            adset_id: data['adset_id'],
            aid: data['aid'],
            aid_name: data['aid_name'],
            Best_Time_to_Call: data['Best_Time_to_Call'],
            brandId: data['brand_id'],
            campaign_id: data['campaign_id'],
            cid: data['cid'],
            cid_name: data['cid_name'],
            city: data['city'],
            comments: comments,
            company: data['company'],
            email: data['email'],
            fbad_id: data['fbad_id'],
            first_name: data['first_name'],
            gclid: data['gclid'],
            geo: data['geo'],
            last_name: data['last_name'],
            Landing_Page: data['Landing_Page'],
            mediaSourceName: data['mediaSourceNameWebhook'],
            mediaSourceNameWebhook: data['mediaSourceNameWebhook'],
            msclkid: data['msclkid'],
            primary_phone: primaryPhone,
            state: data['state'],
            ttclid: data['ttclid'],
            type_of_legal_problem: typeOfLegalProblem,
            utm_campaign: data['utm_campaign'],
            utm_content: data['utm_content'],
            utm_medium: data['utm_medium'],
            utm_source: data['utm_source'],
            wbraid: data['wbraid'],
            xtm_adgroup: data['xtm_adgroup'],
            xtm_network: data['xtm_network'],
            xtm_offer: data['xtm_offer'],
            xtm_placement: data['xtm_placement'],
            zip: data['user_zip']
        };

        // Prepare serialized leadVars
        const serializedLeadVars = data['serializedLeadVars'] ? JSON.parse(data['serializedLeadVars']) : null;
        const leadVarQuery = serializedLeadVars ? new URLSearchParams(serializedLeadVars).toString() : '';

        if (devMode == 'logs') {
            console.log('Form submitted');
            console.log(walkerData);
            return;
        }

        try {
            let corsMode = devMode === 'no-cors' ? 'no-cors' : 'cors';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(walkerData),
            });

            const result = await response.json();
            const infoCode = response.status;

            let status, responseLeadId = '', responseText = '';

            if (infoCode == 200) {
                if (result.message === 'WebhookGenericPost_v2 successfully!') {
                    status = 'matched';
                    responseText = 'Success';
                    window.location.href = `${window.location.origin}/confirmation/?status=${status}&injury_cause=${injuryCause}&state=${walkerData.state}&lead=${leadValue}&mediaSourceName=${walkerData.mediaSourceName}&${leadVarQuery}`;
                } else {
                    status = 'unmatched';
                    responseText = Array.isArray(result) ? result.join(', ') : result;
                    window.location.href = `${window.location.origin}/confirmation/?status=${status}&message=${result.message}`;
                }
            } else {
                status = 'Error';
                responseText = `${infoCode} - Failed to POST`;
                window.location.href = `${window.location.origin}/confirmation/?status=${status}&response=${responseText}`;
            }
        } catch (error) {
            console.log(error);
            window.location.href = `${window.location.origin}/confirmation/?status=Error&response=Network Error`;

        }
    });

});
