function getLastById(id) {
  const all = document.querySelectorAll(`#${id}`);
  return all.length ? all[all.length - 1] : null;
}

function getAllById(id) {
  return [...document.querySelectorAll(`#${id}`)];
}

const board = getLastById('board');
const poolGrid = getLastById('pool-grid');
const tierTemplate = getLastById('tier-template');
const assetPool = getLastById('asset-pool');
const authorModal = getLastById('author-modal');
const closeModalBtn = getLastById('close-modal');
const copyWechatBtn = getLastById('copy-wechat');

const addTierBtns = getAllById('add-tier');
const reorderTiersBtns = getAllById('reorder-tiers');
const resetBoardBtns = getAllById('reset-board');
const contactAuthorBtns = getAllById('contact-author');
const uploadInputs = getAllById('upload');

const defaultTiers = [
  ['S', '#ef4444'],
  ['A', '#f97316'],
  ['B', '#eab308'],
  ['C', '#22c55e'],
  ['D', '#3b82f6']
];

let dragData = null;
let rowDrag = null;

function clearTierHighlight() {
  if (!board) return;
  [...board.querySelectorAll('.tier-row')].forEach((row) => {
    row.classList.remove('row-target-top', 'row-target-bottom', 'row-over');
  });
}

function createTier(name, color) {
  if (!board || !tierTemplate?.content?.firstElementChild) return;

  const node = tierTemplate.content.firstElementChild.cloneNode(true);
  const nameInput = node.querySelector('.tier-name');
  const colorInput = node.querySelector('.tier-color');
  const deleteBtn = node.querySelector('.delete-tier');
  const dropzone = node.querySelector('.tier-dropzone');

  node.removeAttribute('draggable');
  nameInput.value = name;
  colorInput.value = color;
  node.style.setProperty('--tier-color', color);

  colorInput.addEventListener('input', () => {
    node.style.setProperty('--tier-color', colorInput.value);
  });

  deleteBtn.addEventListener('click', () => {
    if (board.children.length > 1) node.remove();
  });

  bindDropzone(dropzone, node);
  bindRowReorder(node);
  board.appendChild(node);
}

function bindItemDrag(item) {
  item.draggable = true;
  item.addEventListener('dragstart', (e) => {
    dragData = { item, source: item.parentElement };
    item.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.dataset.id);
  });

  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    item.style.transform = '';
    dragData = null;
  });

  item.addEventListener('drag', () => {
    if (!dragData) return;
    const x = (Math.random() - 0.5) * 4;
    item.style.transform = `scale(1.05) rotate(${x}deg)`;
  });
}

function insertAtPointer(container, dragged, pointerX) {
  const siblings = [...container.querySelectorAll('.item:not(.dragging)')];
  const target = siblings.find((el) => pointerX < el.getBoundingClientRect().left + el.offsetWidth / 2);
  if (target) container.insertBefore(dragged, target);
  else container.appendChild(dragged);
}

function bindDropzone(zone, row) {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dragData) return;
    row.classList.add('row-over');
    insertAtPointer(zone, dragData.item, e.clientX);
  });

  zone.addEventListener('dragleave', () => row.classList.remove('row-over'));

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    row.classList.remove('row-over');
    if (!dragData) return;
    dragData.item.animate(
      [{ transform: 'scale(1.05)' }, { transform: 'scale(1) rotate(0deg)' }],
      { duration: 220, easing: 'cubic-bezier(0.2, 0.9, 0.2, 1.1)' }
    );
  });
}

