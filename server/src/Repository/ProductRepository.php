<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

//    /**
//     * @return Product[] Returns an array of Product objects
//     */
   public function findAllWithPromotion(): array
   {
       return $this->createQueryBuilder('p')
           ->andWhere('p.promotion != :val')
           ->setParameter('val', 1)
           ->orderBy('p.id', 'ASC')
           ->getQuery()
           ->getResult()
       ;
   }

   public function findModele($start, $fin): array
   {
       return $this->createQueryBuilder('p')
           ->andWhere('p.nameEn LIKE :start')
           ->setParameter('start', $start.'%')
           ->andWhere('p.nameEn LIKE :fin')
           ->setParameter('fin','%'.$fin)
           ->getQuery()
           ->getResult()
       ;
   }

//    public function findOneBySomeField($value): ?Product
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
