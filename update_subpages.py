import os
import re

# livezoo
path = 'pages/livezoo/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<h1 class="page-title">LIVE PANDA CAMS</h1>', '<h1 class="page-title" data-i18n="livezoo.pandaTitle">LIVE PANDA CAMS</h1>')
content = content.replace('<h2>MORE LIVE VIEWS</h2>', '<h2 data-i18n="livezoo.moreLive">MORE LIVE VIEWS</h2>')
content = content.replace('<h2>MAKE THE BAMBOO DONATION!</h2>', '<h2 data-i18n="livezoo.donateTitle">MAKE THE BAMBOO DONATION!</h2>')
content = content.replace('<p>\n          Our process for bamboo donations first starts with a site evaluation.\n          Thank you for your interest in donating bamboo for our pandas.\n        </p>', '<p data-i18n="livezoo.donateText">\n          Our process for bamboo donations first starts with a site evaluation.\n          Thank you for your interest in donating bamboo for our pandas.\n        </p>')
content = content.replace('<h2>DID YOU KNOW?</h2>', '<h2 data-i18n="livezoo.didYouKnow">DID YOU KNOW?</h2>')
content = content.replace('<span class="view-map" id="view-map-panda">VIEW MAP →</span>', '<span class="view-map" id="view-map-panda" data-i18n="livezoo.viewMap">VIEW MAP →</span>')

content = content.replace('<h1 class="page-title">LIVE BALD EAGLE CAMS</h1>', '<h1 class="page-title" data-i18n="livezoo.eagleTitle">LIVE BALD EAGLE CAMS</h1>')
content = content.replace('<span class="view-map" id="view-map-eagle">VIEW MAP →</span>', '<span class="view-map" id="view-map-eagle" data-i18n="livezoo.viewMap">VIEW MAP →</span>')

content = content.replace('<h1 class="page-title">LIVE GORILLA CAMS</h1>', '<h1 class="page-title" data-i18n="livezoo.gorillaTitle">LIVE GORILLA CAMS</h1>')
content = content.replace('<span class="view-map" id="view-map-gorilla">VIEW MAP →</span>', '<span class="view-map" id="view-map-gorilla" data-i18n="livezoo.viewMap">VIEW MAP →</span>')

content = content.replace('<h1 class="page-title">LIVE LEMUR CAMS</h1>', '<h1 class="page-title" data-i18n="livezoo.lemurTitle">LIVE LEMUR CAMS</h1>')
content = content.replace('<span class="view-map" id="view-map-lemur">VIEW MAP →</span>', '<span class="view-map" id="view-map-lemur" data-i18n="livezoo.viewMap">VIEW MAP →</span>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)


# contact_us
path = 'pages/contact_us/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<h1>GET IN TOUCH</h1>', '<h1 data-i18n="contact.title">GET IN TOUCH</h1>')
content = content.replace("<p>Whether you have a question, or would like to say hello, we're happy to hear from you. Please use the form to send us a message and we'll get back to you as soon as we can.</p>", '<p data-i18n="contact.text">Whether you have a question, or would like to say hello, we\'re happy to hear from you. Please use the form to send us a message and we\'ll get back to you as soon as we can.</p>')
content = content.replace('<label for="name">Your Name</label>', '<label for="name" data-i18n="contact.name">Your Name</label>')
content = content.replace('placeholder="First and last name"', 'placeholder="First and last name" data-i18n-ph="ph.firstName"')
content = content.replace('<label for="email">Your Email Address</label>', '<label for="email" data-i18n="contact.email">Your Email Address</label>')
content = content.replace('placeholder="Enter your email"', 'placeholder="Enter your email" data-i18n-ph="ph.enterEmail"')
content = content.replace('<label for="subject">Subject</label>', '<label for="subject" data-i18n="contact.subject">Subject</label>')
content = content.replace('placeholder="Enter the subject"', 'placeholder="Enter the subject" data-i18n-ph="ph.enterSubject"')
content = content.replace('<label for="message">Message</label>', '<label for="message" data-i18n="contact.message">Message</label>')
content = content.replace('placeholder="Enter your message"', 'placeholder="Enter your message" data-i18n-ph="ph.enterMessage"')
content = content.replace('<button type="submit" class="submit-btn" id="contactUsSendBtn">SEND MESSAGE →</button>', '<button type="submit" class="submit-btn" id="contactUsSendBtn" data-i18n="contact.send">SEND MESSAGE →</button>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)


# signin
path = 'pages/signin/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<h2>WELCOME BACK</h2>', '<h2 data-i18n="signin.title">WELCOME BACK</h2>')
content = content.replace('<p>Sign in to your account</p>', '<p data-i18n="signin.subtitle">Sign in to your account</p>')
content = content.replace('<label for="login">Login</label>', '<label for="login" data-i18n="signin.login">Login</label>')
content = content.replace('<label for="password">Password</label>', '<label for="password" data-i18n="signin.password">Password</label>')
content = content.replace('<button type="submit" class="auth-btn">SIGN IN &rarr;</button>', '<button type="submit" class="auth-btn" data-i18n="signin.btn">SIGN IN &rarr;</button>')
content = content.replace("<p>Don't have an account? <a href=\"../register/index.html\">Create Account</a></p>", '<p><span data-i18n="signin.noAccount">Don\'t have an account?</span> <a href="../register/index.html" data-i18n="signin.register">Create Account</a></p>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)


# register
path = 'pages/register/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<h2>CREATE ACCOUNT</h2>', '<h2 data-i18n="register.title">CREATE ACCOUNT</h2>')
content = content.replace('<p>Join our community and help protect wildlife</p>', '<p data-i18n="register.subtitle">Join our community and help protect wildlife</p>')
content = content.replace('<label for="login">Login</label>', '<label for="login" data-i18n="register.login">Login</label>')
content = content.replace('<label for="full_name">Full Name</label>', '<label for="full_name" data-i18n="register.name">Full Name</label>')
content = content.replace('<label for="gmail">Gmail</label>', '<label for="gmail" data-i18n="register.gmail">Gmail</label>')
content = content.replace('<label for="password">Password</label>', '<label for="password" data-i18n="register.password">Password</label>')
content = content.replace('<button type="submit" class="auth-btn">CREATE ACCOUNT &rarr;</button>', '<button type="submit" class="auth-btn" data-i18n="register.btn">CREATE ACCOUNT &rarr;</button>')
content = content.replace('<p>Already have an account? <a href="../signin/index.html">Sign In</a></p>', '<p><span data-i18n="register.hasAccount">Already have an account?</span> <a href="../signin/index.html" data-i18n="register.signin">Sign In</a></p>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('done specific subpages')