function bindRowReorder(row) {
  const handle = row.querySelector('.row-handle');

  handle.addEventListener('pointerdown', () => {
    row.setAttribute('draggable', 'true');
  });

  row.addEventListener('dragstart', (e) => {
    if (e.target !== row) return;
    rowDrag = row;
    row.classList.add('row-dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  row.addEventListener('dragend', () => {
    row.classList.remove('row-dragging');
    row.removeAttribute('draggable');
    rowDrag = null;
    clearTierHighlight();
  });

  row.addEventListener('dragover', (e) => {
    if (!rowDrag || rowDrag === row) return;
    e.preventDefault();
    clearTierHighlight();

    const rect = row.getBoundingClientRect();
    const insertAfter = e.clientY > rect.top + rect.height / 2;
    row.classList.add(insertAfter ? 'row-target-bottom' : 'row-target-top');
    board.insertBefore(rowDrag, insertAfter ? row.nextSibling : row);
  });

  row.addEventListener('drop', () => clearTierHighlight());
}

function addImage(src) {
  if (!poolGrid) return;
  const img = new Image();
  img.src = src;
  img.className = 'item';
  img.dataset.id = crypto.randomUUID();
  bindItemDrag(img);
  poolGrid.appendChild(img);
}

function readFiles(files) {
  [...files]
    .filter((file) => file.type.startsWith('image/'))
    .forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => addImage(e.target.result);
      reader.readAsDataURL(file);
    });
}

function resetToDefault() {
  if (!board || !poolGrid) return;
  board.innerHTML = '';
  poolGrid.innerHTML = '';
  defaultTiers.forEach(([name, color]) => createTier(name, color));
}

function shuffleTiers() {
  if (!board) return;
  const tiers = [...board.children];
  for (let i = tiers.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiers[i], tiers[j]] = [tiers[j], tiers[i]];
  }

  tiers.forEach((tier, index) => {
    board.appendChild(tier);
    tier.animate(
      [
        { transform: 'translateY(-6px)', opacity: 0.8 },
        { transform: 'translateY(0)', opacity: 1 }
      ],
      { duration: 260 + index * 12, easing: 'ease-out' }
    );
  });
}

function init() {
  if (!board || !poolGrid || !tierTemplate || !assetPool) {
    console.warn('Tier List init skipped: required DOM missing.');
    return;
  }

  addTierBtns.forEach((btn) => {
    btn.addEventListener('click', () => createTier(`Tier ${board.children.length + 1}`, '#a855f7'));
  });

  reorderTiersBtns.forEach((btn) => btn.addEventListener('click', shuffleTiers));

  resetBoardBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const confirmed = window.confirm('确认恢复到初始状态？这会清空当前图片和自定义等级。');
      if (confirmed) resetToDefault();
    });
  });

  contactAuthorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (authorModal?.showModal) authorModal.showModal();
    });
  });

  closeModalBtn?.addEventListener('click', () => authorModal?.close());
  authorModal?.addEventListener('click', (e) => {
    if (e.target === authorModal) authorModal.close();
  });

  copyWechatBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('cvsooo');
      copyWechatBtn.textContent = '已复制';
      setTimeout(() => {
        copyWechatBtn.textContent = '复制微信号';
      }, 1200);
    } catch {
      alert('微信号：cvsooo');
    }
  });

  uploadInputs.forEach((input) => {
    input.addEventListener('change', (e) => readFiles(e.target.files));
  });

  assetPool.addEventListener('dragover', (e) => {
    e.preventDefault();
    assetPool.classList.add('drop-active');
    if (dragData?.item) insertAtPointer(poolGrid, dragData.item, e.clientX);
  });

  assetPool.addEventListener('dragleave', () => assetPool.classList.remove('drop-active'));
  assetPool.addEventListener('drop', (e) => {
    e.preventDefault();
    assetPool.classList.remove('drop-active');
    if (e.dataTransfer.files.length) readFiles(e.dataTransfer.files);
    if (dragData?.item) {
      dragData.item.animate(
        [{ transform: 'scale(1.05)' }, { transform: 'scale(1) rotate(0deg)' }],
        { duration: 180, easing: 'ease-out' }
      );
    }
  });

  document.body.addEventListener('dragover', (e) => e.preventDefault());
  document.body.addEventListener('drop', (e) => {
    const valid = e.target.closest('.tier-dropzone, #asset-pool');
    if (!valid && dragData?.item) {
      e.preventDefault();
      dragData.source.appendChild(dragData.item);
      dragData.item.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-5px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(0)' }
        ],
        { duration: 220, easing: 'ease-out' }
      );
    }

    if (!valid && e.dataTransfer?.files?.length) {
      readFiles(e.dataTransfer.files);
    }
  });

  resetToDefault();
}

init();
