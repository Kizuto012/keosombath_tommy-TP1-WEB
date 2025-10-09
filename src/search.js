// Simple client-side search that highlights headings and paragraphs and scrolls to first match
(function(){
  const input = document.getElementById('q');
  const clearBtn = document.getElementById('q-clear');
  if (!input) return;

  const contentSelectors = 'h1, h2, p, li, figure figcaption';
  const nodes = Array.from(document.querySelectorAll(contentSelectors));
  let lastQuery = '';

  function clearHighlights(){
    nodes.forEach(n => n.classList.remove('search-match'));
  }

  function doSearch(){
    const q = input.value.trim().toLowerCase();
    clearHighlights();
    if (!q) return;
    const matches = nodes.filter(n => n.textContent.toLowerCase().includes(q));
    matches.forEach(m => m.classList.add('search-match'));
    if (matches.length) matches[0].scrollIntoView({behavior:'smooth', block:'center'});
  }

  input.addEventListener('input', () => {
    if (input.value === lastQuery) return;
    lastQuery = input.value;
    doSearch();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    lastQuery = '';
    clearHighlights();
    input.focus();
  });

})();
