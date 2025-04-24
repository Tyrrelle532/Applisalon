import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:salon/widgets/menucomponent.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  bool rememberMe = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const TextField(
          decoration: InputDecoration(
            hintText: "Name",
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(12)),
              borderSide: BorderSide.none,
            ),
          ),
        ),
        const SizedBox(height: 10),
        const TextField(
          decoration: InputDecoration(
            hintText: "Email",
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(12)),
              borderSide: BorderSide.none,
            ),
          ),
        ),
        const SizedBox(height: 10),
        const TextField(
          obscureText: true,
          decoration: InputDecoration(
            hintText: "Password",
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(12)),
              borderSide: BorderSide.none,
            ),
          ),
        ),
        const SizedBox(height: 10),
        const TextField(
          obscureText: true,
          decoration: InputDecoration(
            hintText: "Confirm Password",
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(12)),
              borderSide: BorderSide.none,
            ),
          ),
        ),
        const SizedBox(height: 10),

        // Remember me
        Row(
          children: [
            Checkbox(
              value: rememberMe,
              onChanged: (value) {
                setState(() {
                  rememberMe = value ?? false;
                });
              },
              activeColor: const Color(0xFFFF6B6B),
            ),
            const Text("Remember Me"),
          ],
        ),
        const SizedBox(height: 10),

        ElevatedButton(
          onPressed: () {
            // Traitement ici
            if (rememberMe) {
              // Logique de stockage (SharedPreferences, etc.)
            }
             Navigator.of(context).push(MaterialPageRoute(
              builder: (context) =>  MenuNav()));
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFFF6B6B),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            minimumSize: const Size(double.infinity, 50),
          ),
          child: const Text("Sign-up"),
        ),
      ],
    );
  }
}
