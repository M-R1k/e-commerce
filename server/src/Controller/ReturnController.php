<?php

namespace App\Controller;

use App\Entity\Bill;
use App\Entity\Cart;
use App\Entity\CartItem;
use App\Entity\Product;
use App\Entity\Tracking;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use \Stripe\StripeClient;
use DateTime;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class ReturnController extends AbstractController
{
    #[Route('/api/return', name: 'app_return', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $entityManager, MailerInterface $mailer)
    {

        $stripe = new StripeClient('sk_test_51NUbU2GrTRGUcbUFRaBZDqHBkr2o7xGKO1TMq1Nsphba1NviiZZqhbHjDt9tRrzU0u7eFc5kJAHDuNY06jvkfGDr00QfCClWJt');

        try {

            $jsonObj = json_decode($request->getContent(), true);
            $data = $jsonObj["formData"];

            $session = $stripe->checkout->sessions->retrieve($data['session_id']);
            $product = json_decode(urldecode($data["data"]));
            $products = [];
             
            foreach($product[0] as $elem ){
                $obj = $entityManager->getRepository(Product::class)->findOneBy(["keyStripe"=>$elem->price]);
                array_push($products, [$obj->getName(), $obj->getPrice(), $elem->quantity ]);
            }

            $user = $entityManager->getRepository(User::class)->findOneBy(["email"=>$data["user"]]);

            if($user){
                $tracking = new Tracking;
                $tracking->setUser($user);
                $tracking->setNumber($product[2]);
                $tracking->setStatus("PRE_TRANSIT");
                $now = new DateTime();
                $now->format("Y-m-d H:i:s");
                $tracking->setLastUpdate($now);
                $entityManager->persist($tracking);
                $entityManager->flush();
                
                $cart = $entityManager->getRepository(Cart::class)->findOneBy(["user"=>$user]);
                $cartItem = $entityManager->getRepository(CartItem::class)->findBy(["cart"=>$cart]);
                if($cartItem){
                    foreach($cartItem as $elem){
                        $entityManager->remove($elem);
                        $entityManager->flush();
                    }
                }
            }else{
                $email = (new TemplatedEmail())
                    ->from(new Address('gamaza@gamaza.com'))
                    ->to($session->customer_details->email)
                    ->subject('Command status')
                    ->html('<p>Your order is in preparation before shipping.</p>');
                $mailer->send($email);

                sleep(10);
                $email = (new TemplatedEmail())
                    ->from(new Address('gamaza@gamaza.com'))
                    ->to($session->customer_details->email)
                    ->subject('Command status')
                    ->html('<p>Your order is shipping.</p>');
                $mailer->send($email);

                sleep(10);
                $email = (new TemplatedEmail())
                    ->from(new Address('gamaza@gamaza.com'))
                    ->to($session->customer_details->email)
                    ->subject('Command status')
                    ->html('<p>Your order is delivered.</p>');
                $mailer->send($email);
            }

            if($data["user"]){
                if($products && $product[1] && $product[2]){
                    $bill = New Bill;
                    $bill->setEmail($data["user"]);
                    $bill->setProducts($products);
                    $bill->setShippingAmount($product[1]);
                    $now = new DateTime();
                    $now->format("Y-m-d H:i:s");
                    $bill->setLastUpdate($now);
                    $bill->setTrackingNumber( $product[2]);
                    $entityManager->persist($bill);
                    $entityManager->flush();
                }
                
            }else if($products && $session->customer_details->email && $product[1] && $product[2]){
                $bill = New Bill;
                $bill->setEmail($session->customer_details->email);
                $bill->setProducts($products);
                $bill->setShippingAmount($product[1]);
                $now = new DateTime();
                $now->format("Y-m-d H:i:s");
                $bill->setLastUpdate($now);
                $bill->setTrackingNumber( $product[2]);
                $entityManager->persist($bill);
                $entityManager->flush();
            }

            return $this->json(['status' => $session->status, 'customer_email' => $session->customer_details->email], 200);

        } catch (\Throwable $e) {

            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}