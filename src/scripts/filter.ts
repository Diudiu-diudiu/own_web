document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach((root) => {
  const cards = [...root.querySelectorAll<HTMLElement>('.post-card')];
  const input = root.querySelector<HTMLInputElement>('input[type="search"]');
  const categoryButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-category]')];
  const tagButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-tag]')];
  const count = root.querySelector<HTMLElement>('[data-count]');
  const empty = root.querySelector<HTMLElement>('.empty-state');
  let category = '全部';
  let tag = '';

  const update = () => {
    const query = input?.value.trim().toLowerCase() ?? '';
    let visible = 0;
    cards.forEach((card) => {
      const matches = (!query || card.dataset.search?.includes(query)) && (category === '全部' || card.dataset.category === category) && (!tag || card.dataset.search?.includes(tag.toLowerCase()));
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    if (count) count.textContent = String(visible);
    if (empty) empty.hidden = visible !== 0;
  };
  input?.addEventListener('input', update);
  categoryButtons.forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.category ?? '全部';
    categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
    update();
  }));
  tagButtons.forEach((button) => button.addEventListener('click', () => {
    const selected = button.classList.toggle('active');
    tagButtons.forEach((item) => { if (item !== button) item.classList.remove('active'); });
    tag = selected ? button.dataset.tag ?? '' : '';
    update();
  }));
});
