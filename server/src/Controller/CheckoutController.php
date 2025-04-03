<?php

namespace App\Controller;

// use Stripe\Forwarding\Request;
use App\Entity\ShippingCountry;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use \Stripe\StripeClient;
use Symfony\Component\HttpFoundation\Request;

class CheckoutController extends AbstractController
{
    #[Route('/api/checkout', name: 'app_checkout', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $entityManager)
    {
        $whiteList = $entityManager->getRepository(ShippingCountry::class)->findBy(["blacklist"=>false]);
        $country_code = [];
        $allow_country = ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", 'KR', 'KW', "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"];
        foreach ($whiteList as $elem) {
            foreach($allow_country as $country){
                if($elem === $country){
                    array_push($country_code, $elem->getCountryCode());
                }
            }
        }
        $data = json_decode($request->getContent(), true);
        $items = [];
        foreach ($data as $item) {
            $tmp = [
                'price' => $item['price'],
                'quantity' => $item['quantity']
            ];
            array_push($items, $tmp);
        }
        $shipping_amount = intval($data[0]['shipping_amount']);
        $shipping_name = $data[0]['shipping_name'];
        $shipping_estimatedDays = $data[0]['shipping_estimatedDays'];
        $shipping = [];
        array_push($shipping, $shipping_amount, $shipping_name, $shipping_estimatedDays);
        $stripe = new StripeClient('sk_test_51NUbU2GrTRGUcbUFRaBZDqHBkr2o7xGKO1TMq1Nsphba1NviiZZqhbHjDt9tRrzU0u7eFc5kJAHDuNY06jvkfGDr00QfCClWJt');

        $YOUR_DOMAIN = 'http://localhost:3000';
        $resume_shipping = [$items, $shipping[0], $data[0]["tracking_num"]];
        
        $checkout_session = $stripe->checkout->sessions->create([
            'ui_mode' => 'embedded',
            'line_items' => $items,
            'mode' => 'payment',
            'shipping_address_collection' => [
                'allowed_countries' => $country_code,
            ],
            'shipping_options' => [
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => $shipping[0] * 100,
                            'currency' => 'eur',
                        ],
                        'display_name' => $shipping[1],
                        'delivery_estimate' => [
                            'maximum' => [
                                'unit' => 'business_day',
                                'value' => $shipping[2],
                            ],
                        ],
                    ],
                ],
            ],
            'payment_method_types' => ['card', 'paypal'],
            'return_url' => $YOUR_DOMAIN . '/return?session_id={CHECKOUT_SESSION_ID}&data='.urlencode(json_encode($resume_shipping)),
        ]);

        return $this->json(['clientSecret' => $checkout_session->client_secret], 200);
    }
}