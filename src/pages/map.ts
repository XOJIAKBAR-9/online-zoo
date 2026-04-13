fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        // Initialize header component after header HTML is loaded
        if ((window as any).initializeHeader) {
          (window as any).initializeHeader();
        }
      }
    });