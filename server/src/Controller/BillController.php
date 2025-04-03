<?php

namespace App\Controller;

use App\Entity\Bill;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BillController extends AbstractController
{
    #[Route('/api/bills/{user}', name: 'app_bill', methods:["GET"])]
    public function index(EntityManagerInterface $entityManager, string $user)
    {
        $bills = $entityManager->getRepository(Bill::class)->findBy(["email"=>$user]);
        return $this->json(["bills"=>$bills], 200);
    }
}
