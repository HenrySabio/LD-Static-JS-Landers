<?php
$use_dev_api = false;

if ($use_dev_api) {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
}

ob_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $url = 'https://api.walkeradvertising.com/api/WebHookGenericPost_v2';

    $type_of_legal_problem = $_POST['injury_cause'] ?? $_POST['Type_Of_Legal_Problem'] ?? $_POST['Type_Of_Accident'] ?? null;
    $comments = $_POST['comments'] ?? $_POST['case_details'] ?? null;
    $primary_phone = preg_replace("/[^0-9]/", "", $_POST['primary_phone']);

    if (empty($_POST['company'])) {
        header("Location: /confirmation/error/");
        exit();
    }

    $walker_data = [
        "ad_placement" => $_POST['ad_placement'],
        "adset_id" => $_POST['adset_id'],
        "aid" => $_POST['aid'],
        "aid_name" => $_POST['aid_name'],
        "Best_Time_to_Call" => $_POST['Best_Time_to_Call'],
        "brandId" => $_POST['brand_id'],
        "campaign_id" => $_POST['campaign_id'],
        "cid" => $_POST['cid'],
        "cid_name" => $_POST['cid_name'],
        "city" => $_POST['city'],
        "comments" => $comments,
        "company" => $_POST['company'],
        "email" => $_POST['email'],
        "fbad_id" => $_POST['fbad_id'],
        "first_name" => $_POST['first_name'],
        "gclid" => $_POST['gclid'],
        "geo" => $_POST['geo'],
        "last_name" => $_POST['last_name'],
        "Landing_Page" => $_POST['Landing_Page'],
        "mediaSourceName" => $_POST['mediaSourceNameWebhook'],
        "mediaSourceNameWebhook" => $_POST['mediaSourceNameWebhook'],
        "msclkid" => $_POST['msclkid'],
        "primary_phone" => $primary_phone,
        "state" => $_POST['state'],
        "ttclid" => $_POST['ttclid'],
        "type_of_legal_problem" => $type_of_legal_problem,
        "utm_campaign" => $_POST['utm_campaign'],
        "utm_content" => $_POST['utm_content'],
        "utm_medium" => $_POST['utm_medium'],
        "utm_source" => $_POST['utm_source'],
        "wbraid" => $_POST['wbraid'],
        "xtm_adgroup" => $_POST['xtm_adgroup'],
        "xtm_network" => $_POST['xtm_network'],
        "xtm_offer" => $_POST['xtm_offer'],
        "xtm_placement" => $_POST['xtm_placement'],
        "zip" => $_POST['user_zip']
    ];

    $request = json_encode($walker_data);

    $lead_value = 235;

    $injury_cause = $type_of_legal_problem;
    $state = $_POST['state'] ?? null;

    if (in_array($injury_cause, ["auto_accident", "bicycle_accident", "motorcycle_accident", "pedestrian_accident", "rideshare_accident", "truck_accident"]) && $state) {
        $lead_value = 235;
        $tier1_states = ["CA", "NV"];
        if (in_array($state, $tier1_states)) {
            $lead_value = 750;
        } elseif (in_array($state, ["FL", "TX"])) {
            $lead_value = 575;
        } elseif (in_array($state, ["AZ", "CO", "CT", "DC", "GA", "IA", "IL", "IN", "LA", "MD", "NY", "NJ", "PA", "SC", "TN", "UT", "VA", "WA"])) {
            $lead_value = 390;
        } elseif (in_array($state, ["AK", "AL", "AR", "DE", "HI", "ID", "KS", "KY", "MA", "ME", "MN", "MO", "MS", "MT", "ND", "NE", "NH", "NM", "OH", "OK", "OR", "RI", "SD", "VT", "WI", "WV", "WY"])) {
            $lead_value = 235;
        }
    } elseif (in_array($injury_cause, ["slip_and_fall", "dog_bite"])) {
        $lead_value = 40;
        if ($state == 'CA') {
            $lead_value = 250;
        }
    } elseif ($injury_cause == "workers_comp") {
        $lead_value = 16;
        if ($state == 'CA') {
            $lead_value = 200;
        }
    }

    $serializedLeadVars = $_POST['serializedLeadVars'] ?? null;

    if ($serializedLeadVars) {
        $serializedLeadVars = stripslashes($serializedLeadVars);
        $serializedLeadVars = json_decode($serializedLeadVars, true);
        $leadVarQuery = http_build_query($serializedLeadVars);
    } else {
        $leadVarQuery = '';
    }

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json'
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $request
    ]);

    $result = curl_exec($ch);
    $curl_info = curl_getinfo($ch);
    $info_code = $curl_info['http_code'];

    curl_close($ch);

    $return_array = [
        'http_code' => $info_code,
        'response_lead_id' => '',
        'status' => '',
        'response' => ''
    ];

    if ($info_code == 200) {
        $response = json_decode($result, true);

        if ($response == 'WebhookGenericPost_v2 successfully!') {
            $return_array['status'] = 'matched';
            $return_array['response'] = 'Success';

            if ($use_dev_api) {
                $requestText = json_encode($request, JSON_PRETTY_PRINT);
                error_log("Request Data: " . $requestText);
                echo "<pre>" . $requestText . "</pre>";
            } else {
                header("Location: /confirmation?status=" . $return_array['status'] . "&injury_cause=" . $injury_cause . "&state=" . $walker_data['state'] . "&lead=" . $lead_value . "&mediaSourceName=" . $walker_data['mediaSourceName'] . '&' . $leadVarQuery);
            }
            exit();
        } else {
            $return_array['status'] = 'unmatched';
            $return_array['response'] = implode(", ", $response);
            header("Location: /confirmation?status=" . $return_array['status']);
            exit();
        }
    } else {
        $return_array['status'] = 'Error';
        $return_array['response'] = $info_code . ' - Failed to POST';
        header("Location: /confirmation?status=" . $return_array['status'] . "&response=" . $return_array['response']);
        exit();
    }
}
ob_end_flush();

?>