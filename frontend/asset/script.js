document.addEventListener("DOMContentLoaded", () => {
  const openAddModalBtn = document.getElementById("openAddModalBtn");
  const closeAddModalBtn = document.getElementById("closeAddModalBtn");
  const addAddressModal = document.getElementById("addAddressModal");

  const openUpdateModalBtns = document.querySelectorAll(".openUpdateModalBtn");
  const closeUpdateModalBtn = document.getElementById("closeUpdateModalBtn");
  const updateAddressModal = document.getElementById("updateAddressModal");

  const openDeleteModalBtns = document.querySelectorAll(".openDeleteModalBtn");
  const closeDeleteModalBtn = document.getElementById("closeDeleteModalBtn");
  const deleteConfirmModal = document.getElementById("deleteConfirmModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  const searchResultsModalBtn = document.getElementById(
    "searchResultsModalBtn"
  );
  const searchResultsModal = document.getElementById("searchResultsModal");
  const closeSearchResultsModalBtn = document.getElementById(
    "closeSearchResultsModalBtn"
  );
  const searchQueryInput = document.getElementById("searchQueryInput");

  const showDropdown = document.getElementById("showDropdown");
  const showForm = document.getElementById("showForm");
  const userForm = document.getElementById("userForm");
  const userDropdown = document.getElementById("userDropdown");

  const showUpdateDropdown = document.getElementById("showUpdateDropdown");
  const showUpdateForm = document.getElementById("showUpdateForm");
  const updateUserForm = document.getElementById("updateUserForm");
  const updateUserDropdown = document.getElementById("updateUserDropdown");

  let searchQuery;
  let rowToDelete;

  showDropdown.addEventListener("click", (e) => {
    e.preventDefault();
    userForm.classList.add("fade");
    setTimeout(() => {
      userForm.classList.add("hidden");
      userDropdown.classList.remove("hidden");
      userDropdown.classList.add("fade");
      setTimeout(() => {
        userDropdown.classList.remove("fade");
        userDropdown.classList.add("show");
      }, 50);
    }, 500);
  });

  showForm.addEventListener("click", (e) => {
    e.preventDefault();
    userDropdown.classList.add("fade");
    setTimeout(() => {
      userDropdown.classList.add("hidden");
      userForm.classList.remove("hidden");
      userForm.classList.add("fade");
      setTimeout(() => {
        userForm.classList.remove("fade");
        userForm.classList.add("show");
      }, 50);
    }, 500);
  });

  showUpdateDropdown.addEventListener("click", (e) => {
    e.preventDefault();
    updateUserForm.classList.add("fade");
    setTimeout(() => {
      updateUserForm.classList.add("hidden");
      updateUserDropdown.classList.remove("hidden");
      updateUserDropdown.classList.add("fade");
      setTimeout(() => {
        updateUserDropdown.classList.remove("fade");
        updateUserDropdown.classList.add("show");
      }, 50);
    }, 500);
  });

  showUpdateForm.addEventListener("click", (e) => {
    e.preventDefault();
    updateUserDropdown.classList.add("fade");
    setTimeout(() => {
      updateUserDropdown.classList.add("hidden");
      updateUserForm.classList.remove("hidden");
      updateUserForm.classList.add("fade");
      setTimeout(() => {
        updateUserForm.classList.remove("fade");
        updateUserForm.classList.add("show");
      }, 50);
    }, 500);
  });

  openAddModalBtn.addEventListener("click", () => {
    addAddressModal.style.display = "block";
  });

  closeAddModalBtn.addEventListener("click", () => {
    addAddressModal.style.display = "none";
  });

  openUpdateModalBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      updateAddressModal.style.display = "block";
      // Populate update modal with row data if needed
    });
  });

  closeUpdateModalBtn.addEventListener("click", () => {
    updateAddressModal.style.display = "none";
  });

  openDeleteModalBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      rowToDelete = event.target.closest("tr");
      deleteConfirmModal.style.display = "block";
    });
  });

  closeDeleteModalBtn.addEventListener("click", () => {
    deleteConfirmModal.style.display = "none";
  });

  confirmDeleteBtn.addEventListener("click", () => {
    // delete address
    if (rowToDelete) {
      rowToDelete.remove();
      rowToDelete = null;
      deleteConfirmModal.style.display = "none";
    }
  });

  cancelDeleteBtn.addEventListener("click", () => {
    deleteConfirmModal.style.display = "none";
  });

  searchResultsModalBtn.addEventListener("click", () => {
    searchQuery = searchQueryInput.value;
    console.log(searchQuery);
    const showSearchQuery = document.getElementById("showSearchQuery");
    showSearchQuery.textContent = searchQuery;
    searchResultsModal.style.display = "block";
  });

  closeSearchResultsModalBtn.addEventListener("click", () => {
    searchResultsModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    // close modals when clicked outside or on close button or ESC key
    if (event.target == addAddressModal) {
      addAddressModal.style.display = "none";
    } else if (event.target == updateAddressModal) {
      updateAddressModal.style.display = "none";
    } else if (event.target == deleteConfirmModal) {
      deleteConfirmModal.style.display = "none";
    } else if (event.target == searchResultsModal) {
      searchResultsModal.style.display = "none";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none";
      });
    }
  });
});
