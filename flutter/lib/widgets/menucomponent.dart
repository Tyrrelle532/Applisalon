import 'package:flutter/material.dart';
import 'package:salon/appoiement/calendarscreen.dart';
import 'package:salon/gallery/galleryscreen.dart';
import 'package:salon/home/homescrren.dart';
import 'package:salon/profile/profilscreen.dart';

class MenuNav extends StatefulWidget {
  const MenuNav({super.key});

  @override
  State<MenuNav> createState() => _MenuNavState();
}

class _MenuNavState extends State<MenuNav> {
  int index_color = 0;

  // Exemple d'écrans pour tester — à remplacer par tes vraies pages
  final List<Widget> screens = <Widget>[BeautyHomePage(),appoiementscreen(),Galleryscreen() , ProfilePage()];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: screens[index_color],
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        child: Padding(
          padding: const EdgeInsets.only(top: 7.5, bottom: 7.5),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(
                icon: Icons.home,
                label: 'Accueil',
                index: 0,
              ),
              _buildNavItem(
                icon: Icons.calendar_today,
                label: 'Rendez-vous',
                index: 1,
              ),
              const SizedBox(width: 10),
              _buildNavItem(
                icon: Icons.browse_gallery,
                label: 'Gallery',
                index: 2,
              ),
              _buildNavItem(
                icon: Icons.person,
                label: 'Profile',
                index: 3,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({required IconData icon, required String label, required int index}) {
    return GestureDetector(
      onTap: () {
        setState(() {
          index_color = index;
        });
      },
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 24,
            color: index_color == index ? const Color(0xffFF5B5B) : Colors.black,
          ),
          Text(
            label,
            style: TextStyle(
              color: index_color == index ? const Color(0xffFF5B5B) : Colors.black,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}
