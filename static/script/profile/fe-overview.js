document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------
  // DOM ELEMENTS
  // ------------------------------------------------------------

  const overviewScreen = document.getElementById("screen-overview");
  const addVendorScreen = document.getElementById("screen-add-vendor");

  const openBtn = document.getElementById("open-add-vendor");
  const backBtn = document.getElementById("back-to-overview");
  const cancelBtn = document.getElementById("cancel-add-vendor");

  const addSkillBtn = document.getElementById("add-skill");
  const skillsGrid = document.getElementById("skills-grid");
  const form = document.getElementById("add-vendor-form");

  // ------------------------------------------------------------
  // SCREEN NAVIGATION
  // ------------------------------------------------------------

  // Show the Add Vendor screen and hide the Overview screen
  const showAddVendor = () => {
    overviewScreen.classList.add("hidden");
    addVendorScreen.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Return to the Overview screen
  const showOverview = () => {
    addVendorScreen.classList.add("hidden");
    overviewScreen.classList.remove("hidden");
  };

  // ------------------------------------------------------------
  // NAVIGATION EVENTS
  // ------------------------------------------------------------

  openBtn.addEventListener("click", showAddVendor);
  backBtn.addEventListener("click", showOverview);
  cancelBtn.addEventListener("click", showOverview);

  // ------------------------------------------------------------
  // AVAILABILITY TOGGLE
  // Flips toggle state, track color, thumb position,
  // status text, and status dot.
  // ------------------------------------------------------------

  window.toggleAvailability = (btn) => {
    const isOn = btn.getAttribute("data-on") === "true";
    const nowOn = !isOn;

    // Update toggle state
    btn.setAttribute("data-on", nowOn);
    btn.setAttribute("aria-pressed", nowOn);

    // Get toggle thumb and availability status elements
    const dot = btn.querySelector(".availability-toggle-dot");
    const status = document.getElementById("availability-status");
    const statusDot = document.getElementById("availability-status-dot");

    if (nowOn) {
      // -------------------------
      // TOGGLE ON
      // -------------------------

      btn.classList.remove("bg-gray-300");
      btn.classList.add("bg-primary-yellow");

      dot.classList.remove("left-1");
      dot.classList.add("left-6");

      status.textContent = "Online";
      status.classList.remove("text-granite-gray");
      status.classList.add("text-bright-green");

      statusDot.classList.remove("bg-gray-300");
      statusDot.classList.add("bg-bright-green");
    } else {
      // -------------------------
      // TOGGLE OFF
      // -------------------------

      btn.classList.remove("bg-primary-yellow");
      btn.classList.add("bg-gray-300");

      dot.classList.remove("left-6");
      dot.classList.add("left-1");

      status.textContent = "Offline";
      status.classList.remove("text-bright-green");
      status.classList.add("text-granite-gray");

      statusDot.classList.remove("bg-bright-green");
      statusDot.classList.add("bg-gray-300");
    }
  };

  // ------------------------------------------------------------
  // SKILLS STATE
  // Seed with whatever was checked by default; feel free to
  // swap this for data coming from the server.
  // ------------------------------------------------------------

  let vendorSkills = [
    "Network Cabling",
    "Server Installation",
    "CCTV Systems",
    "Data Center Setup",
    "Switch Configuration",
    "Routing & Switching",
    "Network Security",
    "Troubleshooting",
    "Firewall Management",
  ];

  const manageSkillsBtn = document.getElementById("manage-skills-btn");

  // ------------------------------------------------------------
  // RENDER TOP SKILLS (pills + hidden inputs so the form still
  // submits name="skills" values)
  // ------------------------------------------------------------

  function renderSkillsGrid() {
    skillsGrid.innerHTML = "";

    vendorSkills.forEach((skill) => {
      const pill = document.createElement("span");
      pill.className =
        "flex items-center gap-2 rounded-full border border-aqua-mint bg-transparent-white px-4 py-2.5 text-sm font-bold text-primary-yellow";
      pill.innerHTML = `<span class="text-primary-yellow">&bull;</span> ${escapeHtml(skill)}`;
      skillsGrid.appendChild(pill);

      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "skills";
      hidden.value = skill;
      skillsGrid.appendChild(hidden);
    });

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.id = "add-skill";
    addBtn.className =
      "flex items-center justify-center gap-1.5 rounded-full bg-primary-yellow text-white text-sm font-bold px-4 py-2.5 cursor-pointer ";
    addBtn.innerHTML = `<span class="material-symbols-outlined text-lg">add</span> Add Skill`;
    addBtn.addEventListener("click", openSkillsModal);
    skillsGrid.appendChild(addBtn);
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value || "";
    return div.innerHTML;
  }

  // ------------------------------------------------------------
  // MANAGE SKILLS MODAL
  // ------------------------------------------------------------

  function openSkillsModal() {
    closeSkillsModal();

    const overlay = document.createElement("div");
    overlay.id = "skills-modal-overlay";
    overlay.className =
      "fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4";

    const rows = vendorSkills
      .map(
        (skill, index) => `
      <div class="flex items-center justify-between rounded-lg border border-light-medium px-3 py-2 text-sm text-ink">
        <span>${escapeHtml(skill)}</span>
        <button type="button" data-remove-skill="${index}" class="text-gray-400 hover:text-red-500 text-base leading-none">&times;</button>
      </div>`,
      )
      .join("");

    overlay.innerHTML = `
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-ink">Manage Skills</h3>
        <button type="button" id="close-skills-modal" class="text-ink  text-xl leading-none">&times;</button>
      </div>

      <div class="space-y-2 max-h-64 overflow-y-auto mb-4" id="skills-modal-list">
        ${rows || `<p class="text-sm text-gray-500">No skills added yet.</p>`}
      </div>

      <div class="flex gap-2">
        <input
          type="text"
          id="new-skill-input"
          placeholder="Enter new skill"
          class="flex-1 rounded-lg border border-input-border bg-input-div px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow"
        />
        <button
          type="button"
          id="add-skill-confirm"
          class="rounded-lg bg-primary-yellow  text-white text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeSkillsModal();
    });
    overlay
      .querySelector("#close-skills-modal")
      .addEventListener("click", closeSkillsModal);

    overlay.querySelectorAll("[data-remove-skill]").forEach((btn) => {
      btn.addEventListener("click", () => {
        vendorSkills.splice(Number(btn.dataset.removeSkill), 1);
        renderSkillsGrid();
        openSkillsModal(); // refresh modal contents
      });
    });

    overlay
      .querySelector("#add-skill-confirm")
      .addEventListener("click", () => {
        const input = overlay.querySelector("#new-skill-input");
        const value = input.value.trim();
        if (!value) return;

        const exists = vendorSkills.some(
          (s) => s.toLowerCase() === value.toLowerCase(),
        );
        if (exists) return;

        vendorSkills.push(value);
        renderSkillsGrid();
        openSkillsModal(); // refresh modal contents
      });
  }

  function closeSkillsModal() {
    const overlay = document.getElementById("skills-modal-overlay");
    if (overlay) overlay.remove();
  }

  manageSkillsBtn.addEventListener("click", openSkillsModal);

  // Initial paint
  renderSkillsGrid();
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // TODO: Send form data to your save-vendor endpoint
    showOverview();
  });
});

//UPLOAD JS

// ============================================================
// PROFILE PHOTO FUNCTIONALITY
// ============================================================

// ------------------------------------------------------------
// PROFILE PHOTO ELEMENTS
// ------------------------------------------------------------

const profilePhoto = document.getElementById("profile-photo");
const editProfilePhoto = document.getElementById("edit-profile-photo");

const profilePhotoModal = document.getElementById("profile-photo-modal");

const takePhotoBtn = document.getElementById("take-photo-btn");
const chooseGalleryBtn = document.getElementById("choose-gallery-btn");
const removeProfilePhotoBtn = document.getElementById("remove-profile-photo");
const cancelProfilePhotoBtn = document.getElementById("cancel-profile-photo");

const galleryPhotoInput = document.getElementById("gallery-photo-input");

// ------------------------------------------------------------
// CAMERA ELEMENTS
// ------------------------------------------------------------

const cameraModal = document.getElementById("camera-modal");
const cameraVideo = document.getElementById("camera-video");
const cameraCanvas = document.getElementById("camera-canvas");

const capturePhotoBtn = document.getElementById("capture-photo");
const closeCameraBtn = document.getElementById("close-camera");

// Stores the active camera stream
let cameraStream = null;

// ------------------------------------------------------------
// PROFILE PHOTO PATHS
// ------------------------------------------------------------

// Original image shown when the page loads.
// This will ALWAYS be used after a page refresh.
const originalProfilePhoto = "/static/img/fe-overview-shams.jpg";

// Placeholder shown after clicking "Remove Photo".
const defaultProfilePhoto = "/static/img/avatar-placeholder.png";

// ============================================================
// OPEN PROFILE PHOTO POPUP
// ============================================================

editProfilePhoto.addEventListener("click", function () {
  profilePhotoModal.classList.remove("hidden");
  profilePhotoModal.classList.add("flex");
});

// ============================================================
// CLOSE PROFILE PHOTO POPUP
// ============================================================

function closeProfilePhotoModal() {
  profilePhotoModal.classList.add("hidden");
  profilePhotoModal.classList.remove("flex");
}

// Cancel button
cancelProfilePhotoBtn.addEventListener("click", function () {
  closeProfilePhotoModal();
});

// ============================================================
// TAKE PHOTO
// ============================================================

// Opens the actual browser/device camera.
takePhotoBtn.addEventListener("click", async function () {
  try {
    // Request camera permission
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: false,
    });

    // Close the upload popup
    closeProfilePhotoModal();

    // Open camera popup
    cameraModal.classList.remove("hidden");
    cameraModal.classList.add("flex");

    // Show live camera stream
    cameraVideo.srcObject = cameraStream;

    await cameraVideo.play();
  } catch (error) {
    console.error("Unable to access camera:", error);

    // Close camera if permission is denied
    closeCamera();
  }
});

// ============================================================
// CAPTURE PHOTO
// ============================================================

capturePhotoBtn.addEventListener("click", function () {
  // Make sure camera is available
  if (!cameraStream) {
    return;
  }

  const width = cameraVideo.videoWidth;
  const height = cameraVideo.videoHeight;

  // Set canvas dimensions to match camera
  cameraCanvas.width = width;
  cameraCanvas.height = height;

  const context = cameraCanvas.getContext("2d");

  // Capture current camera frame
  context.drawImage(cameraVideo, 0, 0, width, height);

  // Convert captured image into JPEG
  cameraCanvas.toBlob(
    function (blob) {
      if (!blob) {
        return;
      }

      // Create temporary URL for captured photo
      const imageUrl = URL.createObjectURL(blob);

      // Show captured photo in profile
      profilePhoto.src = imageUrl;

      // Close camera
      closeCamera();
    },
    "image/jpeg",
    0.9,
  );
});

// ============================================================
// CLOSE CAMERA
// ============================================================

function closeCamera() {
  // Stop all camera tracks
  if (cameraStream) {
    cameraStream.getTracks().forEach(function (track) {
      track.stop();
    });

    cameraStream = null;
  }

  // Remove camera stream
  cameraVideo.srcObject = null;

  // Hide camera popup
  cameraModal.classList.add("hidden");
  cameraModal.classList.remove("flex");
}

// Close camera using X button
closeCameraBtn.addEventListener("click", function () {
  closeCamera();
});

// ============================================================
// CHOOSE FROM GALLERY
// ============================================================

chooseGalleryBtn.addEventListener("click", function () {
  galleryPhotoInput.click();
});

// ============================================================
// HANDLE GALLERY IMAGE
// ============================================================

galleryPhotoInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  // Nothing selected
  if (!file) {
    return;
  }

  // Only allow image files
  if (!file.type.startsWith("image/")) {
    return;
  }

  // Create temporary URL
  const imageUrl = URL.createObjectURL(file);

  // Replace profile image
  profilePhoto.src = imageUrl;

  // Close popup
  closeProfilePhotoModal();

  // Reset input
  galleryPhotoInput.value = "";
});

// ============================================================
// REMOVE PROFILE PHOTO
// ============================================================

removeProfilePhotoBtn.addEventListener("click", function () {
  // Replace current image with placeholder
  profilePhoto.src = defaultProfilePhoto;

  // Close popup
  closeProfilePhotoModal();

  // Reset gallery input
  galleryPhotoInput.value = "";
});

// ============================================================
// CLOSE POPUP WHEN CLICKING OUTSIDE
// ============================================================

profilePhotoModal.addEventListener("click", function (event) {
  // Only close when the dark overlay itself is clicked
  if (event.target === profilePhotoModal) {
    closeProfilePhotoModal();
  }
});

// ============================================================
// CLOSE CAMERA WHEN CLICKING OUTSIDE
// ============================================================

cameraModal.addEventListener("click", function (event) {
  if (event.target === cameraModal) {
    closeCamera();
  }
});
