/**
 * PDF Viewer using PDF.js
 * Initializes PDF.js viewer for PDF iframes on the page
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPDFViewers);
  } else {
    initPDFViewers();
  }

  function initPDFViewers() {
    // Find all iframes with PDF sources
    const pdfIframes = document.querySelectorAll('iframe[src$=".pdf"]');
    
    pdfIframes.forEach(function(iframe) {
      const pdfUrl = iframe.getAttribute('src');
      
      // Create a container for the PDF viewer
      const container = document.createElement('div');
      container.className = 'pdf-viewer-container';
      container.style.width = '100%';
      container.style.border = '1px solid #ccc';
      container.style.position = 'relative';
      
      // Create canvas for rendering
      const canvas = document.createElement('canvas');
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      container.appendChild(canvas);
      
      // Create navigation controls
      const controls = document.createElement('div');
      controls.className = 'pdf-controls';
      controls.style.padding = '10px';
      controls.style.backgroundColor = '#f5f5f5';
      controls.style.borderBottom = '1px solid #ccc';
      controls.style.textAlign = 'center';
      
      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
      prevBtn.style.marginRight = '10px';
      
      const pageInfo = document.createElement('span');
      pageInfo.style.margin = '0 10px';
      
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.style.marginLeft = '10px';
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.textContent = 'Download PDF';
      downloadLink.style.marginLeft = '20px';
      downloadLink.download = pdfUrl.split('/').pop();
      
      controls.appendChild(prevBtn);
      controls.appendChild(pageInfo);
      controls.appendChild(nextBtn);
      controls.appendChild(downloadLink);
      
      container.insertBefore(controls, canvas);
      
      // Replace iframe with container
      iframe.parentNode.replaceChild(container, iframe);
      
      // Load PDF using PDF.js
      if (typeof pdfjsLib !== 'undefined') {
        loadPDF(pdfUrl, canvas, prevBtn, nextBtn, pageInfo);
      } else {
        // Fallback: show error message
        container.innerHTML = '<p style="padding: 20px;">Unable to load PDF viewer. <a href="' + pdfUrl + '">Download PDF</a> instead.</p>';
      }
    });
  }

  function loadPDF(url, canvas, prevBtn, nextBtn, pageInfo) {
    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;
    const scale = 1.5;
    const ctx = canvas.getContext('2d');

    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    function renderPage(num) {
      pageRendering = true;
      
      pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
          pageRendering = false;
          if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
      });

      // Update page info
      pageInfo.textContent = 'Page ' + num + ' of ' + pdfDoc.numPages;
    }

    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }

    /**
     * Displays previous page.
     */
    function onPrevPage() {
      if (pageNum <= 1) {
        return;
      }
      pageNum--;
      queueRenderPage(pageNum);
    }

    /**
     * Displays next page.
     */
    function onNextPage() {
      if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      queueRenderPage(pageNum);
    }

    prevBtn.addEventListener('click', onPrevPage);
    nextBtn.addEventListener('click', onNextPage);

    /**
     * Asynchronously downloads PDF.
     */
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      
      // Initial/first page rendering
      renderPage(pageNum);
      
      // Enable/disable buttons
      prevBtn.disabled = pageNum <= 1;
      nextBtn.disabled = pageNum >= pdfDoc.numPages;
      
      // Update button states on page change
      const updateButtons = function() {
        prevBtn.disabled = pageNum <= 1;
        nextBtn.disabled = pageNum >= pdfDoc.numPages;
      };
      
      prevBtn.addEventListener('click', updateButtons);
      nextBtn.addEventListener('click', updateButtons);
    }).catch(function(error) {
      console.error('Error loading PDF:', error);
      canvas.parentNode.innerHTML = '<p style="padding: 20px;">Error loading PDF. <a href="' + url + '">Download PDF</a> instead.</p>';
    });
  }
})();
