// Hindi menus for Varnum. Swaps the app's own labels, buttons and messages between English and Hindi.
// Letters, file contents and anything the user typed are never changed.
(function () {
  const KEY = "anuvad:uiLang";
  const D = {
    "Write in English, get it in Hindi or any language.": "अंग्रेज़ी में लिखिए, हिंदी या किसी भी भाषा में पाइए।",
    "Sign in": "साइन इन", "Create account": "खाता बनाएँ", "Full name": "पूरा नाम", "Email": "ईमेल", "Password": "पासवर्ड",
    "Confirm password": "पासवर्ड दोबारा", "Your account is saved in this browser on this device. ·": "आपका खाता इसी डिवाइस के इस ब्राउज़र में सुरक्षित है। ·",
    "Your account is saved in this browser on this device.": "आपका खाता इसी डिवाइस के इस ब्राउज़र में सुरक्षित है।",
    "How to write a letter in Hindi": "हिंदी में पत्र कैसे लिखें",
    "Enter a valid email address.": "सही ईमेल पता लिखें।", "Enter your name.": "अपना नाम लिखें।",
    "Password must be at least 6 characters.": "पासवर्ड कम से कम 6 अक्षर का हो।", "The two passwords do not match.": "दोनों पासवर्ड एक जैसे नहीं हैं।",
    "An account with this email already exists. Sign in instead.": "इस ईमेल से खाता पहले से है। साइन इन करें।",
    "No account with this email. Create one first.": "इस ईमेल से कोई खाता नहीं है। पहले खाता बनाएँ।", "Wrong password.": "पासवर्ड गलत है।",
    "Letter": "पत्र", "Word": "वर्ड", "PowerPoint": "पावरपॉइंट", "PDF": "पीडीएफ", "Hi,": "नमस्ते,", "Sign out": "साइन आउट",
    "· free translation (no key)": "· मुफ़्त अनुवाद", "Translate into": "किस भाषा में", "Writer is": "लिखने वाले", "Male": "पुरुष", "Female": "महिला",
    "Numbers": "अंक", "Install app": "ऐप इंस्टॉल करें", "Share app": "ऐप शेयर करें", "Ready": "तैयार", "Up to date": "अनुवाद पूरा",
    "Start from": "शुरुआत", "Bank request (example)": "बैंक अनुरोध (उदाहरण)", "Leave application": "छुट्टी का आवेदन", "Complaint letter": "शिकायत पत्र",
    "Job application": "नौकरी का आवेदन", "School fee concession": "स्कूल फ़ीस में छूट", "Address change request": "पता बदलने का अनुरोध",
    "Thank-you letter": "धन्यवाद पत्र", "Blank page": "खाली पन्ना", "Examples": "उदाहरण", "Government & office": "सरकारी और दफ़्तर",
    "School & college": "स्कूल और कॉलेज", "Job": "नौकरी", "Bank": "बैंक", "Home & personal": "घर और निजी",
    "Police complaint (lost item)": "पुलिस शिकायत (खोया सामान)", "Electricity complaint": "बिजली की शिकायत", "Water supply complaint": "पानी की शिकायत",
    "Road / street light repair": "सड़क / स्ट्रीट लाइट मरम्मत", "RTI application": "आरटीआई आवेदन", "Gas connection transfer": "गैस कनेक्शन ट्रांसफ़र",
    "NOC request": "एनओसी अनुरोध", "School leaving / TC request": "स्कूल छोड़ना / टीसी अनुरोध", "Scholarship request": "छात्रवृत्ति अनुरोध",
    "Bonafide / character certificate": "बोनाफ़ाइड / चरित्र प्रमाण-पत्र", "Sick leave (office)": "बीमारी की छुट्टी (दफ़्तर)", "Resignation letter": "त्याग-पत्र",
    "Salary increase request": "वेतन वृद्धि अनुरोध", "Experience certificate request": "अनुभव प्रमाण-पत्र अनुरोध", "Block ATM / debit card": "एटीएम / डेबिट कार्ड बंद करें",
    "Bank KYC update": "बैंक केवाईसी अपडेट", "Close bank account": "बैंक खाता बंद करें", "Loan application": "ऋण आवेदन",
    "Rent agreement / notice to landlord": "किराया अनुबंध / मकान मालिक को नोटिस", "Invitation": "निमंत्रण", "Condolence letter": "शोक पत्र",
    "Live translate: On": "साथ-साथ अनुवाद: चालू", "Live translate: Off": "साथ-साथ अनुवाद: बंद", "Translate now": "अभी अनुवाद करें", "⇄ Swap": "⇄ उल्टा करें",
    "🎤 Speak": "🎤 बोलकर लिखें", "■ Stop": "■ रोकें", "📷 Photo to text": "📷 फ़ोटो से टेक्स्ट", "Insert phrase…": "वाक्यांश जोड़ें…",
    "Openings": "शुरुआत", "Requests": "अनुरोध", "Closings": "समापन", "Lines": "पंक्तियाँ",
    "Save letter": "पत्र सहेजें", "My letters": "मेरे पत्र", "None saved yet": "अभी कोई पत्र नहीं", "No letters match": "कोई पत्र नहीं मिला", "Folder": "फ़ोल्डर",
    "All folders": "सभी फ़ोल्डर", "Government": "सरकारी", "Police": "पुलिस", "Personal": "निजी", "Other": "अन्य", "Delete": "हटाएँ",
    "Press again to delete": "हटाने के लिए फिर दबाएँ", "Search my letters": "मेरे पत्र खोजें",
    "My details, letterhead and signature": "मेरी जानकारी, लेटरहेड और हस्ताक्षर", "· filled into new letters": "· नए पत्रों में अपने-आप भरेगी",
    "Your name or organisation": "आपका या संस्था का नाम", "Address": "पता", "Phone or email": "फ़ोन या ईमेल",
    "Signature (photo of your sign on white paper)": "हस्ताक्षर (सफ़ेद काग़ज़ पर किए हस्ताक्षर की फ़ोटो)", "Add signature": "हस्ताक्षर जोड़ें",
    "Change signature": "हस्ताक्षर बदलें", "Remove": "हटाएँ", "Put letterhead on PDF": "पीडीएफ़ पर लेटरहेड लगाएँ", "Put signature on PDF": "पीडीएफ़ पर हस्ताक्षर लगाएँ",
    "Page design": "पेज डिज़ाइन", "Plain": "सादा", "Government office (double border)": "सरकारी दफ़्तर (दोहरी बॉर्डर)",
    "School / college (coloured header)": "स्कूल / कॉलेज (रंगीन हेडर)", "Company / office (side bar)": "कंपनी / दफ़्तर (साइड पट्टी)",
    "Logo (shown on the letterhead)": "लोगो (लेटरहेड पर)", "Add logo": "लोगो जोड़ें", "Change logo": "लोगो बदलें",
    "Leave a box for seal / stamp": "मुहर के लिए जगह छोड़ें", "You write": "आप लिखें", "any language": "कोई भी भाषा", "you can edit this too": "इसे भी बदल सकते हैं",
    "You changed the translation, so live updates are paused.": "आपने अनुवाद बदला है, इसलिए साथ-साथ अनुवाद रुका है।", "Translate again": "फिर से अनुवाद करें",
    "Tip: double-click any word to see its meaning.": "सुझाव: किसी शब्द का अर्थ देखने के लिए उस पर डबल-क्लिक करें।",
    "Download PDF (to print)": "पीडीएफ़ डाउनलोड करें (प्रिंट के लिए)", "Print": "प्रिंट", "Download Word": "वर्ड डाउनलोड करें", "Many people…": "कई लोगों के लिए…",
    "Copy": "कॉपी", "WhatsApp": "व्हाट्सऐप", "Listen": "सुनें", "English + translation in one PDF": "अंग्रेज़ी + अनुवाद एक पीडीएफ़ में",
    "Open a Word file (.docx)": "वर्ड फ़ाइल खोलें (.docx)",
    "Tap to choose, or drop it here. Every paragraph shows up below, and you can translate them all at once.": "चुनने के लिए टैप करें या यहाँ छोड़ें। हर पैराग्राफ़ नीचे दिखेगा, और सबका एक साथ अनुवाद हो सकता है।",
    "Translate whole file": "पूरी फ़ाइल का अनुवाद", "Download .docx": ".docx डाउनलोड करें", "Close file": "फ़ाइल बंद करें",
    "Edit any paragraph. Changed paragraphs are outlined. Headings, tables, pictures and page layout stay as they were.": "कोई भी पैराग्राफ़ बदलें। बदले हुए पैराग्राफ़ पर निशान दिखेगा। हेडिंग, टेबल, चित्र और पेज लेआउट वैसे ही रहेंगे।",
    "Open a PowerPoint file (.pptx)": "पावरपॉइंट फ़ाइल खोलें (.pptx)",
    "Tap to choose, or drop it here. Every text box shows up below, slide by slide.": "चुनने के लिए टैप करें या यहाँ छोड़ें। हर टेक्स्ट बॉक्स नीचे स्लाइड के क्रम में दिखेगा।",
    "Translate all slides": "सभी स्लाइड का अनुवाद", "Download .pptx": ".pptx डाउनलोड करें",
    "Edit any line. Changed lines are outlined. Layout, pictures and colours stay as they were.": "कोई भी पंक्ति बदलें। बदली हुई पंक्तियों पर निशान दिखेगा। लेआउट, चित्र और रंग वैसे ही रहेंगे।",
    "Open a PDF": "पीडीएफ़ खोलें", "Tap to choose, or drop it here. Then add text, hide old text, or translate.": "चुनने के लिए टैप करें या यहाँ छोड़ें। फिर टेक्स्ट जोड़ें, पुराना टेक्स्ट छिपाएँ, या अनुवाद करें।",
    "Add text": "टेक्स्ट जोड़ें", "Hide old text": "पुराना टेक्स्ट छिपाएँ", "Size": "आकार", "Colour": "रंग", "Black": "काला", "Blue": "नीला", "Red": "लाल", "Green": "हरा",
    "Translate whole PDF": "पूरी पीडीएफ़ का अनुवाद", "Download PDF": "पीडीएफ़ डाउनलोड करें",
    "Choose “Add text” and tap the page to type. Choose “Hide old text” and drag over words to cover them, then type new words on top.": "“टेक्स्ट जोड़ें” चुनकर पेज पर टैप करें और लिखें। “पुराना टेक्स्ट छिपाएँ” चुनकर शब्दों पर खींचें, फिर ऊपर नए शब्द लिखें।",
    "· Free translation runs on your device in Chrome (desktop), or through the free MyMemory service. Files stay in your browser.": "· मुफ़्त अनुवाद क्रोम में आपके डिवाइस पर या मुफ़्त MyMemory सेवा से होता है। फ़ाइलें आपके ब्राउज़र में ही रहती हैं।",
    "Share Varnum": "वर्णम शेयर करें", "Scan the code or send the link. Free to use.": "कोड स्कैन करें या लिंक भेजें। बिल्कुल मुफ़्त।", "Copy link": "लिंक कॉपी करें",
    "More…": "और…", "Close": "बंद करें", "One letter for many people": "एक पत्र, कई लोग", "Write the letter once with a placeholder like": "पत्र एक बार लिखें और जहाँ नाम आना है वहाँ",
    "where the person's name goes. Then list the names here, one per line. You get one PDF with a letter for each.": "लिखें। फिर यहाँ हर पंक्ति में एक नाम लिखें। सबके पत्र एक पीडीएफ़ में मिलेंगे।",
    "Placeholder in the letter": "पत्र में नाम की जगह", "Names (one per line)": "नाम (हर पंक्ति में एक)",
    "Tip: to add more details, write them after the name with a “|”, for example": "सुझाव: ज़्यादा जानकारी के लिए नाम के बाद “|” लगाकर लिखें, जैसे",
    ", and put": ", और पत्र में", "in the letter where the second detail goes.": "वहाँ लिखें जहाँ दूसरी जानकारी आनी है।", "Make PDF": "पीडीएफ़ बनाएँ",
    "Feedback": "सुझाव", "Feedback / Contact": "सुझाव / संपर्क", "Found a mistake, want a new letter, or need help? Tell us.": "कोई गलती मिली, नया पत्र चाहिए, या मदद चाहिए? हमें बताइए।",
    "Your name": "आपका नाम", "Phone or WhatsApp": "फ़ोन या व्हाट्सऐप", "Message": "संदेश", "Send": "भेजें", "Sending…": "भेज रहे हैं…", "Thank you!": "धन्यवाद!",
    "We got your message and will reply soon.": "आपका संदेश मिल गया, हम जल्द जवाब देंगे।", "OK": "ठीक है",
    "Use the translation as your text and translate it back": "अनुवाद को अपना टेक्स्ट बनाकर उल्टा अनुवाद करें", "Language you will speak": "आप किस भाषा में बोलेंगे",
    "Text size": "अक्षर का आकार", "Smaller text": "छोटे अक्षर", "Bigger text": "बड़े अक्षर", "Insert a ready phrase where your cursor is": "कर्सर की जगह तैयार वाक्यांश जोड़ें",
    "Your text": "आपका टेक्स्ट", "Translation": "अनुवाद", "Make a copy of this letter for each name in a list": "सूची के हर नाम के लिए इस पत्र की कॉपी बनाएँ",
    "Word meaning": "शब्द का अर्थ", "Link": "लिंक", "Looking up…": "ढूँढ रहे हैं…", "Could not look this up. Check your internet.": "अर्थ नहीं मिला। इंटरनेट जाँचें।",
    "Add at least one name.": "कम से कम एक नाम जोड़ें।", "Allow the microphone for this site to speak your letter.": "बोलकर लिखने के लिए इस साइट को माइक्रोफ़ोन की अनुमति दें।",
    "Choose a printer or PDF app from the list": "सूची से प्रिंटर या पीडीएफ़ ऐप चुनें", "Copied": "कॉपी हो गया", "Could not hear clearly. Try again.": "साफ़ सुनाई नहीं दिया। फिर से कोशिश करें।",
    "Could not make the PDF. Try fewer names.": "पीडीएफ़ नहीं बनी। कम नाम डालकर देखें।", "Could not save the file.": "फ़ाइल सेव नहीं हुई।",
    "Could not send. Check your internet connection and try again.": "नहीं भेजा जा सका। इंटरनेट जाँचकर फिर कोशिश करें।", "Letter deleted": "पत्र हटा दिया",
    "Link copied": "लिंक कॉपी हो गया", "Listening… speak your letter. Say “full stop” or “comma” where needed.": "सुन रहे हैं… अपना पत्र बोलिए।",
    "Logo added": "लोगो जुड़ गया", "Logo removed": "लोगो हट गया", "Nothing to print yet.": "अभी प्रिंट करने को कुछ नहीं है।", "Nothing to read yet.": "अभी सुनाने को कुछ नहीं है।",
    "Nothing to save yet.": "अभी सहेजने को कुछ नहीं है।", "PDF text moved to the Letter tab": "पीडीएफ़ का टेक्स्ट पत्र टैब में आ गया",
    "Please choose a .docx file. Old .doc files must be saved as .docx first.": "कृपया .docx फ़ाइल चुनें। पुरानी .doc फ़ाइल को पहले .docx में सेव करें।",
    "Please choose a .pptx file. Old .ppt files must be saved as .pptx first.": "कृपया .pptx फ़ाइल चुनें। पुरानी .ppt फ़ाइल को पहले .pptx में सेव करें।",
    "Please enter your name.": "कृपया अपना नाम लिखें।", "Please give a phone number or an email address.": "कृपया फ़ोन नंबर या ईमेल दें।",
    "Please use 300 names or fewer at a time.": "एक बार में 300 या कम नाम डालें।", "Please write your message.": "कृपया अपना संदेश लिखें।",
    "QR code needs internet.": "क्यूआर कोड के लिए इंटरनेट चाहिए।", "Reading aloud is not available here.": "यहाँ पढ़कर सुनाने की सुविधा नहीं है।",
    "Signature added": "हस्ताक्षर जुड़ गए", "Signature removed": "हस्ताक्षर हट गए", "Still translating. Wait a moment, then share.": "अनुवाद चल रहा है। थोड़ा रुककर शेयर करें।",
    "Still translating. Wait a moment, then try again.": "अनुवाद चल रहा है। थोड़ा रुककर फिर कोशिश करें।", "Text selected. Press Ctrl+C or long-press to copy.": "टेक्स्ट चुना गया। कॉपी करने के लिए Ctrl+C दबाएँ या देर तक दबाएँ।",
    "That image could not be opened.": "यह फ़ोटो नहीं खुली।", "Wait for the translation first.": "पहले अनुवाद पूरा होने दें।", "Write a letter first.": "पहले पत्र लिखें।",
    "Write something first.": "पहले कुछ लिखें।", "Write the letter first.": "पहले पत्र लिखें।", "Translating…": "अनुवाद हो रहा है…", "Photo read": "फ़ोटो पढ़ ली",
    "PDF ready": "पीडीएफ़ तैयार", "Making your PDF…": "पीडीएफ़ बन रही है…", "Reading the PDF text…": "पीडीएफ़ पढ़ रहे हैं…", "Reading the photo…": "फ़ोटो पढ़ रहे हैं…",
    "Reading the photo… this can take up to a minute": "फ़ोटो पढ़ रहे हैं… एक मिनट तक लग सकता है",
    "Getting the reader ready (first time can take a minute)…": "रीडर तैयार हो रहा है (पहली बार एक मिनट लग सकता है)…",
    "This PDF is a scan. Getting the page reader ready (first time can take a minute)…": "यह स्कैन की हुई पीडीएफ़ है। पेज रीडर तैयार हो रहा है…",
    "Could not make the PDF.": "पीडीएफ़ नहीं बनी।", "No readable text was found in this PDF.": "इस पीडीएफ़ में पढ़ने लायक टेक्स्ट नहीं मिला।",
    "That file could not be opened as a PDF.": "यह फ़ाइल पीडीएफ़ के रूप में नहीं खुली।", "That file could not be read as a PowerPoint.": "यह फ़ाइल पावरपॉइंट के रूप में नहीं पढ़ी जा सकी।",
    "That file could not be read as a Word document.": "यह फ़ाइल वर्ड के रूप में नहीं पढ़ी जा सकी।",
    "No readable text was found in that photo. Try a clearer, straight photo in good light.": "फ़ोटो में पढ़ने लायक टेक्स्ट नहीं मिला। अच्छी रोशनी में साफ़, सीधी फ़ोटो लें।",
    "Could not read the photo. Check your internet connection (the first time downloads the reader), then try again.": "फ़ोटो नहीं पढ़ी जा सकी। इंटरनेट जाँचकर फिर कोशिश करें।",
    "Too many requests just now. Wait a minute, then press Translate now.": "अभी बहुत अनुरोध हो गए। एक मिनट रुककर “अभी अनुवाद करें” दबाएँ।",
    "No translator is available right now. Check your internet connection, then press Translate now.": "अभी अनुवाद उपलब्ध नहीं है। इंटरनेट जाँचकर “अभी अनुवाद करें” दबाएँ।",
    "Translation failed. Check your internet and press Translate now.": "अनुवाद नहीं हुआ। इंटरनेट जाँचकर “अभी अनुवाद करें” दबाएँ।",
    "More formal: ": "ज़्यादा औपचारिक: ", "No internet, and this account is not on this device yet. Connect to the internet and try again.": "इंटरनेट नहीं है, और यह खाता इस डिवाइस पर अभी नहीं है। इंटरनेट से जुड़कर फिर कोशिश करें।",
    "Could not sign in.": "साइन इन नहीं हो सका।", "Could not create the account.": "खाता नहीं बन सका।", "Too many tries. Please wait 15 minutes.": "बहुत बार कोशिश हुई। 15 मिनट रुकें।",
    "Too many tries. Please wait a while.": "बहुत बार कोशिश हुई। थोड़ी देर रुकें।", "Sign in once more to keep your letters on all your devices.": "अपने पत्र सभी डिवाइस पर रखने के लिए एक बार फिर साइन इन करें।",
    "Sign in again": "फिर से साइन इन करें", "Hindi": "हिंदी", "English": "अंग्रेज़ी", "Hindi script": "हिंदी लिपि", "English: ": "अंग्रेज़ी: ", "Hindi: ": "हिंदी: "
  };
  const RULES = [
    [/^(\d+) words · (\d+) characters$/, (m) => `${m[1]} शब्द · ${m[2]} अक्षर`],
    [/^Translated into (.+)$/, (m) => `${m[1]} में अनुवाद हो गया`], [/^Slides translated into (.+)$/, (m) => `स्लाइड का ${m[1]} में अनुवाद हो गया`],
    [/^Word file translated into (.+)$/, (m) => `वर्ड फ़ाइल का ${m[1]} में अनुवाद हो गया`], [/^Now translating into (.+)$/, (m) => `अब ${m[1]} में अनुवाद`],
    [/^Opened “?(.+?)”?$/, (m) => `खोला: ${m[1]}`], [/^Opening (.+)…$/, (m) => `${m[1]} खुल रही है…`], [/^Saved (.+)$/, (m) => `सेव हो गई: ${m[1]}`],
    [/^Making (\d+) letters…$/, (m) => `${m[1]} पत्र बन रहे हैं…`], [/^Translating (\d+) (lines|paragraphs)…$/, (m) => `${m[1]} ${m[2] === "lines" ? "पंक्तियों" : "पैराग्राफ़"} का अनुवाद हो रहा है…`],
    [/^Choose \((\d+)\)$/, (m) => `चुनें (${m[1]})`], [/^Letter (saved|updated) in (.+)$/, (m) => `पत्र ${m[2] in D ? D[m[2]] : m[2]} में ${m[1] === "saved" ? "सहेजा गया" : "अपडेट हुआ"}`],
    [/^Use “(.+)”$/, (m) => `“${m[1]}” लगाएँ`], [/^(Document|Page header|Page footer|Notes) · (\d+) paragraphs?$/, (m) => `${{ Document: "दस्तावेज़", "Page header": "पेज हेडर", "Page footer": "पेज फ़ुटर", Notes: "नोट्स" }[m[1]]} · ${m[2]} पैराग्राफ़`],
    [/^Slide (\d+)( · no text)?$/, (m) => `स्लाइड ${m[1]}${m[2] ? " · कोई टेक्स्ट नहीं" : ""}`],
    [/^The letter on the right does not contain “(.+)”\. Put it where the name should go\.$/, (m) => `दाईं ओर के पत्र में “${m[1]}” नहीं है। इसे वहाँ लिखें जहाँ नाम आना है।`]
  ];
  const tr = (s) => { if (D[s]) return D[s]; for (const [re, f] of RULES) { const m = s.match(re); if (m) return f(m); } return null; };
  const SKIP = "textarea,script,style,#src,#out,#lang,#wordParas,#slides,#pages,#qr,.userchip b,#uiLangBtn,.uiLangGate";
  const orig = new WeakMap(), mine = new WeakMap();
  let on = false;
  try { on = localStorage.getItem(KEY) === "hi"; } catch {}

  function doText(n) {
    const p = n.parentElement; if (!p || p.closest(SKIP)) return;
    if (p.tagName === "OPTION" && p.closest("#phrase,#saved") && p.value !== "") return;
    const raw = n.textContent; if (on && mine.get(n) === raw) return;
    if (!on && orig.has(n) && mine.get(n) !== raw) { orig.delete(n); return; } // the app changed it since
    const t = raw.trim(); if (!t) return;
    if (on) { const h = tr(t); if (h) { orig.set(n, raw); const v = raw.replace(t, h); mine.set(n, v); n.textContent = v; } }
    else if (orig.has(n)) { const v = orig.get(n); orig.delete(n); mine.delete(n); n.textContent = v; }
  }
  function doAttrs(el) {
    if (el.closest(SKIP) && !el.matches("#src,#out,#lang")) return;
    for (const a of ["placeholder", "title", "aria-label"]) {
      const v = el.getAttribute(a); if (!v) continue; const k = "data-en-" + a;
      if (on) { const h = tr(v); if (h && v !== h) { el.setAttribute(k, v); el.setAttribute(a, h); } }
      else if (el.hasAttribute(k)) { el.setAttribute(a, el.getAttribute(k)); el.removeAttribute(k); }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    doAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n; while ((n = w.nextNode())) n.nodeType === 3 ? doText(n) : doAttrs(n);
  }
  const obs = new MutationObserver((list) => {
    for (const m of list) {
      if (m.type === "characterData") doText(m.target);
      else if (m.type === "attributes") { if (on) doAttrs(m.target); }
      else m.addedNodes.forEach((n) => { if (n.id === "authGate") gateBtn(n); walk(n); });
    }
  });
  function apply() {
    document.documentElement.lang = on ? "hi" : "en";
    walk(document.body);
    const b = document.getElementById("uiLangBtn"); if (b) { b.textContent = on ? "English" : "हिन्दी"; b.title = on ? "Show menus in English" : "मेनू हिंदी में दिखाएँ"; b.setAttribute("aria-pressed", String(on)); }
  }
  // The sign-in card gets its own switch, because the page behind it is hidden.
  function gateBtn(gate) {
    const card = gate && gate.querySelector(".card"); if (!card || card.querySelector(".uiLangGate")) return;
    const g = document.createElement("button"); g.type = "button"; g.className = "btn uiLangGate";
    const sync = () => { g.textContent = on ? "English" : "हिन्दी"; };
    g.onclick = () => { on = !on; try { localStorage.setItem(KEY, on ? "hi" : "en"); } catch {} apply(); sync(); };
    sync(); card.prepend(g);
  }
  function start() {
    const b = document.createElement("button"); b.type = "button"; b.className = "btn"; b.id = "uiLangBtn";
    b.onclick = () => { on = !on; try { localStorage.setItem(KEY, on ? "hi" : "en"); } catch {} apply(); };
    const bar = document.querySelector("header.bar"); if (bar) bar.append(b);
    gateBtn(document.getElementById("authGate"));
    obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label"] });
    apply();
  }
  window.varnumUiLang = { tr, isHindi: () => on };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
