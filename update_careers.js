const fs = require('fs');
const path = 'src/content/bodies/careers.html';

let content = fs.readFileSync(path, 'utf8');

const start = content.indexOf('<div class="page-content">');
const end = content.indexOf('</main>');

if (start !== -1 && end !== -1) {
    const newContent = `
<div class="page-content" style="padding-top: 60px; padding-bottom: 80px; background-color: #fcfcfc;">
  <div class="container my-5">
    
    <!-- Section 1: Work With Us -->
    <div class="row align-items-stretch mb-5 bg-white shadow-sm overflow-hidden" style="border-radius: 20px !important;">
      <div class="col-md-6 p-0 d-flex align-items-center justify-content-center bg-white">
        <img src="/assets/uploads/images/careers_work_with_us.png" alt="Work With Us" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="col-md-6 p-5 text-white" style="background: linear-gradient(135deg, #1fa2ff 0%, #12d8fa 50%, #1793d1 100%); display: flex; flex-direction: column; justify-content: center; position: relative;">
        <!-- Add a subtle overlay pattern for texture -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1; background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 20px 20px;"></div>
        <div style="position: relative; z-index: 2;">
            <h2 class="mb-4 text-white" style="font-weight: 600; font-size: 2.5rem;">Work With Us</h2>
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 0; color: rgba(255, 255, 255, 0.95);">
              Our people are our most valuable asset. We have built an employee-friendly environment for our gender-diverse workforce that is comparable to the best in the world. The organization is often addressed as Impact Family, which reflects the bonding amongst the employees. We are committed to hiring exceptionally talented people and nurture them professionally. If you are interested in joining a dynamic, creative and diversified work environment then email your resume to <strong>info@impactcare.co.in</strong>. Our open, enabling and trust-based culture will offer you an exciting environment to work and grow.
            </p>
        </div>
      </div>
    </div>

    <!-- Spacer -->
    <div style="height: 60px;"></div>

    <!-- Section 2: Life@Impact & Current Openings -->
    <div class="row mt-5">
      <!-- Left side: Life@Impact -->
      <div class="col-md-6 pe-md-5 d-flex flex-column justify-content-center">
        <h2 class="mb-4" style="color: #212529; font-weight: 600; font-size: 2.5rem;">Life@Impact</h2>
        <p style="font-size: 16px; line-height: 1.8; color: #555;">
          We take great pride in our human resources. Impact Healthcare professes to become a professionally managed, performance driven, learning organization to create happy and successful employees, who will become pillars of success for the organization. We value our people and strive to become a company that people love to work with.
        </p>
        <div class="mt-5 text-center position-relative">
          <div style="position: absolute; top: -10px; left: 10%; width: 80%; height: 100%; background: linear-gradient(135deg, #12d8fa, #1793d1); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; z-index: 0; opacity: 0.2; transform: rotate(-5deg);"></div>
          <img src="/assets/uploads/images/careers_life_impact.png" alt="Life at Impact" style="max-width: 80%; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; box-shadow: 0 15px 35px rgba(0,0,0,0.15); position: relative; z-index: 1;">
        </div>
      </div>

      <!-- Right side: Current Openings Form -->
      <div class="col-md-6 mt-5 mt-md-0">
        <div class="card shadow-lg border-0 p-5" style="border-radius: 20px !important; background-color: #fff;">
          <div class="card-body p-0">
            <h2 class="text-center mb-3" style="color: #000; font-weight: 600; font-size: 2rem;">Current Openings</h2>
            <p class="text-center mb-4 text-muted" style="font-size: 15px;">For current openings email us on:</p>
            
            <form action="#" method="post" enctype="multipart/form-data">
              <div class="mb-3">
                <input type="text" class="form-control form-control-lg bg-transparent" placeholder="Name*" required style="border: 1px solid #e1e1e1; font-size: 15px; border-radius: 8px;">
              </div>
              <div class="mb-3">
                <input type="email" class="form-control form-control-lg bg-transparent" placeholder="Email*" required style="border: 1px solid #e1e1e1; font-size: 15px; border-radius: 8px;">
              </div>
              <div class="mb-3">
                <input type="tel" class="form-control form-control-lg bg-transparent" placeholder="Phone Number*" required style="border: 1px solid #e1e1e1; font-size: 15px; border-radius: 8px;">
              </div>
              <div class="mb-4">
                <textarea class="form-control form-control-lg bg-transparent" placeholder="Enquiry In Brief*" rows="4" required style="border: 1px solid #e1e1e1; font-size: 15px; border-radius: 8px;"></textarea>
              </div>
              <div class="mb-4">
                <label class="form-label text-muted mb-2" style="font-size: 13px;">Upload Your Resume (File types: pdf|doc|docx|jpg|png|jpeg)</label>
                <input type="file" class="form-control p-2" accept=".pdf,.doc,.docx,.jpg,.png,.jpeg" style="border: 1px solid #e1e1e1; font-size: 14px; border-radius: 8px;">
              </div>
              <button type="submit" class="btn w-100 py-3 text-white mt-2" style="background-color: #1a73e8; font-weight: 600; border-radius: 8px; font-size: 16px; transition: background-color 0.3s;">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>
`;

    const finalContent = content.substring(0, start) + newContent + content.substring(end);
    fs.writeFileSync(path, finalContent, 'utf8');
    console.log('Successfully updated careers.html');
} else {
    console.log('Could not find start or end tags.');
}
