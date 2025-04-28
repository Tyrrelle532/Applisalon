import 'package:flutter/material.dart';
import 'package:salon/widgets/categoryitem.dart';

class BeautyHomePage extends StatelessWidget {
  const BeautyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFDEEEE),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: const Icon(Icons.menu, color: Colors.black87),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text("Hi", style: TextStyle(fontSize: 16, color: Colors.black87)),
            Text("Doe John",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.black87)),
          ],
        ),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 15),
            child: CircleAvatar(
              backgroundImage: AssetImage("images/avatar.jpg"), // ton image
              radius: 20,
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Promo card
            Container(
              decoration: BoxDecoration(
                color: Colors.redAccent,
                borderRadius: BorderRadius.circular(20),
              ),
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text("Look Awesome & Save Some",
                            style: TextStyle(color: Colors.white, fontSize: 16)),
                        SizedBox(height: 8),
                        Text("Get Upto 50% off",
                            style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16)),
                      ],
                    ),
                  ),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(16),
                    child: Image.asset(
                      "images/promo.jpg", // image promo
                      width: 100,
                      height: 100,
                      fit: BoxFit.cover,
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text("Categories",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.black87)),
            const SizedBox(height: 12),

            // Grid catégories
            GridView.count(
              crossAxisCount: 3,
              shrinkWrap: true,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              physics: const NeverScrollableScrollPhysics(),
              children: const [
                CategoryItem("Hair Style"),
                CategoryItem("Hair Spa"),
                CategoryItem("Shampoo"),
                CategoryItem("Hair Dryer"),
                CategoryItem("Facial"),
                CategoryItem("Makeup"),
              ],
            ),

            const SizedBox(height: 20),
            const Text("Hair Specialist",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.black87)),
            const SizedBox(height: 12),

            // Specialist list
            SizedBox(
              height: 180,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: const [
                  SpecialistCard("Doe John", "732 8888 111", "images/promo.jpg", 3),
                  SpecialistCard("Lucy", "732 8888 111", "images/promo.jpg", 4),
                  SpecialistCard("Laila", "732 8888 111", "images/promo.jpg", 5),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
