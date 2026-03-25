import os
import glob
import re

html_files = glob.glob('pages/*/*.html')

for f in html_files:
    # Skip components dir
    if 'components/' in f:
        continue

    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Add i18n script
    if 'i18n.js' not in content:
        content = content.replace(
            '<script type="module" src="../../dist/components/theme.js" defer></script>',
            '<script type="module" src="../../dist/components/theme.js" defer></script>\n    <script type="module" src="../../dist/components/i18n.js" defer></script>'
        )

    # 2. Add data-i18n to footer
    content = content.replace('<li><a href="#">ABOUT</a></li>', '<li><a href="#" data-i18n="footer.about">ABOUT</a></li>')
    content = content.replace('<li><a href="#">MAP</a></li>', '<li><a href="#" data-i18n="footer.map">MAP</a></li>')
    content = content.replace('<li><a href="#">ZOOS</a></li>', '<li><a href="#" data-i18n="footer.zoos">ZOOS</a></li>')
    content = content.replace('<li><a href="#">CONTACT US</a></li>', '<li><a href="#" data-i18n="footer.contact">CONTACT US</a></li>')
    content = content.replace('<button class="footer__btn">DONATE FOR VOLUNTEERS →</button>', '<button class="footer__btn" data-i18n="footer.donate">DONATE FOR VOLUNTEERS →</button>')

    # 3. Add data-i18n to Modals
    content = content.replace('<h2 class="modal__title" id="modalTitle">\n', '<h2 class="modal__title" id="modalTitle" data-i18n="modal.title">\n')
    content = content.replace('<p class="modal__description">\n', '<p class="modal__description" data-i18n="modal.desc">\n')
    content = content.replace('data-amount="custom">Other Amount</button>', 'data-amount="custom" data-i18n="modal.other">Other Amount</button>')
    content = content.replace('placeholder="Enter amount"', 'placeholder="Enter amount" data-i18n-ph="ph.enterAmount"')
    content = content.replace('<button class="btn-custom-submit">DONATE →</button>', '<button class="btn-custom-submit" data-i18n="modal.customSubmit">DONATE →</button>')
    content = content.replace('<button class="btn-custom-cancel">Cancel</button>', '<button class="btn-custom-cancel" data-i18n="modal.customCancel">Cancel</button>')
    
    # Step 1
    content = content.replace('<h2 id="step1Title">Make Your Donation</h2>', '<h2 id="step1Title" data-i18n="step1.title">Make Your Donation</h2>')
    content = content.replace('<p class="section-label">Donation Information:</p>', '<p class="section-label" data-i18n="step1.info">Donation Information:</p>')
    content = content.replace('<p class="field-label"><span>*</span> Choose your donation amount:</p>', '<p class="field-label" data-i18n="step1.choose"><span>*</span> Choose your donation amount:</p>')
    content = content.replace('<button id="step1OtherBtn" class="btn-label" type="button">Other Amount</button>', '<button id="step1OtherBtn" class="btn-label" type="button" data-i18n="step1.other">Other Amount</button>')
    content = content.replace('<button class="btn-label" type="button">For Special Pet</button>', '<button class="btn-label" type="button" data-i18n="step1.pet">For Special Pet</button>')
    content = content.replace('<option value="" disabled selected>Choose your favourite</option>', '<option value="" disabled selected data-i18n="step1.selectPet">Choose your favourite</option>')
    content = content.replace('<label for="recurringGift">Make this a monthly recurring gift</label>', '<label for="recurringGift" data-i18n="step1.recurring">Make this a monthly recurring gift</label>')
    content = re.sub(r'<button class="btn-next">\s*Next <span class="arrow">→</span>\s*</button>', '<button class="btn-next">\n            <span data-i18n="step1.next">Next</span> <span class="arrow">→</span>\n          </button>', content)

    # Step 2
    content = content.replace('<h2 id="step2Title">Make Your Donation</h2>', '<h2 id="step2Title" data-i18n="step2.title">Make Your Donation</h2>')
    content = content.replace('<div class="billing-header">Billing Information:</div>', '<div class="billing-header" data-i18n="step2.billing">Billing Information:</div>')
    content = content.replace('<label><span class="required-asterisk">*</span>Your Name</label>', '<label><span class="required-asterisk">*</span> <span data-i18n="step2.name">Your Name</span></label>')
    content = content.replace('placeholder="First and last name"', 'placeholder="First and last name" data-i18n-ph="ph.firstName"')
    content = content.replace('<label><span class="required-asterisk">*</span>Your Email Address</label>', '<label><span class="required-asterisk">*</span> <span data-i18n="step2.email">Your Email Address</span></label>')
    content = content.replace('placeholder="Enter your email"', 'placeholder="Enter your email" data-i18n-ph="ph.enterEmail"')
    content = content.replace('<button type="button" class="step2-back-link">Back</button>', '<button type="button" class="step2-back-link" data-i18n="step2.back">Back</button>')
    
    content = re.sub(r'<button type="button" class="step2-next-btn">\s*NEXT <span class="arrow-icon">→</span>\s*</button>', '<button type="button" class="step2-next-btn">\n              <span data-i18n="step2.next">NEXT</span> <span class="arrow-icon">→</span>\n            </button>', content)
    content = re.sub(r'<p class="disclaimer">\s*You will receive emails from the Online Zoo, including updates and news<br />\s*on the latest discoveries and translations\. You can unsubscribe at any time\.\s*</p>', '<p class="disclaimer" data-i18n="step2.disclaimer">\n              You will receive emails from the Online Zoo, including updates and news<br />\n              on the latest discoveries and translations. You can unsubscribe at any time.\n            </p>', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Updated {f}")
