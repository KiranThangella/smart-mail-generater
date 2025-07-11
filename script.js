document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const emailTypeSelect = document.getElementById('email-type');
  const userNameInput = document.getElementById('user-name');
  const recipientNameInput = document.getElementById('recipient-name');
  const companyNameInput = document.getElementById('company-name');
  const reasonInput = document.getElementById('reason');
  const generateBtn = document.getElementById('generate-btn');
  const emailPreview = document.getElementById('email-preview');
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');
  const toast = document.getElementById('toast');

  // Email Templates
  const emailTemplates = {
    'cover-letter': ({ userName, recipientName, companyName, reason }) => {
      const position = reason || 'the position';
      return `Subject: Application for ${position} at ${companyName}

Dear ${recipientName || 'Hiring Manager'},

I am excited to apply for ${position} at ${companyName}. With my background and skills, I am confident in my ability to contribute effectively to your team.

[Add 1-2 sentences about your relevant experience or skills]

What excites me most about this opportunity is [specific reason]. I believe my [specific skill/experience] would allow me to [specific contribution].

I have attached my resume for your review. I would welcome the opportunity to discuss how my qualifications align with your needs. Please feel free to contact me at your convenience.

Thank you for your time and consideration. I look forward to the possibility of contributing to ${companyName}.

Best regards,
${userName}`;
    },
    'leave-request': ({ userName, recipientName, companyName, reason }) => {
      const leaveReason = reason || 'personal reasons';
      return `Subject: Leave Application Request

Dear ${recipientName || 'Sir/Madam'},

I am writing to formally request leave from my position at ${companyName} due to ${leaveReason}.

[Specify dates if known: "I would like to request leave from [start date] to [end date]."]

[Optional: Add details about how your responsibilities will be handled during your absence]

I would appreciate your approval for this request. Please let me know if you require any additional information.

Thank you for your understanding.

Sincerely,
${userName}`;
    },
    'resignation': ({ userName, recipientName, companyName, reason }) => {
      const resignationReason = reason || 'personal reasons';
      return `Subject: Resignation Notice

Dear ${recipientName || 'Manager'},

Please accept this letter as formal notification of my resignation from my position at ${companyName}, effective [last working day, typically 2 weeks from date].

This decision was not an easy one, but it is necessary due to ${resignationReason}.

I am grateful for the opportunities I've had during my time at ${companyName} and for the support you and the team have provided me.

Please let me know how I can help during this transition period. I am committed to ensuring a smooth handover of my responsibilities.

Thank you again for the opportunity to be part of your team.

Best regards,
${userName}`;
    },
    'internship': ({ userName, recipientName, companyName, reason }) => {
      const position = reason || 'an internship position';
      return `Subject: Application for ${position} at ${companyName}

Dear ${recipientName || 'Hiring Manager'},

I am writing to express my interest in ${position} at ${companyName}. As a [your current status, e.g., "computer science student at XYZ University"], I am eager to apply my skills in a practical setting and learn from your esteemed organization.

[Add 1-2 sentences about your relevant coursework, projects, or skills]

I am particularly drawn to ${companyName} because [specific reason]. I believe this internship would provide me with valuable experience in [specific area].

I have attached my resume and academic transcripts for your review. I would appreciate the opportunity to discuss how I can contribute to your team. Please feel free to contact me at your convenience.

Thank you for your time and consideration. I look forward to your response.

Sincerely,
${userName}`;
    },
    'thank-you': ({ userName, recipientName, companyName, reason }) => {
      const thankReason = reason || 'your time and consideration';
      return `Subject: Thank You

Dear ${recipientName},

I wanted to take a moment to sincerely thank you for ${thankReason}.

[Add specific details about what you're thankful for, e.g., "I truly appreciate the opportunity to interview for the [position] at ${companyName} yesterday."]

[Optional: Add a personal note or follow-up item]

Thank you again for your kindness and support. Please don't hesitate to reach out if I can be of any assistance.

Warm regards,
${userName}`;
    }
  };

  // Generate Email
  generateBtn.addEventListener('click', function() {
    const emailType = emailTypeSelect.value;
    const userName = userNameInput.value.trim();
    const recipientName = recipientNameInput.value.trim();
    const companyName = companyNameInput.value.trim();
    const reason = reasonInput.value.trim();

    if (!userName) {
      showToast('Please enter your name');
      userNameInput.focus();
      return;
    }

    if (!companyName && emailType !== 'thank-you') {
      showToast('Please enter company/school name');
      companyNameInput.focus();
      return;
    }

    const templateData = {
      userName,
      recipientName,
      companyName,
      reason
    };

    emailPreview.textContent = emailTemplates[emailType](templateData);
    
    // Smooth scroll to output section on mobile
    if (window.innerWidth < 768) {
      document.querySelector('.output-section').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  });

  // Copy to Clipboard
  copyBtn.addEventListener('click', function() {
    if (!emailPreview.textContent.trim()) {
      showToast('Please generate an email first');
      return;
    }

    navigator.clipboard.writeText(emailPreview.textContent)
      .then(() => {
        showToast('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy text');
      });
  });

  // Download as TXT
  downloadBtn.addEventListener('click', function() {
    if (!emailPreview.textContent.trim()) {
      showToast('Please generate an email first');
      return;
    }

    const blob = new Blob([emailPreview.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Download started!');
  });

  // Show Toast Notification
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Auto-expand textarea
  reasonInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // Add animation to generate button when fields are filled
  const formInputs = [userNameInput, recipientNameInput, companyNameInput];
  formInputs.forEach(input => {
    input.addEventListener('input', checkFormCompletion);
  });
  
  function checkFormCompletion() {
    const userName = userNameInput.value.trim();
    const companyName = companyNameInput.value.trim();
    
    if (userName && companyName) {
      generateBtn.classList.add('generate-pulse');
    } else {
      generateBtn.classList.remove('generate-pulse');
    }
  }
});