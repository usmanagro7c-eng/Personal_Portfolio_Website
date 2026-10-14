from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT

styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameCustom',fontName='Helvetica-Bold',fontSize=24,leading=30,textColor=colors.HexColor('#0B0F19'),spaceAfter=8))
styles.add(ParagraphStyle(name='SubCustom',fontSize=10,leading=15,textColor=colors.HexColor('#147D91'),spaceAfter=10))
styles.add(ParagraphStyle(name='SectionCustom',fontName='Helvetica-Bold',fontSize=11,leading=16,textColor=colors.HexColor('#147D91'),spaceBefore=13,spaceAfter=6))
styles.add(ParagraphStyle(name='BodyCustom',fontSize=9,leading=13,spaceAfter=6))
story=[]
def para(text,style='BodyCustom'): story.append(Paragraph(text,styles[style]))
para('MUHAMMAD USMAN AZIZ','NameCustom')
para('AI &amp; Full-Stack Software Engineer | Enterprise ERP Specialist','SubCustom')
para('Faisalabad, Punjab, Pakistan | Open to Remote &amp; Global Opportunities<br/>usmanamjad495@gmail.com | (+92) 321 6692660<br/><link href="https://github.com/MaAn-41">github.com/MaAn-41</link> | <link href="https://github.com/usmanagro7c-eng">github.com/usmanagro7c-eng</link><br/><link href="https://www.linkedin.com/in/usmanamjad41/">linkedin.com/in/usmanamjad41</link> | <link href="https://medium.com/@usmanamjad495">medium.com/@usmanamjad495</link>')
para('PROFILE','SectionCustom')
para('FAST-NUCES Computer Science alumnus with 1+ years of enterprise software experience at Agrovisions and 7+ years of technical instruction and mentorship. Focused on production GenAI systems, custom ERPNext platforms and offline-first mobile applications.')
para('EXPERIENCE','SectionCustom')
para('<b>Agrovisions | Software Engineer</b> &mdash; Oct 2025 - Present<br/>Developed custom enterprise ERPNext solutions, reducing manual sales/invoicing time by 40%. Engineered cryptographic QR verification for 500+ commercial documents. Built ETL pipelines migrating 5+ years of QuickBooks Desktop records with 100% data fidelity.')
para('<b>The Century Academy | CS &amp; STEM Instructor</b> &mdash; Aug 2019 - Present<br/>Mentored 150+ students in Computer Science, Mathematics and Python with a 95%+ board pass rate.')
para('<b>Internships</b> &mdash; Jul 2024 - Sep 2024<br/>CodeAlpha: AI Intern | Oasis Infobyte: Data Analyst Intern | GrowIntern: ML Intern')
para('SELECTED PROJECTS','SectionCustom')
para('<b>Deaf-ED:</b> Assistive PSL sign-language mobile app with 90%+ real-time recognition. MERN, OpenCV, LSTM.<br/><b>Stockly:</b> Offline-first inventory, sales and profit manager with Google Sheets OAuth sync. TanStack Start, TypeScript, Dexie, Capacitor.<br/><b>QuickBooks to ERPNext:</b> Automated migration of 5+ years of financial data. Frappe, ERPNext, Python, Pandas.<br/><b>QuickBooks Data Extractor:</b> Production extraction engine exporting 20+ transaction types. Python, QBXML, VBScript COM.<br/><b>Document Verification:</b> Cryptographic ERPNext QR validation.<br/><b>Medical AI Assistant:</b> Clinical reasoning with RAG, LLMs and vector retrieval.<br/><b>Oxigen:</b> Retail storefront with live multi-warehouse ERPNext sync.<br/><b>Shopify AI Assistant:</b> 24/7 intelligent support and semantic search.<br/><b>Gemini Web 2 API:</b> OpenAI-compatible Gemini REST gateway.<br/><b>Shayar AI:</b> Urdu poetry generation with LSTM/GRU.')
para('TECHNICAL SKILLS','SectionCustom')
para('<b>Languages:</b> Python, TypeScript, JavaScript, C++, SQL, HTML5/CSS3, R.<br/><b>AI:</b> Generative AI, LLMs, RAG, LoRA/PEFT, PyTorch, TensorFlow, OpenCV, Keras, Hugging Face.<br/><b>Web &amp; Mobile:</b> React, TanStack Start, Node.js, Express, Frappe/ERPNext, Tailwind, REST APIs, Webhooks, Dexie, Cloudflare Workers, React Native, Capacitor, Android Studio, Expo Go.<br/><b>Data:</b> MariaDB/MySQL, MongoDB, Google Sheets API, QuickBooks SDK.')
para('EDUCATION','SectionCustom')
para('<b>FAST-NUCES</b> &mdash; BS Computer Science')
SimpleDocTemplate('public/Muhammad-Usman-Aziz-Resume.pdf',pagesize=(595,842),rightMargin=38,leftMargin=38,topMargin=34,bottomMargin=30,title='Muhammad Usman Aziz - Resume',author='Muhammad Usman Aziz').build(story)
print('Resume PDF created from supplied portfolio facts.')
