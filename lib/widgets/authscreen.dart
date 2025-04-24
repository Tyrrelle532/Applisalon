import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:salon/auth/login/loginscreen.dart';
import 'package:salon/auth/signup/signupscreen.dart';


class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  PageController _pageController = PageController();
  int _selectedIndex = 0;

  void _switchTab(int index) {
    setState(() => _selectedIndex = index);
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Fond avec flou
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage("images/bg.jpg"), // à remplacer
                fit: BoxFit.cover,
              ),
            ),
          ),
          BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 4, sigmaY: 4),
            child: Container(color: Colors.black.withOpacity(0.1)),
          ),

          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.7),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      blurRadius: 10,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Onglets
                    Row(
                      children: [
                        Expanded(
                          child: GestureDetector(
                            onTap: () => _switchTab(0),
                            child: Container(
                              decoration: BoxDecoration(
                                color: _selectedIndex == 0
                                    ? const Color(0xFFFF6B6B)
                                    : Colors.white,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              child: Center(
                                child: Text(
                                  "Login",
                                  style: TextStyle(
                                    color: _selectedIndex == 0
                                        ? Colors.white
                                        : Colors.black54,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: GestureDetector(
                            onTap: () => _switchTab(1),
                            child: Container(
                              decoration: BoxDecoration(
                                color: _selectedIndex == 1
                                    ? const Color(0xFFFF6B6B)
                                    : Colors.white,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              child: Center(
                                child: Text(
                                  "Sign-up",
                                  style: TextStyle(
                                    color: _selectedIndex == 1
                                        ? Colors.white
                                        : Colors.black54,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),

                    // Pages
                    SizedBox(
                      height: 350, // adapte la hauteur selon besoin
                      child: PageView(
                        controller: _pageController,
                        physics: const NeverScrollableScrollPhysics(),
                        children: const [
                          LoginPage(),
                          SignUpPage(),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
