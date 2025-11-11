// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginBtn = document.getElementById('loginBtn');
  
  // Show loading state
  loginBtn.textContent = 'Authenticating...';
  loginBtn.disabled = true;
  
  // Fake authentication - always succeeds
  setTimeout(() => {
    // Store user session
    localStorage.setItem('legalpad_user', username);
    localStorage.setItem('legalpad_loggedin', 'true');
    
    // Show main app
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('userDisplay').textContent = username.split('@')[0];
    
    // Initialize the main application
    initializeApp();
  }, 1500);
});

function logout() {
  localStorage.removeItem('legalpad_user');
  localStorage.removeItem('legalpad_loggedin');
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginBtn').textContent = 'Access Legal Portal';
  document.getElementById('loginBtn').disabled = false;
}

// Check if already logged in
if (localStorage.getItem('legalpad_loggedin') === 'true') {
  const user = localStorage.getItem('legalpad_user') || 'User';
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  document.getElementById('userDisplay').textContent = user.split('@')[0];
  initializeApp();
}

/*************************************************************************
 * Main Application Code
 *************************************************************************/
function initializeApp() {
  const templates = {
    poa: {
      en:`POWER OF ATTORNEY

KNOW ALL MEN BY THESE PRESENTS that I, {{principal_name}}, aged {{principal_age}} years, residing at {{principal_address}}, hereinafter called the "Principal", do hereby nominate, constitute and appoint {{agent_name}}, residing at {{agent_address}}, hereinafter called the "Attorney", to be my true and lawful attorney to act for and on my behalf in respect of the following matters:

1. To manage, control and administer all my movable and immovable properties.
2. To represent me before any Government, Municipal, or other authority and to sign, execute and deliver all documents and instruments in relation thereto.
3. To operate, withdraw and deposit funds in my bank accounts and to sign cheques and negotiable instruments.
4. To buy, sell, lease, mortgage, transfer or otherwise deal with any immovable property belonging to me.
5. To institute, defend or withdraw legal proceedings and to sign and verify pleadings, affidavits and other judicial documents.

This Power of Attorney shall remain in force until revoked by me in writing.

IN WITNESS WHEREOF I have set my hand this {{date}} at {{place}}.

Signed by the Principal:
Signature: ___________________________
Name: {{principal_name}}

Signed by the Attorney:
Signature: ___________________________
Name: {{agent_name}}

Witnesses:
1. ___________________________
2. ___________________________
(Notary / Stamp)`,
      ml:`അധികാരപത്രം

ഞാൻ {{principal_name}}, വയസ്സ് {{principal_age}} വയസ്, വിലാസം {{principal_address}}, (ഇവനെ/അവളെ) "പ്രധാനി" എന്നറിയപ്പെടുന്നവൻ/വളായി, {{agent_name}} (വിലാസം: {{agent_address}}) എന്നവനെ/അവളെ എന്റെ പ്രതിനിധിയായി നിയമിക്കുന്നു. താഴെപ്പറയുന്ന കാര്യങ്ങൾ ചെയ്യാൻ അവനോട്/അവളോട് അധികാരം നൽകുന്നു:

1. എന്റെ സ്ഥാവര-ജംഗമ സ്വത്തുക്കളുടെ കാര്യങ്ങളിൽ നിയന്ത്രണവും പരിപാലനവും നടത്തുക.
2. സർക്കാർ, മുനിസ്പാലിറ്റി മുതലായ അതോറിറ്റികളോടുമായി പ്രതിനിധീകരിക്കുക, ആവശ്യമായ രേഖകൾ ഒപ്പുവെക്കുക.
3. ബാങ്ക് അക്കൗണ്ടുകൾ നടത്തുക; ചെക്ക് ഒപ്പിടുക, തുക നിക്ഷേപിക്കുക/പിന്‍വലിക്കുക.
4. സ്വത്ത് വാങ്ങൽ/വിൽപ്പന/വാടക/ക്കടമുള്ള ഇടപാടുകൾ നടത്തുക.
5. നിയമ നടപടിക്രമങ്ങൾ തുടങ്ങുക/സംരക്ഷിക്കുക/വിലയ്ക്കുക; ആവശ്യമായ രേഖകൾ സമർപ്പിക്കുക.

ഈ അധികാരപത്രം ഞാൻ എഴുതി സാക്ഷ്യപ്പെടുത്തുന്ന വരെ പ്രാബല്യത്തിൽ ആയിരിക്കും.

സാക്ഷ്യാർത്ഥം, {{place}}-ൽ {{date}}-ന് ഞാൻ ഒപ്പുവെക്കുന്നു.

പ്രധാനിയുടെ ഒപ്പ്: ___________________________
പേര്: {{principal_name}}

പ്രതിനിധിയുടെ ഒപ്പ്: ___________________________
പേര്: {{agent_name}}

സാക്ഷികൾ:
1. ___________________________
2. ___________________________
(നോട്ടറി / സ്റ്റാമ്പ്)`
    },

    rental: {
      en:`RENTAL AGREEMENT

This Agreement is made on this {{date}} between:

{{owner_name}}, aged {{owner_age}} years, residing at {{owner_address}}, hereinafter called the "OWNER",

AND

{{tenant_name}}, aged {{tenant_age}} years, residing at {{tenant_address}}, hereinafter called the "TENANT".

WHEREAS the OWNER agrees to let and the TENANT agrees to take on rent the premises situated at {{property_address}} for a monthly rent of Rs. {{rent}} (Rupees {{rent_words}} only) for a term of {{term}} months commencing from {{start_date}}.

1. Rent shall be paid on or before the 5th day of each calendar month.
2. Security deposit of Rs. {{deposit}} has been paid by the TENANT to the OWNER and shall be refundable subject to deductions for damage.
3. The TENANT shall not assign or sublet the premises without prior written consent of the OWNER.
4. The TENANT shall maintain the premises in a tenantable condition and shall be responsible for reasonable upkeep.
5. The OWNER may enter the premises on reasonable notice for inspection.
6. This Agreement may be terminated by either party giving {{notice_period}} days written notice.

IN WITNESS WHEREOF the parties hereto have set their hands on the date first above written.

OWNER:
Signature: ___________________________
Name: {{owner_name}}

TENANT:
Signature: ___________________________
Name: {{tenant_name}}

WITNESSES:
1. ___________________________
2. ___________________________
(Notary / Stamp)`,
      ml:`വാടക കരാർ

{{date}}-ന് താഴെപ്പറയുന്നവരുടെ ഇടയിൽ ഈ കരാർ ണ്ടാക്കി:

{{owner_name}}, വയസ്സ് {{owner_age}} വയസ്, വിലാസം {{owner_address}} (മാലിക്),

മറ്റേപക്ഷം,

{{tenant_name}}, വയസ്സ് {{tenant_age}} വയസ്, വിലാസം {{tenant_address}} (വാടകക്കാരൻ).

{{property_address}} എന്ന സ്വത്ത് പ്രതിമാസം Rs. {{rent}} (വാക്കുകളിൽ {{rent_words}}) എന്ന വാടകയ്ക്ക് {{start_date}} മുതൽ {{term}} മാസത്തേക്കു വാടകയ്ക്ക് നൽകുന്നു.

1. വാടക ഓരോ മാസവും 5-ാം തീയതിക്കകം നൽകണം.
2. വാടകക്കാരൻ ₹{{deposit}} നിക്ഷേപമായി നൽകുകയും, നഷ്ടം വന്നാൽ കുറവ് ചെയ്ത് തീർക്കുന്നതിന് ശേഷമേ തിരികെ നൽകപ്പെടു.
3. വാടകക്കാരൻ ഉടമയുടെ എഴുത്ത് അനുമതി കൂടാതെ വാടക സ്വത്ത് മറ്റൊരാൾക്ക് നൽകുകയോ മാറ്റുകയോ ചെയ്യരുത്.
4. വാടകക്കാരൻ സ്ഥലം ശുചിത്വത്തിൽ പരിപാലിക്കുകയും സാധ്യമായ പരിചരണങ്ങൾ നടത്തുകയും ചെയ്യുക.
5. മാലിക്ക് മുൻകൂട്ടി അറിയിച്ച് സ്ഥലം പരിശോധിക്കാൻ അവകാശമുണ്ട്.
6. കരാർ {{notice_period}} ദിവസത്തെ എഴുത്ത് നോട്ടീസിനാലെ അവസാനിപ്പിക്കാം.

മാലിക്ക്:
ഒപ്പ്: ___________________________
പേര്: {{owner_name}}

വാടകക്കാരൻ:
ഒപ്പ്: ___________________________
പേര്: {{tenant_name}}

സാക്ഷികൾ:
1. ___________________________
2. ___________________________
(നോട്ടറി / സ്റ്റാമ്പ്)`
    },

    affidavit: {
      en:`AFFIDAVIT

I, {{deponent_name}}, aged {{age}} years, son/daughter of {{father_name}}, residing at {{address}}, do hereby solemnly affirm and declare as under:

1. That I am the deponent herein and competent to swear this affidavit.
2. That the statements made hereunder are true and correct to the best of my knowledge and belief.
3. {{statement}}

I solemnly affirm that the statements made above are true and correct.

VERIFICATION

Verified at {{place}} on this {{date}} that the contents of the above affidavit are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

DEPONENT:
Signature: ___________________________
Name: {{deponent_name}}

(Notary Seal & Signature)`,
      ml:`ശപഥപത്രം

ഞാൻ {{deponent_name}}, വയസ്സ് {{age}} വയസ്, {{father_name}}-ന്റെ മകൻ/മകൾ, വിലാസം {{address}}, ഇതുവഴി താഴെപ്പറയുന്നവ സത്യസന്ധമായി പ്രഖ്യാപിക്കുന്നു:

1. ഞാൻ ഈ ശപഥപത്രം സമർപ്പിക്കുന്ന വ്യക്തിയാണ്.
2. ഇതിലെ പ്രസ്താവനകൾ എനിക്ക് അറിയാവുന്ന പരിധിയിൽ ശരിയാണ്.
3. {{statement}}

സ്ഥിരീകരണം

{{place}}-ൽ {{date}}-ന് മുകളിൽ പറഞ്ഞിട്ടുള്ളവ എനിക്ക് അറിയാവുന്ന പരിധിയിൽ ശരിയാണ് എന്ന് ഞാൻ സ്ഥിരീകരിക്കുന്നു.

ശപഥം ചെയ്യുന്നത്:
ഒപ്പ്: ___________________________
പേര്: {{deponent_name}}

(നോട്ടറി മുദ്ര & ഒപ്പ്)`
    },

    noc: {
      en:`NO OBJECTION CERTIFICATE

{{subtitle}}

This is to certify that I, {{issuer_name}}, residing at {{issuer_address}}, have no objection to {{beneficiary_name}} for {{purpose}}.

This certificate is issued upon the request of the concerned party and may be used for the purpose stated above.

Issued on: {{date}} at {{place}}.

Signature: ___________________________
Name: {{issuer_name}}

(Notary / Stamp)`,
      ml:`എതിര്‍പ്പെടല്‍ ഇല്ലെന്ന സര്‍ട്ടിഫിക്കറ്റ്

{{subtitle}}

ഇത് വഴി ഞാൻ {{issuer_name}}, വിലാസം {{issuer_address}}, {{beneficiary_name}}-ന് {{purpose}} നടത്തുന്നതിൽ എനിക്ക് എതിര്‍പ്പെടലില്ല എന്ന് രേഖപ്പെടുത്തുന്നു.

ഈ സർട്ടിഫിക്കറ്റ് അഭ്യർത്ഥകന്റെ ആവശ്യത്തിനായി നൽകിയതാണു്.

തീയതി: {{date}}, സ്ഥലം: {{place}}.

ഒപ്പ്: ___________________________
പേര്: {{issuer_name}}

(നോട്ടറി / സ്റ്റാമ്പ്)`
    }
  };

  // Fields mapping (must match placeholders above)
  const fieldsByTemplate = {
    poa: ['principal_name','principal_age','principal_address','agent_name','agent_address','place','date'],
    rental: ['owner_name','owner_age','owner_address','tenant_name','tenant_age','tenant_address','property_address','rent','rent_words','term','start_date','deposit','notice_period','date'],
    affidavit: ['deponent_name','age','father_name','address','statement','place','date'],
    noc: ['issuer_name','issuer_address','beneficiary_name','purpose','place','date']
  };

  // Field labels
  const labels = {
    en: {
      principal_name:'Principal Name', principal_age:'Age', principal_address:'Principal Address', agent_name:'Attorney Name', agent_address:'Attorney Address', place:'Place', date:'Date',
      owner_name:'Owner Name', owner_age:'Owner Age', owner_address:'Owner Address', tenant_name:'Tenant Name', tenant_age:'Tenant Age', tenant_address:'Tenant Address', property_address:'Property Address', rent:'Monthly Rent (₹)', rent_words:'Rent in Words', term:'Term (months)', start_date:'Start Date', deposit:'Security Deposit (₹)', notice_period:'Notice Period (days)',
      deponent_name:'Deponent Name', age:'Age', father_name:'Father\'s Name', address:'Address', statement:'Statement', place:'Place', date:'Date',
      issuer_name:'Issuer Name', issuer_address:'Issuer Address', beneficiary_name:'Beneficiary Name', purpose:'Purpose', subtitle:'Subtitle (optional)', place:'Place', date:'Date'
    },
    ml: {
      principal_name:'പ്രധാനിയുടെ പേര്', principal_age:'വയസ്സ്', principal_address:'വിലാസം', agent_name:'പ്രതിനിധിയുടെ പേര്', agent_address:'പ്രതിനിധിയുടെ വിലാസം', place:'സ്ഥലം', date:'തീയതി',
      owner_name:'മാലിക് പേര്', owner_age:'വയസ്സ്', owner_address:'മാലിക് വിലാസം', tenant_name:'വാടകക്കാരൻ പേര്', tenant_age:'വയസ്സ്', tenant_address:'വാടകക്കാരൻ വിലാസം', property_address:'സ്വത്ത് വിലാസം', rent:'പ്രതിമാസ വാടക (₹)', rent_words:'വാക്കുകളിൽ വാടക', term:'കാലാവധി (മാസം)', start_date:'ആരംഭ തീയതി', deposit:'നിക്ഷേപം (₹)', notice_period:'മുൻകൂർ അറിയിപ്പ് (ദിവസം)',
      deponent_name:'ശപഥം ചെയ്യുന്നയാളുടെ പേര്', age:'വയസ്സ്', father_name:'പിതാവിന്റെ പേര്', address:'വിലാസം', statement:'പ്രസ്താവന', place:'സ്ഥലം', date:'തീയതി',
      issuer_name:'നൽകുന്നയാളുടെ പേര്', issuer_address:'വിലാസം', beneficiary_name:'ലഭിക്കുന്നയാളുടെ പേര്', purpose:'ഉദ്ദേശ്യം', subtitle:'ഉപശീർഷകം (optional)', place:'സ്ഥലം', date:'തീയതി'
    }
  };

  // Initialize with current date
  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0];

  // Set default date in all templates
  Object.keys(fieldsByTemplate).forEach(template => {
    if (fieldsByTemplate[template].includes('date')) {
      const dateIndex = fieldsByTemplate[template].indexOf('date');
      // This will be used when rendering fields
    }
  });

  const doctypeSelect = document.getElementById('doctype');
  const langSelect = document.getElementById('lang');
  const fieldsDiv = document.getElementById('fields');
  const previewDiv = document.getElementById('preview');
  const updateBtn = document.getElementById('updateBtn');
  const printBtn = document.getElementById('printBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // Render form fields based on selected template and language
  function renderFields() {
    const template = doctypeSelect.value;
    const lang = langSelect.value;
    const fields = fieldsByTemplate[template];
    
    fieldsDiv.innerHTML = '';
    
    fields.forEach(field => {
      const label = document.createElement('label');
      label.textContent = labels[lang][field] || field;
      label.setAttribute('for', field);
      
      let input;
      if (field === 'statement' || field === 'purpose') {
        input = document.createElement('textarea');
        input.placeholder = `Enter ${labels[lang][field] || field}`;
      } else if (field === 'date') {
        input = document.createElement('input');
        input.type = 'date';
        input.value = defaultDate;
      } else if (field === 'rent_words' || field === 'subtitle') {
        input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Enter ${labels[lang][field] || field}`;
      } else {
        input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Enter ${labels[lang][field] || field}`;
      }
      
      input.id = field;
      input.className = 'field-input';
      
      fieldsDiv.appendChild(label);
      fieldsDiv.appendChild(input);
    });
  }

  // Update preview with current form values
  function updatePreview() {
    const template = doctypeSelect.value;
    const lang = langSelect.value;
    const fields = fieldsByTemplate[template];
    
    let content = templates[template][lang];
    
    // Replace placeholders with form values
    fields.forEach(field => {
      const input = document.getElementById(field);
      const value = input ? input.value : '';
      content = content.replace(new RegExp(`{{${field}}}`, 'g'), value);
    });
    
    // Format the preview
    previewDiv.innerHTML = '';
    const docDiv = document.createElement('div');
    docDiv.className = `doc ${lang === 'ml' ? 'ml' : ''}`;
    
    // Convert line breaks and format content
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (index === 0 && line.trim()) {
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = line;
        docDiv.appendChild(title);
      } else if (index === 1 && line.trim() && template === 'noc') {
        const subtitle = document.createElement('div');
        subtitle.className = 'subtitle';
        subtitle.textContent = line;
        docDiv.appendChild(subtitle);
      } else if (line.trim() === '') {
        docDiv.appendChild(document.createElement('br'));
      } else if (line.match(/^\d+\./)) {
        const clause = document.createElement('div');
        clause.className = 'clause';
        clause.textContent = line;
        docDiv.appendChild(clause);
      } else {
        const p = document.createElement('p');
        p.textContent = line;
        docDiv.appendChild(p);
      }
    });
    
    previewDiv.appendChild(docDiv);
  }

  // Print functionality
  function printDocument() {
    const previewContent = previewDiv.innerHTML;
    if (previewContent.includes('placeholder')) {
      alert('Please update the preview first with valid data.');
      return;
    }
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print Document</title>
        <style>
          body { font-family: 'Noto Serif', serif; margin: 40px; }
          .doc { max-width: 800px; margin: 0 auto; line-height: 1.6; }
          .title { text-align: center; text-decoration: underline; font-weight: bold; margin-bottom: 20px; }
          .subtitle { text-align: center; font-style: italic; margin-bottom: 30px; }
          p { margin: 10px 0; text-align: justify; }
          .clause { margin: 8px 0; text-align: justify; }
          .sig-block { margin-top: 60px; }
          .sig-line { display: block; width: 300px; border-top: 1px solid #000; margin-left: auto; padding-top: 6px; text-align: center; }
          .two-signs { display: flex; justify-content: space-between; margin-top: 50px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        ${previewContent}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  // PDF download functionality
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const docElement = previewDiv.querySelector('.doc');
    
    if (!docElement || previewDiv.innerHTML.includes('placeholder')) {
      alert('Please update the preview first with valid data.');
      return;
    }

    html2canvas(docElement, {
      scale: 2,
      useCORS: true,
      logging: false
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`document-${new Date().getTime()}.pdf`);
    });
  }

  // Event listeners
  doctypeSelect.addEventListener('change', renderFields);
  langSelect.addEventListener('change', renderFields);
  updateBtn.addEventListener('click', updatePreview);
  printBtn.addEventListener('click', printDocument);
  downloadBtn.addEventListener('click', downloadPDF);

  // Initial render
  renderFields();
}