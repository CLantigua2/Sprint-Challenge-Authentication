<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
session is an easy way to keep data across different requests (like state) so that you can track authenthication and verifaction using cookies.

2. What does bcrypt do to help us store passwords in a secure manner.
bcrypt takes in a password and rehashes it (also uses salt) to encrypt the password so that hackers will have a really hard time breaking through a users account.

3. What does bcrypt do to slow down attackers?
it encrypts a password multiple times and using salt, can add random characters generated throughout the hash for extra security.

4. What are the three parts of the JSON Web Token?
payload, secret key, and options.